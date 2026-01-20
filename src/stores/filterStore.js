import { create } from 'zustand';
const DEFAULT_PAGE_SIZE = 8;
export const useFilterStore = create((set, get) => ({
    search: '',
    searchInput: '',
    category: '',
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: '',
    order: 'asc',
    setSearchInput: (input) => set({ searchInput: input }),
    applySearch: () => {
        const { searchInput } = get();
        set({
            search: searchInput.trim(),
            page: 1
        });
    },
    clearSearch: () => set({
        search: '',
        searchInput: '',
        page: 1
    }),
    setCategory: (category) => set({
        category,
        page: 1,
        // Clear search when selecting a category (API doesn't support both)
        ...(category ? { search: '', searchInput: '' } : {})
    }),
    setPage: (page) => set({ page }),
    setPageSize: (pageSize) => set({
        pageSize,
        page: 1
    }),
    setSort: (sortBy, order) => set({
        sortBy,
        order,
        page: 1
    }),
    resetFilters: () => set({
        search: '',
        searchInput: '',
        category: '',
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        sortBy: '',
        order: 'asc',
    }),
}));
