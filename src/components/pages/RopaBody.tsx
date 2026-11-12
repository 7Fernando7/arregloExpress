"use client";

// Cuerpo de /arreglos/arreglo-de-ropa-madrid. Español en el HTML estático; inglés en el navegador si se elige EN.
import { ChevronRight } from "lucide-react";
import HowItWorks from "@/components/sections/HowItWorks";
import Eyebrow from "@/components/Eyebrow";
import HeroPhoto from "@/components/HeroPhoto";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { SERVICIOS, serviciosDeRopa } from "@/content/servicios";
import { textoServicio } from "@/content/servicios.en";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";
import { whatsappLink } from "@/lib/contact";
import Icono from "@/components/Icono";

export default function RopaBody() {
  const { t, language } = useLanguage();
  const ropa = serviciosDeRopa();
  // descripción corta de cada servicio: la misma de las tarjetas de la portada
  const resumen = (slug: string) => {
    const i = SERVICIOS.findIndex((s) => s.slug === slug) + 1;
    return (translations[language].Services as Record<string, { description?: string }>)[`service${i}`]?.description ?? "";
  };
  const otros = SERVICIOS.filter((s) => s.categoria !== "ropa");
  const preguntas = [1, 2, 3].map((n) => ({ p: t(`RopaPage.faq${n}q`), r: t(`RopaPage.faq${n}a`) }));

  return (
    <main className="flex-grow">
      <section className="w-full">
        <div className="container mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
          <nav aria-label={t("ServicePage.breadcrumbs")} className="mb-8 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <a href="/" className="hover:text-foreground">{t("ServicePage.home")}</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{t("ServicePage.clothes")}</span>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="max-w-3xl space-y-6">
              <Eyebrow>{t("ServicePage.eyebrow")}</Eyebrow>
              <h1 className="font-headline text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{t("RopaPage.title")}</h1>
              <p className="text-lg leading-relaxed text-muted-foreground">{t("RopaPage.intro")}</p>
              <p className="text-lg leading-relaxed text-muted-foreground">{t("RopaPage.intro2")}</p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  data-umami-event="whatsapp" data-umami-event-origen="servicio-arreglo-de-ropa" href={whatsappLink(t("RopaPage.whatsapp"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <WhatsappIcon className="h-5 w-5" />
                  {t("ServicePage.order")}
                </a>
                <a
                  href="/#zones"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-primary/25 px-6 font-semibold text-foreground transition-colors hover:border-primary"
                >
                  <Icono name="casa" className="h-5 w-5" />
                  {t("ServicePage.calc")}
                </a>
              </div>
              <ul className="grid gap-3 border-t border-dashed border-border pt-6 text-sm font-medium text-foreground/85 sm:grid-cols-3">
                <li className="flex items-start gap-2.5"><Icono name="ubicacion" className="h-5 w-5" />{t("ServicePage.usp1")}</li>
                <li className="flex items-start gap-2.5"><Icono name="chat" className="h-5 w-5" />{t("ServicePage.usp2")}</li>
                <li className="flex items-start gap-2.5"><Icono name="calendario" className="h-5 w-5" />{t("ServicePage.usp3")}</li>
              </ul>
            </div>
            <HeroPhoto
              src="/brand/taller.jpg"
              alt={t("RopaPage.photoAlt")}
              width={1200}
              height={896}
              badgeTitle={t("ServicePage.badgeTitle")}
              badgeText={t("ServicePage.badgeText")}
              badgeButton={t("ServicePage.badgeButton")}
              whatsappMessage={t("RopaPage.photoMessage")}
            />
          </div>
        </div>
      </section>

      <section className="w-full border-y border-dashed border-border bg-card/60 py-14 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">{t("RopaPage.whatWeFix")}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t("RopaPage.whatWeFixText")}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ropa.map((s) => (
              <li key={s.slug}>
                <a
                  href={`/arreglos/${s.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:border-dashed hover:border-accent"
                >
                  <h3 className="font-headline text-xl font-semibold leading-snug">{textoServicio(s, language).nombre}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{resumen(s.slug)}</p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent">
                    {t("RopaPage.more")}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
            <li className="flex flex-col justify-between rounded-lg bg-primary p-6 text-primary-foreground">
              <div>
                <h3 className="font-headline text-xl font-semibold leading-snug">{t("RopaPage.markTitle")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">{t("RopaPage.markText")}</p>
              </div>
              <a
                href="/#marking"
                className="mt-6 inline-flex items-center gap-2 self-start rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                {t("RopaPage.markButton")}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <HowItWorks />

      <section className="w-full py-14 md:py-20">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl">{t("ServicePage.faq")}</h2>
          <div className="border-t border-dashed border-border">
            {preguntas.map(({ p, r }) => (
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
          <h2 className="font-headline text-3xl font-semibold tracking-tight">{t("ServicePage.others")}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otros.map((o) => (
              <li key={o.slug}>
                <a
                  href={`/arreglos/${o.slug}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-5 py-4 font-medium transition-colors hover:border-dashed hover:border-accent"
                >
                  {textoServicio(o, language).nombre}
                  <ChevronRight className="h-4 w-4 text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
