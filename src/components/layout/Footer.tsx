"use client";

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

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  image: z.any().optional(),
});

export default function Footer() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    formData.append("form-name", "contact");
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("message", values.message);

    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0]);
    }

    try {
      await fetch("/", {
        method: "POST",
        body: formData,
      });

      toast({
        title: t("Footer.toast.title"),
        description: t("Footer.toast.description"),
      });

      form.reset(); // ✅ LIMPIA TODOS LOS CAMPOS
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el formulario",
        variant: "destructive",
      });
    }
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
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">
            {t("Footer.formTitle")}
          </h3>

          {/* ✅ FORMULARIO NETLIFY REAL */}
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
                        <Input {...field} />
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
                        <Input {...field} />
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
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ SUBIDA DE IMAGEN FUNCIONANDO */}
              <FormField
                control={form.control}
                name="image"
                render={({ field: { onChange, ...rest } }) => (
                  <FormItem>
                    <FormLabel>{t("Footer.form.image")}</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(e) => onChange(e.target.files)}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
