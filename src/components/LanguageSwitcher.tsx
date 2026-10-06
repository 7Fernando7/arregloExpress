'use client';

import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-md border border-border p-0.5 text-xs font-semibold">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setLanguage(lang.code)}
          aria-pressed={language === lang.code}
          aria-label={lang.name}
          className={cn(
            'rounded px-2 py-1.5 transition-colors',
            language === lang.code
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground/60 hover:text-foreground'
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
