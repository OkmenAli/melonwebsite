import { z } from "zod";
export const categories = [
  "farms",
  "ranches",
  "food brands",
  "health products",
  "small business",
] as const;
export const consentText =
  "I agree to receive emails from Melon about Marketplace updates. I can unsubscribe at any time.";
export const consentVersion = "2026-11-12";
const common = {
  email: z.string().trim().toLowerCase().max(254).email(),
  country: z.enum(["US", "Canada"]),
  consent: z.literal(true),
  website: z.string().max(0),
  challenge: z.string().min(1).max(512),
};
export const signupSchema = z.discriminatedUnion("role", [
  z.object({ ...common, role: z.literal("buyer") }),
  z.object({
    ...common,
    role: z.literal("seller"),
    businessName: z
      .string()
      .trim()
      .min(1)
      .max(160)
      .regex(/^[^\x00-\x1f\x7f]*$/),
    category: z.enum(categories),
    businessLink: z
      .string()
      .trim()
      .max(500)
      .refine((value) => {
        if (!value || /^@[a-zA-Z0-9._]{1,30}$/.test(value)) return true;
        try {
          const url = new URL(value);
          return (
            ["http:", "https:"].includes(url.protocol) &&
            !url.username &&
            !url.password
          );
        } catch {
          return false;
        }
      }, "Enter a full website URL or an @Instagram handle."),
  }),
]);
export type Signup = z.infer<typeof signupSchema>;
export type Registration = {
  id: string;
  role: "buyer" | "seller";
  email: string;
  country: "US" | "Canada";
  businessName: string;
  category: string;
  businessLink: string;
  signupAt: string;
  consentAt: string;
  consentText: string;
  consentVersion: string;
  unsubscribedAt: string | null;
};
export function csv(records: Registration[]) {
  const fields: (keyof Registration)[] = [
    "role",
    "email",
    "country",
    "businessName",
    "category",
    "businessLink",
    "signupAt",
    "consentAt",
    "consentVersion",
    "consentText",
    "unsubscribedAt",
  ];
  const escape = (value: unknown) => {
    let s = String(value ?? "");
    if (/^\s*[=+@-]|^[\t\r\n]/.test(s)) s = "'" + s;
    return '"' + s.replaceAll('"', '""') + '"';
  };
  return (
    "\uFEFF" +
    [
      fields.join(","),
      ...records.map((row) => fields.map((key) => escape(row[key])).join(",")),
    ].join("\r\n")
  );
}
