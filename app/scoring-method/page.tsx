import Image from "next/image";
import type { Metadata } from "next";

const formulaCards = [
  {
    title: "Nutrition",
    points: "50",
    tone: "bg-melon-500 text-white",
    body: "Melon looks at the nutrition facts in context: sugar, sodium, saturated fat, calories, fiber, protein and the type of product being scanned.",
  },
  {
    title: "Additives",
    points: "30",
    tone: "bg-amber-500 text-white",
    body: "Additives are grouped by concern level so you can quickly see which ingredients deserve a closer look.",
  },
  {
    title: "Processing",
    points: "20",
    tone: "bg-zinc-950 text-white",
    body: "Processing considers ingredient simplicity, NOVA context and signals that separate simpler foods from heavily processed products.",
  },
];

const nutritionSignals = ["Sugar", "Sodium", "Saturated fat", "Calories", "Fiber", "Protein", "Product category"];
const additiveSignals = ["Low risk", "Caution", "Avoid", "Number of flagged additives", "Reason each additive is shown"];
const processingSignals = ["NOVA context", "Ingredient count", "Artificial flavor or color", "Emulsifiers and gums", "Ingredient simplicity"];
const scoreBands = [
  ["85-100", "Excellent"],
  ["65-84", "Good"],
  ["45-64", "Moderate"],
  ["0-44", "Avoid often"],
];

export const metadata: Metadata = {
  title: "Melon Scoring Method",
  description:
    "Learn how Melon calculates product scores using nutrition, additives and processing.",
  alternates: { canonical: "/scoring-method" },
  openGraph: {
    type: "website",
    url: "https://themelon.app/scoring-method",
    title: "Melon Scoring Method | Melon",
    description: "How Melon scores food products across nutrition, additives and processing.",
    siteName: "Melon",
    images: [
      {
        url: "/images/scoring-method-system.png",
        width: 1536,
        height: 1024,
        alt: "Melon Score method showing nutrition, additives and processing weights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melon Scoring Method | Melon",
    description: "How Melon scores food products across nutrition, additives and processing.",
    images: ["/images/scoring-method-system.png"],
  },
  robots: { index: true, follow: true },
};

function SignalList({ title, items }: Readonly<{ title: string; items: string[] }>) {
  return (
    <article className="rounded-[24px] border border-zinc-200 bg-white p-6">
      <h3 className="text-xl font-black tracking-tight text-ink">{title}</h3>
      <ul className="mt-5 grid gap-3 text-sm font-bold text-zinc-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 size-2 shrink-0 rounded-full bg-melon-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ScoringMethodPage() {
  return (
    <main className="bg-fog text-ink">
      <section className="bg-ink text-white">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-melon-300">Melon Score</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Nutrition. Additives. Processing.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Melon scores food out of 100 points. The score is built from three parts: nutrition, additives and processing.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/12 bg-white/8 p-3 backdrop-blur sm:p-4">
            <Image
              src="/images/scoring-method-system.png"
              alt="Melon Score graphic explaining the score and its nutrition, additives and processing weighting"
              width={1536}
              height={1024}
              priority
              className="h-auto w-full rounded-[20px]"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">100 points</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              How the score is built.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              The score is not meant to replace your judgment. It gives you a quick read on what is helping or hurting a product.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {formulaCards.map((card) => (
              <article key={card.title} className="rounded-[24px] border border-zinc-200 bg-fog p-6">
                <div className={`${card.tone} grid size-16 place-items-center rounded-2xl text-2xl font-black`}>
                  {card.points}
                </div>
                <h3 className="mt-6 text-2xl font-black tracking-tight text-ink">{card.title}</h3>
                <p className="mt-3 text-base leading-7 text-zinc-600">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-fog">
        <div className="container-page grid gap-6 lg:grid-cols-3">
          <SignalList title="Nutrition checks" items={nutritionSignals} />
          <SignalList title="Additive checks" items={additiveSignals} />
          <SignalList title="Processing checks" items={processingSignals} />
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow">Reading the score</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              The number is the start, not the whole answer.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Melon shows the score with the reasons behind it, so you can see whether the concern is nutrition, additives or processing.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {scoreBands.map(([range, label]) => (
              <div key={range} className="rounded-[20px] border border-zinc-200 bg-fog p-5">
                <p className="text-sm font-black text-melon-700">{range}</p>
                <p className="mt-2 text-2xl font-black text-ink">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}