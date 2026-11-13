import { filtered } from "../../../../lib/waitlist/filter";
import {
  failure,
  noCache,
  requireAdmin,
  service,
} from "../../../../lib/waitlist/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
export async function GET(request: Request) {
  try {
    await requireAdmin();
    const records = await service().records();
    const { rows, page } = filtered(records, request.url);
    return Response.json(
      {
        records: rows.slice((page - 1) * 50, page * 50),
        total: rows.length,
        page,
        totals: {
          all: records.length,
          buyer: records.filter((r) => r.role === "buyer").length,
          seller: records.filter((r) => r.role === "seller").length,
        },
      },
      { headers: noCache },
    );
  } catch (error) {
    return failure(error);
  }
}
