import type { Metadata } from "next";
import ReciboTool from "@/components/pages/ReciboTool";

// Herramienta interna: no se enlaza desde la web, no va al sitemap y no se indexa.
export const metadata: Metadata = {
  title: "Recibo",
  robots: { index: false, follow: false },
};

export default function Recibo() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ReciboTool />
    </div>
  );
}
