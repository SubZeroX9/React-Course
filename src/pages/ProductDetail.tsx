import { useParams, Link } from 'react-router-dom';
import { useProduct } from '@hooks/useProducts';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : null;

  const { data: product, isLoading, error } = useProduct(productId!);

  if (!productId) return <p>Invalid product ID.</p>;
  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-4">
      <Link to="/products" className="text-blue-500 mb-4 inline-block">
        &larr; Back to products
      </Link>

      <div className="flex gap-6 mt-2">
        <img src={product.image} alt={product.title} className="w-48 h-48 object-cover rounded" />
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl font-semibold text-green-600">${product.price}</p>
          <p className="mt-2">{product.description}</p>
          <p className="mt-2 text-sm text-gray-500">
            Category: {product.category} | Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
