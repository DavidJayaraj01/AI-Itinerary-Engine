import apiClient from '../client';
import {API_ENDPOINTS} from '../endpoints';
import {ApiResponse} from '../types';

export interface City {
  id: string;
  name: string;
  displayName: string;
  country: string;
  latitude: number;
  longitude: number;
  population: number;
}

const cityService = {
  searchCities: async (query: string): Promise<ApiResponse<City[]>> => {
    const response = await apiClient.get(`${API_ENDPOINTS.CITIES}/search`, {
      params: {q: query}
    });
    return response.data;
  },
};

export default cityService;
