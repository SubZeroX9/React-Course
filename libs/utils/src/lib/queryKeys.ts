export const queryKeys = {
  products: (page?: number, limit?: number, search?: string, category?: string, sortBy?: string, order?: 'asc' | 'desc') =>
    ['products', { page, limit, search, category, sortBy, order }] as const,
  product: (id: number) => ['product', id] as const,
  categories: () => ['categories'] as const,
};
