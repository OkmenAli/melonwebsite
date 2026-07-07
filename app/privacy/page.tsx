import type { Metadata } from "next";
import { privacyParagraphs } from "./content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Melon Privacy Policy for the Melon mobile application and related services.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "https://themelon.app/privacy", title: "Melon Privacy Policy" },
};

function getParagraphRole(paragraph: string) {
  if (/^\d+\.\s/.test(paragraph) || paragraph === "Summary of Key Points") return "heading";
  if (/^\d+\.\d\s/.test(paragraph)) return "subheading";
  return "body";
}

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <span className="eyebrow">Legal</span>
        <h1>Privacy Policy</h1>
        <p>Melon, a consumer mobile application operated by AnyHope Corp.</p>
        <div className="legal-meta">
          <span>Effective Date: June 30, 2026</span>
          <span>Last Updated: June 30, 2026</span>
          <span>Version 1.0</span>
        </div>
      </header>

      <section className="legal-section">
        {privacyParagraphs.map((paragraph) => {
          const role = getParagraphRole(paragraph);
          if (role === "heading") return <h2 key={paragraph}>{paragraph}</h2>;
          if (role === "subheading") return <h3 key={paragraph}>{paragraph}</h3>;
          return <p key={paragraph}>{paragraph}</p>;
        })}
      </section>
    </main>
  );
}

