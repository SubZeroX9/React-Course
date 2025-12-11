import { useQuery } from '@tanstack/react-query';
import type { Product } from '@lib/types/Product';
import { getProducts, getProductById } from '@lib/api/getProducts';
import { queryKeys } from '@lib/utils/queryKeys';

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: queryKeys.products(),
    queryFn: getProducts,
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: queryKeys.product(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

