import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProducts, getProductById } from '@lib/api/getProducts';
import { queryKeys } from '@lib/utils/queryKeys';
export const useProducts = (page = 1, limit = 8, search, category, sortBy, order) => {
    const skip = (page - 1) * limit;
    return useQuery({
        queryKey: queryKeys.products(page, limit, search, category, sortBy, order),
        queryFn: () => getProducts({ limit, skip, search, category, sortBy, order }),
        placeholderData: keepPreviousData,
    });
};
export const useProduct = (id) => {
    return useQuery({
        queryKey: queryKeys.product(id),
        queryFn: () => getProductById(id),
        enabled: !!id,
    });
};
