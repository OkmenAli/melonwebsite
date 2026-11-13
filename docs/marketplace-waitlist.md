# Marketplace waitlist

The form lives on `/marketplace`; private management is at `/admin/marketplace-waitlist`. All writes and admin reads run in Next.js Node route handlers deployed as Vercel Functions. No Supabase services or app accounts are used. No emails are sent.

## Connect before launch

1. In the **melonwebsite** Vercel project, connect a **private** Blob store. It supplies `BLOB_READ_WRITE_TOKEN`. Never use a public store or a `NEXT_PUBLIC_` variable. Prefer a separate store and credentials for Preview to isolate tests from real registrations.
2. Run `node scripts/setup-waitlist-admin.mjs` in this website repository. Enter the admin email. The script creates ignored local files, refuses to overwrite existing files, and generates a strong random password plus its scrypt hash.
3. Add the three values from `.env.waitlist-setup.local` to the project's server-only environment variables: `WAITLIST_DATA_SECRET`, `WAITLIST_ADMIN_EMAIL`, and `WAITLIST_ADMIN_PASSWORD_HASH`. Save the password from `.env.waitlist-admin-password.local` in a password manager, then remove that file. Do not paste these files into chat or commit them. Restrict local file access to your Windows account.
4. Keep `WAITLIST_DATA_SECRET` stable: it determines record IDs and unsubscribe links. Rotating it without migration breaks duplicate lookup and links. Changing the admin password hash invalidates existing sessions.
5. Redeploy. For local testing, securely pull the Preview environment with Vercel CLI. Do not overwrite unrelated local variables. Until private storage and the data secret are usable, the form is disabled with an unavailable message. Admin login also fails closed until all admin settings exist.

## Verify deployment

- Submit a buyer and seller using addresses you control. Confirm successful persistence in the private Blob store and dashboard.
- Repeat the same normalized email and role: expect a duplicate message and no new record. The same email can join once as buyer and once as seller.
- Submit concurrently: conditional create-only Blob writes ensure one record per email/role, not a read-then-write check.
- Open admin APIs and CSV URL in a signed-out browser: expect 401 with no records. Test a wrong password and expired session.
- Sign in, search/filter buyers and sellers, and export CSV. Confirm fields, timestamps, consent and unsubscribe status. Spreadsheet formula-leading fields are escaped.
- Save the unsubscribe link shown after signup, confirm unsubscribe, and check the dashboard. Repeated registration must not silently reactivate consent.
- Test unavailable storage: never show a successful signup on a storage error.

## Security and operating notes

- Private records: `marketplace-waitlist/v1/registrations/`, HMAC-derived names (no emails in paths). Only server-side SDK calls can read them. Do not share Blob tokens with clients.
- Origin checks protect mutations. Login uses scrypt, server-side sessions, HttpOnly/Secure/SameSite cookies, a one-hour expiry, and persistent rate limits. The website auth is separate from Melon app auth.
- Signup protection: honeypot, signed one-use IP-bound form challenge (2 seconds to 1 hour), 5 attempts per IP per 15 minutes, and atomic rate counters. Form loading is limited to 30 per IP per 15 minutes. Login is 5 per IP and 50 globally per 15 minutes. Rate/session/challenge files expire after one day; records do not expire automatically.
- Vercel's trusted `x-vercel-forwarded-for` supplies the client IP. Raw IPs are not stored. For local development only, all clients share the `local` rate bucket.
- Fixed windows permit bursts at boundaries. These are basic anti-spam measures, not bot-proof. Use Vercel Firewall rules if abuse grows. No paid anti-bot service is required.
- Dashboard reads private records in batches of ten; 50 records per display page. Blob is not an indexed database: search/export scans all registrations. The safety limit is 10,000 records. Reassess storage/query architecture before that scale; never silently truncate exports.
- Each signup makes several Blob operations for atomic counters/replay protection and record storage. Admin searches also incur reads. Monitor Vercel usage and spending limits; no promise of zero cost.
- Future email sending must include unsubscribe links and exclude every record with `unsubscribedAt`. Consent text/version and timestamps are stored. Do not automatically email this CSV or reactivate withdrawn consent.
- To handle an owner-requested deletion, remove only their exact registration Blob through an authenticated operator process. No public record-management API exists.

## Automated checks

`npx tsx --test tests/waitlist.test.ts` tests validation, concurrency, duplicate handling, rate limits, replay protection, persistence failure, unsubscribe, password verification, filtering, and CSV safety using an atomic in-memory storage adapter. These do not substitute for the real private Blob and deployed authentication checks above.
