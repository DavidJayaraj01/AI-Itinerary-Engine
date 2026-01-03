import apiClient from '../client';
import { endpoints } from '../endpoints';
import {
  ApiResponse,
  Trip,
  CreateTripRequest,
  UpdateTripRequest,
  TripStats,
  TripStatus,
} from '../types';

export const tripService = {
  /**
   * Get all user trips
   */
  getTrips: async (status?: TripStatus): Promise<ApiResponse<Trip[]>> => {
    const params = status ? { status } : {};
    const response = await apiClient.get(endpoints.trips.list, { params });
    return response.data;
  },

  /**
   * Get trip by ID
   */
  getTripById: async (id: number): Promise<ApiResponse<Trip>> => {
    const response = await apiClient.get(endpoints.trips.get(id));
    return response.data;
  },

  /**
   * Create a new trip
   */
  createTrip: async (data: CreateTripRequest): Promise<ApiResponse<Trip>> => {
    const response = await apiClient.post(endpoints.trips.create, data);
    return response.data;
  },

  /**
   * Update trip
   */
  updateTrip: async (id: number, data: UpdateTripRequest): Promise<ApiResponse<Trip>> => {
    const response = await apiClient.put(endpoints.trips.update(id), data);
    return response.data;
  },

  /**
   * Delete trip
   */
  deleteTrip: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(endpoints.trips.delete(id));
    return response.data;
  },

  /**
   * Update trip status
   */
  updateTripStatus: async (id: number, status: TripStatus): Promise<ApiResponse<Trip>> => {
    const response = await apiClient.patch(endpoints.trips.updateStatus(id), { status });
    return response.data;
  },

  /**
   * Get trip statistics
   */
  getTripStats: async (id: number): Promise<ApiResponse<TripStats>> => {
    const response = await apiClient.get(endpoints.trips.stats(id));
    return response.data;
  },
};
