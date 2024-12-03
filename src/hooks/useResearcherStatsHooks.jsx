import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils/api';

export const useFetchResearcherProfile = (scholarId) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher-profile', scholarId],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher/stats/profile?scholar_id=${scholarId}`
      );
      return data;
    },
    enabled: !!scholarId,
  });
  return { isLoading, data, error, isError };
};

export const useFetchResearcherCardStats = (scholarId) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher-card-stats', scholarId],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher/stats/card-data?scholar_id=${scholarId}`
      );
      return data;
    },
    enabled: !!scholarId,
  });
  return { isLoading, data, error, isError };
};

export const useFetchResearcherAnalyticsGraph = (scholarId, criteria) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher-analytics-graph', scholarId, criteria],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher/stats/analytics-graph?scholar_id=${scholarId}&criteria=${criteria}`
      );
      return data;
    },
    enabled: !!scholarId && !!criteria,
  });
  return { isLoading, data, error, isError };
};

export const useFetchTopResearchersInDepartment = (
  scholarId,
  criteria,
  page = 1,
  limit = 5
) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['top-researchers-department', scholarId, criteria, page, limit],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher/stats/top-researchers-department?scholar_id=${scholarId}&criteria=${criteria}&page=${page}&limit=${limit}`
      );
      return data;
    },
    enabled: !!scholarId && !!criteria,
  });
  return { isLoading, data, error, isError };
};

export const useFetchResearcherTopics = (scholarId, year) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher/topics', scholarId, year],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher/stats/research-topics?scholar_id=${scholarId}${year ? `&year=${year}` : ''}`
      );
      return data;
    },
    enabled: !!scholarId,
  });
  return { isLoading, data, error, isError };
};

export const useFetchResearcherJournalDiversity = (scholarId, year) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher-journal-diversity', scholarId, year],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher/stats/journal-diversity?scholar_id=${scholarId}${year ? `&year=${year}` : ''}`
      );
      return data;
    },
    enabled: !!scholarId,
  });
  return { isLoading, data, error, isError };
};

export const useFetchResearcherPreFilterData = (scholarId) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher-pre-filter-data', scholarId],
    queryFn: async () => {
      const { data } = await customFetch(
        `/researcher/stats/filter-data?scholar_id=${scholarId}`
      );
      return data;
    },
    enabled: !!scholarId,
  });
  return { isLoading, data, error, isError };
};

export const useFetchTopResearcherPublications = (
  scholarId,
  filters,
  page = 1,
  limit = 10
) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher-top-publications', scholarId, filters, page, limit],
    queryFn: async () => {
      const { data } = await customFetch.post(
        `/researcher/stats/top-publications?scholar_id=${scholarId}&page=${page}&limit=${limit}`,
        filters
      );
      return data;
    },
    enabled: !!scholarId,
  });
  return { isLoading, data, error, isError };
};

export const useFetchResearcherStatsForYearRange = (
  startYear,
  endYear,
  scholarId
) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researcher-stats-year-range', startYear, endYear, scholarId],
    queryFn: async () => {
      if (!startYear || !endYear) {
        throw new Error('Start year and end year are required');
      }
      const { data } = await customFetch.get(
        `/researcher/stats/year-range?startYear=${startYear}&endYear=${endYear}&scholar_id=${scholarId}`
      );
      return data;
    },
    enabled: !!startYear && !!endYear && !!scholarId,
  });
  return { isLoading, data, error, isError };
};
