import { useProducts } from '@hooks/useProducts';
import { useSidebar } from '@hooks/useSidebar';
import { useFilterStore } from '@stores/filterStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StarRating } from '@lib/components';
import type { FC } from 'react';
import type { Product } from '@lib/types/Product';

// PrimeReact imports
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const PAGE_SIZE_OPTIONS = [4, 8, 12];

const ProductList: FC = () => {
  const { t } = useTranslation('products');
  const navigate = useNavigate();

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

  const handlePageChange = (event: any) => {
    setPage(event.page + 1); // PrimeReact pages are 0-indexed
    if (event.rows !== pageSize) {
      setPageSize(event.rows);
    }
  };

  // Column body templates
  const imageBodyTemplate = (rowData: Product) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={rowData.thumbnail}
          alt={rowData.title}
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
        />
      </div>
    );
  };

  const priceBodyTemplate = (rowData: Product) => {
    return (
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontWeight: '600', color: '#16a34a' }}>${rowData.price}</span>
      </div>
    );
  };

  const categoryBodyTemplate = (rowData: Product) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{
          padding: '0.25rem 0.5rem',
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          fontSize: '0.75rem',
          borderRadius: '0.25rem'
        }}>
          {rowData.category}
        </span>
      </div>
    );
  };

  const ratingBodyTemplate = (rowData: Product) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <StarRating rating={rowData.rating} />
      </div>
    );
  };

  const actionsBodyTemplate = (rowData: Product) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          label={t('buttons.viewDetails', { ns: 'common' })}
          icon="pi pi-eye"
          size="small"
          onClick={() => navigate(`/products/${rowData.id}`)}
        />
      </div>
    );
  };

  if (error) return <p className="p-4 text-red-500">{t('error')}: {error.message}</p>;

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className={`p-6 flex-1 transition-all duration-300 ${isOpen ? 'rtl:mr-64 ltr:ml-64' : 'rtl:mr-0 ltr:ml-0'}`}>
        <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>

        {data && (
          <p className="text-sm text-gray-600 mb-4">
            {t('resultsCount', { count: data.total })}
          </p>
        )}

        <DataTable
          value={data?.products || []}
          loading={isLoading || isFetching}
          emptyMessage={t('emptyState')}
          paginator
          rows={pageSize}
          totalRecords={data?.total || 0}
          lazy
          first={(page - 1) * pageSize}
          onPage={handlePageChange}
          rowsPerPageOptions={PAGE_SIZE_OPTIONS}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate={`${t('pagination.page')} {currentPage} ${t('pagination.of')} {totalPages}`}
          sortMode="single"
          stripedRows
          showGridlines
        >
          <Column
            field="thumbnail"
            header={t('columns.image')}
            body={imageBodyTemplate}
            style={{ width: '80px', textAlign: 'center' }}
          />
          <Column
            field="title"
            header={t('columns.title')}
            sortable
            style={{ width: '250px', maxWidth: '250px' }}
            bodyStyle={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          />
          <Column
            field="price"
            header={t('columns.price')}
            body={priceBodyTemplate}
            sortable
            style={{ width: '100px', textAlign: 'center' }}
          />
          <Column
            field="category"
            header={t('columns.category')}
            body={categoryBodyTemplate}
            style={{ width: '150px', textAlign: 'center' }}
          />
          <Column
            field="rating"
            header={t('columns.rating')}
            body={ratingBodyTemplate}
            style={{ width: '130px', textAlign: 'center' }}
          />
          <Column
            header={t('columns.actions')}
            body={actionsBodyTemplate}
            style={{ width: '180px', textAlign: 'center' }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default ProductList;
