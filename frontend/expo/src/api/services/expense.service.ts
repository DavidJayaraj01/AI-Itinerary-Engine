import apiClient from '../client';
import { endpoints } from '../endpoints';
import { ApiResponse, Expense, CreateExpenseRequest } from '../types';

export const expenseService = {
  /**
   * Get expenses for a trip
   */
  getTripExpenses: async (
    tripId: number,
    params?: {
      category?: string;
      start_date?: string;
      end_date?: string;
    }
  ): Promise<ApiResponse<Expense[]>> => {
    const response = await apiClient.get(endpoints.expenses.getTripExpenses(tripId), { params });
    return response.data;
  },

  /**
   * Create expense for a trip (PREFERRED - uses trip-specific endpoint)
   */
  createForTrip: async (tripId: number, data: Omit<CreateExpenseRequest, 'trip_id'>): Promise<ApiResponse<Expense>> => {
    const response = await apiClient.post(`${endpoints.trips.get(tripId)}/expenses`, data);
    return response.data;
  },

  /**
   * Create expense (requires trip_id in data)
   */
  create: async (data: CreateExpenseRequest): Promise<ApiResponse<Expense>> => {
    const response = await apiClient.post(endpoints.expenses.create, data);
    return response.data;
  },

  /**
   * Get expense by ID
   */
  getById: async (id: number): Promise<ApiResponse<Expense>> => {
    const response = await apiClient.get(endpoints.expenses.get(id));
    return response.data;
  },

  /**
   * Update expense
   */
  update: async (
    id: number,
    data: Partial<CreateExpenseRequest>
  ): Promise<ApiResponse<Expense>> => {
    const response = await apiClient.put(endpoints.expenses.update(id), data);
    return response.data;
  },

  /**
   * Delete expense
   */
  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(endpoints.expenses.delete(id));
    return response.data;
  },
};
