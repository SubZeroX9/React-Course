import { useQuery } from '@tanstack/react-query';
import type { Product } from '@lib/types/Product';
import type { PaginatedResponse } from '@lib/types/PaginatedResponse';
import { getProducts, getProductById } from '@lib/api/getProducts';
import { queryKeys } from '@lib/utils/queryKeys';

export const useProducts = (page: number = 1, limit: number = 8, search?: string) => {
  const skip = (page - 1) * limit;
  return useQuery<PaginatedResponse<Product>, Error>({
    queryKey: queryKeys.products(page, limit, search),
    queryFn: () => getProducts({ limit, skip, search }),
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: queryKeys.product(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

