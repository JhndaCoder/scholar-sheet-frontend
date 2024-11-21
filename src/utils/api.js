import axios from 'axios';
import { LocalStorage } from './storage';

let lastFetchedAt = null;
const subscribers = [];

const customFetch = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

customFetch.interceptors.request.use(
  (config) => {
    const token = LocalStorage.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customFetch.interceptors.response.use(
  (response) => {
    lastFetchedAt = new Date();
    notifySubscribers();
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const notifySubscribers = () => {
  subscribers.forEach((callback) => callback(lastFetchedAt));
};

export const subscribeToFetchTime = (callback) => {
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};

export const getLastFetchTime = () => lastFetchedAt;
export default customFetch;
