import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Marking from "@/components/sections/Marking";
import Services from "@/components/sections/Services";
import Works from "@/components/sections/Works";
import Reviews from "@/components/sections/Reviews";
import Zones from "@/components/sections/Zones";
import Payment from "@/components/sections/Payment";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import WhatsappButton from "@/components/WhatsappButton";
import { getWorks } from "@/lib/trabajos";
import type { Metadata } from "next";
import { JsonLd, localBusinessJsonLd } from "@/lib/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const works = getWorks();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <JsonLd data={localBusinessJsonLd()} />
      <Header hasWorks={works.length > 0} />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Marking />
        <Services />
        <Works works={works} />
        <Reviews />
        <Zones />
        <Payment />
        <Faq />
        <Contact />
      </main>
      <WhatsappButton />
      <Footer />

      {/* ✅ FORMULARIO OCULTO PARA NETLIFY (OBLIGATORIO) */}
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        encType="multipart/form-data"
        hidden
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="postal-code" />
        <textarea name="message"></textarea>
        <input type="file" name="image" />
      </form>
    </div>
  );
}
