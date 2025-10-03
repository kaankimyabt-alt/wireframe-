
import React, { createContext, useState, useEffect, useMemo, ReactNode, useContext } from 'react';
import { translations } from '../locales';
import { Language, LocaleContextType } from '../types';

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('app-language');
    // Check if savedLang is a valid enum value
    if (savedLang && Object.values(Language).includes(savedLang as Language)) {
      return savedLang as Language;
    }
    return Language.EN;
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => (key: string, replacements: Record<string, string> = {}): string => {
    let translation = translations[language][key] || translations[Language.EN][key] || key;
    Object.keys(replacements).forEach(placeholder => {
        translation = translation.replace(`{{${placeholder}}}`, replacements[placeholder]);
    });
    return translation;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
