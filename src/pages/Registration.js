import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
const STORAGE_KEY = 'registration_form_data';
const SENSITIVE_FIELDS = ['password', 'confirmPassword'];
export default function Registration() {
    const { t } = useTranslation('registration');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Create Zod schema with translated messages
    const registrationSchema = useMemo(() => z
        .object({
        username: z
            .string()
            .min(3, t('validation.username.min', { min: 3 }))
            .max(20, t('validation.username.max', { max: 20 })),
        email: z.string().email(t('validation.email.invalid')),
        password: z
            .string()
            .min(8, t('validation.password.min', { min: 8 }))
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, t('validation.password.strength')),
        confirmPassword: z.string(),
        firstName: z.string().min(1, t('validation.firstName.required')),
        lastName: z.string().min(1, t('validation.lastName.required')),
        phone: z.string().regex(/^\+?[\d\s-()]+$/, t('validation.phone.invalid')),
        age: z.number().min(18, t('validation.age.min', { min: 18 })).max(100),
        gender: z.enum(['male', 'female', 'other'], {
            message: t('validation.gender.required'),
        }),
        country: z.string().min(1, t('validation.country.required')),
        bio: z
            .string()
            .max(500, t('validation.bio.max', { max: 500 }))
            .optional()
            .or(z.literal('')),
        newsletter: z.boolean().optional(),
        terms: z.boolean().refine((val) => val === true, {
            message: t('validation.terms.required'),
        }),
    })
        .refine((data) => data.password === data.confirmPassword, {
        message: t('validation.confirmPassword.noMatch'),
        path: ['confirmPassword'],
    }), [t]);
    const { register, handleSubmit, watch, setValue, reset, formState: { errors, isValid }, } = useForm({
        resolver: zodResolver(registrationSchema),
        mode: 'onBlur',
        defaultValues: {
            age: 18,
            newsletter: false,
            terms: false,
        },
    });
    const formValues = watch();
    // Load cached data from localStorage on mount
    useEffect(() => {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
            try {
                const parsedData = JSON.parse(cached);
                Object.keys(parsedData).forEach((key) => {
                    if (!SENSITIVE_FIELDS.includes(key)) {
                        setValue(key, parsedData[key]);
                    }
                });
            }
            catch (error) {
                console.error('Failed to load cached form data:', error);
            }
        }
    }, [setValue]);
    // Save non-sensitive data to localStorage when form values change
    useEffect(() => {
        const dataToCache = {};
        Object.keys(formValues).forEach((key) => {
            if (!SENSITIVE_FIELDS.includes(key)) {
                dataToCache[key] = formValues[key];
            }
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToCache));
    }, [formValues]);
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        // Simulate async request
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Form submitted successfully:', data);
        // Clear localStorage after successful submission
        localStorage.removeItem(STORAGE_KEY);
        setIsSubmitting(false);
        alert(t('success'));
    };
    const handleClearForm = () => {
        // Reset form to default values
        reset();
        // Clear localStorage
        localStorage.removeItem(STORAGE_KEY);
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "max-w-2xl mx-auto", children: _jsxs("div", { className: "bg-white shadow-md rounded-lg px-8 py-10", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-8 text-center", children: t('title') }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", noValidate: true, children: [_jsxs("div", { children: [_jsxs("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700 mb-1", children: [t('fields.username.label'), " ", _jsx("span", { className: "text-red-500", children: t('required') })] }), _jsx("input", { id: "username", type: "text", ...register('username'), placeholder: t('fields.username.placeholder'), className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.username ? 'border-red-500' : 'border-gray-300'}`, "aria-invalid": errors.username ? 'true' : 'false', "aria-describedby": errors.username ? 'username-error' : undefined }), errors.username && (_jsx("p", { id: "username-error", className: "mt-1 text-sm text-red-600", role: "alert", children: errors.username.message }))] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { htmlFor: "firstName", className: "block text-sm font-medium text-gray-700 mb-1", children: [t('fields.firstName.label'), ' ', _jsx("span", { className: "text-red-500", children: t('required') })] }), _jsx("input", { id: "firstName", type: "text", ...register('firstName'), placeholder: t('fields.firstName.placeholder'), className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`, "aria-invalid": errors.firstName ? 'true' : 'false', "aria-describedby": errors.firstName ? 'firstName-error' : undefined }), errors.firstName && (_jsx("p", { id: "firstName-error", className: "mt-1 text-sm text-red-600", role: "alert", children: errors.firstName.message }))] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "lastName", className: "block text-sm font-medium text-gray-700 mb-1", children: [t('fields.lastName.label'), " ", _jsx("span", { className: "text-red-500", children: t('required') })] }), _jsx("input", { id: "lastName", type: "text", ...register('lastName'), placeholder: t('fields.lastName.placeholder'), className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`, "aria-invalid": errors.lastName ? 'true' : 'false', "aria-describedby": errors.lastName ? 'lastName-error' : undefined }), errors.lastName && (_jsx("p", { id: "lastName-error", className: "mt-1 text-sm text-red-600", role: "alert", children: errors.lastName.message }))] })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 mb-1", children: [t('fields.email.label'), " ", _jsx("span", { className: "text-red-500", children: t('required') })] }), _jsx("input", { id: "email", type: "email", ...register('email'), placeholder: t('fields.email.placeholder'), className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`, "aria-invalid": errors.email ? 'true' : 'false', "aria-describedby": errors.email ? 'email-error' : undefined }), errors.email && (_jsx("p", { id: "email-error", className: "mt-1 text-sm text-red-600", role: "alert", children: errors.email.message }))] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700 mb-1", children: [t('fields.phone.label'), " ", _jsx("span", { className: "text-red-500", children: t('required') })] }), _jsx("input", { id: "phone", type: "tel", ...register('phone'), placeholder: t('fields.phone.placeholder'), className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'}`, "aria-invalid": errors.phone ? 'true' : 'false', "aria-describedby": errors.phone ? 'phone-error' : undefined }), errors.phone && (_jsx("p", { id: "phone-error", className: "mt-1 text-sm text-red-600", role: "alert", children: errors.phone.message }))] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1", children: [t('fields.password.label'), " ", _jsx("span", { className: "text-red-500", children: t('required') })] }), _jsx("input", { id: "password", type: "password", ...register('password'), placeholder: t('fields.password.placeholder'), className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`, "aria-invalid": errors.password ? 'true' : 'false', "aria-describedby": errors.password ? 'password-error' : undefined }), errors.password && (_jsx("p", { id: "password-error", className: "mt-1 text-sm text-red-600", role: "alert", children: errors.password.message }))] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700 mb-1", children: [t('fields.confirmPassword.label'), ' ', _jsx("span", { className: "text-red-500", children: t('required') })] }), _jsx("input", { id: "confirmPassword", type: "password", ...register('confirmPassword'), placeholder: t('fields.confirmPassword.placeholder'), className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`, "aria-invalid": errors.confirmPassword ? 'true' : 'false', "aria-describedby": errors.confirmPassword ? 'confirmPassword-error' : undefined }), errors.confirmPassword && (_jsx("p", { id: "confirmPassword-error", className: "mt-1 text-sm text-red-600", role: "alert", children: errors.confirmPassword.message }))] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "age", className: "block text-sm font-medium text-gray-700 mb-1", children: [t('fields.age.label'), ": ", _jsx("span", { className: "font-semibold", children: watch('age') }), ' ', _jsx("span", { className: "text-red-500", children: t('required') })] }), _jsx("input", { id: "age", type: "range", min: "18", max: "100", ...register('age', { valueAsNumber: true }), className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2", "aria-invalid": errors.age ? 'true' : 'false', "aria-describedby": errors.age ? 'age-error' : undefined }), errors.age && (_jsx("p", { id: "age-error", className: "mt-1 text-sm text-red-600", role: "alert", children: errors.age.message }))] }), _jsx("div", { children: _jsxs("fieldset", { children: [_jsxs("legend", { className: "block text-sm font-medium text-gray-700 mb-2", children: [t('fields.gender.label'), " ", _jsx("span", { className: "text-red-500", children: t('required') })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "gender-male", type: "radio", value: "male", ...register('gender'), className: "h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" }), _jsx("label", { htmlFor: "gender-male", className: "ms-2 block text-sm text-gray-700", children: t('fields.gender.male') })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "gender-female", type: "radio", value: "female", ...register('gender'), className: "h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" }), _jsx("label", { htmlFor: "gender-female", className: "ms-2 block text-sm text-gray-700", children: t('fields.gender.female') })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "gender-other", type: "radio", value: "other", ...register('gender'), className: "h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500" }), _jsx("label", { htmlFor: "gender-other", className: "ms-2 block text-sm text-gray-700", children: t('fields.gender.other') })] })] }), errors.gender && (_jsx("p", { className: "mt-1 text-sm text-red-600", role: "alert", children: errors.gender.message }))] }) }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "country", className: "block text-sm font-medium text-gray-700 mb-1", children: [t('fields.country.label'), " ", _jsx("span", { className: "text-red-500", children: t('required') })] }), _jsxs("select", { id: "country", ...register('country'), className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.country ? 'border-red-500' : 'border-gray-300'}`, "aria-invalid": errors.country ? 'true' : 'false', "aria-describedby": errors.country ? 'country-error' : undefined, children: [_jsx("option", { value: "", children: t('fields.country.placeholder') }), _jsx("option", { value: "us", children: t('fields.country.options.us') }), _jsx("option", { value: "uk", children: t('fields.country.options.uk') }), _jsx("option", { value: "ca", children: t('fields.country.options.ca') }), _jsx("option", { value: "au", children: t('fields.country.options.au') }), _jsx("option", { value: "de", children: t('fields.country.options.de') }), _jsx("option", { value: "fr", children: t('fields.country.options.fr') }), _jsx("option", { value: "il", children: t('fields.country.options.il') }), _jsx("option", { value: "other", children: t('fields.country.options.other') })] }), errors.country && (_jsx("p", { id: "country-error", className: "mt-1 text-sm text-red-600", role: "alert", children: errors.country.message }))] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "bio", className: "block text-sm font-medium text-gray-700 mb-1", children: t('fields.bio.label') }), _jsx("textarea", { id: "bio", rows: 4, ...register('bio'), placeholder: t('fields.bio.placeholder'), className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${errors.bio ? 'border-red-500' : 'border-gray-300'}`, "aria-invalid": errors.bio ? 'true' : 'false', "aria-describedby": errors.bio ? 'bio-error' : undefined }), errors.bio && (_jsx("p", { id: "bio-error", className: "mt-1 text-sm text-red-600", role: "alert", children: errors.bio.message }))] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "newsletter", type: "checkbox", ...register('newsletter'), className: "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" }) }), _jsxs("div", { className: "ms-3 text-sm", children: [_jsx("label", { htmlFor: "newsletter", className: "font-medium text-gray-700", children: t('fields.newsletter.label') }), _jsx("p", { className: "text-gray-500", children: t('fields.newsletter.description') })] })] }), _jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "flex items-center h-5", children: _jsx("input", { id: "terms", type: "checkbox", ...register('terms'), className: "h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500", "aria-invalid": errors.terms ? 'true' : 'false', "aria-describedby": errors.terms ? 'terms-error' : undefined }) }), _jsxs("div", { className: "ms-3 text-sm", children: [_jsxs("label", { htmlFor: "terms", className: "font-medium text-gray-700", children: [t('fields.terms.label'), " ", _jsx("span", { className: "text-red-500", children: t('required') })] }), errors.terms && (_jsx("p", { id: "terms-error", className: "mt-1 text-red-600", role: "alert", children: errors.terms.message }))] })] }), _jsxs("div", { className: "pt-4 flex flex-col sm:flex-row gap-3", children: [_jsx("button", { type: "button", onClick: handleClearForm, disabled: isSubmitting, className: "sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors", children: t('buttons.clear') }), _jsx("button", { type: "submit", disabled: !isValid || isSubmitting, className: "flex-1 bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors", children: isSubmitting ? t('buttons.submitting') : t('buttons.submit') })] })] })] }) }) }));
}
