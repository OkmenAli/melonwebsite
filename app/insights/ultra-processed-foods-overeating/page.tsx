import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

const publishedDate = "2026-08-30";
const modifiedDate = "2026-08-30";
const articleUrl = "https://themelon.app/insights/ultra-processed-foods-overeating";
const title = "Why Ultra-Processed Foods Can Be Easy to Overeat";
const description =
  "A Melon Insights guide to the NIH ultra-processed diet study, what it found about calorie intake and weight gain, and how to interpret processing on food labels.";

const examples = [
  "Certain packaged snacks",
  "Sweetened cereals",
  "Instant meals",
  "Processed meat products",
  "Soft drinks",
  "Desserts",
  "Commercial baked goods",
];

const limitations = [
  "It included only 20 adults.",
  "Each diet lasted only two weeks.",
  "Participants lived in a controlled clinical environment rather than at home.",
  "The study did not determine which specific feature of ultra-processed food caused the increased calorie intake.",
  "It did not show that every ultra-processed product has the same effect.",
  "It did not measure long-term outcomes such as heart disease, diabetes, or cancer.",
];

const labelQuestions = [
  "Whether the product is based on recognizable whole foods",
  "Whether it provides meaningful protein or fiber",
  "Whether it is high in added sugar, sodium, or refined fat",
  "Whether it contains several ingredients used mainly to create intense flavor or texture",
  "How easy it is to eat quickly",
  "How often it appears in your diet",
  "Whether a simpler alternative is available",
];

const sources = [
  {
    label: "Hall KD et al. Ultra-Processed Diets Cause Excess Calorie Intake and Weight Gain, Cell Metabolism, 2019",
    href: "https://pubmed.ncbi.nlm.nih.gov/31105044/",
  },
  {
    label: "Full study text through the National Library of Medicine",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7946062/",
  },
  {
    label: "National Institutes of Health: Heavily processed foods cause overeating and weight gain",
    href: "https://www.nih.gov/news-events/news-releases/nih-study-finds-heavily-processed-foods-cause-overeating-weight-gain",
  },
  {
    label: "NIDDK: Study finds that ultra-processed foods lead to weight gain",
    href: "https://www.niddk.nih.gov/health-information/professionals/diabetes-discoveries-practice/study-finds-that-ultra-processed-foods",
  },
];

const faqs = [
  {
    question: "What is the difference between processed and ultra-processed food?",
    answer:
      "Processed food has been changed from its original form through methods such as cooking, freezing, fermenting, or canning. Ultra-processed food usually contains industrial ingredients or formulations that would not commonly be used in a home kitchen.",
  },
  {
    question: "Why did people eat more on the ultra-processed diet?",
    answer:
      "The meals presented to participants were designed to contain similar amounts of calories and several major nutrients. Participants could eat as much or as little as they wanted, and they consumed about 508 more calories per day during the ultra-processed diet.",
  },
  {
    question: "How much weight did participants gain?",
    answer:
      "Participants gained an average of approximately 0.9 kilograms, or 2 pounds, during two weeks on the ultra-processed diet. They lost approximately the same amount during the minimally processed period.",
  },
  {
    question: "Did the study prove that additives caused overeating?",
    answer:
      "No. The study tested complete dietary patterns, not individual additives. It could not determine whether the result came from food texture, eating speed, ingredient combinations, energy density, additives, or several factors working together.",
  },
  {
    question: "Should I avoid every packaged food?",
    answer:
      "No. Packaged foods vary widely. Looking at the full ingredient list, nutrition, processing level, frequency of consumption, and available alternatives is more useful than avoiding all packaged products.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ultra processed foods",
    "ultra processed food study",
    "NIH ultra processed diet",
    "Kevin Hall ultra processed foods",
    "processed food overeating",
    "food label scanner",
    "Melon insights",
    "food processing",
    "NOVA food processing",
  ],
  alternates: { canonical: "/insights/ultra-processed-foods-overeating" },
  openGraph: {
    type: "article",
    url: articleUrl,
    title,
    description,
    siteName: "Melon",
    publishedTime: publishedDate,
    modifiedTime: modifiedDate,
    authors: ["AnyHope Corp."],
    images: [
      {
        url: "/images/scoring-method-system.png",
        width: 1536,
        height: 1024,
        alt: "Melon scoring method showing nutrition, additives, and processing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/scoring-method-system.png"],
  },
  robots: { index: true, follow: true },
};

function BulletList({ items }: Readonly<{ items: string[] }>) {
  return (
    <ul className="mt-5 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-7 text-zinc-700">
          <span className="mt-2.5 size-2 shrink-0 rounded-full bg-melon-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ArticleSection({
  id,
  eyebrow,
  title: sectionTitle,
  children,
}: Readonly<{
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}>) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-zinc-200 pt-10">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">{sectionTitle}</h2>
      <div className="mt-5 grid gap-5 text-lg leading-8 text-zinc-600">{children}</div>
    </section>
  );
}

export default function UltraProcessedFoodsOvereatingPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Organization",
      name: "AnyHope Corp.",
      url: "https://themelon.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Melon",
      logo: {
        "@type": "ImageObject",
        url: "https://themelon.app/icon.png",
      },
    },
    mainEntityOfPage: articleUrl,
    image: "https://themelon.app/images/scoring-method-system.png",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="bg-fog text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article>
        <header className="overflow-hidden bg-ink text-white">
          <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_0.82fr] lg:items-center lg:py-24">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-melon-300">Melon Insights</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Why ultra-processed foods can be easy to overeat.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">
                A controlled NIH study found that people ate more calories and gained weight on an ultra-processed diet, even when major nutrition numbers looked similar on paper.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-black text-white/78">
                <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2">Food processing</span>
                <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2">NIH study</span>
                <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2">7 min read</span>
              </div>
            </div>
            <aside className="rounded-[28px] border border-white/12 bg-white/8 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.25)] backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-melon-300">Key finding</p>
              <p className="mt-4 text-5xl font-black tracking-tight text-white">508</p>
              <p className="mt-2 text-2xl font-black tracking-tight text-white">more calories per day</p>
              <p className="mt-4 text-base leading-7 text-white/70">
                Participants consumed about 508 additional calories per day on the ultra-processed diet and gained about 0.9 kilograms over two weeks.
              </p>
            </aside>
          </div>
        </header>

        <div className="container-page grid gap-10 py-14 lg:grid-cols-[280px_1fr] lg:py-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-card" aria-label="Article contents">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-400">In this guide</p>
              <div className="mt-4 grid gap-2 text-sm font-black text-zinc-700">
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#why-it-matters">Why it matters</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#what-counts">What counts</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#study-design">Study design</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#findings">Findings</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#limits">Limitations</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#practical">Practical takeaways</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#faq">FAQ</a>
              </div>
            </nav>
          </aside>

          <div className="grid gap-12">
            <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-card sm:p-8">
              <p className="eyebrow">At a glance</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">The study in three signals</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-[20px] bg-melon-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-melon-700">Controlled setting</p>
                  <p className="mt-3 text-base font-bold leading-7 text-zinc-700">The same participants ate both diets while living at the NIH Clinical Center.</p>
                </div>
                <div className="rounded-[20px] bg-amber-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">Free eating</p>
                  <p className="mt-3 text-base font-bold leading-7 text-zinc-700">People could eat as much or as little as they wanted.</p>
                </div>
                <div className="rounded-[20px] bg-zinc-100 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-zinc-700">Fast change</p>
                  <p className="mt-3 text-base font-bold leading-7 text-zinc-700">Weight moved in opposite directions across the two diet periods.</p>
                </div>
              </div>
            </section>

            <ArticleSection id="why-it-matters" eyebrow="Food environment" title="It is not always just about willpower">
              <p>
                When people eat more than they intended, the blame usually falls on willpower. A controlled study from the National Institutes of Health suggests that the food itself may also play an important role.
              </p>
              <p>
                In the study, people ate about 508 more calories per day while following an ultra-processed diet. Within two weeks, they gained about 0.9 kilograms, or 2 pounds, on average. The same people lost roughly the same amount of weight when they ate a minimally processed diet.
              </p>
              <p>
                The participants were not told to overeat or restrict themselves. They were simply allowed to eat as much or as little as they wanted. The difference appeared even though the two diets were designed to look similar in calories, carbohydrates, fat, protein, sugar, sodium, and fiber.
              </p>
              <p>
                That makes this study especially important. It suggests that what happens to food before it reaches us may affect how quickly we eat, how much we consume, and how our body responds.
              </p>
            </ArticleSection>

            <ArticleSection id="what-counts" eyebrow="Definitions" title="What counts as ultra-processed food?">
              <p>Not every food that has been cooked, frozen, canned, or packaged is ultra-processed.</p>
              <p>
                The term usually refers to industrial formulations made with ingredients that are uncommon in a home kitchen. These may include refined starches, protein isolates, hydrogenated oils, flavoring agents, colors, sweeteners, emulsifiers, and other ingredients designed to create a particular taste, texture, appearance, or shelf life.
              </p>
              <div className="rounded-[24px] border border-zinc-200 bg-white p-6">
                <h3 className="text-xl font-black tracking-tight text-ink">Common examples can include:</h3>
                <BulletList items={examples} />
              </div>
              <p>
                However, packaging alone does not tell you everything. A frozen bag of vegetables and a packaged frosted pastry are both processed, but they are not nutritionally or structurally equivalent. The full ingredient list, nutritional profile, and degree of processing all matter.
              </p>
            </ArticleSection>

            <ArticleSection id="study-design" eyebrow="Study design" title="How the NIH study worked">
              <p>
                The 2019 study, led by researcher Kevin Hall and published in Cell Metabolism, included 20 weight-stable adults, with 10 men and 10 women.
              </p>
              <p>
                Each participant stayed at the NIH Clinical Center for four continuous weeks. This allowed researchers to control the meals, monitor what participants ate, and measure changes more precisely than would normally be possible in everyday life.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[20px] border border-zinc-200 bg-white p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-melon-700">Diet period 1</p>
                  <p className="mt-3 text-xl font-black text-ink">Ultra-processed diet for two weeks</p>
                </div>
                <div className="rounded-[20px] border border-zinc-200 bg-white p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-melon-700">Diet period 2</p>
                  <p className="mt-3 text-xl font-black text-ink">Minimally processed diet for two weeks</p>
                </div>
              </div>
              <p>
                The order was randomized. Some participants started with the ultra-processed diet, while others started with the minimally processed diet. Everyone eventually completed both.
              </p>
              <p>
                The meals offered during the two diet periods were designed to have similar presented amounts of calories, energy density, carbohydrates, fat, protein, sugar, sodium, and fiber. Participants were given three meals each day, along with access to snacks and bottled water. They could eat as much or as little as they wanted.
              </p>
              <p>
                This is an important part of the design. Researchers were not simply comparing two unrelated groups of people. They were comparing how the same individuals responded to both eating patterns in a controlled setting.
              </p>
            </ArticleSection>

            <ArticleSection id="findings" eyebrow="Findings" title="What happened during the ultra-processed diet?">
              <p>
                During the ultra-processed portion of the study, participants consumed an average of 508 additional calories per day compared with the minimally processed portion.
              </p>
              <p>
                Most of the additional calories came from carbohydrates and fat. Protein intake did not meaningfully increase.
              </p>
              <p>
                The participants were not instructed to eat more, and the meals available to them were designed to be similar in several major nutritional measurements. Yet they consistently consumed more when the food was ultra-processed.
              </p>
              <p>
                This tells us that a nutrition label may not capture every way a food can influence eating behavior. Two meals can look similar in total calories and macronutrients when served, but their texture, structure, energy delivery, eating speed, and combination of ingredients may affect how much a person actually eats.
              </p>
            </ArticleSection>

            <ArticleSection id="weight" eyebrow="Body weight" title="The change showed up quickly">
              <p>
                The change in calorie intake was reflected in the participants&apos; weight.
              </p>
              <p>
                During two weeks on the ultra-processed diet, participants gained an average of approximately 0.9 kilograms. During two weeks on the minimally processed diet, they lost approximately 0.9 kilograms.
              </p>
              <p>
                Body-composition measurements also showed an average increase of about 0.4 kilograms of body fat during the ultra-processed period.
              </p>
              <p>
                Two weeks is a short amount of time. The study was not designed to show what would happen over several years. Still, the speed of the change is notable because the same people moved in opposite directions depending on which diet they were eating.
              </p>
            </ArticleSection>

            <ArticleSection id="eating-speed" eyebrow="Eating behavior" title="Eating speed may be part of the picture">
              <p>Participants ate faster during the ultra-processed diet.</p>
              <p>
                Eating speed matters because the body does not recognize fullness instantly. Signals from the stomach, intestines, and brain take time to influence how satisfied we feel. When food is softer, easier to chew, or quicker to consume, it may be possible to take in more calories before those signals fully catch up.
              </p>
              <p>
                The study found that people consumed more calories per minute on the ultra-processed diet. However, it did not prove that eating speed was the only cause. Other differences, including food texture, energy density within solid foods, beverages, ingredient combinations, and how rewarding the meals felt, may also have contributed.
              </p>
              <p>Researchers are still working to identify which features matter most.</p>
            </ArticleSection>

            <ArticleSection id="hunger" eyebrow="Signals" title="Hunger ratings did not explain everything">
              <p>
                One possible explanation would be that the ultra-processed meals simply tasted much better. The study did not find a major difference in how pleasant or familiar participants rated the two diets.
              </p>
              <p>
                People also reported similar levels of hunger, fullness, satisfaction, and capacity to eat across the two diet periods. Even so, their actual calorie intake was substantially higher during the ultra-processed diet.
              </p>
              <p>
                This gap between what people reported feeling and how much they ate is one of the study&apos;s most interesting findings. It suggests that conscious hunger is not the only influence on food intake.
              </p>
            </ArticleSection>

            <ArticleSection id="limits" eyebrow="Limitations" title="What the study does not prove">
              <p>
                The study provides stronger evidence than a typical observational study because participants were randomly assigned to the diets and closely monitored. However, it still had important limitations.
              </p>
              <BulletList items={limitations} />
              <p>
                The results show that the ultra-processed diet used in this experiment caused people to eat more calories and gain weight over a short period. They do not prove that one packaged food will have the same effect or that processing is the only factor that matters.
              </p>
            </ArticleSection>

            <ArticleSection id="practical" eyebrow="Practical takeaways" title="How to use this information while shopping">
              <p>
                No. Processing exists on a spectrum, and some forms of processing improve safety, convenience, storage, or access to food.
              </p>
              <p>
                Pasteurizing milk, freezing vegetables, canning beans, grinding oats, and cooking food are all forms of processing. These are not the same as building a product mainly from refined ingredients, flavors, colors, emulsifiers, and other industrial components.
              </p>
              <p>
                It is more helpful to look at the complete product than to react to the word &quot;processed&quot; alone.
              </p>
              <div className="rounded-[24px] border border-zinc-200 bg-white p-6">
                <h3 className="text-xl font-black tracking-tight text-ink">Consider:</h3>
                <BulletList items={labelQuestions} />
              </div>
              <p>
                You do not need to eliminate every packaged food. For many people, that would be expensive, time-consuming, or unrealistic.
              </p>
              <p>
                A more practical approach is to compare products that serve the same purpose. Two breads, cereals, frozen meals, or snack foods can have very different ingredient lists and levels of processing.
              </p>
              <p>
                You can also build meals around foods that are closer to their original form, then use packaged foods for convenience where they genuinely help. Small changes repeated often may matter more than trying to follow a perfect diet for a few days.
              </p>
            </ArticleSection>

            <ArticleSection id="melon-context" eyebrow="Melon perspective" title="Where Melon fits">
              <p>
                Food labels show ingredients and nutrition facts, but they rarely explain what those details mean together.
              </p>
              <p>
                Melon helps you scan a product and examine its nutrition, additives, ingredients, and processing signals in one place. It can also help you compare alternatives when two products appear similar from the front of the package.
              </p>
              <p>
                The goal is not to make every decision for you. It is to give you enough context to understand what you are buying and choose with more confidence.
              </p>
            </ArticleSection>

            <ArticleSection id="bottom-line" eyebrow="Bottom line" title="What this study means">
              <p>
                In a tightly controlled NIH study, people ate approximately 508 more calories per day and gained about 0.9 kilograms while following an ultra-processed diet. The same participants lost roughly the same amount during the minimally processed diet.
              </p>
              <p>
                The study does not prove that every processed product is harmful. It does show that processing can affect more than what appears on the nutrition label. The way food is formulated, structured, and eaten may influence how much we consume before we feel satisfied.
              </p>
              <p>It is not just about calories on paper, and it is not always just about willpower.</p>
            </ArticleSection>

            <section id="faq" className="scroll-mt-28 border-t border-zinc-200 pt-10">
              <p className="eyebrow">Quick FAQ</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">Common questions about ultra-processed foods</h2>
              <div className="mt-6 grid gap-4">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-[20px] border border-zinc-200 bg-white p-5 shadow-card">
                    <summary className="cursor-pointer list-none text-lg font-black text-ink marker:hidden">
                      <span className="flex items-center justify-between gap-5">
                        {faq.question}
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-melon-50 text-melon-700 transition group-open:rotate-45">+</span>
                      </span>
                    </summary>
                    <p className="mt-4 text-base leading-7 text-zinc-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-card sm:p-8">
              <p className="eyebrow">Sources</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">References</h2>
              <ol className="mt-6 grid gap-4">
                {sources.map((source) => (
                  <li key={source.href} className="text-base leading-7 text-zinc-700">
                    <a href={source.href} target="_blank" rel="noopener noreferrer" className="font-bold text-melon-700 underline decoration-melon-200 underline-offset-4 transition hover:text-melon-900">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-8 rounded-[20px] bg-zinc-100 p-5 text-sm font-bold leading-7 text-zinc-600">
                This article is for general informational purposes and does not provide medical or dietary advice. Individual needs differ, and anyone with a medical condition or specific dietary concern should speak with an appropriate healthcare professional.
              </p>
            </section>

            <section className="rounded-[28px] bg-ink p-7 text-white sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-melon-300">More Melon Insights</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Next: understand E471.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                Learn what mono- and diglycerides are, why food companies use them, and how Melon interprets source uncertainty.
              </p>
              <Link
                href="/insights"
                className="mt-6 inline-flex rounded-full bg-melon-500 px-6 py-3 text-sm font-black text-white shadow-card transition hover:bg-melon-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-300"
              >
                Read the E471 article
              </Link>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
