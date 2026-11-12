import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RopaBody from "@/components/pages/RopaBody";
import WhatsappButton from "@/components/WhatsappButton";
import { getWorks } from "@/lib/trabajos";
import { ROPA_SLUG } from "@/content/servicios";
import { BUSINESS_ID, JsonLd, SITE_NAME, SITE_URL, localBusinessJsonLd } from "@/lib/site";

// Página que agrupa todos los arreglos de ropa (el desplegable «Servicios» lleva aquí)
const TITLE = "Arreglos de ropa a domicilio en Madrid";
const DESCRIPTION =
  "Arreglos y composturas de ropa con recogida y entrega a domicilio en Madrid: bajos, estrechar, cremalleras, botones y forros. Tu costurera, sin salir de casa.";
const URL = `/arreglos/${ROPA_SLUG}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: SITE_NAME, locale: "es_ES", type: "website" },
};

export default function ArregloDeRopaPage() {
  const jsonLd = [
    localBusinessJsonLd(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: TITLE,
      serviceType: "Arreglo de ropa",
      description: DESCRIPTION,
      url: `${SITE_URL}${URL}`,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Madrid" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Arreglo de ropa", item: `${SITE_URL}${URL}` },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={jsonLd} />
      <Header hasWorks={getWorks().length > 0} />
      <RopaBody />
      <WhatsappButton />
      <Footer />
    </div>
  );
}
