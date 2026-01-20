import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useToastStore } from '@stores/toastStore';
const getToastStyles = (type) => {
    switch (type) {
        case 'success':
            return 'bg-green-500 text-white';
        case 'error':
            return 'bg-red-500 text-white';
        case 'warning':
            return 'bg-yellow-500 text-white';
        case 'info':
        default:
            return 'bg-blue-500 text-white';
    }
};
const getToastIcon = (type) => {
    switch (type) {
        case 'success':
            return (_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }));
        case 'error':
            return (_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }));
        case 'warning':
            return (_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }));
        case 'info':
        default:
            return (_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }));
    }
};
export const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore();
    if (toasts.length === 0)
        return null;
    return (_jsx("div", { className: "fixed bottom-4 left-4 z-[100] flex flex-col-reverse gap-2 w-80", children: toasts.map((toast) => (_jsxs("div", { className: `flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-slide-in-left w-full ${getToastStyles(toast.type)}`, children: [_jsx("div", { className: "flex-shrink-0", children: getToastIcon(toast.type) }), _jsx("span", { className: "flex-1 text-sm break-words", children: toast.message }), _jsx("button", { onClick: () => removeToast(toast.id), className: "flex-shrink-0 p-1 hover:bg-white/20 rounded", "aria-label": "Dismiss", children: _jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }, toast.id))) }));
};
