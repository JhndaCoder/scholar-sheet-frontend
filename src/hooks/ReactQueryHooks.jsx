import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import customFetch from '../utils/api';

export const useFetchResource = resource => {
  const {isLoading, data, error, isError} = useQuery ({
    queryKey: [resource],
    queryFn: async () => {
      const {data} = await customFetch (`/${resource}`);
      return data;
    },
  });
  return {isLoading, data, error, isError};
};

export const useCreateResource = resource => {
  const queryClient = useQueryClient ();
  const {mutate: createResource, isLoading} = useMutation ({
    mutationFn: item => customFetch.post (`/${resource}`, item),
    onSuccess: () => {
      queryClient.invalidateQueries ({queryKey: [resource]});
    },
    onError: () => {
      console.log (`Error while creating ${resource}`);
    },
  });
  return {createResource, isLoading};
};

export const useEditResource = resource => {
  const queryClient = useQueryClient ();

  const {mutate: editResource} = useMutation ({
    mutationFn: ({id, item}) => customFetch.put (`/${resource}/${id}`, item),
    onSuccess: () => {
      queryClient.invalidateQueries ({queryKey: [resource]});
    },
  });
  return {editResource};
};

export const useDeleteResource = resource => {
  const queryClient = useQueryClient ();
  const {mutate: deleteResource} = useMutation ({
    mutationFn: id => customFetch.delete (`/${resource}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries ({queryKey: [resource]});
    },
  });
  return {deleteResource};
};

export const useSignIn = () => {
  const {mutate: signIn, isLoading, isError, error, isSuccess} = useMutation ({
    mutationFn: async signInData => {
      const response = await customFetch.post ('/admin/signin', signInData);
      return response.data;
    },
    onError: () => {
      console.log ('Error while logging in');
    },
  });

  return {signIn, isLoading, isError, error, isSuccess};
};

export const useLogin = () => {
  const {mutate: login, isLoading, isError, error, isSuccess} = useMutation ({
    mutationFn: async loginData => {
      const response = await customFetch.post ('/admin/login', loginData);
      return response.data;
    },
    onError: () => {
      console.log ('Error while logging in');
    },
  });

  return {login, isLoading, isError, error, isSuccess};
};
