import { api } from "@lib/api/client";
import type { Product } from "@lib/types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<{ products: Product[] }>("/products");
  return data.products;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}