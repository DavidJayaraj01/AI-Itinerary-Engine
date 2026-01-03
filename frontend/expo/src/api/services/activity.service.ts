import apiClient from '../client';
import { endpoints } from '../endpoints';
import { ApiResponse, Activity, ActivitySearchParams } from '../types';

export const activityService = {
  /**
   * Search activities with filters
   */
  search: async (params: ActivitySearchParams): Promise<ApiResponse<Activity[]>> => {
    const response = await apiClient.get(endpoints.activities.search, { params });
    return response.data;
  },

  /**
   * Get activity by ID
   */
  getById: async (id: number): Promise<ApiResponse<Activity>> => {
    const response = await apiClient.get(endpoints.activities.get(id));
    return response.data;
  },

  /**
   * Get all available tags
   */
  getTags: async (): Promise<ApiResponse<string[]>> => {
    const response = await apiClient.get(endpoints.activities.tags);
    return response.data;
  },
};
