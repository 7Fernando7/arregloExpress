'use client';
import Logo from '@/components/icons/Logo';
import LanguageSwitcher from '../LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { whatsappLink } from '@/lib/contact';

export default function Header({ hasWorks = false }: { hasWorks?: boolean }) {
  const { t } = useLanguage();
  const links = [
    { href: '#how-it-works', label: t('Header.howItWorks') },
    { href: '#services', label: t('Header.services') },
    ...(hasWorks ? [{ href: '#works', label: t('Header.works') }] : []),
    { href: '#reviews', label: t('Header.reviews') },
    { href: '#zones', label: t('Header.zones') },
    { href: '#contact', label: t('Header.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dashed border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <a href="#" aria-label="Arreglos Express Madrid">
          <Logo className="h-11 md:h-14" />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href={whatsappLink(t('Hero.whatsappMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-4"
          >
            <WhatsappIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{t('Header.whatsapp')}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
