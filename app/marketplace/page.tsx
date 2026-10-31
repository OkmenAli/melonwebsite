import type { Metadata } from "next";
import Image from "next/image";

const description = "Melon Marketplace is coming soon: thoughtfully made food, wellness, and everyday health products from independent brands and small businesses.";

export const metadata: Metadata = {
  title: "Marketplace",
  description,
  alternates: { canonical: "/marketplace" },
  openGraph: {
    title: "Marketplace | Melon",
    description,
    url: "https://themelon.app/marketplace",
    type: "website",
  },
  twitter: { card: "summary", title: "Marketplace | Melon", description },
  robots: { index: true, follow: true },
};

export default function MarketplacePage() {
  return (
    <main className="bg-white text-ink">
      <section aria-labelledby="marketplace-heading" className="container-page grid items-center gap-8 py-12 sm:gap-12 sm:py-16 lg:grid-cols-[1.25fr_1fr] lg:gap-10 lg:py-24">
        <div>
          <p className="text-sm font-semibold text-melon-700">Coming soon</p>
          <h1 id="marketplace-heading" className="mt-4 max-w-2xl text-[36px] font-semibold leading-[1.15] sm:text-[44px] lg:text-[52px]">
            <span className="block">Small businesses.</span>
            <span className="block">Better choices.</span>
            <span className="block text-melon-700">One marketplace.</span>
          </h1>
          <div className="mt-7 max-w-xl space-y-5 text-lg leading-8 text-zinc-600">
            <p>We&apos;re building a curated marketplace for thoughtfully made food, wellness, and everyday health products from independent brands and small businesses. A place to discover products with confidence, understand what&apos;s inside, and get to know the people behind them.</p>
            <p>We&apos;re currently bringing together our first sellers&mdash;businesses that value quality, transparency, and the care that goes into their products. Our mission is to make healthier choices easier to find while giving small businesses the visibility and support they deserve.</p>
          </div>
        </div>
        <Image
          src="/images/melon-marketplace-mascot.png"
          alt="Melon's food detective mascot holding a magnifying glass and giving a thumbs-up"
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 520px"
          className="mx-auto h-auto w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[520px]"
        />
      </section>
    </main>
  );
}
