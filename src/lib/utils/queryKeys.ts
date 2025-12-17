export const queryKeys = {
  products: (page?: number, limit?: number) => ['products', { page, limit }] as const,
  product: (id: number) => ['product', id] as const,
};
