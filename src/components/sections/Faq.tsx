'use client';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const QUESTIONS = [1, 2, 3, 4, 5];

export default function Faq() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="w-full py-16 md:py-24">
      <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div className="space-y-4">
          <Eyebrow>{t('Faq.eyebrow')}</Eyebrow>
          <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t('Faq.title')}
          </h2>
        </div>
        <Accordion type="single" collapsible defaultValue="q1" className="border-t border-dashed border-border">
          {QUESTIONS.map((n) => (
            <AccordionItem key={n} value={`q${n}`} className="border-b border-dashed border-border">
              <AccordionTrigger className="py-5 text-left font-headline text-xl font-semibold hover:no-underline">
                {t(`Faq.q${n}`)}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {t(`Faq.a${n}`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
