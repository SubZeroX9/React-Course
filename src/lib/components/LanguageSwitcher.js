import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useLanguageStore } from '@stores/languageStore';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'primereact/dropdown';
import { AVAILABLE_LANGUAGES } from '@lib/utils/languageConfig';
export const LanguageSwitcher = () => {
    const { setLanguage } = useLanguageStore();
    const { t, i18n } = useTranslation('common');
    const languageOptions = [
        { label: t('language.en'), value: AVAILABLE_LANGUAGES.ENGLISH },
        { label: t('language.he'), value: AVAILABLE_LANGUAGES.HEBREW }
    ];
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("label", { htmlFor: "language-select", className: "text-sm font-medium text-prime-text", children: [t('language.label'), ":"] }), _jsx(Dropdown, { inputId: "language-select", value: i18n.language, onChange: (e) => setLanguage(e.value), options: languageOptions, className: "text-sm min-w-[80px]" })] }));
};
