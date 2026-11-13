import { randomBytes, scryptSync } from "node:crypto";
import { writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
const rl = createInterface({ input: process.stdin, output: process.stdout });
const email = (await rl.question("Admin email: ")).trim().toLowerCase();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  throw new Error("Enter a valid email.");
rl.close();
// Generate credentials locally; no password is transmitted or committed.
const password = randomBytes(24).toString("base64url");
const salt = randomBytes(16).toString("hex");
const env = `WAITLIST_DATA_SECRET=${randomBytes(32).toString("hex")}\nWAITLIST_ADMIN_EMAIL=${email}\nWAITLIST_ADMIN_PASSWORD_HASH=${salt}:${scryptSync(password, salt, 64).toString("hex")}\n`;
await writeFile(".env.waitlist-setup.local", env, { flag: "wx", mode: 0o600 });
await writeFile(".env.waitlist-admin-password.local", password + "\n", {
  flag: "wx",
  mode: 0o600,
});
console.log(
  "Created ignored .env.waitlist-setup.local and .env.waitlist-admin-password.local. Add the three setup values to Vercel. Keep the password in your password manager and delete the password file afterward. Never commit either file. Do not regenerate the data secret after launch.",
);
