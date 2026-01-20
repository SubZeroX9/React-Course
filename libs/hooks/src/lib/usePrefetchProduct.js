import { useQueryClient } from '@tanstack/react-query';
import { getProductById } from '@react-app/api';
import { queryKeys } from '@react-app/utils';
export const usePrefetchProduct = () => {
    const queryClient = useQueryClient();
    const prefetchProduct = async (productId) => {
        await queryClient.prefetchQuery({
            queryKey: queryKeys.product(productId),
            queryFn: () => getProductById(productId)
        });
    };
    return prefetchProduct;
};
