import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const StarRating = ({ rating }) => {
    return (_jsxs("div", { className: "flex items-center gap-1", children: [[1, 2, 3, 4, 5].map((star) => {
                const fillPercentage = Math.min(Math.max(rating - star + 1, 0), 1) * 100;
                return (_jsxs("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: `star-gradient-${star}-${rating}`, children: [_jsx("stop", { offset: `${fillPercentage}%`, stopColor: "#fbbf24" }), _jsx("stop", { offset: `${fillPercentage}%`, stopColor: "#d1d5db" })] }) }), _jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", fill: `url(#star-gradient-${star}-${rating})`, stroke: "#fbbf24", strokeWidth: "1" })] }, star));
            }), _jsxs("span", { className: "text-xs text-gray-600 ml-1", children: ["(", rating.toFixed(1), ")"] })] }));
};
