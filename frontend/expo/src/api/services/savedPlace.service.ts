import apiClient from '../client';
import { endpoints } from '../endpoints';
import { ApiResponse, SavedPlace, CreateSavedPlaceRequest } from '../types';

export const savedPlaceService = {
  /**
   * Get all saved places
   */
  getAll: async (): Promise<ApiResponse<SavedPlace[]>> => {
    const response = await apiClient.get(endpoints.savedPlaces.list);
    return response.data;
  },

  /**
   * Save a place
   */
  create: async (data: CreateSavedPlaceRequest): Promise<ApiResponse<SavedPlace>> => {
    const response = await apiClient.post(endpoints.savedPlaces.create, data);
    return response.data;
  },

  /**
   * Remove saved place
   */
  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(endpoints.savedPlaces.delete(id));
    return response.data;
  },
};
