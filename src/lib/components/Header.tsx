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
    <header className="shadow-sm sticky top-0 z-[60] bg-prime-surface-0 border-b border-prime-surface">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-prime-text hover:bg-prime-hover transition-colors duration-200"
            aria-label={isOpen ? 'Close filters' : 'Open filters'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link
            to="/products"
            className="text-xl font-bold text-prime-text"
          >
            {t('header.logo')}
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/register"
            className="px-4 py-2 text-sm font-medium text-prime-text hover:bg-prime-hover rounded-lg transition-colors duration-200"
          >
            Sign Up
          </Link>
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
