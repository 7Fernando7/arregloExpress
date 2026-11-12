import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicioBody from "@/components/pages/ServicioBody";
import WhatsappButton from "@/components/WhatsappButton";
import { getWorks } from "@/lib/trabajos";
import { ROPA_SLUG, SERVICIOS, servicioPorSlug } from "@/content/servicios";
import { BUSINESS_ID, JsonLd, SITE_NAME, SITE_URL, localBusinessJsonLd } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const s = servicioPorSlug((await params).slug);
  if (!s) return {};
  const url = `/arreglos/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url, siteName: SITE_NAME, locale: "es_ES", type: "website" },
  };
}

export default async function ServicioPage({ params }: Params) {
  const s = servicioPorSlug((await params).slug);
  if (!s) notFound();
  const url = `${SITE_URL}/arreglos/${s.slug}`;
  const esRopa = s.categoria === "ropa";

  const jsonLd = [
    localBusinessJsonLd(),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.h1,
      serviceType: s.nombre,
      description: s.metaDescription,
      url,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: "Madrid" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        ...(esRopa ? [{ "@type": "ListItem", position: 2, name: "Arreglo de ropa", item: `${SITE_URL}/arreglos/${ROPA_SLUG}` }] : []),
        { "@type": "ListItem", position: esRopa ? 3 : 2, name: s.nombre, item: url },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={jsonLd} />
      <Header hasWorks={getWorks().length > 0} />
      <ServicioBody slug={s.slug} />
      <WhatsappButton />
      <Footer />
    </div>
  );
}
