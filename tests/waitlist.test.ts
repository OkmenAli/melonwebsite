import { test } from "node:test";
import assert from "node:assert/strict";
import { scryptSync } from "node:crypto";
import {
  Conflict,
  Waitlist,
  WaitlistError,
  passwordMatches,
  sign,
  verify,
  type PrivateStore,
} from "../lib/waitlist/core";
import { csv, signupSchema, type Registration } from "../lib/waitlist/model";
import { filtered } from "../lib/waitlist/filter";
class Memory implements PrivateStore {
  rows = new Map<string, { value: unknown; etag: string }>();
  version = 0;
  async read<T>(key: string) {
    const row = this.rows.get(key);
    return row
      ? { value: structuredClone(row.value) as T, etag: row.etag }
      : null;
  }
  async write(key: string, value: unknown, options: { etag?: string } = {}) {
    const old = this.rows.get(key);
    if (options.etag ? old?.etag !== options.etag : !!old) throw new Conflict();
    this.rows.set(key, {
      value: structuredClone(value),
      etag: String(++this.version),
    });
  }
  async remove(key: string) {
    this.rows.delete(key);
  }
  async *paths(prefix: string) {
    for (const key of this.rows.keys()) if (key.startsWith(prefix)) yield key;
  }
}
function setup() {
  let now = 1800000000000;
  const store = new Memory();
  const api = new Waitlist(
    store,
    "test-secret-with-more-than-32-characters",
    () => now,
  );
  return {
    api,
    store,
    advance: (ms = 3000) => {
      now += ms;
    },
  };
}
const buyer = (challenge: string, email = "test@example.com") =>
  signupSchema.parse({
    role: "buyer",
    email,
    country: "US",
    consent: true,
    website: "",
    challenge,
  });
