import { useParams, Link } from 'react-router-dom';
import { useProduct } from '@hooks/useProducts';
import type { FC } from 'react';

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) return <p className="p-4">Loading product...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;
  if (!product) return <p className="p-4">Product not found.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link to="/products" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to products
      </Link>

      <div className="flex flex-col md:flex-row gap-8 border rounded-lg p-6 shadow">
        <img
          src={product.images[0] || product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/3 h-64 object-contain"
        />

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-green-600 text-xl font-semibold">${product.price}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
