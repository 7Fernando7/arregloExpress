import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { GuiasIndice } from "@/components/pages/GuiaBody";
import WhatsappButton from "@/components/WhatsappButton";
import { getWorks } from "@/lib/trabajos";
import { SITE_NAME } from "@/lib/site";

const description =
  "Guías prácticas de arreglos de ropa: cuándo una cremallera tiene arreglo, cuánto se puede estrechar una chaqueta y más. Por Arreglos Express Madrid.";

export const metadata: Metadata = {
  title: "Guías de arreglos de ropa",
  description,
  alternates: { canonical: "/guias" },
  openGraph: { title: "Guías de arreglos de ropa", description, url: "/guias", siteName: SITE_NAME, locale: "es_ES", type: "website" },
};

export default function Guias() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header hasWorks={getWorks().length > 0} />
      <GuiasIndice />
      <WhatsappButton />
      <Footer />
    </div>
  );
}
