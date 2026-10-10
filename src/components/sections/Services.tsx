'use client';
import { Scissors, Ruler, Replace, CircleDot, Sparkles, Layers, Home, Footprints, WashingMachine, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';
import { whatsappLink } from '@/lib/contact';
import { SERVICIOS } from '@/content/servicios';

export default function Services() {
  const { t } = useLanguage();
  const services = [
    { icon: Scissors, key: 'service1' },
    { icon: Ruler, key: 'service2' },
    { icon: Replace, key: 'service3' },
    { icon: CircleDot, key: 'service4' },
    { icon: Sparkles, key: 'service5' },
    { icon: Layers, key: 'service6' },
    { icon: Home, key: 'service7' },
    { icon: Footprints, key: 'service8' },
    { icon: WashingMachine, key: 'service9' },
  ];

  return (
    <section id="services" className="w-full py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl space-y-4">
          <Eyebrow>{t('Services.eyebrow')}</Eyebrow>
          <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t('Services.title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('Services.description')}</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, key }, index) => (
            <a
              key={key}
              href={`/arreglos/${SERVICIOS[index].slug}`}
              className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-dashed hover:border-accent"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-background text-primary ring-1 ring-border transition-colors group-hover:text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-headline text-xl font-semibold leading-snug">
                {t(`Services.${key}.title`)}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {t(`Services.${key}.description`)}
              </p>
              <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-accent">
                {t('Services.more')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
          <article className="flex flex-col justify-between gap-4 rounded-lg bg-primary p-6 text-primary-foreground lg:col-span-3 lg:flex-row lg:items-center">
            <div>
              <h3 className="font-headline text-xl font-semibold leading-snug">{t('Services.askTitle')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">{t('Services.askText')}</p>
            </div>
            <a
              data-umami-event="whatsapp" data-umami-event-origen="servicios-preguntar" href={whatsappLink(t('Services.askMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-accent px-4 py-2 text-sm lg:mt-0 lg:self-center font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <MessageCircle className="h-4 w-4" />
              {t('Services.askButton')}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
