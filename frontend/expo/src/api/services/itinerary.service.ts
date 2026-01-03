import apiClient from '../client';
import { endpoints } from '../endpoints';
import {
  ApiResponse,
  ItinerarySection,
  ItineraryItem,
  CreateItinerarySectionRequest,
  CreateItineraryItemRequest,
} from '../types';

export const itineraryService = {
  /**
   * Get trip itinerary (sections and items)
   */
  getTripItinerary: async (
    tripId: number
  ): Promise<ApiResponse<{ sections: ItinerarySection[]; items: ItineraryItem[] }>> => {
    const response = await apiClient.get(endpoints.itinerary.getTripItinerary(tripId));
    return response.data;
  },

  // Section operations
  sections: {
    /**
     * Create itinerary section
     */
    create: async (data: CreateItinerarySectionRequest): Promise<ApiResponse<ItinerarySection>> => {
      const response = await apiClient.post(endpoints.itinerary.sections.create, data);
      return response.data;
    },

    /**
     * Get section by ID
     */
    get: async (id: number): Promise<ApiResponse<ItinerarySection>> => {
      const response = await apiClient.get(endpoints.itinerary.sections.get(id));
      return response.data;
    },

    /**
     * Update section
     */
    update: async (
      id: number,
      data: Partial<CreateItinerarySectionRequest>
    ): Promise<ApiResponse<ItinerarySection>> => {
      const response = await apiClient.put(endpoints.itinerary.sections.update(id), data);
      return response.data;
    },

    /**
     * Delete section
     */
    delete: async (id: number): Promise<ApiResponse<null>> => {
      const response = await apiClient.delete(endpoints.itinerary.sections.delete(id));
      return response.data;
    },
  },

  // Item operations
  items: {
    /**
     * Create itinerary item
     */
    create: async (data: CreateItineraryItemRequest): Promise<ApiResponse<ItineraryItem>> => {
      const response = await apiClient.post(endpoints.itinerary.items.create, data);
      return response.data;
    },

    /**
     * Get item by ID
     */
    get: async (id: number): Promise<ApiResponse<ItineraryItem>> => {
      const response = await apiClient.get(endpoints.itinerary.items.get(id));
      return response.data;
    },

    /**
     * Update item
     */
    update: async (
      id: number,
      data: Partial<CreateItineraryItemRequest>
    ): Promise<ApiResponse<ItineraryItem>> => {
      const response = await apiClient.put(endpoints.itinerary.items.update(id), data);
      return response.data;
    },

    /**
     * Delete item
     */
    delete: async (id: number): Promise<ApiResponse<null>> => {
      const response = await apiClient.delete(endpoints.itinerary.items.delete(id));
      return response.data;
    },
  },
};
