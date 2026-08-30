import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

const publishedDate = "2026-08-30";
const modifiedDate = "2026-08-30";
const articleUrl = "https://themelon.app/insights/mono-and-diglycerides-e471";
const title = "Mono- and Diglycerides: What E471 Means on Food Labels";
const description =
  "Learn what mono- and diglycerides are, why food companies use E471, what regulators say, what newer research suggests, and how Melon helps you interpret this additive in context.";

const productExamples = [
  "Bread and commercial baked goods",
  "Margarine and spreads",
  "Ice cream and frozen desserts",
  "Whipped toppings",
  "Coffee creamers",
  "Peanut butter and other spreads",
  "Confectionery products",
  "Some prepared or packaged foods",
];

const functions = [
  "Produce a smoother and more uniform texture",
  "Help bread remain soft",
  "Improve dough strength and handling",
  "Stabilize whipped or frozen products",
  "Reduce oil separation in spreads",
  "Help manufacturers maintain consistency across batches",
];

const certaintyTips = [
  "A vegan or vegetarian certification",
  "A recognized halal or kosher certification",
  "Wording such as \"vegetable mono- and diglycerides\"",
  "Written confirmation from the manufacturer",
];

const contextQuestions = [
  "How often do you eat it?",
  "How processed is it overall?",
  "What are its main ingredients?",
  "What is its nutritional profile?",
  "Are simpler alternatives available?",
];

const sources = [
  {
    label: "U.S. Electronic Code of Federal Regulations: 21 CFR Section 184.1505 - Mono- and diglycerides",
    href: "https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-184/subpart-B/section-184.1505",
  },
  {
    label: "European Food Safety Authority: Re-evaluation of mono- and di-glycerides of fatty acids (E471)",
    href: "https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2017.5045",
  },
  {
    label: "FAO/JECFA specifications for mono- and diglycerides",
    href: "https://www.fao.org/fileadmin/user_upload/jecfa_additives/docs/Monograph1/Additive-288.pdf",
  },
  {
    label: "European Commission Regulation (EU) 2023/1428 amending E471 specifications",
    href: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32023R1428",
  },
  {
    label: "Sellem et al. Food additive emulsifiers and risk of cardiovascular disease, BMJ, 2023",
    href: "https://www.bmj.com/content/382/bmj-2023-076058",
  },
  {
    label: "Sellem et al. Food additive emulsifiers and cancer risk, PLOS Medicine, 2024",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10863884/",
  },
];

const faqs = [
  {
    question: "Is E471 the same as mono- and diglycerides?",
    answer: "Yes. E471 is the European additive number for mono- and diglycerides of fatty acids.",
  },
  {
    question: "Are mono- and diglycerides trans fats?",
    answer:
      "No. Mono- and diglycerides are not automatically trans fats. However, their fatty acids can be produced from different fat sources, and EFSA previously recommended limits addressing trans-fat content and other possible manufacturing-related impurities.",
  },
  {
    question: "Are mono- and diglycerides vegan?",
    answer:
      "Not automatically. They can be produced from vegetable oils or animal fats, and the ingredient list may not identify the source.",
  },
  {
    question: "Is E471 banned?",
    answer: "No. It is permitted for food use in the United States and European Union under applicable conditions and specifications.",
  },
  {
    question: "Does E471 cause cancer?",
    answer:
      "Current evidence does not establish that E471 causes cancer. One large observational cohort reported an association between higher E471 intake and certain cancers, but observational associations cannot prove causation and require replication.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "mono and diglycerides",
    "mono- and diglycerides",
    "E471",
    "E471 additive",
    "food emulsifier",
    "food additive checker",
    "ingredient scanner",
    "Melon insights",
    "are mono and diglycerides vegan",
    "mono and diglycerides health",
  ],
  alternates: { canonical: "/insights/mono-and-diglycerides-e471" },
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
        url: "/images/scan-flow-hands.png",
        width: 1536,
        height: 1024,
        alt: "Melon app scanning a food label and showing ingredient insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/scan-flow-hands.png"],
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

