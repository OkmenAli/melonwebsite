import { exec } from "node:child_process";
import assert from "node:assert/strict";
const url = process.argv[2];
if (!/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(url ?? ""))
  throw new Error("Supply the preview URL.");
function request(path, data) {
  return new Promise((resolve, reject) => {
    const command = `npx --yes vercel@latest curl "${path}" --deployment ${url} -- --silent --show-error --write-out "\\n%{http_code}" --header "Origin: ${url}" --header "Content-Type: application/json" ${data ? "--request POST --data-binary @-" : ""}`;
    const child = exec(command, { timeout: 120000 }, (error, stdout) => {
      if (error) return reject(new Error("Preview request failed."));
      const i = stdout.lastIndexOf("\n");
      try {
        resolve({
          status: Number(stdout.slice(i + 1)),
          body: JSON.parse(stdout.slice(0, i)),
        });
      } catch {
        reject(new Error("Invalid server response."));
      }
    });
    child.stdin.end(data ? JSON.stringify(data) : undefined);
  });
}
const a = await request("/api/marketplace-waitlist"),
  b = await request("/api/marketplace-waitlist");
assert.equal(a.status, 200);
assert.equal(b.status, 200);
await new Promise((resolve) => setTimeout(resolve, 2100));
const email = `melon-concurrency-test-${Date.now()}@example.com`;
const input = {
  role: "buyer",
  email,
  country: "US",
  consent: true,
  website: "",
};
const results = await Promise.all(
  [a, b].map((challenge) =>
    request("/api/marketplace-waitlist", {
      ...input,
      challenge: challenge.body.challenge,
    }),
  ),
);
assert.deepEqual(results.map((r) => r.status).sort(), [201, 409]);
console.log(
  "PASS: concurrent real Blob registrations yielded exactly one success and one duplicate.",
);
const saved = results.find((r) => r.status === 201);
assert.equal(
  (
    await request("/api/marketplace-waitlist/unsubscribe", {
      token: saved.body.unsubscribeToken,
    })
  ).status,
  200,
);
console.log(`PASS: test registration unsubscribed: ${email}`);
