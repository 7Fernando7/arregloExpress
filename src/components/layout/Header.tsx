'use client';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/Logo';
import { Scissors } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <Logo />
        </a>
        <div className="flex items-center gap-4">
          <a href="#suggest-alterations">
            <Button>
              <Scissors className="mr-2 h-4 w-4" />
              {t('Header.getSuggestions')}
            </Button>
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
