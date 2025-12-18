import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '@hooks/useSidebar';

export const Header: FC = () => {
  const { toggle, isOpen } = useSidebar();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-[60]">
      <div className="px-4 py-3 flex items-center gap-4">
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
          Product Store
        </Link>
      </div>
    </header>
  );
};
