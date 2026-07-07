import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://themelon.app"),
  title: {
    default: "Melon | Know what's in your food",
    template: "%s | Melon",
  },
  description:
    "Melon scans food labels, explains ingredients, flags additives, and helps you choose better products for your lifestyle.",
  keywords: [
    "food scanner",
    "ingredient scanner",
    "additive checker",
    "healthy grocery shopping",
    "halal food scanner",
    "kosher food scanner",
    "Melon",
  ],
  openGraph: {
    title: "Melon | Know what's in your food",
    description:
      "Scan food labels, understand ingredients, flag additives, and choose better products for your lifestyle.",
    siteName: "Melon",
    url: "https://themelon.app",
    images: [{ url: "/images/melon-wordmark.png", width: 1280, height: 400, alt: "Melon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melon | Know what's in your food",
    description: "Food label scanning and ingredient clarity for smarter grocery shopping.",
    images: ["/images/melon-wordmark.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

