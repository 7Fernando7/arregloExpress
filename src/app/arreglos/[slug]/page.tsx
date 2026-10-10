import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarClock, Check, ChevronRight, Home, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/sections/HowItWorks";
import { MarkingCard } from "@/components/sections/Marking";
import WhatsappButton from "@/components/WhatsappButton";
import Eyebrow from "@/components/Eyebrow";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { SERVICIOS, servicioPorSlug } from "@/content/servicios";
import { whatsappLink } from "@/lib/contact";
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
  const otros = SERVICIOS.filter((o) => o.slug !== s.slug);

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
        { "@type": "ListItem", position: 2, name: "Arreglos", item: `${SITE_URL}/#services` },
        { "@type": "ListItem", position: 3, name: s.nombre, item: url },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={jsonLd} />
      <Header />
      <main className="flex-grow">
        <section className="w-full">
          <div className="container mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
            <nav aria-label="Migas de pan" className="mb-8 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground">Inicio</a>
              <ChevronRight className="h-3.5 w-3.5" />
              <a href="/#services" className="hover:text-foreground">Arreglos</a>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground">{s.nombre}</span>
            </nav>
            <div className={s.imagen ? "grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16" : ""}>
            <div className="max-w-3xl space-y-6">
              <Eyebrow>A domicilio · Madrid</Eyebrow>
              <h1 className="font-headline text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{s.h1}</h1>
              {s.intro.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-muted-foreground">{p}</p>
              ))}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  href={whatsappLink(s.whatsapp)}
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
            {s.imagen && (
              // mismo marco que la foto de portada
              <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                <div aria-hidden className="absolute -bottom-3 -right-3 h-full w-full rounded-lg border-2 border-dashed border-accent/60" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.imagen.src}
                  alt={s.imagen.alt}
                  width={s.imagen.width}
                  height={s.imagen.height}
                  className="relative aspect-[4/3] w-full rounded-lg object-cover shadow-[0_12px_32px_-8px_rgba(19,41,75,0.25)]"
                />
              </div>
            )}
            </div>
          </div>
        </section>

        <section className="w-full border-y border-dashed border-border bg-card/60 py-14 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Qué incluye</h2>
              {s.incluyeNota && <p className="mt-3 text-sm text-muted-foreground">{s.incluyeNota}</p>}
              <ul className="mt-6 space-y-3">
                {s.incluye.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground/85">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-muted-foreground">
                ¿Tu arreglo no está en la lista? Mándanos una foto por WhatsApp y te decimos si podemos hacerlo.
              </p>
            </div>
            <div className="space-y-3">
              {s.marcar ? (
                <>
                  <h2 className="font-headline text-2xl font-semibold">Cómo preparar la prenda</h2>
                  <MarkingCard caseKey={s.marcar} />
                  <a href="/#marking" className="inline-block text-sm font-semibold text-accent hover:underline">
                    Ver la guía completa para marcar tu prenda →
                  </a>
                </>
              ) : (
                <>
                  <h2 className="font-headline text-2xl font-semibold">Qué necesitamos saber</h2>
                  <ul className="space-y-3 rounded-lg border border-border bg-background p-6 text-sm leading-relaxed text-foreground/85">
                    {s.consejos?.map((c) => (
                      <li key={c} className="flex gap-2.5">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>

        <HowItWorks />

        <section className="w-full py-14 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">Preguntas frecuentes</h2>
            <div className="border-t border-dashed border-border">
              {s.preguntas.map(({ p, r }) => (
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
            <h2 className="font-headline text-3xl font-semibold tracking-tight">Otros arreglos a domicilio</h2>
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
