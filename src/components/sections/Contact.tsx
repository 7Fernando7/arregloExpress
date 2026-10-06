"use client";

import { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Eyebrow from "@/components/Eyebrow";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { whatsappLink } from "@/lib/contact";
import OpeningHours from "@/components/OpeningHours";

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const formSchema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t("Contact.validation.name")),
        email: z.string().trim().email(t("Contact.validation.email")),
        postalCode: z
          .string()
          .trim()
          .regex(/^(\d{5})?$/, t("Contact.validation.postalCode")),
        message: z.string().trim().min(10, t("Contact.validation.message")),
      }),
    [t]
  );
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", postalCode: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    const formData = new FormData();
    formData.append("form-name", "contact");
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("postal-code", values.postalCode);
    formData.append("message", values.message);

    if (fileRef.current?.files?.[0]) {
      formData.append("image", fileRef.current.files[0]);
    }

    try {
      const res = await fetch("/", { method: "POST", body: formData });
      if (!res.ok) throw new Error(String(res.status));
    } catch {
      toast({
        variant: "destructive",
        title: t("Contact.toast.errorTitle"),
        description: t("Contact.toast.errorDescription"),
      });
      return;
    }

    toast({
      title: t("Contact.toast.title"),
      description: t("Contact.toast.description"),
    });

    form.reset();
    if (fileRef.current) fileRef.current.value = "";
  }

  const fieldClass = "h-11 bg-background focus-visible:ring-1";

  return (
    <section id="contact" className="w-full border-t border-dashed border-border bg-card/60 py-16 md:py-24">
      <div className="container mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="space-y-6">
          <Eyebrow>{t("Contact.eyebrow")}</Eyebrow>
          <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t("Contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("Contact.description")}</p>
          <a
            href={whatsappLink(t("Hero.whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-[#25D366] px-6 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1ebe5b]"
          >
            <WhatsappIcon className="h-5 w-5" />
            {t("Contact.whatsappButton")}
          </a>
          <p className="border-t border-dashed border-border pt-6 text-muted-foreground">
            {t("Contact.formIntro")}
          </p>
          <OpeningHours className="border-t border-dashed border-border pt-6" />
        </div>

        <div className="rounded-lg border border-border bg-background p-6 shadow-[0_8px_24px_-4px_rgba(19,41,75,0.08)] sm:p-8">
          <h3 className="mb-6 font-headline text-2xl font-semibold">{t("Contact.formTitle")}</h3>
          <Form {...form}>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              encType="multipart/form-data"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Contact.form.name")}</FormLabel>
                      <FormControl>
                        <Input {...field} name="name" autoComplete="name" placeholder={t("Contact.form.namePlaceholder")} className={fieldClass} />
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
                      <FormLabel>{t("Contact.form.email")}</FormLabel>
                      <FormControl>
                        <Input {...field} name="email" type="email" autoComplete="email" placeholder={t("Contact.form.emailPlaceholder")} className={fieldClass} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem className="sm:max-w-[50%] sm:pr-2.5">
                    <FormLabel>{t("Contact.form.postalCode")}</FormLabel>
                    <FormControl>
                      <Input {...field} name="postal-code" inputMode="numeric" maxLength={5} autoComplete="postal-code" placeholder={t("Contact.form.postalCodePlaceholder")} className={fieldClass} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Contact.form.message")}</FormLabel>
                    <FormControl>
                      <Textarea {...field} name="message" rows={5} placeholder={t("Contact.form.messagePlaceholder")} className="bg-background focus-visible:ring-1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>{t("Contact.form.image")}</FormLabel>
                <FormControl>
                  <Input
                    ref={fileRef}
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg, image/webp"
                    className="h-auto cursor-pointer bg-background py-2.5 file:mr-3 file:rounded file:bg-card file:px-3 file:py-1 file:text-foreground"
                  />
                </FormControl>
              </FormItem>

              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
              >
                {form.formState.isSubmitting ? t("Contact.form.sending") : t("Contact.form.submit")}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
