'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

type Example = {
  title: string;
  before: (typeof PlaceHolderImages)[0];
  after: (typeof PlaceHolderImages)[0];
};

export default function AlterationExamples() {
  const { t } = useLanguage();
  const examples: Example[] = [
    {
      title: 'Jeans Hemming',
      before: PlaceHolderImages.find(p => p.id === 'jeans-hem-before')!,
      after: PlaceHolderImages.find(p => p.id === 'jeans-hem-after')!,
    },
    {
      title: 'Shirt Tapering',
      before: PlaceHolderImages.find(p => p.id === 'shirt-taper-before')!,
      after: PlaceHolderImages.find(p => p.id === 'shirt-taper-after')!,
    },
    {
      title: 'Dress Shortening',
      before: PlaceHolderImages.find(p => p.id === 'dress-shorten-before')!,
      after: PlaceHolderImages.find(p => p.id === 'dress-shorten-after')!,
    },
    {
      title: 'Jacket Sleeve Adjustment',
      before: PlaceHolderImages.find(p => p.id === 'jacket-sleeves-before')!,
      after: PlaceHolderImages.find(p => p.id === 'jacket-sleeves-after')!,
    },
  ].filter(e => e.before && e.after);

  return (
    <section id="examples" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('AlterationExamples.title')}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('AlterationExamples.description')}
            </p>
          </div>
        </div>
        <div className="mt-12">
          <Carousel opts={{ loop: true, align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {examples.map((example, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>{t(`AlterationExamples.examples.${example.title.replace(/ /g, '')}`)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <Badge variant="outline">{t('AlterationExamples.before')}</Badge>
                            <div className="aspect-[3/4] overflow-hidden rounded-lg">
                              <Image
                                src={example.before.imageUrl}
                                alt={example.before.description}
                                data-ai-hint={example.before.imageHint}
                                width={600}
                                height={800}
                                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Badge variant="default" className="bg-accent text-accent-foreground">{t('AlterationExamples.after')}</Badge>
                            <div className="aspect-[3/4] overflow-hidden rounded-lg">
                            <Image
                              src={example.after.imageUrl}
                              alt={example.after.description}
                              data-ai-hint={example.after.imageHint}
                              width={600}
                              height={800}
                              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                            />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
