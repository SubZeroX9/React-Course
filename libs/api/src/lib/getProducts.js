import { api } from "./client";
export const getProducts = async (params) => {
    const { limit = 8, skip = 0, search, category, sortBy, order } = params ?? {};
    let endpoint;
    if (category) {
        endpoint = `/products/category/${encodeURIComponent(category)}`;
    }
    else if (search) {
        endpoint = '/products/search';
    }
    else {
        endpoint = '/products';
    }
    const searchParam = search && !category ? `&q=${encodeURIComponent(search)}` : '';
    const selectParam = '&select=title,price,thumbnail,rating,category,discountPercentage,availabilityStatus';
    const sortParam = sortBy && order ? `&sortBy=${encodeURIComponent(sortBy)}&order=${order}` : '';
    const { data } = await api.get(`${endpoint}?limit=${limit}&skip=${skip}${searchParam}${selectParam}${sortParam}`);
    return data;
};
export const getCategoryList = async () => {
    const { data } = await api.get('/products/category-list');
    return data;
};
export const getProductById = async (id) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
};
