import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProductList from '@pages/ProductList';
import ProductDetail from '@pages/ProductDetail';
import Registration from '@pages/Registration';
import { SidebarProvider } from '@react-app/context';
import { Header, FilterSidebar, Footer, ToastContainer } from '@react-app/ui';
import { useRTL } from '@react-app/i18n';
import { useThemeStore } from '@react-app/stores';
import { loadTheme } from '@react-app/utils';
import './App.css';
function App() {
    // Apply RTL direction based on language
    useRTL();
    // Restore theme from localStorage on mount
    const { currentTheme } = useThemeStore();
    useEffect(() => {
        loadTheme(currentTheme);
    }, [currentTheme]);
    return (_jsx(Router, { children: _jsx(SidebarProvider, { children: _jsxs("div", { className: "min-h-screen bg-prime-surface-ground", children: [_jsx(Header, {}), _jsx(FilterSidebar, {}), _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/products", replace: true }) }), _jsx(Route, { path: "/products", element: _jsx(ProductList, {}) }), _jsx(Route, { path: "/products/:id", element: _jsx(ProductDetail, {}) }), _jsx(Route, { path: "/register", element: _jsx(Registration, {}) })] }) }), _jsx(Footer, {}), _jsx(ToastContainer, {})] }) }) }));
}
export default App;
