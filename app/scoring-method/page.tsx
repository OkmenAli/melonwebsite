import Image from "next/image";
import type { Metadata } from "next";

const formulaCards = [
  {
    title: "Nutrition",
    points: "40",
    tone: "bg-melon-500 text-white",
    body: "Sugar, sodium, saturated fat, calories, protein, fiber, and whole-food signals shape the nutrition portion of the score.",
  },
  {
    title: "Additives",
    points: "30",
    tone: "bg-amber-500 text-white",
    body: "Additives start at full credit, then lose points based on the number and severity of caution or avoid additives.",
  },
  {
    title: "Naturalness / Processing",
    points: "30",
    tone: "bg-zinc-950 text-white",
    body: "NOVA level, ingredient count, oils, artificial flavors or colors, gums, emulsifiers, and other processing signals are evaluated together.",
  },
];

const nutritionAdds = ["Fiber", "Protein", "Whole-food base", "Low sugar", "Lower sodium"];
const nutritionDeductions = ["Higher sugar", "Higher sodium", "Saturated fat", "High calories with low protein and fiber"];
const processingSignals = ["NOVA group", "Ingredient count", "Seed oil signals", "Artificial flavor or color", "Gums, emulsifiers, lecithins", "Mostly sugar-based products"];
const scoreBands = [
  ["90-100", "Excellent"],
  ["75-89", "Good"],
  ["50-74", "Moderate"],
  ["25-49", "Poor"],
  ["0-24", "Avoid Often"],
];
const caps = [
  "One or more avoid additives can cap a product at 49.",
  "Two or more avoid additives can cap a product at 39.",
  "NOVA group 4 products can be capped at 49.",
  "Soda, cola, candy, energy drinks, and chips are handled with stricter caps.",
];
const exceptions = [
  "Water is scored differently so it is not punished for having no protein, fiber, calories, or vitamins.",
  "Plain tea and coffee receive special handling because missing nutrition data should not make simple products look unhealthy.",
  "User preferences such as halal, kosher, vegan, vegetarian, and allergies are shown as personal flags, not hidden inside the Melon Score.",
];

export const metadata: Metadata = {
  title: "Melon Scoring Method",
  description:
    "Learn how Melon calculates product scores using nutrition, additives, naturalness, processing, score caps, and category context.",
  alternates: { canonical: "/scoring-method" },
  openGraph: {
    type: "website",
    url: "https://themelon.app/scoring-method",
    title: "Melon Scoring Method | Melon",
    description:
      "Learn how Melon calculates product scores using nutrition, additives, naturalness, processing, score caps, and category context.",
    siteName: "Melon",
    images: [
      {
        url: "/images/scoring-method-system.png",
        width: 1536,
        height: 1024,
        alt: "Melon Score method showing nutrition, additives, and processing weights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melon Scoring Method | Melon",
    description:
      "How Melon scores food products across nutrition, additives, naturalness, processing, and score caps.",
    images: ["/images/scoring-method-system.png"],
  },
  robots: { index: true, follow: true },
};

function Pill({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="rounded-full border border-melon-200 bg-melon-50 px-4 py-2 text-sm font-black text-melon-800">
      {children}
    </span>
  );
}

export default function ScoringMethodPage() {
  return (
    <main className="bg-fog text-ink">
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(71,177,104,0.28),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(71,177,104,0.18),transparent_30%)]" />
        <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-melon-300">Scoring method</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              How the Melon Score works.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              Melon scores products out of 100 using a rule-based method. The score combines nutrition, additives, naturalness, processing, category exceptions, and final score caps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill>Rule-based</Pill>
              <Pill>100-point score</Pill>
              <Pill>Nutrition + additives + processing</Pill>
            </div>
          </div>
          <div className="rounded-[34px] border border-white/12 bg-white/8 p-3 shadow-phone backdrop-blur sm:p-4">
            <Image
              src="/images/scoring-method-system.png"
              alt="Melon Score graphic explaining a 70 out of 100 moderate score and the nutrition, additives, and processing weighting"
              width={1536}
              height={1024}
              priority
              className="h-auto w-full rounded-[26px]"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">100 points</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              Three areas build the final score.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Nutrition can add or subtract meaningful points, additives are penalized by severity, and naturalness or processing helps Melon separate simpler foods from ultra-processed products.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {formulaCards.map((card) => (
              <article key={card.title} className="rounded-[30px] border border-zinc-200 bg-fog p-6 shadow-card">
                <div className={`${card.tone} grid size-16 place-items-center rounded-2xl text-2xl font-black shadow-card`}>
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
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <article className="rounded-[34px] border border-zinc-200 bg-white p-7 shadow-soft sm:p-8">
            <p className="eyebrow">Nutrition</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">The nutrition score starts with a baseline and moves from there.</h2>
            <p className="mt-5 text-base leading-8 text-zinc-600">
              Most products start with a base nutrition score, then Melon adds points for stronger nutrition signals and subtracts points for concerns that shoppers commonly care about.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-melon-50 p-5">
                <h3 className="font-black text-melon-800">Can add points</h3>
                <ul className="mt-4 grid gap-3 text-sm font-bold text-zinc-700">
                  {nutritionAdds.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="rounded-3xl bg-red-50 p-5">
                <h3 className="font-black text-red-700">Can subtract points</h3>
                <ul className="mt-4 grid gap-3 text-sm font-bold text-zinc-700">
                  {nutritionDeductions.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </article>

          <article className="rounded-[34px] border border-zinc-200 bg-white p-7 shadow-soft sm:p-8">
            <p className="eyebrow">Additives and processing</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">The score looks beyond calories and macros.</h2>
            <p className="mt-5 text-base leading-8 text-zinc-600">
              Additives start at 30 points and lose points based on caution or avoid signals. Processing starts from the NOVA group and is adjusted for ingredient complexity and processing markers.
            </p>
            <div className="mt-7 grid gap-3">
              {processingSignals.map((item) => (
                <div key={item} className="rounded-2xl border border-zinc-200 bg-fog px-4 py-3 text-sm font-black text-zinc-700">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-pad bg-ink text-white">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-melon-300">Score labels and caps</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
              A good-looking label cannot hide important concerns.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/70">
              After the category scores are added, Melon applies final caps when certain signals should limit the maximum score. This keeps high-risk additives or heavy processing from being masked by one strong nutrition metric.
            </p>
          </div>
          <div className="grid gap-5">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.05] p-6">
              <h3 className="text-2xl font-black text-white">How to read the score</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-5">
                {scoreBands.map(([range, label]) => (
                  <div key={range} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-black text-melon-300">{range}</p>
                    <p className="mt-2 text-lg font-black text-white">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[30px] border border-amber-300/30 bg-amber-300/10 p-6">
              <h3 className="text-2xl font-black text-white">Final caps</h3>
              <ul className="mt-6 grid gap-3 text-base font-bold leading-7 text-amber-50">
                {caps.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="eyebrow">Special cases</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">Some foods need fairer context.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-600">
              Melon includes special handling for categories where ordinary nutrition scoring can be misleading, and it keeps personal preferences separate from the core product score.
            </p>
          </div>
          <div className="grid gap-4">
            {exceptions.map((item) => (
              <article key={item} className="rounded-[26px] border border-melon-100 bg-melon-50 p-5 shadow-card">
                <p className="text-base font-bold leading-7 text-zinc-700">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
