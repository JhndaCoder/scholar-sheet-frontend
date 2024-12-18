import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from '../utils/api';
import { useDepartment } from '../context/DepartmentContext.jsx';

export const useAddDepartments = () => {
  const queryClient = useQueryClient();
  const { mutate: addDepartments, isLoading } = useMutation({
    mutationFn: (departments) =>
      customFetch.post('/admin/department', { departments }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
    onError: () => {
      console.log('Error while adding departments');
    },
  });
  return { addDepartments, isLoading };
};

export const useGetDepartments = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const { data } = await customFetch('/admin/stats/departments');
      return data;
    },
  });
  return { isLoading, data, error, isError };
};

export const useGetCardStats = () => {
  const { selectedDepartment } = useDepartment();
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['card-stats', selectedDepartment],
    queryFn: async () => {
      const { data } = await customFetch(
        `/admin/stats/card-data${selectedDepartment ? `?department=${selectedDepartment}` : ''}`
      );
      return data;
    },
    enabled: true,
  });
  return { isLoading, data, error, isError };
};

export const useGetAnalyticsGraph = (criteria) => {
  const { selectedDepartment } = useDepartment();
  const isEnabled = !!criteria;
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['analytics-graph', selectedDepartment, criteria],
    queryFn: async () => {
      if (!criteria) {
        throw new Error('Criteria parameter is required');
      }
      const { data } = await customFetch(
        `/admin/stats/analytics-graph?criteria=${criteria}${selectedDepartment ? `&department=${selectedDepartment}` : ''}`
      );
      return data;
    },
    enabled: isEnabled,
  });

  return { isLoading, data, error, isError };
};

export const useGetTopResearchers = (
  department,
  criteria = 'totalCitations',
  year = new Date().getFullYear(),
  page = 1,
  limit = 5
) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['top-researchers', department, criteria, year, page, limit],
    queryFn: async () => {
      const { data } = await customFetch(
        `/admin/stats/top-researchers?criteria=${criteria}&year=${year}&page=${page}&limit=${limit}${department ? `&department=${department}` : ''}`
      );
      return data;
    },
    enabled: !!criteria,
  });
  return { isLoading, data, error, isError };
};

export const useGetResearchTopics = (department, year) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['research-topics', department, year],
    queryFn: async () => {
      let endpoint = `/admin/stats/research-topics`;
      const params = [];

      if (department) params.push(`department=${department}`);
      if (year) params.push(`year=${year}`);

      if (params.length > 0) {
        endpoint += `?${params.join('&')}`;
      }

      const { data } = await customFetch(endpoint);
      return data;
    },
  });
  return { isLoading, data, error, isError };
};

export const useGetJournalDiversity = (department, year) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['journal-diversity', department, year],
    queryFn: async () => {
      let endpoint = `/admin/stats/journal-diversity`;
      const params = [];

      if (department) params.push(`department=${department}`);
      if (year) params.push(`year=${year}`);

      if (params.length > 0) {
        endpoint += `?${params.join('&')}`;
      }

      const { data } = await customFetch(endpoint);
      return data;
    },
  });
  return { isLoading, data, error, isError };
};

export const useGetPreFilterData = (department) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['filter-data', department],
    queryFn: async () => {
      const { data } = await customFetch(
        `/admin/stats/filter-data${department ? `?department=${department}` : ''}`
      );
      return data;
    },
  });
  return { isLoading, data, error, isError };
};

export const useGetTopPublications = (
  filters,
  department,
  page = 1,
  limit = 10
) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['top-publications', department, page, limit, filters],
    queryFn: async () => {
      const requestBody = {
        ...filters,
        year: filters.year.length ? filters.year : undefined,
        journal: filters.journal.length ? filters.journal : undefined,
        author: filters.author.length ? filters.author : undefined,
        topic: filters.topic.length ? filters.topic : undefined,
        citationsRange: filters.citationsRange.length
          ? filters.citationsRange
          : undefined,
      };

      const { data } = await customFetch.post(
        `/admin/stats/top-publications?page=${page}&limit=${limit}${department ? `&department=${department}` : ''}`,
        requestBody
      );
      return data;
    },
    enabled: !!filters,
  });
  return { isLoading, data, error, isError };
};

export const useGetRankData = (criteria = 'citations') => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['rank-data', criteria],
    queryFn: async () => {
      if (!criteria) {
        throw new Error('Criteria parameter is required');
      }
      const { data } = await customFetch.get(`/rank?criteria=${criteria}`);
      return data;
    },
    enabled: !!criteria,
  });
  return { isLoading, data, error, isError };
};

export const useGetStatsForYearRange = (startYear, endYear, department) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['stats-year-range', startYear, endYear, department],
    queryFn: async () => {
      if (!startYear || !endYear) {
        throw new Error('Start year and end year are required');
      }
      const { data } = await customFetch.get(
        `/admin/stats/year-range?startYear=${startYear}&endYear=${endYear}${department ? `&department=${department}` : ''}`
      );
      return data;
    },
    enabled: !!startYear && !!endYear,
  });
  return { isLoading, data, error, isError };
};

export const useGetGenderDistribution = (department) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['gender-distribution', department],
    queryFn: async () => {
      const { data } = await customFetch.get(
        `/admin/stats/gender-distribution${department ? `?department=${department}` : ''}`
      );
      return data;
    },
  });
  return { isLoading, data, error, isError };
};
