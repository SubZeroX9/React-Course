import { useProducts } from '@hooks/useProducts';
import { ProductCard } from '@lib/components/ProductCard';
import { useSidebar } from '@hooks/useSidebar';
import { useFilterStore } from '@stores/filterStore';
import { useState, type FC } from 'react';

const PAGE_SIZE_OPTIONS = [4, 8, 12] as const;

const ProductList: FC = () => {
  const [pageInput, setPageInput] = useState('1');

  const { isOpen } = useSidebar();
  const {
    search,
    category,
    page,
    pageSize,
    setPage,
    setPageSize,
  } = useFilterStore();

  const { data, isLoading, isFetching, error } = useProducts(
    page,
    pageSize,
    search || undefined,
    category || undefined
  );

  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageInput('1');
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setPageInput(String(newPage));
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

  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  const hasProducts = data && data.products.length > 0;

  const renderProductsContent = () => {
    if (isLoading) {
      return <p className="py-8 text-center text-gray-500">Loading products...</p>;
    }

    if (!hasProducts) {
      return <p className="py-8 text-center text-gray-500">No products found.</p>;
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {data.products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className={`p-6 pb-20 flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
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
        </div>

        {search && data && (
          <p className="text-sm text-gray-600 mb-4">
            Showing results for "{search}" ({data.total} found)
          </p>
        )}

        {category && data && (
          <p className="text-sm text-gray-600 mb-4">
            Showing {category.charAt(0).toUpperCase() + category.slice(1).replaceAll('-', ' ')} ({data.total} products)
          </p>
        )}

        {renderProductsContent()}
      </div>

      {(hasProducts || (isFetching && totalPages > 0)) && (
        <div className={`fixed bottom-4 z-40 transition-all duration-300 ${isOpen ? 'left-[calc(256px+1rem)] right-4' : 'left-1/2 -translate-x-1/2'}`}>
          <div className="bg-white border rounded-full shadow-lg py-2 px-4 flex items-center justify-center gap-4 w-fit mx-auto">
            <button
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1 || isFetching}
              className="px-3 py-1.5 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 text-sm"
            >
              Previous
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {isFetching ? (
                <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <span>Page</span>
              )}
              <input
                type="number"
                min={1}
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={applyPageInput}
                onKeyDown={handlePageInputKeyDown}
                disabled={isFetching}
                className="w-14 px-2 py-1 border rounded text-center text-sm disabled:bg-gray-50"
              />
              <span>of {totalPages}</span>
            </div>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || isFetching}
              className="px-3 py-1.5 border rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
