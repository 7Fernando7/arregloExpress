import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UploadCloud, Sparkles, Phone, Truck } from 'lucide-react';

const steps = [
  {
    icon: <UploadCloud className="h-10 w-10 text-primary" />,
    title: '1. Upload a Photo',
    description: 'Snap a picture of your garment and upload it to our AI-powered tool.',
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: '2. Get Suggestions',
    description: 'Our AI analyzes your photo and suggests professional alterations in seconds.',
  },
  {
    icon: <Phone className="h-10 w-10 text-primary" />,
    title: '3. Request Service',
    description: 'Like the suggestions? Contact us via WhatsApp to confirm your service request.',
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: '4. We Handle the Rest',
    description: 'We arrange for pickup and delivery, returning your perfectly altered clothing to your doorstep.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">How It Works</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Simple, 4-Step Process</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Getting your clothes tailored has never been this easy. Follow these simple steps for a perfect fit.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-10 mt-12">
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
