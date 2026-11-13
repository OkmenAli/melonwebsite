import { z } from "zod";
import { categories, type Registration } from "./model";
import { WaitlistError } from "./core";
const schema = z.object({
  role: z.enum(["all", "buyer", "seller"]).default("all"),
  country: z.enum(["all", "US", "Canada"]).default("all"),
  category: z.enum(["all", ...categories]).default("all"),
  status: z.enum(["all", "subscribed", "unsubscribed"]).default("all"),
  q: z.string().trim().max(160).default(""),
  page: z.coerce.number().int().min(1).max(10000).default(1),
});
export function filtered(records: Registration[], url: string) {
  const result = schema.safeParse(
    Object.fromEntries(new URL(url).searchParams),
  );
  if (!result.success) throw new WaitlistError(400, "Invalid filters.");
  const f = result.data,
    q = f.q.toLowerCase();
  const rows = records.filter(
    (r) =>
      (f.role === "all" || r.role === f.role) &&
      (f.country === "all" || r.country === f.country) &&
      (f.category === "all" || r.category === f.category) &&
      (f.status === "all" ||
        (f.status === "unsubscribed") === !!r.unsubscribedAt) &&
      (!q ||
        [r.email, r.businessName, r.businessLink].some((v) =>
          v.toLowerCase().includes(q),
        )),
  );
  return { rows, page: f.page };
}
