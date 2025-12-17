import { api } from "@lib/api/client";
import type { Product } from "@lib/types/Product";
import type { PaginatedResponse } from "@lib/types/PaginatedResponse";

export interface ProductsParams {
  limit?: number;
  skip?: number;
  search?: string;
}

export const getProducts = async (params?: ProductsParams): Promise<PaginatedResponse<Product>> => {
  const { limit = 8, skip = 0, search } = params ?? {};
  const endpoint = search ? '/products/search' : '/products';
  const searchParam = search ? `&q=${encodeURIComponent(search)}` : '';
  const { data } = await api.get<PaginatedResponse<Product>>(`${endpoint}?limit=${limit}&skip=${skip}${searchParam}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}