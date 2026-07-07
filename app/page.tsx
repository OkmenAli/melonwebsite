import Image from "next/image";
import Link from "next/link";
import { CTA } from "../components/CTA";
import { FeatureCard } from "../components/FeatureCard";
import { PhoneMockup } from "../components/PhoneMockup";
import { SectionTitle } from "../components/SectionTitle";
import { StoreButtons } from "../components/StoreButtons";

const scanItems = [
  "Melon Score",
  "Additive risk levels",
  "Ingredient breakdown",
  "Nutrition highlights",
  "Halal and kosher flags",
  "Vegan and vegetarian flags",
  "Pregnancy considerations",
  "Children and family signals",
];

const onboardingScreens = [
  ["/images/onboarding-shopping-for.png", "Shopping context", "Melon asks who you shop for so product guidance can reflect real household needs."],
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
  "Thousands of products analyzed",
  "Built for smarter grocery shopping",
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
    <article className="overflow-hidden rounded-card border border-melon-100 bg-white shadow-card">
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
      <section id="app" className="relative bg-white">
        <div className="container-page grid min-h-[calc(100vh-80px)] items-center gap-10 py-10 sm:gap-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">Food label scanner</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-ink sm:text-7xl lg:text-8xl">
              Know what&apos;s in your food.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-zinc-600">
              Melon scans food labels, explains ingredients, flags additives, and helps you choose better products for your lifestyle.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="#download" className="inline-flex min-h-14 items-center justify-center rounded-full bg-melon-600 px-8 text-base font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-melon-700">
                Download the app
              </Link>
              <Link href="#features" className="inline-flex min-h-14 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-base font-black text-ink shadow-[0_6px_22px_rgba(17,27,21,0.06)] transition hover:-translate-y-0.5 hover:border-melon-200">
                Learn how it works
              </Link>
            </div>
            <div className="mt-9 hidden sm:block">
              <StoreButtons />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[36px] bg-melon-50 p-3 shadow-inner sm:rounded-[42px] sm:p-6 lg:p-8">
            <Image src="/images/scan-flow-hands.png" alt="Melon scan flow from barcode to product result" width={1536} height={1024} priority className="h-auto w-full rounded-[28px] shadow-soft" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-fog">
        <div className="container-page">
          <SectionTitle eyebrow="Onboarding" title="Melon learns how you shop before it scores." body="The setup flow captures household needs, dietary preferences, religious food preferences, and allergy concerns so label guidance feels personal from the first scan." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {onboardingScreens.map(([src, title, body]) => (
              <ProductScreenshotCard key={src} src={src} title={title} body={body} />
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section-pad bg-white">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <SectionTitle align="left" eyebrow="Food scanning" title="Scan. Learn. Choose Better." body="Scan a barcode and instantly turn a confusing label into an organized product page with the signals that matter most." />
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {scanItems.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-melon-100 bg-melon-50 px-4 py-4 text-sm font-black text-ink">
                  <span className="grid size-7 place-items-center rounded-full bg-melon-600 text-xs text-white">OK</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid place-items-center rounded-[42px] bg-zinc-50 px-5 py-12 shadow-inner">
            <PhoneMockup image="/images/maltesers-score.png" tilt="right" label="Melon product score screen for Maltesers" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-fog">
        <div className="container-page">
          <SectionTitle eyebrow="How Melon helps" title="Scan once. Understand everything." body="Melon connects product scores, additive explanations, personal considerations, and sources into one practical grocery workflow." />
          <div className="mt-12 overflow-hidden rounded-[36px] border border-melon-100 bg-ink p-2 shadow-soft sm:p-4">
            <Image src="/images/how-melon-helps.png" alt="Three Melon screens explaining scan, additive detail, and personalized guidance" width={1536} height={1024} className="h-auto w-full rounded-[28px]" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-melon-50">
        <div className="container-page">
          <SectionTitle eyebrow="Better alternatives" title="When a product falls short, Melon shows what to check next." body="See why a product is flagged, review nutrition and additives, and move toward better choices for your preferences." />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <ProductScreenshotCard src="/images/maltesers-score.png" title="Instant score" body="Melon summarizes product fit, dietary conflicts, and the main reason a product is not recommended." />
            <ProductScreenshotCard src="/images/maltesers-details.png" title="Ingredient clarity" body="Nutrition, additive risk, and ingredient lists are organized so users can inspect the label quickly." />
            <ProductScreenshotCard src="/images/maltesers-findings.png" title="Better choices" body="Key findings and alternative products help shoppers understand the next best option." />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionTitle eyebrow="Personalized insights" title="Food clarity, made personal." body="Melon adapts label guidance to the people you shop for and the preferences you actually care about." />
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
          <SectionTitle eyebrow="Community" title="Built for smarter grocery shopping." body="Melon is for people who want food decisions to feel less confusing, whether they are shopping for themselves, their families, or a specific lifestyle." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat} className="rounded-card border border-zinc-200 bg-white p-8 text-center shadow-card">
                <p className="text-2xl font-black tracking-tight text-ink">{stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}

