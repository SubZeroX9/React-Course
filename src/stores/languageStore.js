import { create } from 'zustand';
import i18n from '../i18n.config';
export const useLanguageStore = create((set) => ({
    currentLanguage: i18n.language || 'en',
    setLanguage: (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('app-language', language);
        set({ currentLanguage: language });
    },
}));
