# State Inventory

This document lists all pieces of state in the project and categorizes them by type.

---

## Server State (TanStack Query)

| State | Hook | Location | Description |
|-------|------|----------|-------------|
| Products List | `useProducts` | `src/hooks/useProducts.ts` | Paginated product data from API with `keepPreviousData` for smooth pagination |
| Product Details | `useProduct` | `src/hooks/useProducts.ts` | Single product by ID |
| Categories | `useCategories` | `src/hooks/useCategories.ts` | List of product categories |
| Prefetch Product | `usePrefetchProduct` | `src/hooks/usePrefetchProduct.ts` | Optimistic prefetching on hover |

---

## Global Client State (Zustand)

### Filter Store

| State | Store | Location | Description |
|-------|-------|----------|-------------|
| `search` | `useFilterStore` | `src/stores/filterStore.ts` | Applied search query (sent to API) |
| `searchInput` | `useFilterStore` | `src/stores/filterStore.ts` | Search text being typed |
| `category` | `useFilterStore` | `src/stores/filterStore.ts` | Selected category filter |
| `page` | `useFilterStore` | `src/stores/filterStore.ts` | Current pagination page number |
| `pageSize` | `useFilterStore` | `src/stores/filterStore.ts` | Number of products per page |

**Actions:**
- `setSearchInput(input)` - Update search input text
- `applySearch()` - Apply search input as active search, reset page to 1
- `clearSearch()` - Clear search input and active search
- `setCategory(category)` - Set category filter (clears search if category selected)
- `setPage(page)` - Set current page
- `setPageSize(size)` - Set page size, reset page to 1
- `resetFilters()` - Reset all filters to defaults

**Why Zustand?** Filter state was moved from local `useState` in `ProductList.tsx` to a global Zustand store so that `FilterSidebar` can be rendered in `App.tsx` and be accessible from any page (including `ProductDetail`). When filters are applied from non-products pages, the app navigates to `/products`.

### Toast Store

| State | Store | Location | Description |
|-------|-------|----------|-------------|
| `toasts` | `useToastStore` | `src/stores/toastStore.ts` | Array of active toast notifications |

**Actions:**
- `addToast(message, type?, duration?)` - Add a toast notification
- `removeToast(id)` - Remove a specific toast
- `clearToasts()` - Remove all toasts

---

## Global Client State (Context)

| State | Hook | Provider | Storage | Description |
|-------|------|----------|---------|-------------|
| `isOpen` | `useSidebar` | `SidebarProvider` | localStorage | Sidebar visibility state |
| `open` | `useSidebar` | `SidebarProvider` | - | Function to open sidebar |
| `close` | `useSidebar` | `SidebarProvider` | - | Function to close sidebar |
| `toggle` | `useSidebar` | `SidebarProvider` | - | Function to toggle sidebar |

**Files:**
- `src/context/SidebarContext.ts` - Context definition
- `src/context/SidebarProvider.tsx` - Provider component with localStorage persistence
- `src/hooks/useSidebar.ts` - Consumer hook
- `src/hooks/useLocalStorage.ts` - Custom hook for localStorage persistence

---

## Client/UI State (Local - useState)

| State | Component | Type | Description |
|-------|-----------|------|-------------|
| `pageInput` | ProductList.tsx | Local | Text input for direct page navigation (synced with store's `page`) |

---

## URL State

| State | Component | Description |
|-------|-----------|-------------|
| Product ID (`:id`) | ProductDetail.tsx | Product ID from route `/products/:id` |

---

## Component Hierarchy for Global State

```
App.tsx
├── SidebarProvider (Context)
│   ├── Header (uses useSidebar for toggle button)
│   ├── FilterSidebar (uses useSidebar + useFilterStore)
│   ├── Routes
│   │   ├── ProductList (uses useSidebar + useFilterStore)
│   │   └── ProductDetail (can access sidebar via useSidebar)
│   └── ToastContainer (uses useToastStore)
```

---

## Conclusion

1. **TanStack Query**: All data fetched from the backend (products, categories, product details) correctly lives in TanStack Query. This handles caching, syncing, and refetching automatically. The `keepPreviousData` option provides smooth pagination UX.

2. **Global Client State (Zustand)**:
   - **Filter Store**: Search, category, and pagination state are now global via Zustand. This allows `FilterSidebar` to be rendered at the app level and accessible from any page, solving the issue of the sidebar being unavailable on `ProductDetail`.
   - **Toast Store**: Global notification system for displaying toasts across the app.

3. **Global Client State (Context)**: Sidebar visibility is implemented using React Context with localStorage persistence via the custom `useLocalStorage` hook. This allows the sidebar state to persist across page refreshes.

4. **Local UI State (useState)**: Only `pageInput` remains as local state in `ProductList.tsx` since it's a temporary input value that syncs with the store's `page` state.
