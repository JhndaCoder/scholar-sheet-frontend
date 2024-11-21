import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils/api';

export const useFetchResearcherYearlyHIndex = (scholarId) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher-yearly-h-index', scholarId],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher-profile/h-index-yearly/${scholarId}`
      );
      return data;
    },
    enabled: !!scholarId,
  });
  return { isLoading, data, error, isError };
};

export const useFetchResearcherYearlyIIndex = (scholarId, iValue = 10) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher-yearly-i-index', scholarId, iValue],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher-profile/i-index-yearly/${scholarId}?iValue=${iValue}`
      );
      return data;
    },
    enabled: !!scholarId,
  });
  return { isLoading, data, error, isError };
};

export const useFetchResearcherDomains = (scholarId) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher-domains', scholarId],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher-profile/domains/${scholarId}`
      );
      return data;
    },
    enabled: !!scholarId,
  });
  return { isLoading, data, error, isError };
};

export const useFetchYearVsPublication = (scholarId, limit = 10) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['year-vs-publication', scholarId, limit],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher-profile/year-vs-publication/${scholarId}?limit=${limit}`
      );
      return data;
    },
    enabled: !!scholarId,
  });
  return { isLoading, data, error, isError };
};
