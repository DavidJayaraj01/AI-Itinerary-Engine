import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Detect platform and set appropriate API URL
const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:3000/api';
  }
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api';
  }
  return 'http://localhost:3000/api';
};

const API_URL = getApiUrl();

console.log('🌐 API Client initialized with URL:', API_URL);

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async config => {
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  async error => {
    console.error('❌ API Error:', error.config?.url, error.response?.status, error.message);
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('access_token');
      // Navigate to login screen
    }
    return Promise.reject(error);
  },
);

export default apiClient;
