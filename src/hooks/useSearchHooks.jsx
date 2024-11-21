import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils/api';

export const useSearchResearcher = (query) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['search-researcher', query],
    queryFn: async () => {
      const { data } = await customFetch(`/search/researcher?query=${query}`);
      return data;
    },
    enabled: !!query,
  });
  return { isLoading, data, error, isError };
};
