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
      sameAs: ["https://www.instagram.com/themelon.app/", "https://www.tiktok.com/", "https://www.linkedin.com/"],
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
      image: "https://themelon.app/images/scan-flow-cereal.png",
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
        <div className="container-page grid items-center gap-8 py-8 sm:gap-10 sm:py-14 lg:min-h-[calc(86vh-80px)] lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
          <div className="max-w-3xl hero-copy">
            <p className="eyebrow">Scan. Learn. Choose Better.</p>
            <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-8xl">
              Scan a barcode. Understand the label.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 sm:mt-7 sm:text-xl sm:leading-9">
              See the score, ingredients, additives and dietary flags in seconds.
            </p>
            <div className="mt-6 sm:mt-7">
              <StoreButtons />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[30px] bg-melon-50 p-3 shadow-inner sm:rounded-[42px] sm:p-6 lg:p-8">
            <div className="scan-sweep" />
            <Image src="/images/scan-flow-cereal.png" alt="Melon scan flow from barcode to product result" width={1536} height={1024} priority className="h-auto w-full rounded-[28px] shadow-soft" />
          </div>
        </div>
      </section>

      <section aria-labelledby="scan-results-heading" className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <header className="mx-auto max-w-2xl text-center">
            <h2 id="scan-results-heading" className="text-3xl font-bold leading-tight text-ink sm:text-4xl">What Melon shows you.</h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600">Understand the score. See what matters to you.</p>
          </header>
          <div className="mx-auto mt-12 grid max-w-4xl gap-16 sm:mt-16 md:grid-cols-2 md:gap-20">
            {[
              { src: "/images/maltesers-score.png", title: "Understand the score", body: "See how nutrition, additives, and processing shape the result, alongside your dietary flags.", alt: "Melon product result showing a score, dietary flags, and nutrition, additive, and processing breakdown" },
              { src: "/images/maltesers-findings.png", title: "See your options", body: "Read the key concerns and positives, then explore alternatives that may better fit your preferences.", alt: "Melon product findings with concerns, positives, and alternative products" },
            ].map(({ src, title, body, alt }) => (
              <figure key={src} className="min-w-0">
                <Image src={src} alt={alt} width={582} height={992} sizes="(max-width: 768px) 280px, 300px" className="mx-auto h-auto w-full max-w-[280px] sm:max-w-[300px]" />
                <figcaption className="mx-auto mt-8 max-w-sm text-center">
                  <h3 className="text-xl font-bold text-ink">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-zinc-600">{body}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>


      <section className="section-pad bg-fog">
        <div className="container-page">
          <SectionTitle eyebrow="Product comparison" title="See why it scored that way." body="Compare products side by side with the score, ingredients and additives in view." />
          <div className="mt-12 overflow-hidden rounded-[38px] border border-melon-100 bg-white p-3 shadow-soft sm:p-5">
            <Image src="/images/product-alternative-comparison.png" alt="Melon comparison showing a lower-scoring Doritos product and a higher-scoring Siete sea salt chips alternative" width={1536} height={1024} className="h-auto w-full rounded-[30px]" />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-pad bg-ink text-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-melon-300">How it works</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">Scan. Understand. Decide.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["1", "Scan", "Scan the product barcode."],
              ["2", "Understand", "See the score, ingredients and additives."],
              ["3", "Decide", "Check whether it fits your preferences."],
            ].map(([number, title, body]) => (
              <article key={title} className="rounded-[24px] border border-white/12 bg-white/[0.04] p-6">
                <div className="grid size-12 place-items-center rounded-full bg-melon-500 text-lg font-black text-white">{number}</div>
                <h3 className="mt-6 text-2xl font-black text-white">{title}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="personalization" className="section-pad bg-melon-50">
        <div className="container-page">
          <SectionTitle eyebrow="Preferences" title="Set your food preferences once." body="Melon uses your choices to flag products that may not match your diet, allergies or religious food preferences." />
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

      <section className="section-pad bg-fog">
        <div className="container-page">
          <SectionTitle eyebrow="Built for the aisle" title="Less guessing while you shop." body="Melon keeps the product page focused on the score, the label and the preferences that matter at checkout." />
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
          <SectionTitle eyebrow="Frequently Asked Questions" title="Questions before you scan." body="What Melon does, how scoring works and what to do when product data is missing." />
          <FAQAccordion />
        </div>
      </section>
    </main>
  );
}
