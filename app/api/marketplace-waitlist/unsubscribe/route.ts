import { z } from "zod";
import { WaitlistError } from "../../../../lib/waitlist/core";
import {
  body,
  clientIp,
  failure,
  noCache,
  sameOrigin,
  service,
} from "../../../../lib/waitlist/server";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const parsed = z
      .object({ token: z.string().max(200) })
      .safeParse(await body(request));
    if (!parsed.success) throw new WaitlistError(400, "Invalid link.");
    const api = service();
    await api.limit(`unsubscribe:${clientIp(request)}`, 20);
    await api.unsubscribe(parsed.data.token);
    return Response.json(
      { message: "You have been unsubscribed from Marketplace updates." },
      { headers: noCache },
    );
  } catch (error) {
    return failure(error);
  }
}
