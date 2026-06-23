import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { LANG_DIRS, translations } from '@/lib/translations';
import type { Language } from '@/lib/translations';

interface LanguageContextType {
  currentLang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  
  const setLang = useCallback((lang: Language) => {
    setCurrentLang(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = LANG_DIRS[lang];
  }, []);

  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = LANG_DIRS[currentLang];
  }, [currentLang]);

  const t = translations[currentLang];
  const dir = LANG_DIRS[currentLang];
  const isRTL = currentLang === 'ar';

  return (
    <LanguageContext.Provider value={{ currentLang, setLang, t, dir, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
