'use client';

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { translations, Language } from '@/lib/i18n';
import get from 'lodash.get';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'idioma';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // el HTML estático sale en español (es lo que indexa Google); el idioma elegido se recuerda al cambiar de página
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'es') setLanguageState(saved);
    } catch {}
  }, []);

  const setLanguage = useCallback((value: Language) => {
    setLanguageState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
  }, []);

  const t = useCallback((key: string): string => {
    return get(translations[language], key, key);
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
