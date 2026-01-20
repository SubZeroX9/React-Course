import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useProducts } from '@react-app/hooks';
import { useSidebar } from '@react-app/context';
import { useFilterStore } from '@react-app/stores';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StarRating } from '@react-app/ui';
// PrimeReact imports
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
const PAGE_SIZE_OPTIONS = [4, 8, 12];
const ProductList = () => {
    const { t } = useTranslation('products');
    const navigate = useNavigate();
    const { isOpen } = useSidebar();
    const { search, category, page, pageSize, sortBy, order, setPage, setPageSize, setSort, } = useFilterStore();
    const { data, isLoading, isFetching, error } = useProducts(page, pageSize, search || undefined, category || undefined, sortBy || undefined, order);
    const handlePageChange = (event) => {
        setPage((event.page ?? 0) + 1); // PrimeReact pages are 0-indexed
        if (event.rows !== pageSize) {
            setPageSize(event.rows);
        }
    };
    const handleSort = (event) => {
        const newSortBy = event.sortField || '';
        const newOrder = event.sortOrder === 1 ? 'asc' : event.sortOrder === -1 ? 'desc' : 'asc';
        setSort(newSortBy, newOrder);
    };
    // Column body templates
    const imageBodyTemplate = (rowData) => {
        return (_jsx("div", { className: "flex justify-center items-center", children: _jsx("img", { src: rowData.thumbnail, alt: rowData.title, className: "w-[60px] h-[60px] object-cover rounded" }) }));
    };
    const priceBodyTemplate = (rowData) => {
        return (_jsx("div", { className: "text-center", children: _jsxs("span", { className: "font-semibold text-prime-green-600", children: ["$", rowData.price] }) }));
    };
    const categoryBodyTemplate = (rowData) => {
        return (_jsx("div", { className: "flex justify-center items-center", children: _jsx("span", { className: "px-2 py-1 bg-prime-primary-100 text-prime-primary-700 text-xs rounded", children: rowData.category }) }));
    };
    const ratingBodyTemplate = (rowData) => {
        return (_jsx("div", { className: "flex justify-center items-center", children: _jsx(StarRating, { rating: rowData.rating }) }));
    };
    const actionsBodyTemplate = (rowData) => {
        return (_jsx("div", { className: "flex justify-center items-center", children: _jsx(Button, { label: t('buttons.viewDetails', { ns: 'common' }), icon: "pi pi-eye", size: "small", text: true, onClick: () => navigate(`/products/${rowData.id}`) }) }));
    };
    if (error)
        return _jsxs("p", { className: "p-4 text-prime-red-500", children: [t('error'), ": ", error.message] });
    return (_jsx("div", { className: "w-full min-h-screen flex flex-col", children: _jsxs("div", { className: `p-6 flex-1 transition-all duration-300 ${isOpen ? 'rtl:mr-64 ltr:ml-64' : 'rtl:mr-0 ltr:ml-0'}`, children: [_jsx("h1", { className: "text-2xl font-bold mb-4 text-prime-text", children: t('title') }), data && (_jsx("p", { className: "text-sm mb-4 text-prime-text-secondary", children: t('resultsCount', { count: data.total }) })), _jsxs(DataTable, { value: data?.products || [], loading: isLoading || isFetching, emptyMessage: t('emptyState'), paginator: true, rows: pageSize, totalRecords: data?.total || 0, lazy: true, first: (page - 1) * pageSize, onPage: handlePageChange, rowsPerPageOptions: PAGE_SIZE_OPTIONS, paginatorTemplate: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown", currentPageReportTemplate: `${t('pagination.page')} {currentPage} ${t('pagination.of')} {totalPages}`, sortMode: "single", sortField: sortBy || undefined, sortOrder: order === 'asc' ? 1 : -1, onSort: handleSort, stripedRows: true, showGridlines: true, children: [_jsx(Column, { field: "thumbnail", header: t('columns.image'), body: imageBodyTemplate, style: { width: '80px', textAlign: 'center' } }), _jsx(Column, { field: "title", header: t('columns.title'), sortable: true, style: { width: '250px', maxWidth: '250px' }, bodyStyle: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }), _jsx(Column, { field: "price", header: t('columns.price'), body: priceBodyTemplate, sortable: true, style: { width: '100px', textAlign: 'center' } }), _jsx(Column, { field: "category", header: t('columns.category'), body: categoryBodyTemplate, style: { width: '150px', textAlign: 'center' } }), _jsx(Column, { field: "rating", header: t('columns.rating'), body: ratingBodyTemplate, sortable: true, style: { width: '130px', textAlign: 'center' } }), _jsx(Column, { header: t('columns.actions'), body: actionsBodyTemplate, style: { width: '180px', textAlign: 'center' } })] })] }) }));
};
export default ProductList;
