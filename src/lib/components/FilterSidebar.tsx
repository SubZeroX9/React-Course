import type { FC } from 'react';
import { useSidebar } from '@hooks/useSidebar';

interface FilterSidebarProps {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearchApply: () => void;
  onSearchClear: () => void;
  search: string;
  category: string;
  onCategoryChange: (category: string) => void;
  categories: string[] | undefined;
  categoriesLoading: boolean;
}

export const FilterSidebar: FC<FilterSidebarProps> = ({
  searchInput,
  onSearchInputChange,
  onSearchApply,
  onSearchClear,
  search,
  category,
  onCategoryChange,
  categories,
  categoriesLoading,
}) => {
  const { isOpen, close } = useSidebar();

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchApply();
    }
  };

  return (
    <>
      {/* Overlay - mobile only, when open */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/30 z-40 lg:hidden cursor-default"
          onClick={close}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar - toggleable on all screen sizes */}
      <aside
        className={`
          fixed top-[57px] left-0 h-[calc(100vh-57px)] w-64 bg-white border-r z-50 flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'}
        `}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={close}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search Section */}
          <div className="mb-6">
            <label htmlFor="sidebar-search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <input
              id="sidebar-search"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => onSearchInputChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              disabled={!!category}
              className="w-full border rounded px-3 py-2 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={onSearchApply}
                disabled={!!category}
                className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Search
              </button>
              {search && (
                <button
                  onClick={onSearchClear}
                  className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100"
                >
                  Clear
                </button>
              )}
            </div>
            {category && (
              <p className="text-xs text-gray-500 mt-2">
                Clear category to enable search
              </p>
            )}
          </div>

          {/* Category Section */}
          <div className="mb-6">
            <label htmlFor="sidebar-category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="sidebar-category"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              disabled={categoriesLoading}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replaceAll('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters Summary */}
          {(search || category) && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {search && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    Search: {search}
                    <button onClick={onSearchClear} className="hover:text-blue-600">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    {category.charAt(0).toUpperCase() + category.slice(1).replaceAll('-', ' ')}
                    <button onClick={() => onCategoryChange('')} className="hover:text-green-600">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
