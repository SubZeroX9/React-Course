export const queryKeys = {
  products: (page?: number, limit?: number, search?: string, category?: string) => ['products', { page, limit, search, category }] as const,
  product: (id: number) => ['product', id] as const,
  categories: () => ['categories'] as const,
};
