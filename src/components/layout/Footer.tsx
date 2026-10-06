"use client";

import Logo from "@/components/icons/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { WhatsappIcon } from "@/components/icons/WhatsappIcon";
import { whatsappLink } from "@/lib/contact";

export default function Footer() {
  const { t } = useLanguage();
  const links = [
    { href: "#how-it-works", label: t("Header.howItWorks") },
    { href: "#services", label: t("Header.services") },
    { href: "#zones", label: t("Header.zones") },
    { href: "#faq", label: t("Header.faq") },
    { href: "#contact", label: t("Header.contact") },
  ];

  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div className="space-y-4">
          <Logo variant="light" className="h-16" />
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">{t("Footer.tagline")}</p>
        </div>

        <nav className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("Footer.sectionsTitle")}</h3>
          <ul className="space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-primary-foreground/80 transition-colors hover:text-primary-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{t("Footer.contactTitle")}</h3>
          <p className="text-sm text-primary-foreground/70">{t("Footer.contactText")}</p>
          <a
            href={whatsappLink(t("Hero.whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground hover:underline"
          >
            <WhatsappIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-dashed border-primary-foreground/20">
        <div className="container mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>
            &copy; {new Date().getFullYear()} {t("logo")}. {t("Footer.rights")}
          </p>
          <a href="/politica-privacidad" className="transition-colors hover:text-primary-foreground">
            {t("Footer.privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}
