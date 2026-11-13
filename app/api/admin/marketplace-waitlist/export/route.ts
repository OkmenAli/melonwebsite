import { filtered } from "../../../../../lib/waitlist/filter";
import { csv } from "../../../../../lib/waitlist/model";
import {
  failure,
  noCache,
  requireAdmin,
  service,
} from "../../../../../lib/waitlist/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { rows } = filtered(await service().records(), request.url);
    return new Response(csv(rows), {
      headers: {
        ...noCache,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition":
          'attachment; filename="melon-marketplace-waitlist.csv"',
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return failure(error);
  }
}
