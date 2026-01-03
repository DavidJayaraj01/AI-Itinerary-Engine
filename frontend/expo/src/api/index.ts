// Export all API services
export { authService } from './services/auth.service';
export { userService } from './services/user.service';
export { tripService } from './services/trip.service';
export { itineraryService } from './services/itinerary.service';
export { activityService } from './services/activity.service';
export { budgetService } from './services/budget.service';
export { expenseService } from './services/expense.service';
export { communityService } from './services/community.service';
export { calendarService } from './services/calendar.service';
export { savedPlaceService } from './services/savedPlace.service';
export { aiService } from './services/ai.service';

// Export API client and endpoints
export { default as apiClient } from './client';
export { endpoints } from './endpoints';

// Export types
export * from './types';
