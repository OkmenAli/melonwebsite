import type { Metadata } from "next";

const description = "Learn about Melon's mission to make food information clearer, connect people with local producers, and support small businesses and communities.";

export const metadata: Metadata = {
  title: "Our Mission",
  description,
  alternates: { canonical: "/our-mission" },
  openGraph: {
    title: "Our Mission | Melon",
    description,
    url: "https://themelon.app/our-mission",
    type: "website",
  },
  twitter: { card: "summary", title: "Our Mission | Melon", description },
  robots: { index: true, follow: true },
};

export default function OurMissionPage() {
  return (
    <main className="bg-white text-ink">
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <header className="mb-10 border-b border-melon-100 pb-8 sm:mb-12">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">Our Mission</h1>
        </header>
        <div className="space-y-7 text-lg leading-8 text-zinc-600">
          <p>Melon began with a simple belief: people deserve to understand what&apos;s in their food. Grocery shopping can mean navigating unfamiliar ingredients, confusing labels, and claims that don&apos;t tell the whole story. We&apos;re building Melon to make that information easier to understand, so people can make informed choices that fit their lives.</p>
          <p>By scanning a product&apos;s barcode, Melon helps you explore its ingredients, additives, nutrition, and level of processing. Our Melon Score brings these factors together with explanations of what contributes to the result. We aim to make food information useful and accessible, whether you&apos;re comparing everyday essentials, exploring alternatives, or simply curious about an ingredient.</p>
          <p>We also recognize that food choices are personal. Allergies, dietary preferences, religious requirements, and health considerations can all influence what someone brings home. Melon aims to help people navigate those differences with clearer information, giving them more confidence to choose according to their needs and values.</p>
          <p>Our mission extends beyond packaged food. Through Local Sources, we help people discover nearby farms, butchers, farmers markets, and independent food producers, encouraging a closer connection with where their food comes from. We want to give small businesses the visibility they deserve, help their work reach more people, and make it easier for customers to build lasting relationships with local producers.</p>
          <p>Our long-term goal is to grow Melon into a food transparency platform and marketplace connecting people directly with local farms, butchers, independent brands, and homemade-food sellers. We envision a place where understanding food and discovering where to buy it go hand in hand. By bringing these connections together, we aim to support more informed food choices, create opportunities for small businesses, and keep more spending within communities.</p>
        </div>
      </article>
    </main>
  );
}
