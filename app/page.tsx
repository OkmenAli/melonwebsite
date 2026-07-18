import Image from "next/image";
import { FAQAccordion } from "../components/FAQAccordion";
import { FeatureCard } from "../components/FeatureCard";
import { SectionTitle } from "../components/SectionTitle";
import { StoreButtons } from "../components/StoreButtons";

const onboardingScreens = [
  ["/images/onboarding-shopping-for.png", "Household context", "Melon learns whether you shop for yourself, children, pregnancy, or family needs."],
  ["/images/onboarding-dietary.png", "Dietary preference", "Lifestyle preferences help Melon highlight foods that may not match the way you eat."],
  ["/images/onboarding-religious.png", "Religious food preference", "Halal and kosher filters surface conflicts and uncertainty when product data allows."],
  ["/images/onboarding-allergies.png", "Allergy watchlist", "Allergen choices make important label signals easier to spot on every product page."],
];

const insightCards = [
  ["Allergies", "Bring allergen concerns into every label scan."],
  ["Dietary preferences", "See vegan, vegetarian, seed oil, and nutrition context quickly."],
  ["Religious preferences", "Flag halal, kosher, and uncertain ingredient signals when data allows."],
  ["Shopping for kids", "Spot products that deserve a closer look for family shopping."],
  ["Pregnancy considerations", "Surface ingredients and additives worth reviewing carefully."],
  ["Seed oil concerns", "Call out common seed oils when they appear in ingredient lists."],
];

const localItems = ["Local farms", "Butchers", "Halal markets", "Kosher markets", "Farmers markets", "Honey", "Eggs", "Milk", "Seed-oil-free restaurants"];

const stats = [
  "Food labels translated into plain language",
  "Scores weighted across nutrition, additives, and processing",
  "Designed for families, students, and health-conscious shoppers",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://themelon.app/#organization",
      name: "Melon",
      legalName: "AnyHope Corp.",
      url: "https://themelon.app",
      logo: "https://themelon.app/images/melon-wordmark.png",
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@themelon.app",
        contactType: "customer support",
        availableLanguage: "en",
      },
      sameAs: ["https://www.instagram.com/", "https://www.tiktok.com/", "https://www.linkedin.com/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://themelon.app/#website",
      url: "https://themelon.app",
      name: "Melon",
      publisher: { "@id": "https://themelon.app/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://themelon.app/#app",
      name: "Melon",
      applicationCategory: "HealthApplication",
      operatingSystem: "iOS, Android",
      url: "https://themelon.app",
      image: "https://themelon.app/images/scan-flow-hands.png",
      description:
        "Melon scans food labels, explains ingredients, flags additives, and helps shoppers choose better products for their lifestyle.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": "https://themelon.app/#organization" },
    },
  ],
};

