import { Link } from 'react-router-dom';
import type { ProductSummary } from '@react-app/types';
import { usePrefetchProduct } from '@react-app/hooks';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: ProductSummary;
}

const getAvailabilityStyle = (status: string) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-700';
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-red-100 text-red-700';
  }
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const prefetchProduct = usePrefetchProduct();
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage! / 100)).toFixed(2)
    : null;

  return (
    <Link
      to={`/products/${product.id}`}
      onMouseEnter={() => prefetchProduct(product.id)}
      className="flex flex-col h-full border rounded-lg p-3 hover:shadow-lg transition-shadow duration-200 relative"
    >
      {hasDiscount && (
        <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          -{Math.round(product.discountPercentage!)}%
        </span>
      )}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-32 object-contain mb-2"
      />
      <h2 className="text-sm font-semibold mb-1 line-clamp-2 min-h-[2.5rem] text-center">{product.title}</h2>
      <div className="flex justify-center mb-1">
        <StarRating rating={product.rating} />
      </div>
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className="text-green-600 font-bold text-sm">${product.price}</span>
        {originalPrice && (
          <span className="text-gray-400 text-xs line-through">${originalPrice}</span>
        )}
      </div>
      <div className="mt-auto flex justify-center">
        {product.availabilityStatus && (
          <span
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${getAvailabilityStyle(product.availabilityStatus)}`}
          >
            {product.availabilityStatus}
          </span>
        )}
      </div>
    </Link>
  );
};
