import { useQuery } from '@tanstack/react-query';
import type { Product } from '@lib/types/Product';
import { getProducts, getProductById } from '@lib/api/getProducts';

export const queryKeys = {
  products: () => ['products'] as const,
  product: (id: number) => ['product', id] as const,
};

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: queryKeys.products(),
    queryFn: getProducts,
  });
};

export const useProductsById = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: queryKeys.product(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

