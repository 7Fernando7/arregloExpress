import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Scissors, Ruler, Replace, CircleDot } from 'lucide-react';

const services = [
  {
    icon: <Scissors className="h-8 w-8 text-accent" />,
    title: 'Hemming & Shortening',
    description: "Pants, skirts, dresses, sleeves. We'll find the perfect length.",
  },
  {
    icon: <Ruler className="h-8 w-8 text-accent" />,
    title: 'Resizing & Tapering',
    description: 'Taking in or letting out seams for a custom, flattering fit.',
  },
  {
    icon: <Replace className="h-8 w-8 text-accent" />,
    title: 'Zip Repair & Replacement',
    description: 'Fixing or replacing broken zippers on jackets, pants, and bags.',
  },
  {
    icon: <CircleDot className="h-8 w-8 text-accent" />,
    title: 'Button & Fastener Service',
    description: 'Replacing missing buttons, snaps, and other fasteners.',
  },
];

export default function Services() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a wide range of professional alteration services to breathe new life into your wardrobe.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 mt-12">
          {services.map((service, index) => (
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
