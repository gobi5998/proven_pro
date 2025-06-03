import axios from 'axios';
import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';



// Base URL for your API
export const BASE_URL = ' https://beea-103-186-120-4.ngrok-free.app/api/';
// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for adding auth token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Check network connectivity before making the request
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      throw new Error('Network Error: No internet connection');
    }

    const token = await AsyncStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (!error.response) {
      // Network error (no response from server)
      throw new Error('Network Error: Unable to connect to the server');
    }

    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      // Handle unauthorized access in your navigation
    }

    return Promise.reject(error);
  }
);

export default api; 