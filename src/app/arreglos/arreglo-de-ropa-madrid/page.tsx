import type { Metadata } from "next";
import { CalendarClock, ChevronRight, Home, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/sections/HowItWorks";
import WhatsappButton from "@/components/WhatsappButton";
import Eyebrow from "@/components/Eyebrow";
import HeroPhoto from "@/components/HeroPhoto";
import { getWorks } from "@/lib/trabajos";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { ROPA_SLUG, SERVICIOS, serviciosDeRopa } from "@/content/servicios";
import { translations } from "@/lib/i18n";
import { whatsappLink } from "@/lib/contact";
import { BUSINESS_ID, JsonLd, SITE_NAME, SITE_URL, localBusinessJsonLd } from "@/lib/site";

// Página que agrupa todos los arreglos de ropa (el desplegable «Servicios» lleva aquí)
const TITLE = "Arreglos de ropa a domicilio en Madrid";
const DESCRIPTION =
  "Bajos, estrechar, cremalleras, botones, forros, trajes de ocasión y textil del hogar con recogida y entrega a domicilio en Madrid capital.";
const URL = `/arreglos/${ROPA_SLUG}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: SITE_NAME, locale: "es_ES", type: "website" },
};

const PREGUNTAS = [
  {
    p: "¿Cuánto cuesta un arreglo?",
    r: "Depende de la prenda y del arreglo. Mándanos una foto por WhatsApp y te damos el precio antes de recoger nada, sin compromiso.",
  },
  {
    p: "¿Tengo que ir a que me tomen medidas?",
    r: "No. Puedes marcar la prenda tú en casa con imperdibles, siguiendo nuestra guía, o mandarnos otra prenda que te quede como quieres.",
  },
  {
    p: "¿Cuánto tardáis?",
    r: "Necesitamos un mínimo de 3 días entre la recogida y la entrega. Si lo necesitas antes, dínoslo e intentaremos hacerlo, pero no podemos garantizarlo.",
  },
];

export default function ArregloDeRopaPage() {
  const ropa = serviciosDeRopa();
  // descripción corta de cada servicio: la misma de las tarjetas de la portada
  const resumen = (slug: string) => {
    const i = SERVICIOS.findIndex((s) => s.slug === slug) + 1;
    return (translations.es.Services as Record<string, { description?: string }>)[`service${i}`]?.description ?? "";
  };
  const otros = SERVICIOS.filter((s) => s.categoria !== "ropa");

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
      <main className="flex-grow">
        <section className="w-full">
          <div className="container mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
            <nav aria-label="Migas de pan" className="mb-8 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground">Inicio</a>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground">Arreglo de ropa</span>
            </nav>
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div className="max-w-3xl space-y-6">
                <Eyebrow>A domicilio · Madrid</Eyebrow>
                <h1 className="font-headline text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{TITLE}</h1>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Bajos, ajustes, cremalleras, botones, forros, trajes de ocasión y textil del hogar. Recogemos tus prendas en
                  casa o en la oficina, las arreglamos en el taller y te las devolvemos listas para usar.
                </p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <a
                    data-umami-event="whatsapp" data-umami-event-origen="servicio-arreglo-de-ropa" href={whatsappLink("¡Hola! Quiero presupuesto para un arreglo de ropa.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <WhatsappIcon className="h-5 w-5" />
                    Pedir por WhatsApp
                  </a>
                  <a
                    href="/#zones"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-primary/25 px-6 font-semibold text-foreground transition-colors hover:border-primary"
                  >
                    <Home className="h-5 w-5" />
                    Calcular recogida
                  </a>
                </div>
                <ul className="grid gap-3 border-t border-dashed border-border pt-6 text-sm font-medium text-foreground/85 sm:grid-cols-3">
                  <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />Recogida y entrega en todo Madrid capital</li>
                  <li className="flex items-start gap-2.5"><MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />Presupuesto sin compromiso con una foto</li>
                  <li className="flex items-start gap-2.5"><CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />Mínimo 3 días entre recogida y entrega</li>
                </ul>
              </div>
              <HeroPhoto
                src="/brand/taller.jpg"
                alt="Manos cosiendo una prenda en un taller de costura"
                width={1200}
                height={896}
                badgeTitle="Mándanos una foto"
                badgeText="y te decimos el precio de tu arreglo."
                badgeButton="Abrir WhatsApp"
                whatsappMessage="¡Hola! Os mando una foto de la prenda que quiero arreglar."
              />
            </div>
          </div>
        </section>

        <section className="w-full border-y border-dashed border-border bg-card/60 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Qué arreglamos</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Cada prenda es distinta: mándanos una foto por WhatsApp y te damos el precio exacto.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ropa.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`/arreglos/${s.slug}`}
                    className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:border-dashed hover:border-accent"
                  >
                    <h3 className="font-headline text-xl font-semibold leading-snug">{s.nombre}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{resumen(s.slug)}</p>
                    <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent">
                      Más información
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex flex-col justify-between rounded-lg bg-primary p-6 text-primary-foreground">
                <div>
                  <h3 className="font-headline text-xl font-semibold leading-snug">¿Te toca marcar la prenda?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                    Bajos, mangas o ajustes: te explicamos cómo hacerlo en casa en dos minutos.
                  </p>
                </div>
                <a
                  href="/#marking"
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Cómo marcar tu prenda
                </a>
              </li>
            </ul>
          </div>
        </section>

        <HowItWorks />

        <section className="w-full py-14 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Preguntas frecuentes</h2>
            <div className="border-t border-dashed border-border">
              {PREGUNTAS.map(({ p, r }) => (
                <details key={p} className="group border-b border-dashed border-border py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-headline text-xl font-semibold">
                    {p}
                    <ChevronRight className="h-5 w-5 shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full border-t border-dashed border-border bg-card/60 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="font-headline text-3xl font-semibold tracking-tight">Otros servicios a domicilio</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otros.map((o) => (
                <li key={o.slug}>
                  <a
                    href={`/arreglos/${o.slug}`}
                    className="flex items-center justify-between rounded-lg border border-border bg-background px-5 py-4 font-medium transition-colors hover:border-dashed hover:border-accent"
                  >
                    {o.nombre}
                    <ChevronRight className="h-4 w-4 text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <WhatsappButton />
      <Footer />
    </div>
  );
}
