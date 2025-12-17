import { api } from "@lib/api/client";
import type { Product } from "@lib/types/Product";
import type { PaginatedResponse } from "@lib/types/PaginatedResponse";

export interface PaginationParams {
  limit?: number;
  skip?: number;
}

export const getProducts = async (params?: PaginationParams): Promise<PaginatedResponse<Product>> => {
  const { limit = 10, skip = 0 } = params ?? {};
  const { data } = await api.get<PaginatedResponse<Product>>(`/products?limit=${limit}&skip=${skip}`);
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}