import { api } from "@lib/api/client";
import type { Product, ProductSummary } from "@lib/types/Product";
import type { PaginatedResponse } from "@lib/types/PaginatedResponse";

export interface ProductsParams {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const getProducts = async (params?: ProductsParams): Promise<PaginatedResponse<ProductSummary>> => {
  const { limit = 8, skip = 0, search, category, sortBy, order } = params ?? {};

  let endpoint: string;
  if (category) {
    endpoint = `/products/category/${encodeURIComponent(category)}`;
  } else if (search) {
    endpoint = '/products/search';
  } else {
    endpoint = '/products';
  }

  const searchParam = search && !category ? `&q=${encodeURIComponent(search)}` : '';
  const selectParam = '&select=title,price,thumbnail,rating,category,discountPercentage,availabilityStatus';
  const sortParam = sortBy && order ? `&sortBy=${encodeURIComponent(sortBy)}&order=${order}` : '';
  const { data } = await api.get<PaginatedResponse<ProductSummary>>(`${endpoint}?limit=${limit}&skip=${skip}${searchParam}${selectParam}${sortParam}`);
  return data;
};

export const getCategoryList = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>('/products/category-list');
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}