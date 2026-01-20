import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RTL_LANGUAGES = ['he', 'ar'];

export const useRTL = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;
    const isRTL = RTL_LANGUAGES.includes(currentLang);

    // Set document direction
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    // Set document language
    document.documentElement.lang = currentLang;
  }, [i18n.language]);
};
