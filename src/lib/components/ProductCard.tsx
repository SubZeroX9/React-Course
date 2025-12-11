import { Link } from 'react-router-dom';
import type { Product } from '@lib/types/Product';
import { usePrefetchProduct } from '@hooks/usePrefetchProduct';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const prefetchProduct = usePrefetchProduct();

  return (
    <Link
      to={`/products/${product.id}`}
      onMouseEnter={() => prefetchProduct(product.id)}
      className="block border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
      <p className="text-green-600 font-bold">${product.price}</p>
    </Link>
  );
};
