import type { FC } from 'react';
import { useLanguageStore } from '@stores/languageStore';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: FC = () => {
  const { setLanguage } = useLanguageStore();
  const { t, i18n } = useTranslation('common');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium text-gray-700">
        {t('language.label')}:
      </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={handleLanguageChange}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        <option value="en">{t('language.en')}</option>
        <option value="he">{t('language.he')}</option>
      </select>
    </div>
  );
};
