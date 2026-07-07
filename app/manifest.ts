import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Melon",
    short_name: "Melon",
    description:
      "Melon scans food labels, explains ingredients, flags additives, and helps shoppers choose better products for their lifestyle.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#16843a",
    icons: [
      {
        src: "/images/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
