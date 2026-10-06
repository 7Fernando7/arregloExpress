"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Camera, Home, MapPin, MessageCircle, Truck } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { whatsappLink } from "@/lib/contact";

export default function Hero() {
  const { t } = useLanguage();
  const trust = [
    { icon: Truck, text: t("Hero.trust1") },
    { icon: MapPin, text: t("Hero.trust2") },
    { icon: MessageCircle, text: t("Hero.trust3") },
  ];

  return (
    <section id="hero" className="w-full overflow-hidden">
      <div className="container mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
        <div className="space-y-7">
          <Eyebrow>{t("Hero.eyebrow")}</Eyebrow>
          <h1 className="font-headline text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]">
            {t("Hero.title")}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t("Hero.description")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(t("Hero.whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <WhatsappIcon className="h-5 w-5" />
              {t("Hero.whatsappButton")}
            </a>
            <a
              href="#zones"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-primary/25 bg-background px-6 text-base font-semibold text-foreground transition-colors hover:border-primary"
            >
              <Home className="h-5 w-5" />
              {t("Hero.estimateButton")}
            </a>
          </div>
          <ul className="grid gap-3 border-t border-dashed border-border pt-6 sm:grid-cols-3">
            {trust.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-2.5 text-sm font-medium text-foreground/85">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div
            aria-hidden
            className="absolute -bottom-3 -right-3 h-full w-full rounded-lg border-2 border-dashed border-accent/60"
          />
          <Image
            src="/brand/taller.jpg"
            alt={t("Hero.photoAlt")}
            width={1200}
            height={896}
            priority
            className="relative aspect-[4/3] w-full rounded-lg object-cover shadow-[0_12px_32px_-8px_rgba(19,41,75,0.25)]"
          />
          <a
            href={whatsappLink(t("Hero.badgeMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="group absolute -bottom-6 left-4 flex max-w-[18rem] items-start gap-3 rounded-lg border border-border bg-background p-4 shadow-[0_8px_24px_-4px_rgba(19,41,75,0.15)] transition-colors hover:border-accent sm:left-6"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Camera className="h-5 w-5" />
            </span>
            <span className="text-sm leading-snug text-muted-foreground">
              <strong className="block font-semibold text-foreground">{t("Hero.badgeTitle")}</strong>
              {t("Hero.badgeText")}
              <span className="mt-1.5 flex items-center gap-1.5 font-semibold text-accent group-hover:underline">
                <WhatsappIcon className="h-3.5 w-3.5" />
                {t("Hero.badgeButton")}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
