import apiClient from '../client';
import { endpoints } from '../endpoints';
import {
  ApiResponse,
  RegisterRequest,
  LoginRequest,
  AuthResponse,
} from '../types';

export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post(endpoints.auth.register, data);
    return response.data;
  },

  /**
   * Login user
   */
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post(endpoints.auth.login, data);
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiClient.post(endpoints.auth.logout);
    return response.data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await apiClient.post(endpoints.auth.refreshToken);
    return response.data;
  },
};
