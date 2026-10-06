'use client';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { whatsappLink } from '@/lib/contact';

// Dibujos de línea (64x64): prenda en azul, marca de costura e imperdibles en terracota
function Pin({ x, y, vertical = false }: { x: number; y: number; vertical?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${vertical ? 90 : 0})`} className="stroke-accent">
      <path d="M-4 0h7" strokeWidth={1.4} />
      <circle cx={-4.6} cy={0} r={1.3} className="fill-accent" stroke="none" />
    </g>
  );
}
const Seam = (props: React.SVGProps<SVGPathElement>) => (
  <path {...props} className="stroke-accent" strokeWidth={1.6} strokeDasharray="2.5 2" />
);

const ILLUSTRATIONS: Record<string, React.ReactNode> = {
  pants: (
    <>
      <path d="M20 8h24l3 48H35l-3-32-3 32H17z" />
      <path d="M20 13h24" />
      <Seam d="M17.6 47h11.4" />
      <Pin x={23} y={50.5} />
    </>
  ),
  skirt: (
    <>
      <path d="M24 10h16l8 44H16z" />
      <path d="M23.2 15h17.6" />
      <Seam d="M17.6 45h28.8" />
      <Pin x={26} y={48.5} />
      <Pin x={38} y={48.5} />
    </>
  ),
  sleeves: (
    <>
      <path d="M22 8l-6 2-10 20 6 3 6-11v34h28V22l6 11 6-3-10-20-6-2c-2 4-18 4-20 0z" />
      <Seam d="M8.2 25.6l6.2 3" />
      <Pin x={12} y={23} />
    </>
  ),
  takeIn: (
    <>
      <path d="M22 8l-6 2-10 20 6 3 6-11v34h28V22l6 11 6-3-10-20-6-2c-2 4-18 4-20 0z" />
      <Seam d="M22 26v26" />
      <Seam d="M42 26v26" />
      <Pin x={22} y={32} vertical />
      <Pin x={22} y={44} vertical />
      <Pin x={42} y={32} vertical />
      <Pin x={42} y={44} vertical />
    </>
  ),
  zips: (
    <>
      <path d="M14 8h36v48H14z" />
      <path d="M32 12v34" className="stroke-accent" strokeWidth={1.4} />
      {[15, 20, 25, 30, 35, 40].map((y) => (
        <path key={y} d={`M29 ${y}h6`} strokeWidth={1.2} />
      ))}
      <path d="M30 46h4v6h-4z" className="fill-accent stroke-accent" />
      <circle cx={22} cy={22} r={1.8} />
      <circle cx={22} cy={34} r={1.8} />
    </>
  ),
};

const CASES: { key: string; steps: number; alt: boolean }[] = [
  { key: 'pants', steps: 3, alt: true },
  { key: 'skirt', steps: 2, alt: true },
  { key: 'sleeves', steps: 2, alt: true },
  { key: 'takeIn', steps: 3, alt: true },
  { key: 'zips', steps: 2, alt: false },
];

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
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map(({ key, steps, alt }) => (
            <article key={key} className="flex flex-col rounded-lg border border-border bg-card p-6">
              <svg
                viewBox="0 0 64 64"
                className="h-16 w-16 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinejoin="round"
                strokeLinecap="round"
                aria-hidden
              >
                {ILLUSTRATIONS[key]}
              </svg>
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
          ))}
          <article className="flex flex-col justify-between rounded-lg bg-primary p-6 text-primary-foreground">
            <p className="font-headline text-xl font-semibold leading-snug">{t('Marking.help')}</p>
            <a
              href={whatsappLink(t('Marking.helpMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 self-start rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <WhatsappIcon className="h-4 w-4" />
              {t('Marking.helpButton')}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
