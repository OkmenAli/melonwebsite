import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import {
  consentText,
  consentVersion,
  type Registration,
  type Signup,
} from "./model";
export class Conflict extends Error {}
export class WaitlistError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export interface PrivateStore {
  read<T>(path: string): Promise<{ value: T; etag: string } | null>;
  write(
    path: string,
    value: unknown,
    options?: { etag?: string; ttlDays?: number },
  ): Promise<void>;
  remove(path: string): Promise<void>;
  paths(prefix: string): AsyncIterable<string>;
}
export const prefix = "marketplace-waitlist/v1/";
export function digest(secret: string, value: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}
export function sign(secret: string, value: string) {
  return `${value}.${digest(secret, value)}`;
}
export function verify(secret: string, token: string) {
  const index = token.lastIndexOf(".");
  const value = token.slice(0, index),
    signature = token.slice(index + 1);
  if (index < 1 || !/^[a-f0-9]{64}$/.test(signature)) return null;
  return timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(digest(secret, value), "hex"),
  )
    ? value
    : null;
}
export function passwordMatches(password: string, encoded: string) {
  if (!/^[a-f0-9]{32}:[a-f0-9]{128}$/.test(encoded)) return false;
  const [salt, hash] = encoded.split(":");
  return timingSafeEqual(
    scryptSync(password, salt, 64),
    Buffer.from(hash, "hex"),
  );
}
export class Waitlist {
  constructor(
    private store: PrivateStore,
    private secret: string,
    private now = Date.now,
  ) {}
  async limit(subject: string, max: number, windowMs = 900000) {
    const key = `${prefix}rate/${Math.floor(this.now() / windowMs)}/${digest(this.secret, subject)}.json`;
    for (let i = 0; i < 8; i++) {
      const old = await this.store.read<{ count: number }>(key);
      if ((old?.value.count ?? 0) >= max)
        throw new WaitlistError(
          429,
          "Too many attempts. Please try again in 15 minutes.",
        );
      try {
        await this.store.write(
          key,
          { count: (old?.value.count ?? 0) + 1 },
          { etag: old?.etag, ttlDays: 1 },
        );
        return;
      } catch (error) {
        if (!(error instanceof Conflict)) throw error;
      }
    }
    throw new WaitlistError(429, "Please wait a moment before trying again.");
  }
  challenge(ip: string) {
    return sign(
      this.secret,
      `${this.now()}:${randomBytes(16).toString("hex")}:${digest(this.secret, ip)}`,
    );
  }
  async register(input: Signup, ip: string) {
    const payload = verify(this.secret, input.challenge);
    const [time, nonce, owner] = payload?.split(":") ?? [];
    const age = this.now() - Number(time);
    if (
      !payload ||
      !/^[a-f0-9]{32}$/.test(nonce ?? "") ||
      owner !== digest(this.secret, ip) ||
      age < 2000 ||
      age > 3600000
    )
      throw new WaitlistError(400, "Please refresh the form and try again.");
    await this.limit(`signup:${ip}`, 5);
    try {
      await this.store.write(
        `${prefix}challenges/${nonce}.json`,
        { used: true },
        { ttlDays: 1 },
      );
    } catch (error) {
      if (error instanceof Conflict)
        throw new WaitlistError(
          400,
          "This form has already been submitted. Please refresh it.",
        );
      throw error;
    }
    const id = digest(this.secret, `${input.role}:${input.email}`);
    const timestamp = new Date(this.now()).toISOString();
    const record: Registration = {
      id,
      role: input.role,
      email: input.email,
      country: input.country,
      businessName: input.role === "seller" ? input.businessName : "",
      category: input.role === "seller" ? input.category : "",
      businessLink: input.role === "seller" ? input.businessLink : "",
      signupAt: timestamp,
      consentAt: timestamp,
      consentText,
      consentVersion,
      unsubscribedAt: null,
    };
    try {
      await this.store.write(`${prefix}registrations/${id}.json`, record);
    } catch (error) {
      if (error instanceof Conflict)
        throw new WaitlistError(
          409,
          "This email is already on this waitlist. Your existing contact preferences have not been changed.",
        );
      throw error;
    }
    return { unsubscribeToken: sign(this.secret, `unsubscribe:${id}`) };
  }
  async unsubscribe(token: string) {
    const payload = verify(this.secret, token);
    if (!payload || !/^unsubscribe:[a-f0-9]{64}$/.test(payload))
      throw new WaitlistError(400, "This unsubscribe link is invalid.");
    const path = `${prefix}registrations/${payload.slice(12)}.json`;
    for (let i = 0; i < 8; i++) {
      const row = await this.store.read<Registration>(path);
      if (!row) throw new WaitlistError(404, "Registration not found.");
      if (row.value.unsubscribedAt) return;
      try {
        await this.store.write(
          path,
          { ...row.value, unsubscribedAt: new Date(this.now()).toISOString() },
          { etag: row.etag },
        );
        return;
      } catch (error) {
        if (!(error instanceof Conflict)) throw error;
      }
    }
    throw new WaitlistError(503, "Please try again shortly.");
  }
  async records() {
    const paths: string[] = [];
    for await (const path of this.store.paths(`${prefix}registrations/`)) {
      paths.push(path);
      if (paths.length > 10000)
        throw new WaitlistError(
          503,
          "The waitlist exceeds the dashboard limit. Contact support for a full export.",
        );
    }
    const records: Registration[] = [];
    for (let i = 0; i < paths.length; i += 10) {
      const rows = await Promise.all(
        paths
          .slice(i, i + 10)
          .map((path) => this.store.read<Registration>(path)),
      );
      rows.forEach((row) => {
        if (row) records.push(row.value);
      });
    }
    return records.sort((a, b) => b.signupAt.localeCompare(a.signupAt));
  }
}
