import type { Metadata } from "next";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import "./globals.css";

const siteUrl = "https://themelon.app";
const siteDescription =
  "Melon scans food labels, explains ingredients, flags additives, and helps shoppers choose better products for their lifestyle.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Melon",
  title: {
    default: "Melon | Food Label Scanner for Healthier Grocery Choices",
    template: "%s | Melon",
  },
  description: siteDescription,
  keywords: [
    "food scanner app",
    "barcode food scanner",
    "ingredient scanner",
    "additive checker",
    "nutrition label scanner",
    "healthy grocery shopping",
    "food label app",
    "halal food scanner",
    "kosher food scanner",
    "vegan food scanner",
    "seed oil scanner",
    "Melon app",
  ],
  authors: [{ name: "AnyHope Corp." }],
  creator: "AnyHope Corp.",
  publisher: "AnyHope Corp.",
  category: "Health & Fitness",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Melon | Food Label Scanner for Healthier Grocery Choices",
    description: siteDescription,
    siteName: "Melon",
    url: siteUrl,
    images: [
      {
        url: "/images/scan-flow-hands.png",
        width: 1536,
        height: 1024,
        alt: "Melon app scanning a food label and showing a product score",
      },
      {
        url: "/images/melon-wordmark.png",
        width: 1280,
        height: 400,
        alt: "Melon logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Melon | Know what's in your food",
    description: siteDescription,
    images: ["/images/scan-flow-hands.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
