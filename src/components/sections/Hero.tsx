'use client';
import Image from 'next/image';
import AIPoweredForm from '@/components/AIPoweredForm';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  const { t } = useLanguage();

  return (
    <section id="suggest-alterations" className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      {heroImage && (
         <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/10 to-transparent" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary-foreground drop-shadow-lg">
              {t('Hero.title')}
            </h1>
            <p className="max-w-[600px] text-lg text-primary-foreground/90 md:text-xl drop-shadow-md">
              {t('Hero.description')}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <AIPoweredForm />
          </div>
        </div>
      </div>
    </section>
  );
}
