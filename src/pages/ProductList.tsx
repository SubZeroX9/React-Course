// src/pages/ProductList.tsx
import { useProducts } from '@hooks/useProducts';
import { ProductCard } from '@lib/components/ProductCard';
import type { FC } from 'react';

const ProductList: FC = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;
  if (!products || products.length === 0) return <p className="p-4">No products found.</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
