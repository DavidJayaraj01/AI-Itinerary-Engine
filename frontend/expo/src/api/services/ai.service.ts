import apiClient from '../client';
import { endpoints } from '../endpoints';
import {
  ApiResponse,
  GenerateItineraryRequest,
  OptimizeBudgetRequest,
  TripSummaryRequest,
} from '../types';

export const aiService = {
  /**
   * Generate AI-powered itinerary
   */
  generateItinerary: async (data: GenerateItineraryRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post(endpoints.ai.generateItinerary, data);
    return response.data;
  },

  /**
   * Optimize budget using AI
   */
  optimizeBudget: async (data: OptimizeBudgetRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post(endpoints.ai.optimizeBudget, data);
    return response.data;
  },

  /**
   * Generate trip summary
   */
  getTripSummary: async (data: TripSummaryRequest): Promise<ApiResponse<any>> => {
    const response = await apiClient.post(endpoints.ai.tripSummary, data);
    return response.data;
  },

  /**
   * Chat with AI assistant
   */
  chat: async (message: string, context?: any): Promise<ApiResponse<any>> => {
    const response = await apiClient.post(endpoints.ai.chatAssistant, {
      message,
      context,
    });
    return response.data;
  },
};
