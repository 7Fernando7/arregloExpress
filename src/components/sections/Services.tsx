'use client';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Scissors, Ruler, Replace, CircleDot } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: <Scissors className="h-8 w-8 text-accent" />,
      title: t('Services.service1.title'),
      description: t('Services.service1.description'),
    },
    {
      icon: <Ruler className="h-8 w-8 text-accent" />,
      title: t('Services.service2.title'),
      description: t('Services.service2.description'),
    },
    {
      icon: <Replace className="h-8 w-8 text-accent" />,
      title: t('Services.service3.title'),
      description: t('Services.service3.description'),
    },
    {
      icon: <CircleDot className="h-8 w-8 text-accent" />,
      title: t('Services.service4.title'),
      description: t('Services.service4.description'),
    },
  ];

  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('Services.title')}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('Services.description')}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 mt-12">
          {services.slice(0, 3).map((service, index) => (
            <Card key={index} className="flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
