export const queryKeys = {
    products: (page, limit, search, category, sortBy, order) => ['products', { page, limit, search, category, sortBy, order }],
    product: (id) => ['product', id],
    categories: () => ['categories'],
};