test("normalizes emails and validates required buyer fields", () => {
  assert.equal(buyer("x", " TEST@Example.com ").email, "test@example.com");
  for (const change of [
    { consent: false },
    { country: "UK" },
    { email: "bad" },
    { website: "spam" },
  ])
    assert.equal(
      signupSchema.safeParse({ ...buyer("x"), ...change }).success,
      false,
    );
});
test("seller requires business details and safe optional URL", () => {
  const input = {
    ...buyer("x"),
    role: "seller",
    businessName: "Farm",
    category: "farms",
    businessLink: "@farm",
  };
  assert.ok(signupSchema.safeParse(input).success);
  for (const change of [
    { businessName: " " },
    { category: "unknown" },
    { businessLink: "javascript:alert(1)" },
    { businessLink: "https://user:pass@example.com" },
  ])
    assert.equal(
      signupSchema.safeParse({ ...input, ...change }).success,
      false,
    );
});
test("saves registration and server consent timestamps", async () => {
  const s = setup(),
    c = s.api.challenge("ip");
  s.advance();
  await s.api.register(buyer(c), "ip");
  const [row] = await s.api.records();
  assert.equal(row.email, "test@example.com");
  assert.equal(row.signupAt, row.consentAt);
  assert.ok(row.consentText);
  assert.equal(row.unsubscribedAt, null);
});
test("concurrent same-role signups create exactly one record", async () => {
  const s = setup();
  const a = s.api.challenge("a"),
    b = s.api.challenge("b");
  s.advance();
  const results = await Promise.allSettled([
    s.api.register(buyer(a), "a"),
    s.api.register(buyer(b), "b"),
  ]);
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 1);
  const rejected = results.find(
    (r) => r.status === "rejected",
  ) as PromiseRejectedResult;
  assert.equal(rejected.reason.status, 409);
  assert.equal((await s.api.records()).length, 1);
});
test("one email may register once per role", async () => {
  const s = setup(),
    a = s.api.challenge("a"),
    b = s.api.challenge("b");
  s.advance();
  await s.api.register(buyer(a), "a");
  await s.api.register(
    signupSchema.parse({
      ...buyer(b),
      role: "seller",
      businessName: "Farm",
      category: "farms",
      businessLink: "",
    }),
    "b",
  );
  assert.equal((await s.api.records()).length, 2);
});
test("replayed, tampered, expired, too-fast and cross-IP challenges fail", async () => {
  for (const kind of ["tampered", "expired", "fast", "ip", "replay"]) {
    const s = setup();
    let c = s.api.challenge("ip");
    s.advance(kind === "fast" ? 0 : kind === "expired" ? 3600001 : 3000);
    if (kind === "tampered") c += "a";
    if (kind === "replay") await s.api.register(buyer(c), "ip");
    await assert.rejects(
      s.api.register(
        buyer(c, "other@example.com"),
        kind === "ip" ? "other" : "ip",
      ),
      (e: unknown) => e instanceof WaitlistError && e.status === 400,
    );
  }
});
test("atomic rate limits enforce ceiling during concurrency", async () => {
  const s = setup();
  const results = await Promise.allSettled(
    Array.from({ length: 10 }, () => s.api.limit("same", 3)),
  );
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 3);
});
test("storage failures never return success", async () => {
  const s = setup(),
    c = s.api.challenge("ip");
  s.advance();
  const write = s.store.write.bind(s.store);
  s.store.write = async (path, value, options) => {
    if (path.includes("registrations/")) throw new Error("offline");
    return write(path, value, options);
  };
  await assert.rejects(s.api.register(buyer(c), "ip"), /offline/);
  assert.equal((await s.api.records()).length, 0);
});
test("unsubscribe is idempotent and duplicates never reactivate", async () => {
  const s = setup(),
    c = s.api.challenge("ip");
  s.advance();
  const { unsubscribeToken } = await s.api.register(buyer(c), "ip");
  await s.api.unsubscribe(unsubscribeToken);
  await s.api.unsubscribe(unsubscribeToken);
  const before = (await s.api.records())[0];
  const next = s.api.challenge("ip");
  s.advance();
  await assert.rejects(
    s.api.register(buyer(next), "ip"),
    (e: unknown) => e instanceof WaitlistError && e.status === 409,
  );
  assert.equal(
    (await s.api.records())[0].unsubscribedAt,
    before.unsubscribedAt,
  );
  await assert.rejects(s.api.unsubscribe(unsubscribeToken + "x"));
});
test("password hashes and signatures reject bad credentials", () => {
  const salt = "abcdef0123456789abcdef0123456789";
  const encoded = `${salt}:${scryptSync("long-password", salt, 64).toString("hex")}`;
  assert.ok(passwordMatches("long-password", encoded));
  assert.equal(passwordMatches("wrong", encoded), false);
  assert.equal(passwordMatches("wrong", "bad"), false);
  assert.equal(verify("secret", sign("secret", "test")), "test");
  assert.equal(verify("other", sign("secret", "test")), null);
});
test("CSV exports consent/status and neutralizes formulas", () => {
  const record = {
    role: "seller",
    email: "person@example.com",
    businessName: '=HYPERLINK("evil")',
    businessLink: "@farm",
    unsubscribedAt: "2026-11-12",
  } as Registration;
  const output = csv([record]);
  assert.match(output, /consentAt/);
  assert.match(output, /unsubscribedAt/);
  assert.ok(output.includes("'=HYPERLINK"));
  assert.ok(output.includes("'@farm"));
});
test("filters search and separate roles", async () => {
  const s = setup(),
    c = s.api.challenge("ip");
  s.advance();
  await s.api.register(buyer(c), "ip");
  const rows = await s.api.records();
  assert.equal(filtered(rows, "https://test/?role=seller").rows.length, 0);
  assert.equal(
    filtered(rows, "https://test/?role=buyer&q=EXAMPLE&status=subscribed").rows
      .length,
    1,
  );
  assert.throws(() => filtered(rows, "https://test/?page=-1"));
});
