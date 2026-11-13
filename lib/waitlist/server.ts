import "server-only";
import { get, put, list, del, BlobPreconditionFailedError } from "@vercel/blob";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "node:crypto";
import {
  Conflict,
  Waitlist,
  WaitlistError,
  prefix,
  type PrivateStore,
} from "./core";
export const noCache = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "Referrer-Policy": "no-referrer",
};
const cookieName =
  process.env.NODE_ENV === "production"
    ? "__Host-melon-waitlist-admin"
    : "melon-waitlist-admin";
export function configured() {
  return (
    !!process.env.BLOB_READ_WRITE_TOKEN &&
    (process.env.WAITLIST_DATA_SECRET?.length ?? 0) >= 32
  );
}
export function adminConfigured() {
  return (
    configured() &&
    !!process.env.WAITLIST_ADMIN_EMAIL &&
    /^[a-f0-9]{32}:[a-f0-9]{128}$/.test(
      process.env.WAITLIST_ADMIN_PASSWORD_HASH ?? "",
    )
  );
}
function token() {
  if (!configured())
    throw new WaitlistError(
      503,
      "Waitlist registration is temporarily unavailable. Please check back soon.",
    );
  return process.env.BLOB_READ_WRITE_TOKEN!;
}
export const blobStore: PrivateStore = {
  async read<T>(path: string) {
    const result = await get(path, {
      access: "private",
      useCache: false,
      token: token(),
    });
    if (!result) return null;
    if (result.statusCode !== 200) throw new Error("Storage read failed");
    return {
      value: (await new Response(result.stream).json()) as T,
      etag: result.blob.etag,
    };
  },
  async write(path, value, options = {}) {
    try {
      await put(path, JSON.stringify(value), {
        access: "private",
        token: token(),
        addRandomSuffix: false,
        allowOverwrite: !!options.etag,
        ifMatch: options.etag,
        contentType: "application/json",
        cacheControlMaxAge: 60,
        ttlDays: options.ttlDays,
      });
    } catch (error) {
      if (
        error instanceof BlobPreconditionFailedError ||
        (error instanceof Error && /already exists/i.test(error.message))
      )
        throw new Conflict();
      throw error;
    }
  },
  async remove(path) {
    await del(path, { token: token() });
  },
  async *paths(pathPrefix) {
    let cursor: string | undefined;
    do {
      const page = await list({
        prefix: pathPrefix,
        cursor,
        limit: 1000,
        token: token(),
      });
      for (const row of page.blobs) yield row.pathname;
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  },
};
export function service() {
  token();
  return new Waitlist(blobStore, process.env.WAITLIST_DATA_SECRET!);
}
export function clientIp(request: Request) {
  return process.env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
        "unknown"
    : "local";
}
export function sameOrigin(request: Request) {
  const allowed = ["https://themelon.app", "https://www.themelon.app"];
  if (process.env.VERCEL_URL) allowed.push(`https://${process.env.VERCEL_URL}`);
  if (process.env.NODE_ENV !== "production")
    allowed.push(new URL(request.url).origin);
  if (!allowed.includes(request.headers.get("origin") ?? ""))
    throw new WaitlistError(403, "Request not allowed.");
}
export async function body(request: Request): Promise<unknown> {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    throw new WaitlistError(415, "Expected JSON.");
  const reader = request.body?.getReader();
  if (!reader) throw new WaitlistError(400, "Missing request.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  for (;;) {
    const chunk = await reader.read();
    if (chunk.done) break;
    length += chunk.value.length;
    if (length > 8192) {
      await reader.cancel();
      throw new WaitlistError(413, "Request too large.");
    }
    chunks.push(chunk.value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new WaitlistError(400, "Invalid request.");
  }
}
export function failure(error: unknown) {
  const status = error instanceof WaitlistError ? error.status : 503;
  return Response.json(
    {
      error:
        error instanceof WaitlistError
          ? error.message
          : "This service is temporarily unavailable. Please try again later.",
    },
    {
      status,
      headers: {
        ...noCache,
        ...(status === 429 ? { "Retry-After": "900" } : {}),
      },
    },
  );
}
type Session = { expires: number; credentialVersion: string };
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
const credentialVersion = () =>
  hash(
    `${process.env.WAITLIST_ADMIN_EMAIL}:${process.env.WAITLIST_ADMIN_PASSWORD_HASH}`,
  );
export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(cookieName)?.value;
  if (!value || !/^[a-f0-9]{64}$/.test(value)) return false;
  const row = await blobStore.read<Session>(
    `${prefix}sessions/${hash(value)}.json`,
  );
  return (
    !!row &&
    row.value.expires > Date.now() &&
    row.value.credentialVersion === credentialVersion()
  );
}
export async function requireAdmin() {
  if (!(await isAdmin()))
    throw new WaitlistError(401, "Please sign in to continue.");
}
export async function startSession() {
  const value = randomBytes(32).toString("hex");
  await blobStore.write(
    `${prefix}sessions/${hash(value)}.json`,
    { expires: Date.now() + 3600000, credentialVersion: credentialVersion() },
    { ttlDays: 1 },
  );
  (await cookies()).set(cookieName, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600,
  });
}
export async function endSession() {
  const jar = await cookies();
  const value = jar.get(cookieName)?.value;
  if (value && /^[a-f0-9]{64}$/.test(value))
    await blobStore.remove(`${prefix}sessions/${hash(value)}.json`);
  jar.delete(cookieName);
}
