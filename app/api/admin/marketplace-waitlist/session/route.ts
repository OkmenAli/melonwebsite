import { z } from "zod";
import {
  WaitlistError,
  passwordMatches,
} from "../../../../../lib/waitlist/core";
import {
  adminConfigured,
  body,
  clientIp,
  endSession,
  failure,
  noCache,
  sameOrigin,
  service,
  startSession,
} from "../../../../../lib/waitlist/server";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    if (!adminConfigured())
      throw new WaitlistError(503, "Admin access has not been configured yet.");
    const api = service();
    await api.limit(`login:${clientIp(request)}`, 5);
    await api.limit("login:global", 50);
    const parsed = z
      .object({
        email: z.string().max(254),
        password: z.string().min(1).max(256),
      })
      .safeParse(await body(request));
    if (!parsed.success)
      throw new WaitlistError(401, "Email or password is incorrect.");
    const passwordValid = passwordMatches(
      parsed.data.password,
      process.env.WAITLIST_ADMIN_PASSWORD_HASH!,
    );
    if (
      !passwordValid ||
      parsed.data.email.trim().toLowerCase() !==
        process.env.WAITLIST_ADMIN_EMAIL!.trim().toLowerCase()
    )
      throw new WaitlistError(401, "Email or password is incorrect.");
    await startSession();
    return Response.json({ ok: true }, { headers: noCache });
  } catch (error) {
    return failure(error);
  }
}
export async function DELETE(request: Request) {
  try {
    sameOrigin(request);
    await endSession();
    return Response.json({ ok: true }, { headers: noCache });
  } catch (error) {
    return failure(error);
  }
}
