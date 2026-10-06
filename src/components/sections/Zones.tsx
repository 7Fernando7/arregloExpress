'use client';
import { useEffect, useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { whatsappLink } from '@/lib/contact';
import { estimateDelivery, POSTAL_CODES, toKm, type EstimateResult } from '@/lib/delivery';
import { cn } from '@/lib/utils';

const RINGS_KM = [3, 6, 9];
// contorno del color de fondo para que los textos del mapa se lean sobre los puntos
const HALO = { stroke: 'hsl(var(--card))', strokeWidth: 0.18, paintOrder: 'stroke' } as const;

export default function Zones() {
  const { t, language } = useLanguage();
  const [postalCode, setPostalCode] = useState('');
  const [result, setResult] = useState<EstimateResult | null>(null);

  const locale = language === 'es' ? 'es-ES' : 'en-GB';
  const formatPrice = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    }).format(value);
  const formatKm = (value: number) =>
    new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);

  const points = useMemo(
    () =>
      Object.entries(POSTAL_CODES).map(([cp, [lat, lng]]) => ({ cp, ...toKm(lat, lng) })),
    []
  );

  function calculate(value: string) {
    setPostalCode(value);
    setResult(estimateDelivery(value));
  }

  function onChange(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 5);
    setPostalCode(digits);
    // calcula al completar las 5 cifras; mientras se escribe, sin mensajes de error
    setResult(digits.length === 5 ? estimateDelivery(digits) : null);
  }

  // enlace directo con el cálculo hecho: arreglosexpressmadrid.com/?cp=28010#zones
  useEffect(() => {
    const cp = new URLSearchParams(window.location.search).get('cp');
    if (cp) onChange(cp);
  }, []);

  const estimate = result?.status === 'ok' ? result.estimate : null;
  const selected = estimate ? points.find((p) => p.cp === estimate.postalCode) : null;
  const price = estimate ? formatPrice(estimate.total) : '';

  return (
    <section id="zones" className="w-full border-y border-dashed border-border bg-card/60 py-16 md:py-24">
      <div className="container mx-auto grid max-w-6xl items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0 space-y-8">
          <div className="space-y-4">
            <Eyebrow>{t('Zones.eyebrow')}</Eyebrow>
            <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {t('Zones.title')}
            </h2>
            <p className="text-lg text-muted-foreground">{t('Zones.description')}</p>
          </div>

          <div className="rounded-lg border border-border bg-background p-5 shadow-[0_8px_24px_-4px_rgba(19,41,75,0.08)] sm:p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculate(postalCode);
              }}
              className="space-y-2"
            >
              <label htmlFor="postal-code" className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                {t('Zones.label')}
              </label>
              <div className="flex gap-2">
                <input
                  id="postal-code"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={postalCode}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={t('Zones.placeholder')}
                  className="h-12 w-full min-w-0 flex-1 rounded-md border border-input bg-card px-4 text-lg tracking-[0.15em] outline-none transition-colors placeholder:tracking-normal placeholder:text-muted-foreground/70 focus:border-primary focus:bg-white"
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 rounded-md bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t('Zones.button')}
                </button>
              </div>
            </form>

            <div aria-live="polite" className="mt-4">
              {result?.status === 'invalid' && (
                <p className="text-sm font-medium text-destructive">{t('Zones.invalid')}</p>
              )}
              {result?.status === 'outside' && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">{t('Zones.outside')}</p>
                  <a
                    href={whatsappLink(t('Hero.whatsappMessage'))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                  >
                    <WhatsappIcon className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              )}
              {estimate && (
                <div className="space-y-4 border-t border-dashed border-border pt-4">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-accent" />
                    {t('Zones.distance')
                      .replace('{cp}', estimate.postalCode)
                      .replace('{km}', formatKm(estimate.km))}
                  </p>
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm text-muted-foreground">{t('Zones.approx')}</span>
                    <span className="font-headline text-5xl font-semibold tabular-nums text-foreground">{price}</span>
                    <span className="text-sm font-medium text-foreground">{t('Zones.totalLabel')}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{t('Zones.note')}</p>
                  <a
                    href={whatsappLink(
                      t('Zones.whatsappMessage').replace('{cp}', estimate.postalCode).replace('{price}', price)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-2 text-center text-sm font-semibold sm:w-auto text-accent-foreground transition-colors hover:bg-accent/90"
                  >
                    <WhatsappIcon className="h-4 w-4" />
                    {t('Zones.whatsappButton')}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-md">
          <svg viewBox="-11 -11 22 22" className="w-full" role="img" aria-label={t('Zones.mapTitle')}>
            {RINGS_KM.map((r) => (
              <g key={r}>
                <circle
                  r={r}
                  fill="none"
                  className="stroke-accent/40"
                  strokeWidth={0.06}
                  strokeDasharray="0.25 0.2"
                />
                <text x={0} y={-r - 0.2} textAnchor="middle" fontSize={0.55} {...HALO} className="fill-muted-foreground">
                  {r} km
                </text>
              </g>
            ))}
            {points.map((p) => (
              <circle
                key={p.cp}
                cx={p.x}
                cy={-p.y}
                r={0.28}
                onClick={() => calculate(p.cp)}
                className={cn(
                  'cursor-pointer transition-colors',
                  p.cp === selected?.cp ? 'fill-transparent' : 'fill-primary/35 hover:fill-primary'
                )}
              >
                <title>{p.cp}</title>
              </circle>
            ))}
            {/* taller (Km 0) */}
            <rect x={-0.42} y={-0.42} width={0.84} height={0.84} rx={0.12} className="fill-primary" />
            <text x={0} y={1.25} textAnchor="middle" fontSize={0.62} fontWeight={600} {...HALO} className="fill-primary">
              {t('Zones.mapOrigin')}
            </text>
            {selected && (
              <g>
                <line x1={0} y1={0} x2={selected.x} y2={-selected.y} className="stroke-accent" strokeWidth={0.08} strokeDasharray="0.3 0.2" />
                <circle cx={selected.x} cy={-selected.y} r={0.6} className="fill-accent" />
                <text
                  x={selected.x}
                  y={-selected.y - 0.95}
                  textAnchor="middle"
                  fontSize={0.75}
                  fontWeight={700}
                  {...HALO}
                  className="fill-accent"
                >
                  {selected.cp}
                </text>
              </g>
            )}
          </svg>
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{t('Zones.mapTitle')}</span> · {t('Zones.mapHint')}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
