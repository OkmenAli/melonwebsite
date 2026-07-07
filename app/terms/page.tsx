import type { Metadata } from "next";
import { termsParagraphs } from "./content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Melon Terms and Conditions for the Melon mobile application and related services.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "https://themelon.app/terms", title: "Melon Terms of Use" },
};

function getParagraphRole(paragraph: string) {
  if (/^\d+\.\s/.test(paragraph) || paragraph === "Agreement to These Terms") return "heading";
  if (
    [
      "Auto-renewal",
      "Free trial",
      "Cancellation and refunds",
      "Price changes",
      "Feedback",
      "License you grant",
      "Your responsibilities",
      "Reviews and local business listings",
      "Moderation",
      "Apple and Google terms",
      "Consumer rights preserved.",
      "Exceptions.",
      "Informal resolution",
      "Users in Canada",
      "Users in the United States",
      "30-day opt-out.",
    ].includes(paragraph)
  ) {
    return "subheading";
  }
  return "body";
}

export default function TermsPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <span className="eyebrow">Legal</span>
        <h1>Terms of Use</h1>
        <p>Melon, a consumer mobile application operated by AnyHope Corp.</p>
        <div className="legal-meta">
          <span>Effective Date: June 30, 2026</span>
          <span>Last Updated: June 30, 2026</span>
          <span>Version 1.0</span>
        </div>
      </header>

      <section className="legal-section">
        {termsParagraphs.map((paragraph) => {
          const role = getParagraphRole(paragraph);
          if (role === "heading") return <h2 key={paragraph}>{paragraph}</h2>;
          if (role === "subheading") return <h3 key={paragraph}>{paragraph}</h3>;
          return <p key={paragraph}>{paragraph}</p>;
        })}
      </section>
    </main>
  );
}

