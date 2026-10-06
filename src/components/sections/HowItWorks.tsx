'use client';
import { CalendarClock, Camera, Truck, Scissors } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';

export default function HowItWorks() {
  const { t } = useLanguage();
  const steps = [
    { icon: Camera, title: t('HowItWorks.step1.title'), description: t('HowItWorks.step1.description') },
    { icon: Truck, title: t('HowItWorks.step2.title'), description: t('HowItWorks.step2.description') },
    { icon: Scissors, title: t('HowItWorks.step3.title'), description: t('HowItWorks.step3.description') },
  ];

  return (
    <section id="how-it-works" className="w-full border-y border-dashed border-border bg-card/60 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <Eyebrow center>{t('HowItWorks.eyebrow')}</Eyebrow>
          <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t('HowItWorks.title')}
          </h2>
        </div>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* costura que une los pasos */}
          <span
            aria-hidden
            className="absolute left-[16.6%] right-[16.6%] top-7 hidden border-t-2 border-dashed border-accent/50 md:block"
          />
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="relative flex flex-col items-center text-center">
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-8 ring-card">
                <Icon className="h-6 w-6" />
              </span>
              <span className="mt-5 font-headline text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-1 font-headline text-2xl font-semibold">{title}</h3>
              <p className="mt-2 max-w-xs text-muted-foreground">{description}</p>
              {index === 0 && (
                <a href="#marking" className="mt-2 text-sm font-semibold text-accent hover:underline">
                  {t('Marking.link')} →
                </a>
              )}
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-12 flex max-w-2xl items-start gap-3 rounded-lg border border-dashed border-accent/60 bg-background p-4 text-sm leading-relaxed text-foreground sm:items-center sm:px-6">
          <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-accent sm:mt-0" />
          {t('HowItWorks.leadTime')}
        </p>
      </div>
    </section>
  );
}
