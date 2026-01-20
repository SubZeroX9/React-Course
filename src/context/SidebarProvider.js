import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import { SidebarContext } from './SidebarContext';
import { useLocalStorage } from '@hooks/useLocalStorage';
export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useLocalStorage('sidebar-open', false);
    const open = useCallback(() => setIsOpen(true), [setIsOpen]);
    const close = useCallback(() => setIsOpen(false), [setIsOpen]);
    const toggle = useCallback(() => setIsOpen(prev => !prev), [setIsOpen]);
    return (_jsx(SidebarContext.Provider, { value: { isOpen, open, close, toggle }, children: children }));
};
