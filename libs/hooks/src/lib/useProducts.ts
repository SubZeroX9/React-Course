import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { Product, ProductSummary } from '@react-app/types';
import type { PaginatedResponse } from '@react-app/types';
import { getProducts, getProductById } from '@react-app/api';
import { queryKeys } from '@react-app/utils';

export const useProducts = (
  page: number = 1,
  limit: number = 8,
  search?: string,
  category?: string,
  sortBy?: string,
  order?: 'asc' | 'desc'
) => {
  const skip = (page - 1) * limit;
  return useQuery<PaginatedResponse<ProductSummary>, Error>({
    queryKey: queryKeys.products(page, limit, search, category, sortBy, order),
    queryFn: () => getProducts({ limit, skip, search, category, sortBy, order }),
    placeholderData: keepPreviousData,
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: queryKeys.product(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

