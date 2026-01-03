import { Platform } from 'react-native';

// Detect platform and set appropriate API URL
const getApiUrl = () => {
  // For Web: use localhost
  if (Platform.OS === 'web') {
    return 'http://localhost:3000/api';
  }
  
  // For Android Emulator: use 10.0.2.2
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api';
  }
  
  // For iOS Simulator: use localhost
  return 'http://localhost:3000/api';
};

const API_URL = getApiUrl();

console.log('🔗 API URL:', API_URL, 'Platform:', Platform.OS);

export const endpoints = {
  // Health Check
  health: `${API_URL}/health`,

  // Auth
  auth: {
    register: `${API_URL}/auth/register`,
    login: `${API_URL}/auth/login`,
    logout: `${API_URL}/auth/logout`,
    refreshToken: `${API_URL}/auth/refresh-token`,
  },

  // User
  user: {
    profile: `${API_URL}/users/profile`,
    updateProfile: `${API_URL}/users/profile`,
    stats: `${API_URL}/users/stats`,
  },

  // Trips
  trips: {
    list: `${API_URL}/trips`,
    create: `${API_URL}/trips`,
    get: (id: number) => `${API_URL}/trips/${id}`,
    update: (id: number) => `${API_URL}/trips/${id}`,
    delete: (id: number) => `${API_URL}/trips/${id}`,
    updateStatus: (id: number) => `${API_URL}/trips/${id}/status`,
    stats: (id: number) => `${API_URL}/trips/${id}/stats`,
  },

  // Itinerary
  itinerary: {
    getTripItinerary: (tripId: number) => `${API_URL}/trips/${tripId}/itinerary`,
    sections: {
      list: `${API_URL}/itinerary/sections`,
      create: `${API_URL}/itinerary/sections`,
      get: (id: number) => `${API_URL}/itinerary/sections/${id}`,
      update: (id: number) => `${API_URL}/itinerary/sections/${id}`,
      delete: (id: number) => `${API_URL}/itinerary/sections/${id}`,
    },
    items: {
      list: `${API_URL}/itinerary/items`,
      create: `${API_URL}/itinerary/items`,
      get: (id: number) => `${API_URL}/itinerary/items/${id}`,
      update: (id: number) => `${API_URL}/itinerary/items/${id}`,
      delete: (id: number) => `${API_URL}/itinerary/items/${id}`,
    },
  },

  // Activities
  activities: {
    list: `${API_URL}/activities`,
    search: `${API_URL}/activities`,
    get: (id: number) => `${API_URL}/activities/${id}`,
    tags: `${API_URL}/activities/tags`,
  },

  // Budgets
  budgets: {
    getTripBudgets: (tripId: number) => `${API_URL}/trips/${tripId}/budgets`,
    list: `${API_URL}/budgets`,
    create: `${API_URL}/budgets`,
    get: (id: number) => `${API_URL}/budgets/${id}`,
    update: (id: number) => `${API_URL}/budgets/${id}`,
    delete: (id: number) => `${API_URL}/budgets/${id}`,
  },

  // Expenses
  expenses: {
    getTripExpenses: (tripId: number) => `${API_URL}/trips/${tripId}/expenses`,
    list: `${API_URL}/expenses`,
    create: `${API_URL}/expenses`,
    get: (id: number) => `${API_URL}/expenses/${id}`,
    update: (id: number) => `${API_URL}/expenses/${id}`,
    delete: (id: number) => `${API_URL}/expenses/${id}`,
  },

  // Community
  community: {
    posts: {
      list: `${API_URL}/community/posts`,
      create: `${API_URL}/community/posts`,
      get: (id: number) => `${API_URL}/community/posts/${id}`,
      update: (id: number) => `${API_URL}/community/posts/${id}`,
      delete: (id: number) => `${API_URL}/community/posts/${id}`,
      addComment: (id: number) => `${API_URL}/community/posts/${id}/comments`,
      addReaction: (id: number) => `${API_URL}/community/posts/${id}/reactions`,
      removeReaction: (id: number) => `${API_URL}/community/posts/${id}/reactions`,
    },
  },

  // Calendar
  calendar: {
    events: {
      list: `${API_URL}/calendar/events`,
      create: `${API_URL}/calendar/events`,
      get: (id: number) => `${API_URL}/calendar/events/${id}`,
      update: (id: number) => `${API_URL}/calendar/events/${id}`,
      delete: (id: number) => `${API_URL}/calendar/events/${id}`,
    },
  },

  // Saved Places
  savedPlaces: {
    list: `${API_URL}/saved-places`,
    create: `${API_URL}/saved-places`,
    delete: (id: number) => `${API_URL}/saved-places/${id}`,
  },

  // AI
  ai: {
    generateItinerary: `${API_URL}/ai/generate-itinerary`,
    optimizeBudget: `${API_URL}/ai/optimize-budget`,
    tripSummary: `${API_URL}/ai/trip-summary`,
    chatAssistant: `${API_URL}/ai/chat`,
  },

  // Cities
  cities: {
    search: `${API_URL}/cities/search`,
  },
};

export const API_ENDPOINTS = {
  CITIES: `${API_URL}/cities`,
};

export default API_URL;
