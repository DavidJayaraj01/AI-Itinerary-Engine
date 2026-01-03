import apiClient from '../client';
import { endpoints } from '../endpoints';
import { ApiResponse, User } from '../types';

export const userService = {
  /**
   * Get current user profile
   */
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get(endpoints.user.profile);
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await apiClient.put(endpoints.user.updateProfile, data);
    return response.data;
  },

  /**
   * Get user statistics
   */
  getStats: async (): Promise<ApiResponse<any>> => {
    const response = await apiClient.get(endpoints.user.stats);
    return response.data;
  },
};
