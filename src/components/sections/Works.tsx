'use client';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Work } from '@/lib/trabajos';
import { cn } from '@/lib/utils';

const INITIAL = 8;

export default function Works({ works }: { works: Work[] }) {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<Work | null>(null);

  if (works.length === 0) return null;
  const visible = showAll ? works : works.slice(0, INITIAL);
  const labelText = (label?: 'before' | 'after') =>
    label === 'before' ? t('Works.before') : label === 'after' ? t('Works.after') : null;

  return (
    <section id="works" className="w-full py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl space-y-4">
          <Eyebrow>{t('Works.eyebrow')}</Eyebrow>
          <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t('Works.title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('Works.description')}</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {visible.map((work) => (
            <li key={work.id}>
              <button
                type="button"
                onClick={() => setOpen(work)}
                className="group block w-full overflow-hidden rounded-lg border border-border bg-card text-left transition-colors hover:border-dashed hover:border-accent"
              >
                <div className={cn('grid aspect-square', work.images.length > 1 && 'grid-cols-2 gap-px bg-border')}>
                  {work.images.slice(0, 2).map((img) => (
                    <div key={img.src} className="relative h-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={work.caption}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      {labelText(img.label) && (
                        <span className="absolute left-2 top-2 rounded bg-background/90 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                          {labelText(img.label)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="px-3 py-2.5 text-sm font-medium text-foreground">{work.caption}</p>
              </button>
            </li>
          ))}
        </ul>

        {works.length > INITIAL && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex h-11 items-center rounded-md border border-primary/25 px-5 text-sm font-semibold transition-colors hover:border-primary"
            >
              {showAll ? t('Works.showLess') : t('Works.showAll').replace('{n}', String(works.length))}
            </button>
          </div>
        )}
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl border-border bg-background p-4 sm:p-6">
          <DialogTitle className="font-headline text-2xl font-semibold">{open?.caption}</DialogTitle>
          <div className={cn('grid gap-3', (open?.images.length ?? 0) > 1 && 'sm:grid-cols-2')}>
            {open?.images.map((img) => (
              <figure key={img.src} className="space-y-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={open.caption} className="max-h-[70vh] w-full rounded-md object-contain" />
                {labelText(img.label) && (
                  <figcaption className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {labelText(img.label)}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
