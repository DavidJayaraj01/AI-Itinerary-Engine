import apiClient from '../client';
import { endpoints } from '../endpoints';
import { ApiResponse, Budget, CreateBudgetRequest } from '../types';

export const budgetService = {
  /**
   * Get budgets for a trip
   */
  getTripBudgets: async (tripId: number): Promise<ApiResponse<Budget[]>> => {
    const response = await apiClient.get(endpoints.budgets.getTripBudgets(tripId));
    return response.data;
  },

  /**
   * Create budget for a trip (PREFERRED - uses trip-specific endpoint)
   */
  createForTrip: async (tripId: number, data: Omit<CreateBudgetRequest, 'trip_id'>): Promise<ApiResponse<Budget>> => {
    const response = await apiClient.post(`${endpoints.trips.get(tripId)}/budgets`, data);
    return response.data;
  },

  /**
   * Create budget (requires trip_id in data)
   */
  create: async (data: CreateBudgetRequest): Promise<ApiResponse<Budget>> => {
    const response = await apiClient.post(endpoints.budgets.create, data);
    return response.data;
  },

  /**
   * Get budget by ID
   */
  getById: async (id: number): Promise<ApiResponse<Budget>> => {
    const response = await apiClient.get(endpoints.budgets.get(id));
    return response.data;
  },

  /**
   * Update budget
   */
  update: async (id: number, data: Partial<CreateBudgetRequest>): Promise<ApiResponse<Budget>> => {
    const response = await apiClient.put(endpoints.budgets.update(id), data);
    return response.data;
  },

  /**
   * Delete budget
   */
  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(endpoints.budgets.delete(id));
    return response.data;
  },
};
