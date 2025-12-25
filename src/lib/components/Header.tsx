import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '@hooks/useSidebar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header: FC = () => {
  const { toggle, isOpen } = useSidebar();
  const { t } = useTranslation('common');

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-[60]">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label={isOpen ? 'Close filters' : 'Open filters'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/products" className="text-xl font-bold text-gray-800">
            {t('header.logo')}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
