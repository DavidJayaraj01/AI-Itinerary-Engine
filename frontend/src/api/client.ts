import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from './endpoints';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('access_token');
      // Navigate to login screen
    }
    return Promise.reject(error);
  },
);

export default apiClient;
