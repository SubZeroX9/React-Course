import type { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '@react-app/context';
import { useFilterStore } from '@react-app/stores';
import { useCategories } from '@react-app/hooks';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const FilterSidebar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('products');
  const { isOpen, close } = useSidebar();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const {
    search,
    searchInput,
    category,
    setSearchInput,
    applySearch,
    clearSearch,
    setCategory,
  } = useFilterStore();

  const navigateToProducts = () => {
    if (location.pathname !== '/products') {
      navigate('/products');
    }
  };

  const handleSearchApply = () => {
    applySearch();
    navigateToProducts();
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    navigateToProducts();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchApply();
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
          fixed top-[57px] h-[calc(100vh-57px)] w-64 z-50 flex-shrink-0
          transition-transform duration-300 ease-in-out
          rtl:right-0 ltr:left-0 bg-prime-surface-0
          ${isOpen
            ? 'translate-x-0 shadow-lg border-r border-prime-surface'
            : 'rtl:translate-x-full ltr:-translate-x-full'
          }
        `}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-prime-text">
              {t('filters', { ns: 'common' })}
            </h2>
            <button
              onClick={close}
              className="p-1 rounded text-prime-text hover:bg-prime-hover transition-colors duration-200"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search Section */}
          <div className="mb-6">
            <label
              htmlFor="sidebar-search"
              className="block text-sm font-medium mb-2 text-prime-text"
            >
              {t('searchByName')}
            </label>
            <InputText
              id="sidebar-search"
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              disabled={!!category}
              className="w-full"
            />
            <div className="flex gap-2 mt-2">
              <Button
                label={t('buttons.search', { ns: 'common' })}
                onClick={handleSearchApply}
                disabled={!!category}
                className="flex-1"
                size="small"
              />
              {search && (
                <Button
                  label={t('clearFilters')}
                  onClick={clearSearch}
                  outlined
                  size="small"
                />
              )}
            </div>
            {category && (
              <p className="text-xs mt-2 text-prime-text-secondary">
                {t('clearFilters')}
              </p>
            )}
          </div>

          {/* Category Section */}
          <div className="mb-6">
            <label
              htmlFor="sidebar-category"
              className="block text-sm font-medium mb-2 text-prime-text"
            >
              {t('categoryLabel')}
            </label>
            <Dropdown
              inputId="sidebar-category"
              value={category}
              onChange={(e) => handleCategoryChange(e.value)}
              options={[
                { label: t('allCategories'), value: '' },
                ...(categories?.map((cat) => ({
                  label: cat.charAt(0).toUpperCase() + cat.slice(1).replaceAll('-', ' '),
                  value: cat
                })) || [])
              ]}
              disabled={categoriesLoading}
              placeholder={t('allCategories')}
              className="w-full"
            />
          </div>

          {/* Active Filters Summary */}
          {(search || category) && (
            <div className="pt-4 border-t border-prime-surface">
              <h3 className="text-sm font-medium mb-2 text-prime-text">
                {t('activeFilters')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {search && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-prime-primary-100 text-prime-primary-700">
                    {t('searchByName')}: {search}
                    <Button
                      icon="pi pi-times"
                      onClick={clearSearch}
                      text
                      rounded
                      size="small"
                      className="w-4 h-4 p-0 text-prime-primary-700"
                    />
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-prime-green-100 text-prime-green-700">
                    {category.charAt(0).toUpperCase() + category.slice(1).replaceAll('-', ' ')}
                    <Button
                      icon="pi pi-times"
                      onClick={() => setCategory('')}
                      text
                      rounded
                      size="small"
                      className="w-4 h-4 p-0 text-prime-green-700"
                    />
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
