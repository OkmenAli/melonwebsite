import type { Metadata } from "next";
import Image from "next/image";

const description = "Discover nearby farms, butchers, farmers markets, and independent food producers. Learn how Melon connects communities with local food sources.";

export const metadata: Metadata = {
  title: "Local Sources",
  description,
  alternates: { canonical: "/local-sources" },
  openGraph: {
    type: "website",
    url: "https://themelon.app/local-sources",
    title: "Local Sources | Melon",
    description,
    siteName: "Melon",
    images: [{ url: "/images/local-sources-screen.png", alt: "Melon Local Sources filters, map, and producer profile" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Sources | Melon",
    description,
    images: ["/images/local-sources-screen.png"],
  },
  robots: { index: true, follow: true },
};

export default function LocalSourcesPage() {
  return (
    <main className="bg-white text-ink">
      <div className="container-page py-12 sm:py-16 lg:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">Local Sources</h1>
          <p className="mt-5 text-lg leading-8 text-melon-700 sm:text-xl">Closer to your food. Closer to your community.</p>
        </header>

        <section aria-labelledby="mission-heading" className="mx-auto max-w-3xl pt-10 sm:pt-12">
          <h2 id="mission-heading" className="text-3xl font-bold">Our mission</h2>
          <div className="mt-6 space-y-6 text-lg leading-8 text-zinc-600">
            <p>Melon Local Sources helps people reconnect with where their food comes from. By making nearby farms, butchers, farmers markets, and independent producers easier to discover, we help you find food that fits your dietary needs and values, get to know the people behind it, and build lasting relationships. We want to give small businesses the visibility they deserve and help more of your spending stay within your community.</p>
            <p>Our long-term goal is to grow Local Sources into a marketplace where people can shop directly from local farms, butchers, independent brands, and homemade-food sellers. By making those connections easier, we aim to strengthen local food networks and make supporting small producers part of everyday life.</p>
          </div>
        </section>

        <figure className="mx-auto mt-10 max-w-6xl sm:mt-14">
          <Image
            src="/images/local-sources-screen.png"
            alt="Three Melon app screens showing food and distance filters, nearby producers on a map, and a local farm profile"
            width={1672}
            height={941}
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 80px), 1152px"
            priority
            className="h-auto w-full"
            style={{ maskImage: "linear-gradient(to bottom, transparent, black 4%, black 94%, transparent), linear-gradient(to right, transparent, black 4%, black 96%, transparent)", maskComposite: "intersect" }}
          />
        </figure>

      </div>
    </main>
  );
}
