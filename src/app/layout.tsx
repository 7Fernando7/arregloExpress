export const metadata: Metadata = {
  title: {
    default: "Arreglos de Ropa, Zapatos y Tintorería a Domicilio en Madrid",
    template: "%s | Arreglos Express",
  },
  description:
    "Arreglos de ropa, zapatos y tintorería con recogida y entrega a domicilio en Madrid capital: bajos, cremalleras, botones y más. Presupuesto por WhatsApp.",
  authors: [{ name: "Arreglos Express Madrid" }],
  creator: "Arreglos Express Madrid",
  publisher: "Arreglos Express Madrid",
  metadataBase: new URL("https://arreglosexpressmadrid.com"),
  openGraph: {
    title: "Arreglos de Ropa, Zapatos y Tintorería a Domicilio en Madrid",
    description:
      "Recogemos tu ropa y tus zapatos en casa o en la oficina, los arreglamos o los llevamos a la tintorería. Todo Madrid capital.",
    url: "https://arreglosexpressmadrid.com",
    siteName: "Arreglos Express Madrid",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="!scroll-smooth scroll-pt-20">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Analítica sin cookies: cloud.umami.is */}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5ddb600d-a58f-474d-b7aa-845c112f01a2" data-domains="arreglosexpressmadrid.com" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
