'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/icons/Logo';
import { Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export default function Footer() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, { message: t('Footer.validation.name') }),
    email: z.string().email({ message: t('Footer.validation.email') }),
    message: z.string().min(10, { message: t('Footer.validation.message') }),
    image: z.any()
        .optional()
        .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, t('Footer.validation.imageSize'))
        .refine(
            (files) => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            t('Footer.validation.imageFormat')
        ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t('Footer.toast.title'),
      description: t('Footer.toast.description'),
    });
    form.reset();
  }

  return (
    <footer id="contact" className="w-full bg-secondary/50">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 py-12 mx-auto">
        <div className="space-y-4">
          <Logo />
          <p className="text-muted-foreground">
            {t('Footer.tagline')}
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('logo')}. {t('Footer.rights')}
          </p>
        </div>
        
        <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">{t('Footer.formTitle')}</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{t('Footer.form.name')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('Footer.form.namePlaceholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>{t('Footer.form.email')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('Footer.form.emailPlaceholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{t('Footer.form.message')}</FormLabel>
                            <FormControl>
                                <Textarea placeholder={t('Footer.form.messagePlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('Footer.form.image')}</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="file"
                                        accept="image/png, image/jpeg, image/webp"
                                        onChange={(e) => field.onChange(e.target.files)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full sm:w-auto" variant="accent">
                        {t('Footer.form.submit')}
                        <Send className="ml-2 h-4 w-4"/>
                    </Button>
                </form>
            </Form>
        </div>
      </div>
    </footer>
  );
}
