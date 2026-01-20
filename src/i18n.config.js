import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
// Get saved language from localStorage or use default
const savedLanguage = localStorage.getItem('app-language');
i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    lng: savedLanguage || undefined, // Use saved language or let detector decide
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'products'],
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
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