export default function InsightsPage() {
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
    image: "https://themelon.app/images/scan-flow-hands.png",
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
          <div className="container-page py-16 sm:py-20 lg:py-24">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-melon-300">Melon Insights</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl">
              Mono- and diglycerides: what E471 means on food labels.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">
              A practical guide to why this emulsifier appears in packaged foods, what regulators say, what newer research suggests, and how to read it in context.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-black text-white/78">
              <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2">Food additives</span>
              <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2">E471</span>
              <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2">6 min read</span>
            </div>
          </div>
        </header>

        <div className="container-page grid gap-10 py-14 lg:grid-cols-[280px_1fr] lg:py-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-card" aria-label="Article contents">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-400">In this guide</p>
              <div className="mt-4 grid gap-2 text-sm font-black text-zinc-700">
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#what-it-is">What it is</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#why-used">Why it is used</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#safety">Safety and research</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#dietary">Dietary source</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#melon-context">How Melon handles it</a>
                <a className="rounded-xl px-3 py-2 transition hover:bg-melon-50 hover:text-melon-700" href="#faq">FAQ</a>
              </div>
            </nav>
          </aside>

          <div className="grid gap-12">
            <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-card sm:p-8">
              <p className="eyebrow">Published insight</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-ink sm:text-4xl">At a glance</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-[20px] bg-melon-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-melon-700">Identity</p>
                  <p className="mt-3 text-base font-bold leading-7 text-zinc-700">E471 is mono- and diglycerides of fatty acids.</p>
                </div>
                <div className="rounded-[20px] bg-amber-50 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">Function</p>
                  <p className="mt-3 text-base font-bold leading-7 text-zinc-700">It helps texture, mixing, stability, and consistency.</p>
                </div>
                <div className="rounded-[20px] bg-zinc-100 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-zinc-700">Context</p>
                  <p className="mt-3 text-base font-bold leading-7 text-zinc-700">Source and overall product quality matter.</p>
                </div>
              </div>
            </section>

            <ArticleSection id="what-it-is" eyebrow="Ingredient basics" title="What are mono- and diglycerides?">
              <p>
                Mono- and diglycerides are emulsifiers made from glycerol and fatty acids. Food manufacturers use them to keep ingredients mixed, improve texture, and help products remain consistent during storage. In Europe, they are commonly identified as E471. In the United States, an ingredient list will usually say &quot;mono- and diglycerides.&quot;
              </p>
              <p>
                Most dietary fats are triglycerides: a glycerol molecule attached to three fatty acids. A monoglyceride has one fatty acid attached to glycerol, while a diglyceride has two.
              </p>
              <p>
                Because part of the molecule interacts with water while another part interacts with fat, mono- and diglycerides can help oil and water remain mixed. This makes them useful as emulsifiers, stabilizers, texturizers, dough strengtheners, and anti-sticking agents.
              </p>
              <div className="rounded-[24px] border border-zinc-200 bg-white p-6">
                <h3 className="text-xl font-black tracking-tight text-ink">They may be found in products such as:</h3>
                <BulletList items={productExamples} />
              </div>
              <p>
                Their presence does not automatically make a product harmful. It often indicates that the manufacturer wanted a particular texture, appearance, or shelf stability.
              </p>
            </ArticleSection>

            <ArticleSection id="how-made" eyebrow="Manufacturing" title="How are they made?">
              <p>
                Mono- and diglycerides are generally manufactured by reacting glycerol with edible fats, oils, or separated fatty acids. The starting material can come from vegetable oil or animal fat. The resulting product is purified into a mixture containing mono-, di-, and sometimes small amounts of triglycerides, free fatty acids, and glycerol.
              </p>
              <p>
                The U.S. regulation describes production through the reaction of glycerin with fatty acids or triglycerides, generally in the presence of an alkaline catalyst. International specifications also describe glycerolysis of edible fats and oils or direct esterification of fatty acids with glycerol.
              </p>
            </ArticleSection>

            <ArticleSection id="why-used" eyebrow="Food technology" title="Why do manufacturers use E471?">
              <p>
                Oil and water naturally separate. Emulsifiers help slow or prevent that separation. Mono- and diglycerides can therefore:
              </p>
              <BulletList items={functions} />
              <p>
                They are functional ingredients rather than preservatives in the strict sense, although maintaining texture and stability can indirectly help a product remain acceptable for longer.
              </p>
            </ArticleSection>

            <ArticleSection id="safety" eyebrow="Safety context" title="Are mono- and diglycerides safe?">
              <p>
                The most accurate answer is that regulators currently allow E471, while newer research has created questions that have not yet been fully resolved.
              </p>
              <p>
                In the United States, mono- and diglycerides are affirmed as generally recognized as safe when used according to current good manufacturing practice. In its 2017 re-evaluation, the European Food Safety Authority concluded that a numerical acceptable daily intake was unnecessary and that E471 presented no safety concern at the uses and use levels assessed. EFSA also reported no indication of genotoxic, carcinogenic, or reproductive toxicity in the evidence it evaluated.
              </p>
              <p>
                That conclusion did not mean every manufacturing consideration was irrelevant. EFSA recommended tighter specifications for potential contaminants and components such as toxic elements, trans fatty acids, erucic acid, 3-MCPD, and glycidyl esters. The European Union subsequently amended its E471 specifications, including limits for several of these substances and stricter limits for certain uses in foods for infants and young children.
              </p>
              <p>
                This distinction matters: concern about a possible manufacturing contaminant is not the same as evidence that the E471 molecule itself causes the same harm.
              </p>
            </ArticleSection>

            <ArticleSection id="research" eyebrow="Emerging evidence" title="What do newer human studies suggest?">
              <p>
                Recent human research has mainly been observational. That means researchers estimate participants&apos; exposure and follow health outcomes over time; they do not randomly assign people to consume E471.
              </p>
              <p>
                A 2023 prospective study of 95,442 French adults reported that higher intake of the broader group of mono- and diglycerides of fatty acids, including E471 and related E472 additives, was associated with a modestly higher risk of cardiovascular disease. The authors stressed that the results required replication and further mechanistic research.
              </p>
              <p>
                A 2024 study involving approximately 92,000 adults from the same NutriNet-Sante cohort reported associations between higher E471 intake and overall, breast, and prostate cancer risk. The researchers also stated that the findings needed confirmation in other populations.
              </p>
              <p>
                These studies are important, but they cannot establish cause and effect. People with higher emulsifier exposure may also differ in their overall diet, intake of ultra-processed food, lifestyle, or other factors that statistical adjustments cannot completely remove. Exposure estimates can also be imperfect, and much of the evidence comes from one French volunteer cohort in which most participants were women.
              </p>
              <p>
                The findings should therefore be understood as signals for further research, not proof that consuming a food containing mono- and diglycerides will cause cancer or cardiovascular disease.
              </p>
            </ArticleSection>

            <ArticleSection id="microbiome" eyebrow="Gut health" title="What about microbiome concerns?">
              <p>
                Some emulsifiers have produced changes in gut bacteria, inflammation, or metabolism in laboratory and animal research. However, emulsifiers are a diverse group and should not automatically be treated as interchangeable.
              </p>
              <p>
                EFSA noted in its E471 assessment that research involving other emulsifiers might be relevant to the category, but it did not identify specific microbiome studies on mono- and diglycerides themselves at that time. More direct human research on E471 is needed before strong conclusions can be drawn.
              </p>
            </ArticleSection>

            <ArticleSection id="dietary" eyebrow="Dietary flags" title="Are mono- and diglycerides vegan, halal, or kosher?">
              <p>It depends on the source.</p>
              <p>
                The fatty acids used to produce E471 may come from vegetable oils or animal fats, and the ingredient name usually does not reveal which was used. Therefore, an unqualified listing of &quot;mono- and diglycerides&quot; is not enough to confirm vegan, vegetarian, halal, or kosher compatibility.
              </p>
              <div className="rounded-[24px] border border-zinc-200 bg-white p-6">
                <h3 className="text-xl font-black tracking-tight text-ink">For greater certainty, look for:</h3>
                <BulletList items={certaintyTips} />
              </div>
              <p>
                Melon treats an undisclosed source as uncertain, rather than automatically presenting it as plant- or animal-derived.
              </p>
            </ArticleSection>

            <ArticleSection id="pregnancy" eyebrow="Special populations" title="Pregnancy, infants, and children">
              <p>
                Current regulatory assessments do not identify a special pregnancy hazard from E471 at permitted uses. However, research specifically designed around pregnancy exposure is limited.
              </p>
              <p>
                For infants and young children, regulators have considered E471 separately because of their smaller body size and different patterns of food consumption. EFSA later concluded there was no reason for a safety concern for specified infant-food uses, while the European Union introduced tighter limits for certain impurities in E471 intended for foods for infants and young children.
              </p>
              <p>
                Anyone managing a medical condition, allergy, pregnancy-related concern, or an infant&apos;s specialized diet should rely on the product label and advice from an appropriate healthcare professional.
              </p>
            </ArticleSection>

            <ArticleSection id="melon-context" eyebrow="Melon perspective" title="How should you interpret E471 on a label?">
              <p>
                Finding E471 on one ingredient list is not, by itself, evidence that the food is unsafe. It is more useful to consider the entire product:
              </p>
              <BulletList items={contextQuestions} />
              <p>
                People who prefer to minimize non-essential emulsifiers can choose products with shorter ingredient lists or compare similar products. The goal is informed choice, not fear based on a single unfamiliar name.
              </p>
              <p>
                Melon helps you see E471 in context: what it does, what is known, what remains uncertain, whether its source may conflict with your dietary preferences, and how the full product compares with other choices.
              </p>
            </ArticleSection>

            <section id="faq" className="scroll-mt-28 border-t border-zinc-200 pt-10">
              <p className="eyebrow">Quick FAQ</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">Common questions about E471</h2>
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
                This article is for general informational purposes and does not provide medical or dietary advice. Product formulations and regulatory requirements may change. Always verify the current product label and consult an appropriate professional when needed.
              </p>
            </section>

            <section className="rounded-[28px] bg-ink p-7 text-white sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-melon-300">More Melon Insights</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">Next: why ultra-processed foods can be easy to overeat.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                Read how a controlled NIH study found that food processing can influence calorie intake, eating speed, and short-term weight change.
              </p>
              <Link
                href="/insights/ultra-processed-foods-overeating"
                className="mt-6 inline-flex rounded-full bg-melon-500 px-6 py-3 text-sm font-black text-white shadow-card transition hover:bg-melon-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-melon-300"
              >
                Read the ultra-processed food article
              </Link>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
