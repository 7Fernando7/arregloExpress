'use client';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, Truck, Scissors } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();
  const steps = [
    {
      icon: <Phone className="h-10 w-10 text-primary" />,
      title: t('HowItWorks.step1.title'),
      description: t('HowItWorks.step1.description'),
    },
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: t('HowItWorks.step2.title'),
      description: t('HowItWorks.step2.description'),
    },
    {
      icon: <Scissors className="h-10 w-10 text-primary" />,
      title: t('HowItWorks.step3.title'),
      description: t('HowItWorks.step3.description'),
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">{t('HowItWorks.badge')}</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('HowItWorks.title')}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('HowItWorks.description')}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:grid-cols-3 lg:gap-10 mt-12">
          {steps.map((step, index) => (
            <Card key={index} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-center mb-4">{step.icon}</div>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
