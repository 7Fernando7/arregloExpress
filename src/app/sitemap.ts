import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ROPA_SLUG, SERVICIOS } from "@/content/servicios";

export const dynamic = "force-static";

// Fecha del build: cada publicación actualiza la web
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/arreglos/${ROPA_SLUG}`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICIOS.map((s) => ({
      url: `${SITE_URL}/arreglos/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/politica-privacidad`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
