// Datos del negocio compartidos por la web y los datos estructurados de Google (JSON-LD)
import { SERVICIOS } from "@/content/servicios";
import { CONTACT_EMAIL } from "@/lib/contact";

export const SITE_URL = "https://arreglosexpressmadrid.com";
export const SITE_NAME = "Arreglos Express Madrid";

// Mismo horario que la ficha de Google Business. null = cerrado
export const OPENING_HOURS = [
  { dayKey: "Hours.weekdays", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:30" },
  { dayKey: "Hours.saturday", days: ["Saturday"], opens: "09:00", closes: "14:30" },
  { dayKey: "Hours.sunday", days: ["Sunday"], opens: null, closes: null },
] as const;

export const BUSINESS_ID = `${SITE_URL}/#negocio`;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    description:
      "Arreglos de ropa con recogida y entrega a domicilio en Madrid capital: bajos, estrechar, cremalleras, botones, forros, trajes de ocasión y textil del hogar.",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-mark-512.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    email: CONTACT_EMAIL,
    // negocio de servicio a domicilio: sin calle publicada
    address: { "@type": "PostalAddress", addressLocality: "Madrid", addressRegion: "Madrid", addressCountry: "ES" },
    areaServed: { "@type": "City", name: "Madrid" },
    openingHoursSpecification: OPENING_HOURS.filter((h) => h.opens).map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Arreglos de ropa",
      itemListElement: SERVICIOS.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.nombre, url: `${SITE_URL}/arreglos/${s.slug}` },
      })),
    },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
