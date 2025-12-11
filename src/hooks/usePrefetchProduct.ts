import { useQueryClient } from '@tanstack/react-query';
import { getProductById } from '@lib/api/getProducts';


export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  const prefetchProduct = async (productId: number) => {
    await queryClient.prefetchQuery({
        queryKey: ['product', productId], 
        queryFn: () => getProductById(productId)
    });
  };

  return prefetchProduct;
};
