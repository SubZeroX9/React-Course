export const queryKeys = {
  products: (page?: number, limit?: number, search?: string) => ['products', { page, limit, search }] as const,
  product: (id: number) => ['product', id] as const,
};
