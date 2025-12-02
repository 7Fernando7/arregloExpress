'use client';
import Logo from '@/components/icons/Logo';
import LanguageSwitcher from '../LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '../ui/button';

export default function Header() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <Logo />
        </a>
        <div className="flex items-center gap-4">
           <a href="#services">
            <Button variant="ghost">
              {t('Header.services')}
            </Button>
          </a>
           <a href="#contact">
            <Button>
              {t('Header.contact')}
            </Button>
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
