"use client";

// Cuerpo de /guias y /guias/[slug]. Español en el HTML estático; inglés en el navegador si se elige EN.
import { Check, ChevronRight } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { GUIAS, guiaPorSlug, textoGuia, uiGuia } from "@/content/guias";
import { servicioPorSlug } from "@/content/servicios";
import { textoServicio } from "@/content/servicios.en";
import { useLanguage } from "@/context/LanguageContext";
import { whatsappLink } from "@/lib/contact";

function Migas({ actual }: { actual?: string }) {
  const { t, language } = useLanguage();
  const ui = uiGuia(language);
  return (
    <nav aria-label={t("ServicePage.breadcrumbs")} className="mb-8 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
      <a href="/" className="hover:text-foreground">{t("ServicePage.home")}</a>
      <ChevronRight className="h-3.5 w-3.5" />
      {actual ? (
        <>
          <a href="/guias" className="hover:text-foreground">{ui.nombre}</a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{actual}</span>
        </>
      ) : (
        <span className="text-foreground">{ui.nombre}</span>
      )}
    </nav>
  );
}

function Tarjetas({ excepto }: { excepto?: string }) {
  const { language } = useLanguage();
  const ui = uiGuia(language);
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {GUIAS.filter((g) => g.slug !== excepto).map((g) => {
        const c = textoGuia(g, language);
        return (
          <li key={g.slug}>
            <a
              href={`/guias/${g.slug}`}
              className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:border-dashed hover:border-accent"
            >
              <h3 className="font-headline text-xl font-semibold leading-snug">{c.titulo}</h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{c.resumen}</p>
              <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent">
                {ui.leer}
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function GuiasIndice() {
  const { language } = useLanguage();
  const ui = uiGuia(language);
  return (
    <main className="flex-grow">
      <section className="container mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-16">
        <Migas />
        <Eyebrow>{ui.nombre}</Eyebrow>
        <h1 className="mt-4 font-headline text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{ui.indiceTitulo}</h1>
        <p className="mb-10 mt-4 text-lg leading-relaxed text-muted-foreground">{ui.indiceTexto}</p>
        <Tarjetas />
      </section>
    </main>
  );
}

export default function GuiaBody({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const g = guiaPorSlug(slug);
  if (!g) return null;
  const c = textoGuia(g, language);
  const ui = uiGuia(language);
  const servicio = servicioPorSlug(g.servicio);

  return (
    <main className="flex-grow">
      <article className="container mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <Migas actual={c.titulo} />
        <Eyebrow>{ui.nombre}</Eyebrow>
        <h1 className="mt-4 font-headline text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{c.titulo}</h1>

        <div className="mt-8 rounded-lg border border-dashed border-accent/60 bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{ui.respuestaCorta}</p>
          <p className="mt-2 text-lg leading-relaxed text-foreground">{c.resumen}</p>
        </div>

        {c.secciones.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="font-headline text-2xl font-semibold tracking-tight sm:text-3xl">{s.h}</h2>
            {s.p && s.lista && s.p.length === 1 && s.p[0].endsWith(":") && (
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">{s.p[0]}</p>
            )}
            {s.lista && (
              <ul className="mt-4 space-y-3">
                {s.lista.map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-relaxed text-foreground/85">
                    <Check className="mt-1.5 h-5 w-5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {s.p
              ?.filter((p) => !(s.lista && s.p?.length === 1 && p.endsWith(":")))
              .map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-foreground/85">{p}</p>
              ))}
          </section>
        ))}

        <p className="mt-10 text-sm text-muted-foreground">{ui.aviso}</p>

        <div className="mt-8 rounded-lg bg-primary p-6 text-primary-foreground sm:p-8">
          <h2 className="font-headline text-2xl font-semibold leading-snug">{ui.ctaTitulo}</h2>
          <p className="mt-2 leading-relaxed text-primary-foreground/80">{ui.ctaTexto}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              data-umami-event="whatsapp" data-umami-event-origen={`guia-${g.slug}`} href={whatsappLink(c.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <WhatsappIcon className="h-5 w-5" />
              {ui.ctaBoton}
            </a>
            {servicio && (
              <a
                href={`/arreglos/${servicio.slug}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-primary-foreground/30 px-6 font-semibold transition-colors hover:border-primary-foreground"
              >
                {ui.servicio}: {textoServicio(servicio, language).nombre}
              </a>
            )}
          </div>
        </div>
      </article>

      {GUIAS.length > 1 && (
        <section className="w-full border-t border-border bg-card py-14">
          <div className="container mx-auto max-w-3xl px-4 md:px-6">
            <h2 className="mb-6 font-headline text-3xl font-semibold tracking-tight">{ui.otras}</h2>
            <Tarjetas excepto={g.slug} />
          </div>
        </section>
      )}
    </main>
  );
}
