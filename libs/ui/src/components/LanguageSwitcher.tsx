import type { FC } from 'react';
import { useLanguageStore } from '@react-app/i18n';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'primereact/dropdown';
import { AVAILABLE_LANGUAGES } from '@react-app/i18n';

export const LanguageSwitcher: FC = () => {
  const { setLanguage } = useLanguageStore();
  const { t, i18n } = useTranslation('common');

  const languageOptions = [
    { label: t('language.en'), value: AVAILABLE_LANGUAGES.ENGLISH },
    { label: t('language.he'), value: AVAILABLE_LANGUAGES.HEBREW }
  ];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium text-prime-text">
        {t('language.label')}:
      </label>
      <Dropdown
        inputId="language-select"
        value={i18n.language}
        onChange={(e) => setLanguage(e.value)}
        options={languageOptions}
        className="text-sm min-w-[80px]"
      />
    </div>
  );
};
