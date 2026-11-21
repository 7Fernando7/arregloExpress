import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GuiaBody from "@/components/pages/GuiaBody";
import WhatsappButton from "@/components/WhatsappButton";
import { getWorks } from "@/lib/trabajos";
import { GUIAS, guiaPorSlug } from "@/content/guias";
import { BUSINESS_ID, JsonLd, SITE_NAME, SITE_URL } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const g = guiaPorSlug((await params).slug);
  if (!g) return {};
  const url = `/guias/${g.slug}`;
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: g.metaTitle, description: g.metaDescription, url, siteName: SITE_NAME, locale: "es_ES", type: "article" },
  };
}

export default async function GuiaPage({ params }: Params) {
  const g = guiaPorSlug((await params).slug);
  if (!g) notFound();
  const url = `${SITE_URL}/guias/${g.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.titulo,
      description: g.metaDescription,
      datePublished: g.fecha,
      dateModified: g.fecha,
      inLanguage: "es",
      mainEntityOfPage: url,
      author: { "@id": BUSINESS_ID },
      publisher: { "@id": BUSINESS_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE_URL}/guias` },
        { "@type": "ListItem", position: 3, name: g.titulo, item: url },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={jsonLd} />
      <Header hasWorks={getWorks().length > 0} />
      <GuiaBody slug={g.slug} />
      <WhatsappButton />
      <Footer />
    </div>
  );
}
