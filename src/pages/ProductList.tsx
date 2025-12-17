import { useProducts } from '@hooks/useProducts';
import { ProductCard } from '@lib/components/ProductCard';
import { useState, type FC } from 'react';

const PAGE_SIZE_OPTIONS = [4, 8, 12] as const;

const ProductList: FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [pageInput, setPageInput] = useState('1');

  const { data, isLoading, error } = useProducts(page, pageSize);

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
    setPageInput('1');
  };

  const applyPageInput = () => {
    const pageNum = Number.parseInt(pageInput, 10);
    if (!Number.isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
      setPageInput(String(pageNum));
    } else {
      setPageInput(String(page));
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyPageInput();
    }
  };

  if (isLoading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;
  if (!data || data.products.length === 0) return <p className="p-4">No products found.</p>;

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-600">Products per page:</span>
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => {
            const newPage = Math.max(1, page - 1);
            setPage(newPage);
            setPageInput(String(newPage));
          }}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Previous
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Page</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value)}
            onBlur={applyPageInput}
            onKeyDown={handlePageInputKeyDown}
            className="w-16 px-2 py-1 border rounded text-center"
          />
          <span>of {totalPages}</span>
        </div>
        <button
          onClick={() => {
            const newPage = Math.min(totalPages, page + 1);
            setPage(newPage);
            setPageInput(String(newPage));
          }}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
