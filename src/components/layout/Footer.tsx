"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import Logo from "@/components/icons/Logo";
import { Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  image: z.any().optional(),
});

export default function Footer() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("form-name", "contact");
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("message", values.message);

    if (fileRef.current?.files?.[0]) {
      formData.append("image", fileRef.current.files[0]);
    }

    await fetch("/", {
      method: "POST",
      body: formData,
    });

    toast({
      title: t("Footer.toast.title"),
      description: t("Footer.toast.description"),
    });

    form.reset();
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <footer id="contact" className="w-full bg-secondary/50">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 py-12 mx-auto">
        <div className="space-y-4">
          <Logo />
          <p className="text-muted-foreground">{t("Footer.tagline")}</p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("logo")}. {t("Footer.rights")}
          </p>
          <div className="mt-4">
            <a
              href="/politica-privacidad"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Política de Privacidad
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">
            {t("Footer.formTitle")}
          </h3>

          <Form {...form}>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              encType="multipart/form-data"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Footer.form.name")}</FormLabel>
                      <FormControl>
                        <Input {...field} name="name" />
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
                      <FormLabel>{t("Footer.form.email")}</FormLabel>
                      <FormControl>
                        <Input {...field} name="email" />
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
                    <FormLabel>{t("Footer.form.message")}</FormLabel>
                    <FormControl>
                      <Textarea {...field} name="message" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>{t("Footer.form.image")}</FormLabel>
                <FormControl>
                  <Input
                    ref={fileRef}
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg, image/webp"
                  />
                </FormControl>
              </FormItem>

              <Button type="submit" className="w-full sm:w-auto">
                {t("Footer.form.submit")}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </footer>
  );
}
