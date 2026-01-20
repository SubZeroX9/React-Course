import { create } from 'zustand';
import i18n from './config';

interface LanguageStore {
  currentLanguage: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  currentLanguage: i18n.language || 'en',
  setLanguage: (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('app-language', language);
    set({ currentLanguage: language });
  },
}));
