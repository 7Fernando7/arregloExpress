'use client';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '../ui/button';
import { Phone } from 'lucide-react';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground drop-shadow-lg">
              {t('Hero.title')}
            </h1>
            <p className="max-w-[600px] text-lg text-foreground/90 md:text-xl drop-shadow-md">
              {t('Hero.description')}
            </p>
            <div className="flex gap-4">
                <a href="#contact">
                    <Button size="lg" variant="accent">
                        <Phone className="mr-2 h-5 w-5" />
                        {t('Hero.contactButton')}
                    </Button>
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
