'use client';
import { Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { GOOGLE_REVIEW_URL, whatsappLink } from '@/lib/contact';
import reviewsData from '@/content/resenas.json';
import { cn } from '@/lib/utils';

// Solo reseñas reales copiadas de la ficha de Google (src/content/resenas.json):
// { "nombre": "Ana G.", "texto": "...", "estrellas": 5, "fecha": "2026-10" }
type Review = { nombre: string; texto: string; estrellas: number; fecha?: string };
const REVIEWS = reviewsData as Review[];

export default function Reviews() {
  const { t } = useLanguage();
  const hasGoogle = GOOGLE_REVIEW_URL !== '';
  // hasta tener ficha de Google, la opinión llega por WhatsApp
  const reviewHref = hasGoogle ? GOOGLE_REVIEW_URL : whatsappLink(t('Reviews.ctaMessage'));

  return (
    <section id="reviews" className="w-full border-y border-dashed border-border bg-card/60 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl space-y-4">
          <Eyebrow>{t('Reviews.eyebrow')}</Eyebrow>
          <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t('Reviews.title')}
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure key={review.nombre + review.texto.slice(0, 20)} className="flex flex-col rounded-lg border border-border bg-background p-6">
              <div className="flex gap-0.5 text-accent" aria-label={`${review.estrellas}/5`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-4 w-4" fill={i < review.estrellas ? 'currentColor' : 'none'} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 font-headline text-lg leading-snug text-foreground">
                “{review.texto}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">{review.nombre}</figcaption>
            </figure>
          ))}

          <div
            className={cn(
              'flex flex-col justify-between gap-6 rounded-lg bg-primary p-6 text-primary-foreground',
              REVIEWS.length === 0
                ? 'md:col-span-2 md:flex-row md:items-center md:p-8 lg:col-span-3'
                : 'md:col-span-2 lg:col-span-1'
            )}
          >
            <div>
              <h3 className="font-headline text-2xl font-semibold">{t('Reviews.ctaTitle')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                {REVIEWS.length === 0 ? t('Reviews.empty') : t('Reviews.ctaText')}
              </p>
            </div>
            <a
              data-umami-event="dejar-opinion" href={reviewHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              {hasGoogle ? <Star className="h-4 w-4" /> : <WhatsappIcon className="h-4 w-4" />}
              {t('Reviews.ctaButton')}
            </a>
          </div>
        </div>

        {REVIEWS.length > 0 && <p className="mt-6 text-xs text-muted-foreground">{t('Reviews.source')}</p>}
      </div>
    </section>
  );
}
