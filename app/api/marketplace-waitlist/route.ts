import { signupSchema } from "../../../lib/waitlist/model";
import {
  body,
  clientIp,
  failure,
  noCache,
  sameOrigin,
  service,
} from "../../../lib/waitlist/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const api = service();
    const ip = clientIp(request);
    await api.limit(`form:${ip}`, 30);
    return Response.json(
      { challenge: api.challenge(ip) },
      { headers: noCache },
    );
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const parsed = signupSchema.safeParse(await body(request));
    if (!parsed.success)
      return Response.json(
        {
          error:
            "Please check the form. All required fields and consent must be completed.",
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 422, headers: noCache },
      );
    const result = await service().register(parsed.data, clientIp(request));
    return Response.json(
      {
        message:
          "You're on the list! We'll let you know when Melon Marketplace launches.",
        ...result,
      },
      { status: 201, headers: noCache },
    );
  } catch (error) {
    return failure(error);
  }
}
