import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/privacy", "/terms", "/support"];

  return routes.map((route) => ({
    url: `https://themelon.app${route}`,
    lastModified: new Date("2026-06-30"),
  }));
}


