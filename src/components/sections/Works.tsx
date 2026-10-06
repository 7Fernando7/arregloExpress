'use client';
import { useState } from 'react';
import { Images } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';
import PhotoCarousel from '@/components/PhotoCarousel';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Work } from '@/lib/trabajos';

const INITIAL = 8;

export default function Works({ works }: { works: Work[] }) {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<{ work: Work; index: number } | null>(null);

  if (works.length === 0) return null;
  const visible = showAll ? works : works.slice(0, INITIAL);
  const labelText = (label?: 'before' | 'after') =>
    label === 'before' ? t('Works.before') : label === 'after' ? t('Works.after') : null;
  const nav = { prevLabel: t('Works.prev'), nextLabel: t('Works.next') };

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
            <li
              key={work.id}
              className="overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-dashed hover:border-accent"
            >
              <PhotoCarousel
                images={work.images}
                alt={work.caption}
                labelText={labelText}
                className="aspect-square"
                imgClassName="object-cover"
                onImageClick={(index) => setOpen({ work, index })}
                {...nav}
              />
              <p className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm font-medium text-foreground">
                {work.caption}
                {work.images.length > 1 && (
                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <Images className="h-3.5 w-3.5" />
                    {work.images.length}
                  </span>
                )}
              </p>
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
        <DialogContent className="max-w-3xl border-border bg-background p-4 sm:p-6">
          <DialogTitle className="font-headline text-2xl font-semibold">{open?.work.caption}</DialogTitle>
          {open && (
            <PhotoCarousel
              key={open.work.id}
              images={open.work.images}
              alt={open.work.caption}
              labelText={labelText}
              startIndex={open.index}
              className="h-[70vh] rounded-md bg-card"
              imgClassName="object-contain"
              {...nav}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
