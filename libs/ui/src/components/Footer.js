import { jsx as _jsx } from "react/jsx-runtime";
import { Trans, useTranslation } from 'react-i18next';
export const Footer = () => {
    const { ready, i18n } = useTranslation('common');
    if (!ready) {
        return null;
    }
    return (_jsx("footer", { className: "py-4 px-4 text-center text-sm border-t bg-prime-surface-0 border-prime-surface text-prime-text-secondary", children: _jsx(Trans, { i18nKey: "termsAgreement", ns: "common", i18n: i18n, components: {
                1: _jsx("strong", { className: "text-prime-text" })
            } }) }));
};
