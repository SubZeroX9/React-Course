import { useQuery } from '@tanstack/react-query';
import { getCategoryList } from '@lib/api/getProducts';
import { queryKeys } from '@lib/utils/queryKeys';
export const useCategories = () => {
    return useQuery({
        queryKey: queryKeys.categories(),
        queryFn: getCategoryList,
        staleTime: 1000 * 60 * 60 * 24, // Categories rarely change, cache for 24 hours
    });
};
