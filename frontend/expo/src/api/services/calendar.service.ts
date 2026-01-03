import apiClient from '../client';
import { endpoints } from '../endpoints';
import { ApiResponse, CalendarEvent, CreateCalendarEventRequest } from '../types';

export const calendarService = {
  /**
   * Get calendar events
   */
  getEvents: async (params?: {
    trip_id?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<ApiResponse<CalendarEvent[]>> => {
    const response = await apiClient.get(endpoints.calendar.events.list, { params });
    return response.data;
  },

  /**
   * Create calendar event
   */
  create: async (data: CreateCalendarEventRequest): Promise<ApiResponse<CalendarEvent>> => {
    const response = await apiClient.post(endpoints.calendar.events.create, data);
    return response.data;
  },

  /**
   * Get event by ID
   */
  getById: async (id: number): Promise<ApiResponse<CalendarEvent>> => {
    const response = await apiClient.get(endpoints.calendar.events.get(id));
    return response.data;
  },

  /**
   * Update event
   */
  update: async (
    id: number,
    data: Partial<CreateCalendarEventRequest>
  ): Promise<ApiResponse<CalendarEvent>> => {
    const response = await apiClient.put(endpoints.calendar.events.update(id), data);
    return response.data;
  },

  /**
   * Delete event
   */
  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete(endpoints.calendar.events.delete(id));
    return response.data;
  },
};
