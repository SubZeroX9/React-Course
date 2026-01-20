import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '@react-app/hooks';
import { useTranslation } from 'react-i18next';
const ProductDetail = () => {
    const { id } = useParams();
    const productId = Number(id);
    const { t } = useTranslation('products');
    const { data: product, isLoading, error } = useProduct(productId);
    if (isLoading)
        return _jsx("p", { className: "p-4", children: t('detail.loadingProduct') });
    if (error)
        return _jsxs("p", { className: "p-4 text-red-500", children: [t('error'), ": ", error.message] });
    if (!product)
        return _jsx("p", { className: "p-4", children: t('detail.notFound') });
    return (_jsxs("div", { className: "p-4 max-w-4xl mx-auto", children: [_jsxs(Link, { to: "/products", className: "text-blue-500 hover:underline mb-4 inline-block", children: ["\u2190 ", t('detail.backToProducts')] }), _jsxs("div", { className: "flex flex-col md:flex-row gap-8 border rounded-lg p-6 shadow", children: [_jsx("img", { src: product.images[0] || product.thumbnail, alt: product.title, className: "w-full md:w-1/3 h-64 object-contain" }), _jsxs("div", { className: "flex-1 flex flex-col gap-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: product.title }), _jsx("p", { className: "text-gray-700", children: product.description }), _jsxs("p", { className: "text-green-600 text-xl font-semibold", children: [t('detail.price'), ": $", product.price] }), _jsxs("p", { className: "text-sm text-gray-500", children: [t('detail.category'), ": ", product.category] })] })] })] }));
};
export default ProductDetail;
