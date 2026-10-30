'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { whatsappLink } from '@/lib/contact';
import { estimateDelivery, estimateFromCoords, POSTAL_CODES, toKm, type EstimateResult } from '@/lib/delivery';
import { searchAddress, type AddressSuggestion } from '@/lib/geocoder';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import Icono from "@/components/Icono";

const RINGS_KM = [3, 6, 9];
// contorno del color de fondo para que los textos del mapa se lean sobre los puntos
const HALO = { stroke: 'hsl(var(--card))', strokeWidth: 0.18, paintOrder: 'stroke' } as const;

// solo cifras: se trata como código postal; con letras, como dirección
const isPostalInput = (value: string) => /^\d*$/.test(value.trim());

export default function Zones() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(''); // texto a buscar en CartoCiudad
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [result, setResult] = useState<EstimateResult | { status: 'notfound' } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setQuery(value);
    setOpen(false);
    const r = estimateDelivery(value);
    setResult(r);
    track('calcular-recogida', { cp: value, resultado: r.status });
  }

  function onChange(value: string) {
    if (isPostalInput(value)) {
      const digits = value.trim().slice(0, 5);
      setQuery(digits);
      setSearch('');
      // calcula al completar las 5 cifras; mientras se escribe, sin mensajes de error
      const r = digits.length === 5 ? estimateDelivery(digits) : null;
      setResult(r);
      if (r) track('calcular-recogida', { cp: digits, resultado: r.status });
      return;
    }
    setQuery(value);
    setSearch(value);
    setOpen(true);
    setResult(null);
  }

  // sugerencias de direcciones mientras se escribe
  useEffect(() => {
    const q = search.trim();
    if (q.length < 3) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      searchAddress(q, controller.signal)
        .then((s) => {
          setSuggestions(s);
          setActive(-1);
        })
        .catch(() => {});
    }, 250);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  function choose(s: AddressSuggestion) {
    // calle sin número: se completa el campo y se sigue buscando con el número
    if (!s.coords) {
      const value = `${s.label} `;
      setQuery(value);
      setSearch(value);
      setOpen(true);
      inputRef.current?.focus();
      return;
    }
    setQuery(s.label);
    setSearch('');
    setOpen(false);
    setResult({ status: 'ok', estimate: estimateFromCoords(s.coords.lat, s.coords.lng, s.postalCode, s.label) });
    // a la analítica solo va el código postal, nunca la dirección
    track('calcular-recogida', { cp: s.postalCode, resultado: 'ok', modo: 'direccion' });
  }

  async function onSubmit() {
    const q = query.trim();
    if (isPostalInput(q)) return calculate(q);
    if (open && suggestions[active]) return choose(suggestions[active]);
    try {
      const found = await searchAddress(q);
      const pick = found.find((s) => s.coords) ?? found[0];
      if (pick) return choose(pick);
    } catch {}
    setOpen(false);
    setResult({ status: 'notfound' });
    track('calcular-recogida', { resultado: 'no-encontrada', modo: 'direccion' });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showList) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a <= 0 ? suggestions.length - 1 : a - 1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  // enlace directo con el cálculo hecho: arreglosexpressmadrid.com/?cp=28010#zones
  useEffect(() => {
    const cp = new URLSearchParams(window.location.search).get('cp');
    if (cp) onChange(cp);
  }, []);

  const estimate = result?.status === 'ok' ? result.estimate : null;
  const selected = estimate
    ? { cp: estimate.postalCode, exact: !!estimate.address, ...toKm(estimate.lat, estimate.lng) }
    : null;
  const price = estimate ? formatPrice(estimate.total) : '';
  const showList = open && suggestions.length > 0 && !isPostalInput(query);

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
                onSubmit();
              }}
              className="space-y-2"
            >
              <label htmlFor="postal-code" className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">
                {t('Zones.label')}
              </label>
              <div className="relative flex gap-2">
                <input
                  ref={inputRef}
                  id="postal-code"
                  role="combobox"
                  aria-expanded={showList}
                  aria-controls="address-suggestions"
                  aria-autocomplete="list"
                  aria-activedescendant={showList && active >= 0 ? `address-option-${active}` : undefined}
                  autoComplete="off"
                  value={query}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={onKeyDown}
                  onBlur={() => setOpen(false)}
                  placeholder={t('Zones.placeholder')}
                  className={cn(
                    'h-12 w-full min-w-0 flex-1 rounded-md border border-input bg-card px-4 text-lg outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:bg-white',
                    query && isPostalInput(query) && 'tracking-[0.15em]'
                  )}
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 rounded-md bg-primary px-5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t('Zones.button')}
                </button>
                {showList && (
                  <ul
                    id="address-suggestions"
                    role="listbox"
                    className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-auto rounded-md border border-border bg-card py-1 shadow-lg"
                  >
                    {suggestions.map((s, i) => (
                      <li
                        key={s.id}
                        id={`address-option-${i}`}
                        role="option"
                        aria-selected={i === active}
                        // que el clic no cierre la lista antes de elegir (blur del input)
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => choose(s)}
                        className={cn(
                          'flex cursor-pointer items-baseline justify-between gap-3 px-4 py-2.5 text-sm',
                          i === active ? 'bg-primary/10' : 'hover:bg-muted'
                        )}
                      >
                        <span className="min-w-0 truncate text-foreground">{s.label}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {s.coords ? s.postalCode : t('Zones.addNumber')}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground">
                <a href="https://www.cartociudad.es" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {t('Zones.attribution')}
                </a>
              </p>
            </form>

            <div aria-live="polite" className="mt-4">
              {result?.status === 'invalid' && (
                <p className="text-sm font-medium text-destructive">{t('Zones.invalid')}</p>
              )}
              {result?.status === 'notfound' && (
                <p className="text-sm font-medium text-destructive">{t('Zones.notFound')}</p>
              )}
              {result?.status === 'outside' && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">{t('Zones.outside')}</p>
                  <a
                    data-umami-event="whatsapp" data-umami-event-origen="calculador-fuera-de-zona" href={whatsappLink(t('Hero.whatsappMessage'))}
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
                    <Icono name="ubicacion" className="h-5 w-5" />
                    {t('Zones.distance')
                      .replace('{place}', estimate.address ? `${estimate.address} (${estimate.postalCode})` : estimate.postalCode)
                      .replace('{km}', formatKm(estimate.km))}
                  </p>
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm text-muted-foreground">{t('Zones.approx')}</span>
                    <span className="font-headline text-5xl font-semibold tabular-nums text-foreground">{price}</span>
                    <span className="text-sm font-medium text-foreground">{t('Zones.totalLabel')}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{t('Zones.note')}</p>
                  <p className="flex gap-2 rounded-md bg-accent/10 px-3 py-2 text-xs leading-relaxed text-foreground">
                    <Icono name="paquete" className="h-5 w-5" />
                    {t('Zones.bulky')}
                  </p>
                  <a
                    data-umami-event="pedir-recogida" href={whatsappLink(
                      (estimate.address
                        ? t('Zones.whatsappMessageAddress').replace('{address}', estimate.address)
                        : t('Zones.whatsappMessage')
                      )
                        .replace('{cp}', estimate.postalCode)
                        .replace('{price}', price)
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
                  !selected?.exact && p.cp === selected?.cp ? 'fill-transparent' : 'fill-primary/35 hover:fill-primary'
                )}
              />
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
