import type { Metadata } from "next";
import Link from "next/link";

const description =
  "Read evidence-aware Melon articles about food additives, food processing, ingredient labels, and healthier grocery decisions.";

const articles = [
  {
    title: "Mono- and Diglycerides: What E471 Means on Food Labels",
    href: "/insights/mono-and-diglycerides-e471",
    category: "Food additives",
    readTime: "6 min read",
    description:
      "What this common emulsifier does, why it appears in packaged foods, and what current research can and cannot tell us.",
    sources: [
      "U.S. Electronic Code of Federal Regulations",
      "European Food Safety Authority",
      "FAO/JECFA",
      "BMJ",
      "PLOS Medicine",
    ],
  },
  {
    title: "Why Ultra-Processed Foods Can Be Easy to Overeat",
    href: "/insights/ultra-processed-foods-overeating",
    category: "Food processing",
    readTime: "7 min read",
    description:
      "A closer look at the NIH controlled diet study and what it suggests about calories, eating speed, and food formulation.",
    sources: ["Cell Metabolism", "National Library of Medicine", "NIH", "NIDDK"],
  },
];

export const metadata: Metadata = {
  title: "Melon Insights",
  description,
  keywords: [
    "Melon insights",
    "food additive articles",
    "food processing articles",
    "ingredient label research",
    "food scanner app",
    "healthy grocery shopping",
  ],
  alternates: { canonical: "/insights" },
  openGraph: {
    type: "website",
    url: "https://themelon.app/insights",
    title: "Melon Insights | Melon",
    description,
    siteName: "Melon",
    images: [
      {
        url: "/images/scan-flow-hands.png",
        width: 1536,
        height: 1024,
        alt: "Melon app scanning a food label and showing product insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melon Insights | Melon",
    description,
    images: ["/images/scan-flow-hands.png"],
  },
  robots: { index: true, follow: true },
};

export default function InsightsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Melon Insights",
    description,
    url: "https://themelon.app/insights",
    hasPart: articles.map((article) => ({
      "@type": "Article",
      headline: article.title,
      url: `https://themelon.app${article.href}`,
      about: article.category,
      citation: article.sources,
    })),
  };

  return (
    <main className="bg-fog text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <section className="bg-ink text-white">
        <div className="container-page py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-melon-300">Melon Insights</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl">
              Clear notes on ingredients, additives, and food labels.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/72 sm:text-xl">
              Evidence-aware articles written to help you understand what appears on food labels without turning every ingredient into a scare story.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-fog">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="group flex h-full flex-col rounded-[28px] border border-zinc-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-melon-200 hover:shadow-[0_28px_70px_rgba(17,27,21,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-500 sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.16em]">
                  <span className="rounded-full bg-melon-50 px-3 py-2 text-melon-700">{article.category}</span>
                  <span className="text-zinc-400">{article.readTime}</span>
                </div>
                <h2 className="mt-6 text-3xl font-black tracking-tight text-ink transition group-hover:text-melon-800 sm:text-4xl">
                  {article.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-zinc-600">{article.description}</p>
                <div className="mt-8 border-t border-zinc-200 pt-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">Sources cited</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {article.sources.map((source) => (
                      <span key={source} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-bold text-zinc-700">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="mt-8 inline-flex text-sm font-black text-melon-700 transition group-hover:translate-x-1">
                  Read full article
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
