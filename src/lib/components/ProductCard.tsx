import { Link } from 'react-router-dom';
import type { ProductSummary } from '@lib/types/Product';
import { usePrefetchProduct } from '@hooks/usePrefetchProduct';

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
      className="flex flex-col h-full border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 relative"
    >
      {hasDiscount && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{Math.round(product.discountPercentage!)}%
        </span>
      )}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold mb-1 line-clamp-2 min-h-[3.5rem]">{product.title}</h2>
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-green-600 font-bold">${product.price}</span>
        {originalPrice && (
          <span className="text-gray-400 text-sm line-through">${originalPrice}</span>
        )}
      </div>
      <div className="mt-auto">
        {product.availabilityStatus && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded ${getAvailabilityStyle(product.availabilityStatus)}`}
          >
            {product.availabilityStatus}
          </span>
        )}
      </div>
    </Link>
  );
};
