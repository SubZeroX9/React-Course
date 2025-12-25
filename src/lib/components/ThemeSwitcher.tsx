import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@stores/themeStore';
import { AVAILABLE_THEMES } from '@lib/utils/themeLoader';

export const ThemeSwitcher: FC = () => {
  const { t } = useTranslation('common');
  const { currentTheme, setTheme } = useThemeStore();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-select" className="text-sm font-medium text-gray-700">
        {t('theme.label')}:
      </label>
      <select
        id="theme-select"
        value={currentTheme}
        onChange={handleThemeChange}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        <option value={AVAILABLE_THEMES.LIGHT}>{t('theme.light')}</option>
        <option value={AVAILABLE_THEMES.DARK}>{t('theme.dark')}</option>
      </select>
    </div>
  );
};
