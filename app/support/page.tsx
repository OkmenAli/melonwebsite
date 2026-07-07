import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
  description: "Contact Melon support for account questions, privacy requests, subscriptions, product data concerns, and local source listings.",
  alternates: { canonical: "/support" },
  openGraph: {
    type: "website",
    url: "https://themelon.app/support",
    title: "Melon Support",
    description: "Get help with Melon account questions, privacy requests, subscriptions, product data, and local source listings.",
    siteName: "Melon",
  },
};

export default function SupportPage() {
  return (
    <main className="support-page">
      <span className="eyebrow">Support</span>
      <h1>How can we help?</h1>
      <p className="support-lead">
        For account questions, privacy requests, subscription help, product data concerns, or local source listing issues,
        contact Melon at <a className="font-black text-melon-600" href="mailto:support@themelon.app">support@themelon.app</a>.
      </p>

      <div className="contact-grid">
        <article className="contact-card">
          <h3>Email support</h3>
          <p>
            <a href="mailto:support@themelon.app">support@themelon.app</a>
          </p>
        </article>
        <article className="contact-card">
          <h3>Product data concerns</h3>
          <p>
            Send the product name, barcode or business name, screenshots if available, and a short description of the issue.
          </p>
        </article>
        <article className="contact-card">
          <h3>Privacy requests</h3>
          <p>
            Review the <Link href="/privacy">Privacy Policy</Link> for rights and request handling details.
          </p>
        </article>
        <article className="contact-card">
          <h3>Legal</h3>
          <p>
            Review the <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.
          </p>
        </article>
      </div>
    </main>
  );
}
