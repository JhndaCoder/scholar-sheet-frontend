import { useQuery, useMutation } from '@tanstack/react-query';
import customFetch from '../utils/api';

export const useSignIn = () => {
  const {
    mutate: signIn,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (signInData) => {
      const response = await customFetch.post('/admin/signup', signInData);
      return response.data;
    },
    onError: () => {
      console.log('Error while signing in');
    },
  });

  return { signIn, isLoading, isError, error, isSuccess };
};

export const useLogin = () => {
  const {
    mutate: login,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (loginData) => {
      const response = await customFetch.post('/admin/login', loginData);
      return response.data;
    },
    onError: () => {
      console.log('Error while logging in');
    },
  });

  return { login, isLoading, isError, error, isSuccess };
};

export const useVerifyEmail = () => {
  const { isLoading, data, error, isError } = useQuery({
    queryKey: ['verify-email'],
    queryFn: async ({ queryKey }) => {
      const token = queryKey[1];
      const { data } = await customFetch(`/admin/email/verify?token=${token}`);
      return data;
    },
    enabled: false,
  });
  return { isLoading, data, error, isError };
};
