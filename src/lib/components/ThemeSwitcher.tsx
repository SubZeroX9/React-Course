import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@stores/themeStore';
import { AVAILABLE_THEMES } from '@lib/utils/themeLoader';
import { Dropdown } from 'primereact/dropdown';

export const ThemeSwitcher: FC = () => {
  const { t } = useTranslation('common');
  const { currentTheme, setTheme } = useThemeStore();

  const themeOptions = [
    { label: t('theme.light'), value: AVAILABLE_THEMES.LIGHT },
    { label: t('theme.dark'), value: AVAILABLE_THEMES.DARK }
  ];

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="theme-select" className="text-sm font-medium text-prime-text">
        {t('theme.label')}:
      </label>
      <Dropdown
        inputId="theme-select"
        value={currentTheme}
        onChange={(e) => setTheme(e.value)}
        options={themeOptions}
        className="text-sm min-w-[100px]"
      />
    </div>
  );
};
