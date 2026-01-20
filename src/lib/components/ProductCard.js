import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { usePrefetchProduct } from '@hooks/usePrefetchProduct';
import { StarRating } from './StarRating';
const getAvailabilityStyle = (status) => {
    switch (status) {
        case 'In Stock':
            return 'bg-green-100 text-green-700';
        case 'Low Stock':
            return 'bg-yellow-100 text-yellow-700';
        default:
            return 'bg-red-100 text-red-700';
    }
};
export const ProductCard = ({ product }) => {
    const prefetchProduct = usePrefetchProduct();
    const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
    const originalPrice = hasDiscount
        ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
        : null;
    return (_jsxs(Link, { to: `/products/${product.id}`, onMouseEnter: () => prefetchProduct(product.id), className: "flex flex-col h-full border rounded-lg p-3 hover:shadow-lg transition-shadow duration-200 relative", children: [hasDiscount && (_jsxs("span", { className: "absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded", children: ["-", Math.round(product.discountPercentage), "%"] })), _jsx("img", { src: product.thumbnail, alt: product.title, className: "w-full h-32 object-contain mb-2" }), _jsx("h2", { className: "text-sm font-semibold mb-1 line-clamp-2 min-h-[2.5rem] text-center", children: product.title }), _jsx("div", { className: "flex justify-center mb-1", children: _jsx(StarRating, { rating: product.rating }) }), _jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-1", children: [_jsxs("span", { className: "text-green-600 font-bold text-sm", children: ["$", product.price] }), originalPrice && (_jsxs("span", { className: "text-gray-400 text-xs line-through", children: ["$", originalPrice] }))] }), _jsx("div", { className: "mt-auto flex justify-center", children: product.availabilityStatus && (_jsx("span", { className: `text-[10px] font-medium px-1.5 py-0.5 rounded ${getAvailabilityStyle(product.availabilityStatus)}`, children: product.availabilityStatus })) })] }));
};
