const API_URL = 'http://localhost:8000/api/v1';

export const endpoints = {
  // Auth
  register: `${API_URL}/auth/register`,
  login: `${API_URL}/auth/login`,
  
  // Trips
  trips: `${API_URL}/trips`,
  trip: (id: number) => `${API_URL}/trips/${id}`,
  
  // Cities
  cities: `${API_URL}/cities`,
  city: (id: number) => `${API_URL}/cities/${id}`,
  
  // Activities
  activities: `${API_URL}/activities`,
  activity: (id: number) => `${API_URL}/activities/${id}`,
  
  // Budget
  budget: (tripId: number) => `${API_URL}/trips/${tripId}/budget`,
};

export default API_URL;
