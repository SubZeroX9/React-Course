import { useQuery } from '@tanstack/react-query';
import { getCategoryList } from '@react-app/api';
import { queryKeys } from '@react-app/utils';

export const useCategories = () => {
  return useQuery<string[], Error>({
    queryKey: queryKeys.categories(),
    queryFn: getCategoryList,
    staleTime: 1000 * 60 * 60 * 24, // Categories rarely change, cache for 24 hours
  });
};
