import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '@react-app/context';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
export const Header = () => {
    const { toggle, isOpen } = useSidebar();
    const { t } = useTranslation('common');
    return (_jsx("header", { className: "shadow-sm sticky top-0 z-[60] bg-prime-surface-0 border-b border-prime-surface", children: _jsxs("div", { className: "px-4 py-3 flex items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: toggle, className: "p-2 rounded-lg text-prime-text hover:bg-prime-hover transition-colors duration-200", "aria-label": isOpen ? 'Close filters' : 'Open filters', children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }), _jsx(Link, { to: "/products", className: "text-xl font-bold text-prime-text", children: t('header.logo') })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Link, { to: "/register", className: "px-4 py-2 text-sm font-medium text-prime-text hover:bg-prime-hover rounded-lg transition-colors duration-200", children: t('header.signUp') }), _jsx(ThemeSwitcher, {}), _jsx(LanguageSwitcher, {})] })] }) }));
};
