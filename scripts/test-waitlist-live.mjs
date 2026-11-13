import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
const url = process.argv[2];
if (!/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(url ?? ""))
  throw new Error("Supply the exact preview deployment URL.");
const password = readFileSync(
  ".env.waitlist-admin-password.local",
  "utf8",
).trim();
const setup = Object.fromEntries(
  readFileSync(".env.waitlist-setup.local", "utf8")
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i), line.slice(i + 1)];
    }),
);
function request(
  path,
  { method = "GET", data, auth = false, origin = url } = {},
) {
  const command = `npx --yes vercel@latest curl "${path}" --deployment ${url} -- --silent --show-error --write-out "\\n%{http_code}" --header "Origin: ${origin}" --header "Content-Type: application/json" --request ${method} ${auth ? "--cookie .env.waitlist-test-cookies.local --cookie-jar .env.waitlist-test-cookies.local" : ""} ${data ? "--data-binary @-" : ""}`;
  const output = execSync(command, {
    input: data ? JSON.stringify(data) : undefined,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
    timeout: 120000,
  });
  const index = output.lastIndexOf("\n");
  const status = Number(output.slice(index + 1));
  const raw = output.slice(0, index);
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    body = raw;
  }
  return { status, body };
}
function check(label, actual, expected) {
  assert.equal(actual, expected, label);
  console.log(`PASS: ${label}`);
}
function challenge() {
  const result = request("/api/marketplace-waitlist");
  check("private Blob form readiness", result.status, 200);
  return result.body.challenge;
}
const stamp = process.argv[3] || Date.now();
const email = `melon-waitlist-test-${stamp}@example.com`;
const buyer = {
  role: "buyer",
  email,
  country: "Canada",
  consent: true,
  website: "",
};
check(
  "anonymous dashboard API blocked",
  request("/api/admin/marketplace-waitlist").status,
  401,
);
check(
  "anonymous CSV blocked",
  request("/api/admin/marketplace-waitlist/export").status,
  401,
);
check(
  "cross-origin submission blocked",
  request("/api/marketplace-waitlist", {
    method: "POST",
    data: buyer,
    origin: "https://example.com",
  }).status,
  403,
);
check(
  "invalid signup rejected",
  request("/api/marketplace-waitlist", { method: "POST", data: buyer }).status,
  422,
);
const hmac = (value) =>
  createHmac("sha256", setup.WAITLIST_DATA_SECRET).update(value).digest("hex");
const unsubscribeFor = (role) => {
  const payload = `unsubscribe:${hmac(`${role}:${email}`)}`;
  return `${payload}.${hmac(payload)}`;
};
let result;
if (!process.argv[3]) {
  let token = challenge();
  result = request("/api/marketplace-waitlist", {
    method: "POST",
    data: { ...buyer, challenge: token },
  });
  check("buyer saved", result.status, 201);
  token = challenge();
  result = request("/api/marketplace-waitlist", {
    method: "POST",
    data: {
      ...buyer,
      role: "seller",
      businessName: `TEST ONLY ${stamp}`,
      category: "farms",
      businessLink: "https://example.com",
      challenge: token,
    },
  });
  check("seller saved", result.status, 201);
  token = challenge();
  check(
    "duplicate rejected",
    request("/api/marketplace-waitlist", {
      method: "POST",
      data: { ...buyer, challenge: token },
    }).status,
    409,
  );
}
check(
  "wrong admin password rejected",
  request("/api/admin/marketplace-waitlist/session", {
    method: "POST",
    data: {
      email: setup.WAITLIST_ADMIN_EMAIL,
      password: "incorrect-test-password",
    },
  }).status,
  401,
);
check(
  "admin login",
  request("/api/admin/marketplace-waitlist/session", {
    method: "POST",
    data: { email: setup.WAITLIST_ADMIN_EMAIL, password },
    auth: true,
  }).status,
  200,
);
const query = `q=${encodeURIComponent(email)}`;
result = request(`/api/admin/marketplace-waitlist?${query}`, { auth: true });
check("admin records readable", result.status, 200);
check("two persisted role records", result.body.total, 2);
assert.ok(
  result.body.records.every(
    (row) => row.signupAt && row.consentAt && row.consentText,
  ),
);
console.log("PASS: consent and signup timestamps persisted");
result = request(`/api/admin/marketplace-waitlist?${query}&role=seller`, {
  auth: true,
});
check("seller filter", result.body.total, 1);
result = request(`/api/admin/marketplace-waitlist/export?${query}`, {
  auth: true,
});
check("CSV export", result.status, 200);
assert.ok(result.body.includes(email) && result.body.includes("consentAt"));
for (const token of [unsubscribeFor("buyer"), unsubscribeFor("seller")])
  check(
    "test registration unsubscribed",
    request("/api/marketplace-waitlist/unsubscribe", {
      method: "POST",
      data: { token },
    }).status,
    200,
  );
result = request(
  `/api/admin/marketplace-waitlist?${query}&status=unsubscribed`,
  { auth: true },
);
check("unsubscribe status persisted", result.body.total, 2);
check(
  "admin logout",
  request("/api/admin/marketplace-waitlist/session", {
    method: "DELETE",
    auth: true,
  }).status,
  200,
);
check(
  "logged-out cookie rejected",
  request("/api/admin/marketplace-waitlist", { auth: true }).status,
  401,
);
console.log(
  `Live checks complete. Two unsubscribed TEST ONLY registrations remain for audit: ${email}. No emails were sent.`,
);
