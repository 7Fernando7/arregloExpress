'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu } from 'lucide-react';
import Logo from '@/components/icons/Logo';
import LanguageSwitcher from '../LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { STRIPE_PAYMENT_URL, whatsappLink } from '@/lib/contact';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function Header({ hasWorks = false }: { hasWorks?: boolean }) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // submenú del móvil
  const isHome = usePathname() === '/';
  const home = isHome ? '' : '/'; // desde otras páginas, las secciones están en la portada
  const links = [
    { href: '#how-it-works', label: t('Header.howItWorks') },
    { href: '#services', label: t('Header.services') },
    ...(hasWorks ? [{ href: '#works', label: t('Header.works') }] : []),
    { href: '#reviews', label: t('Header.reviews') },
    { href: '#zones', label: t('Header.zones') },
    ...(STRIPE_PAYMENT_URL ? [{ href: '#pay', label: t('Payment.menu') }] : []),
    { href: '#contact', label: t('Header.contact') },
  ];
  // los 3 servicios principales (los arreglos de ropa están en la sección de la portada)
  const serviceLinks = [
    { href: home + '#services', label: t('Header.clothes') },
    { href: '/arreglos/arreglo-de-zapatos-madrid', label: t('Services.service8.title') },
    { href: '/arreglos/tintoreria-a-domicilio-madrid', label: t('Services.service9.title') },
  ];
  // en el menú del móvil caben todas las secciones
  const menuLinks = [
    links[0],
    { href: '#marking', label: t('Marking.link') },
    ...links.slice(1, -1),
    { href: '#faq', label: t('Header.faq') },
    links[links.length - 1],
  ];

  // cerrar primero el panel y luego desplazarse (con el panel abierto el scroll está bloqueado)
  function goTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isHome) return; // navegación normal a /#seccion
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', href);
    }, 300);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-dashed border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <a href={isHome ? '#' : '/'} aria-label="Arreglos Express Madrid">
          <Logo className="h-11 md:h-14" />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) =>
            link.href === '#services' ? (
              <DropdownMenu key={link.href} modal={false}>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/75 outline-none transition-colors hover:text-foreground data-[state=open]:text-foreground">
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform [[data-state=open]>&]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" sideOffset={12} className="w-56 border-border bg-background p-1.5">
                  {serviceLinks.map((sl) => (
                    <DropdownMenuItem key={sl.href} asChild className="cursor-pointer rounded px-3 py-2 text-sm focus:bg-card">
                      <a href={sl.href}>{sl.label}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a
                key={link.href}
                href={home + link.href}
                className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          {isHome && (
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
          )}
          <a
            href={whatsappLink(t('Hero.whatsappMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('WhatsappButton.ariaLabel')}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-4"
          >
            <WhatsappIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{t('Header.whatsapp')}</span>
          </a>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={t('Header.menu')}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[85%] max-w-sm flex-col border-l border-dashed border-border bg-background p-0">
              <SheetTitle className="border-b border-dashed border-border px-6 py-5 text-left">
                <Logo className="h-12" />
              </SheetTitle>
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                  {menuLinks.map((link) =>
                    link.href === '#services' ? (
                      <li key={link.href}>
                        <button
                          type="button"
                          onClick={() => setServicesOpen(!servicesOpen)}
                          aria-expanded={servicesOpen}
                          className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left font-headline text-xl font-semibold text-foreground transition-colors hover:bg-card"
                        >
                          {link.label}
                          <ChevronDown className={cn('h-5 w-5 text-accent transition-transform', servicesOpen && 'rotate-180')} />
                        </button>
                        {servicesOpen && (
                          <ul className="mb-2 ml-3 space-y-0.5 border-l border-dashed border-accent/50 pl-3">
                            {serviceLinks.map((sl) => (
                              <li key={sl.href}>
                                <a
                                  href={sl.href}
                                  onClick={(e) => (sl.href.endsWith('#services') ? goTo(e, '#services') : setMenuOpen(false))}
                                  className="block rounded-md px-3 py-2 text-base text-foreground/85 hover:bg-card"
                                >
                                  {sl.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ) : (
                      <li key={link.href}>
                        <a
                          href={home + link.href}
                          onClick={(e) => goTo(e, link.href)}
                          className="block rounded-md px-3 py-3 font-headline text-xl font-semibold text-foreground transition-colors hover:bg-card"
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </nav>
              <div className="space-y-4 border-t border-dashed border-border px-6 py-5">
                {isHome && <LanguageSwitcher />}
                <a
                  href={whatsappLink(t('Hero.whatsappMessage'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
                >
                  <WhatsappIcon className="h-5 w-5" />
                  {t('Contact.whatsappButton')}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
