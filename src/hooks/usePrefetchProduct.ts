import { useQueryClient } from '@tanstack/react-query';
import { getProductById } from '@lib/api/getProducts';
import { queryKeys } from '@lib/utils/queryKeys';


export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  const prefetchProduct = async (productId: number) => {
    await queryClient.prefetchQuery({
        queryKey: queryKeys.product(productId), 
        queryFn: () => getProductById(productId)
    });
  };

  return prefetchProduct;
};
