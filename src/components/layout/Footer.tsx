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
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-2">
              🔐 POLÍTICA DE PRIVACIDAD – ARREGLOS EXPRESS MADRID
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              Última actualización: {new Date().toLocaleDateString("es-ES")}
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              En cumplimiento de lo dispuesto en el Reglamento (UE) 2016/679
              (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), se informa a los
              usuarios del sitio web https://arreglosexpressmadrid.com sobre el
              tratamiento de sus datos personales.
            </p>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                1. Responsable del tratamiento
              </summary>
              <p className="mb-1">
                Nombre comercial: Arreglos Express Madrid
                <br />
                Dirección: Juan de Olías 37, Madrid, España
                <br />
                Teléfono: +34 611 605 751
              </p>
              <p>
                El responsable garantiza la protección y confidencialidad de los
                datos personales conforme a la normativa vigente.
              </p>
            </details>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                2. Datos personales que se recogen
              </summary>
              <p>
                A través del formulario de contacto de este sitio web se recogen
                los siguientes datos:
              </p>
              <ul className="list-disc list-inside mb-1">
                <li>Nombre</li>
                <li>Correo electrónico</li>
                <li>Mensaje</li>
                <li>Imágenes adjuntas (opcional)</li>
                <li>Dirección IP</li>
                <li>Fecha y hora del envío</li>
              </ul>
            </details>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                3. Finalidad del tratamiento
              </summary>
              <p>Los datos personales se utilizan únicamente para:</p>
              <ul className="list-disc list-inside mb-1">
                <li>Gestionar solicitudes de contacto</li>
                <li>Atender presupuestos y consultas</li>
                <li>Prestar los servicios solicitados por el usuario</li>
                <li>Comunicar información relacionada con el servicio</li>
              </ul>
              <p>
                No se utilizarán los datos para fines comerciales sin
                consentimiento previo.
              </p>
            </details>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                4. Legitimación
              </summary>
              <p>
                La base legal para el tratamiento de los datos es el
                consentimiento del usuario, al marcar el checkbox de aceptación
                y enviar el formulario.
              </p>
            </details>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                5. Conservación de los datos
              </summary>
              <p>Los datos se conservarán:</p>
              <ul className="list-disc list-inside mb-1">
                <li>Durante el tiempo necesario para atender la solicitud</li>
                <li>Mientras exista una relación comercial</li>
                <li>O hasta que el usuario solicite su eliminación</li>
              </ul>
            </details>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                6. Destinatarios de los datos
              </summary>
              <p>
                Los datos se almacenan de forma segura mediante los servicios
                de:
              </p>
              <ul className="list-disc list-inside mb-1">
                <li>Netlify Forms (gestión de formularios)</li>
                <li>Servicios de alojamiento en la nube</li>
              </ul>
              <p>No se cederán datos a terceros salvo obligación legal.</p>
            </details>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                7. Derechos del usuario
              </summary>
              <p>
                El usuario puede ejercer en cualquier momento los siguientes
                derechos:
              </p>
              <ul className="list-disc list-inside mb-1">
                <li>Acceso</li>
                <li>Rectificación</li>
                <li>Supresión</li>
                <li>Oposición</li>
                <li>Limitación del tratamiento</li>
                <li>Portabilidad de los datos</li>
              </ul>
              <p>
                Para ejercer estos derechos através del formulario de consulta
              </p>
            </details>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                8. Medidas de seguridad
              </summary>
              <p>El sitio web cuenta con:</p>
              <ul className="list-disc list-inside mb-1">
                <li>Certificado SSL (HTTPS)</li>
                <li>Sistemas de almacenamiento cifrados</li>
                <li>Control de accesos</li>
                <li>Protección contra accesos no autorizados</li>
              </ul>
            </details>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                9. Cookies
              </summary>
              <p>
                Este sitio web puede utilizar cookies técnicas necesarias para
                su funcionamiento. Para más información, consulte la Política de
                Cookies.
              </p>
            </details>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                10. Enlaces externos
              </summary>
              <p>
                Este sitio web puede contener enlaces a otros sitios web.
                Arreglos Express Madrid no se responsabiliza de las políticas de
                privacidad de dichos sitios.
              </p>
            </details>
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer font-medium mb-1">
                11. Modificación de la política
              </summary>
              <p>
                Arreglos Express Madrid se reserva el derecho a modificar la
                presente política para adaptarla a cambios legislativos o
                técnicos. Los cambios serán publicados en esta misma página.
              </p>
            </details>
            <p className="text-xs text-muted-foreground mt-2">
              ✅ Esta política cumple con: RGPD Europeo, LOPDGDD Española,
              Requisitos de Google, Netlify y motores de búsqueda
            </p>
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
