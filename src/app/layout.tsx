export const metadata: Metadata = {
  title: "Arreglos Express Madrid | Arreglos de Ropa a Domicilio",
  description:
    "Servicio profesional de arreglos de ropa en Madrid con recogida y entrega a domicilio. Bajos, cremalleras, ajustes, confección y más.",
  keywords: [
    "arreglos de ropa madrid",
    "costurera en madrid",
    "arreglos a domicilio madrid",
    "modista madrid",
    "arreglos express madrid",
    "arreglos de pantalones madrid",
    "arreglos de vestidos madrid",
  ],
  authors: [{ name: "Arreglos Express Madrid" }],
  creator: "Arreglos Express Madrid",
  publisher: "Arreglos Express Madrid",
  metadataBase: new URL("https://arreglosexpressmadrid.com"),
  openGraph: {
    title: "Arreglos Express Madrid | Arreglos de Ropa a Domicilio",
    description:
      "Arreglos de ropa profesionales en Madrid con recogida y entrega a domicilio.",
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
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
