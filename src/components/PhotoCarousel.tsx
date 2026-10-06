'use client';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { WorkImage } from '@/lib/trabajos';
import { cn } from '@/lib/utils';

// Carrusel de fotos de un trabajo: deslizar en móvil, flechas en ordenador, puntos abajo
export default function PhotoCarousel({
  images,
  alt,
  labelText,
  className,
  imgClassName,
  onImageClick,
  prevLabel,
  nextLabel,
  startIndex = 0,
}: {
  images: WorkImage[];
  alt: string;
  labelText: (label?: WorkImage['label']) => string | null;
  className?: string;
  imgClassName?: string;
  onImageClick?: (index: number) => void;
  prevLabel: string;
  nextLabel: string;
  startIndex?: number;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1, startIndex });
  const [selected, setSelected] = useState(startIndex);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const multiple = images.length > 1;

  return (
    <div className={cn('group/carousel relative', className)}>
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {images.map((img, i) => (
            <div key={img.src} className="relative h-full min-w-0 shrink-0 grow-0 basis-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={alt}
                loading="lazy"
                onClick={() => onImageClick?.(i)}
                className={cn('h-full w-full', onImageClick && 'cursor-zoom-in', imgClassName)}
              />
              {labelText(img.label) && (
                <span className="absolute left-2 top-2 rounded bg-background/90 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                  {labelText(img.label)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {multiple && (
        <>
          <button
            type="button"
            aria-label={prevLabel}
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow transition-opacity hover:bg-background sm:flex sm:opacity-0 sm:group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow transition-opacity hover:bg-background sm:flex sm:opacity-0 sm:group-hover/carousel:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-background/80 px-2 py-1">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`${i + 1} / ${images.length}`}
                onClick={() => scrollTo(i)}
                className={cn('h-1.5 rounded-full transition-all', i === selected ? 'w-4 bg-accent' : 'w-1.5 bg-foreground/30')}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
