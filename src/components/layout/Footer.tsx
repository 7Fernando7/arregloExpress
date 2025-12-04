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

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export default function Footer() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: any) {
    try {
      const formData = new URLSearchParams();
      formData.append("form-name", "contact");
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", values.message);

      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      toast({
        title: "Mensaje enviado",
        description: "Te responderemos en breve.",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje.",
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
            &copy; {new Date().getFullYear()} Arreglos Express.
          </p>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">
            {t("Footer.formTitle")}
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              name="contact"
              data-netlify="true"
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
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
                      <FormLabel>Email</FormLabel>
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
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full sm:w-auto">
                Enviar
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </footer>
  );
}
