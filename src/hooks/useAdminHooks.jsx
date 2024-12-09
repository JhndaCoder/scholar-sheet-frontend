import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch from '../utils/api';

// Hook for adding a researcher
export const useAddResearcher = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addResearcher,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: ({ scholar_id, email, department, positions, gender }) =>
      customFetch.post('/admin/researcher', {
        scholar_id,
        email,
        department,
        positions,
        gender,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['researchers']);
    },
    onError: (err) => {
      console.error('Error adding researcher:', err);
    },
  });

  return { addResearcher, isLoading, error, isError, isSuccess };
};

// Hook for fetching all researchers
export const useGetAllResearchers = (filters = {}) => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['researchers', filters],
    queryFn: async () => {
      const { data } = await customFetch.get('/admin/researchers', {
        params: filters,
      });
      return data;
    },
  });

  return { isLoading, data, error, isError };
};

// Hook for updating a researcher
export const useUpdateResearcher = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateResearcher,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: ({ id, updates }) =>
      customFetch.put(`/admin/researcher/update/${id}`, updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['researchers']);
    },
    onError: (err) => {
      console.error('Error updating researcher:', err);
    },
  });

  return { updateResearcher, isLoading, error, isError, isSuccess };
};

// Hook for deleting a researcher
export const useDeleteResearcher = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteResearcher,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (scholar_id) =>
      customFetch.delete(`/admin/researcher/delete`, {
        params: { scholar_id },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['researchers']);
    },
    onError: (err) => {
      console.error('Error deleting researcher:', err);
    },
  });

  return { deleteResearcher, isLoading, error, isError, isSuccess };
};

// Hook for adding departments
export const useAddDepartments = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addDepartments,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (departments) =>
      customFetch.post('/admin/department', { departments }),
    onSuccess: () => {
      queryClient.invalidateQueries(['departments']);
    },
    onError: (err) => {
      console.error('Error adding departments:', err);
    },
  });

  return { addDepartments, isLoading, error, isError, isSuccess };
};

export const useBulkUploadResearchers = () => {
  const queryClient = useQueryClient();

  const {
    mutate: bulkUploadResearchers,
    isLoading,
    error,
    isError,
    isSuccess,
    data: response,
  } = useMutation({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append('file', file);

      return customFetch.post('/admin/researcher/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['researchers']);
    },
    onError: (err) => {
      console.error('Error during bulk upload:', err);
    },
  });

  return {
    bulkUploadResearchers,
    isLoading,
    error,
    isError,
    isSuccess,
    response,
  };
};
