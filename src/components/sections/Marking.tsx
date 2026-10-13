'use client';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { whatsappLink } from '@/lib/contact';
import Icono, { type IconoNombre } from "@/components/Icono";

const CASES: { key: string; steps: number; alt: boolean }[] = [
  { key: 'pants', steps: 3, alt: true },
  { key: 'skirt', steps: 2, alt: true },
  { key: 'sleeves', steps: 2, alt: true },
  { key: 'takeIn', steps: 3, alt: true },
  { key: 'zips', steps: 2, alt: false },
];

// Tarjeta de un caso (también se usa en las páginas de servicio)
export function MarkingCard({ caseKey: key }: { caseKey: string }) {
  const { t } = useLanguage();
  const { steps, alt } = CASES.find((c) => c.key === key)!;
  return (
    <article className="flex flex-col rounded-lg border border-border bg-card p-6">
      <Icono name={`marcar-${key}` as IconoNombre} className="h-16 w-16" />
      <h3 className="mt-4 font-headline text-xl font-semibold leading-snug">{t(`Marking.${key}.title`)}</h3>
      <ol className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
        {Array.from({ length: steps }, (_, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              {i + 1}
            </span>
            {t(`Marking.${key}.s${i + 1}`)}
          </li>
        ))}
      </ol>
      {alt && (
        <p className="mt-4 border-t border-dashed border-border pt-3 text-sm text-muted-foreground">
          <span className="font-semibold text-accent">{t('Marking.altLabel')}: </span>
          {t(`Marking.${key}.alt`)}
        </p>
      )}
    </article>
  );
}

export default function Marking() {
  const { t } = useLanguage();

  return (
    <section id="marking" className="w-full py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl space-y-4">
          <Eyebrow>{t('Marking.eyebrow')}</Eyebrow>
          <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t('Marking.title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('Marking.description')}</p>
        </div>

        <div className="mt-10 rounded-lg border border-dashed border-accent/60 bg-card/60 p-5 sm:p-6">
          <h3 className="font-headline text-xl font-semibold">{t('Marking.tipsTitle')}</h3>
          <ul className="mt-3 grid gap-x-8 gap-y-2 text-sm leading-relaxed text-foreground/85 sm:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="flex gap-2">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {t(`Marking.tip${n}`)}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-start gap-2.5 border-t border-dashed border-accent/40 pt-4 text-sm font-medium leading-relaxed text-foreground">
            <Icono name="camiseta" className="h-5 w-5" />
            {t('Marking.reference')}
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map(({ key }) => (
            <MarkingCard key={key} caseKey={key} />
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-4 rounded-lg bg-primary p-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="font-headline text-xl font-semibold leading-snug">{t('Marking.help')}</p>
          <a
            data-umami-event="whatsapp" data-umami-event-origen="como-marcar" href={whatsappLink(t('Marking.helpMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 sm:self-auto"
          >
            <WhatsappIcon className="h-4 w-4" />
            {t('Marking.helpButton')}
          </a>
        </div>
      </div>
    </section>
  );
}