function ProductScreenshotCard({ src, title, body }: { src: string; title: string; body: string }) {
  return (
    <article className="overflow-hidden rounded-card border border-melon-100 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="bg-fog p-5">
        <Image src={src} alt={title} width={640} height={960} className="mx-auto h-auto max-h-[520px] w-auto rounded-[28px] shadow-soft" />
      </div>
      <div className="p-7">
        <h3 className="text-2xl font-black tracking-tight text-ink">{title}</h3>
        <p className="mt-3 text-base leading-7 text-zinc-600">{body}</p>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="relative bg-white">
        <div className="container-page grid min-h-[calc(88vh-80px)] items-center gap-12 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
          <div className="max-w-3xl hero-copy">
            <p className="eyebrow">Food transparency</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-ink sm:text-7xl lg:text-8xl">
              Know what&apos;s in your food.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-zinc-600">
              Melon turns labels into clear scores, ingredient explanations, additive flags, and personal guidance for healthier grocery choices.
            </p>
            <div className="mt-9 rounded-[28px] border border-melon-100 bg-white/85 p-5 shadow-card backdrop-blur">
              <p className="max-w-xl text-base font-bold leading-7 text-zinc-700">
                Melon is a food label scanner for iOS and Android that scores products, explains ingredients, and surfaces dietary flags before you buy.
              </p>
              <div className="mt-5">
                <StoreButtons />
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[36px] bg-melon-50 p-3 shadow-inner sm:rounded-[42px] sm:p-6 lg:p-8">
            <div className="scan-sweep" />
            <Image src="/images/scan-flow-hands.png" alt="Melon scan flow from barcode to product result" width={1536} height={1024} priority className="h-auto w-full rounded-[28px] shadow-soft" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionTitle align="left" eyebrow="Ingredient clarity" title="Melon explains the label, not just the number." body="Scores are supported by ingredient breakdowns, additive summaries, nutrition highlights, and better-choice suggestions so shoppers can make a decision with context." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Nutrition", "See which nutrients are helping or hurting the score."],
                ["Additives", "Review additive risk levels and plain-language explanations."],
                ["Processing", "Understand ultra-processed signals and ingredient complexity."],
                ["Alternatives", "Compare better choices when a product falls short."],
              ].map(([title, body]) => (
                <FeatureCard key={title} title={title} body={body} />
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <ProductScreenshotCard src="/images/maltesers-score.png" title="Instant score" body="Melon summarizes product fit, dietary conflicts, and the main reason a product is not recommended." />
            <ProductScreenshotCard src="/images/maltesers-findings.png" title="Better choices" body="Key findings and alternative products help shoppers understand the next best option." />
          </div>
        </div>
      </section>


      <section className="section-pad bg-fog">
        <div className="container-page">
          <SectionTitle eyebrow="Better alternatives" title="When one product falls short, Melon helps you compare the next choice." body="Melon connects score breakdowns with ingredient context so shoppers can see why one product may be worth limiting and another may be a better fit." />
          <div className="mt-12 overflow-hidden rounded-[38px] border border-melon-100 bg-white p-3 shadow-soft sm:p-5">
            <Image src="/images/product-alternative-comparison.png" alt="Melon comparison showing a lower-scoring Doritos product and a higher-scoring Siete sea salt chips alternative" width={1536} height={1024} className="h-auto w-full rounded-[30px]" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-ink text-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-melon-300">How Melon helps</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">Scan once. Understand everything.</h2>
            <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl">Melon moves from product scan to additive explanation to personalized guidance, with sources and compatibility flags close at hand.</p>
          </div>
          <div className="mt-12 overflow-hidden rounded-[38px] border border-white/10 bg-black p-3 shadow-soft sm:p-5">
            <Image src="/images/how-melon-helps-flow.png" alt="Three Melon screens showing product scan, additive explanation, and personalized guidance" width={1536} height={1024} className="h-auto w-full rounded-[30px]" />
          </div>
        </div>
      </section>
      <section id="personalization" className="section-pad bg-melon-50">
        <div className="container-page">
          <SectionTitle eyebrow="Personal setup" title="Food clarity, made personal." body="Melon adapts label guidance to the people you shop for and the preferences you actually care about." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {onboardingScreens.map(([src, title, body]) => (
              <ProductScreenshotCard key={src} src={src} title={title} body={body} />
            ))}
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {insightCards.map(([title, body]) => (
              <FeatureCard key={title} title={title} body={body} />
            ))}
          </div>
        </div>
      </section>

      <section id="local-sources" className="section-pad bg-ink text-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-melon-300">Local Sources</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">Discover healthier local options.</h2>
            <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl">Melon helps users filter nearby farms, butchers, halal markets, kosher markets, farmers markets, honey, eggs, milk, and seed-oil-free restaurants.</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {localItems.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/7 px-4 py-3 text-sm font-black text-white">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[36px] bg-white p-3 shadow-soft">
              <Image src="/images/local-filters.png" alt="Melon Local Sources filters" width={1182} height={1006} className="h-auto w-full rounded-[28px]" />
            </div>
            <div className="rounded-[36px] bg-white p-3 shadow-soft">
              <Image src="/images/local-map.png" alt="Melon Local Sources map results" width={946} height={2048} className="mx-auto h-auto max-h-[900px] w-auto rounded-[28px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-fog">
        <div className="container-page">
          <SectionTitle eyebrow="Trust by design" title="Built for smarter grocery shopping." body="Melon is for people who want food decisions to feel less confusing, whether they are shopping for themselves, their families, or a specific lifestyle." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat} className="rounded-card border border-zinc-200 bg-white p-8 text-center shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <p className="text-2xl font-black tracking-tight text-ink">{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section-pad bg-white">
        <div className="container-page">
          <SectionTitle eyebrow="Frequently Asked Questions" title="Questions shoppers ask before they scan." body="A quick guide to what Melon does, how the score works, and how to think about product guidance." />
          <FAQAccordion />
        </div>
      </section>
    </main>
  );
}
