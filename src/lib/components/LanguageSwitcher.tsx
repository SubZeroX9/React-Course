import type { FC } from 'react';
import { useLanguageStore } from '@stores/languageStore';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'primereact/dropdown';

export const LanguageSwitcher: FC = () => {
  const { setLanguage } = useLanguageStore();
  const { t, i18n } = useTranslation('common');

  const languageOptions = [
    { label: t('language.en'), value: 'en' },
    { label: t('language.he'), value: 'he' }
  ];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>
        {t('language.label')}:
      </label>
      <Dropdown
        inputId="language-select"
        value={i18n.language}
        onChange={(e) => setLanguage(e.value)}
        options={languageOptions}
        className="text-sm"
        style={{ minWidth: '80px' }}
      />
    </div>
  );
};
