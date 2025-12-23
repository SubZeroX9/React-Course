import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEN from './locales/en/common.json';
import productsEN from './locales/en/products.json';
import commonHE from './locales/he/common.json';
import productsHE from './locales/he/products.json';

// Get saved language from localStorage or use default
const savedLanguage = localStorage.getItem('app-language');

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEN,
        products: productsEN,
      },
      he: {
        common: commonHE,
        products: productsHE,
      },
    },
    lng: savedLanguage || undefined, // Use saved language or let detector decide
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'products'],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'app-language',
    },
    react: {
      useSuspense: false, // Disable suspense to avoid issues with SSR
    },
    debug: import.meta.env.DEV, // Enable debug in development
  });

export default i18n;
