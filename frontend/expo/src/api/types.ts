// API Type Definitions

// Common
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  city?: string;
  country?: string;
  additional_info?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  city?: string;
  country?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Trip Types
export interface Trip {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  status: TripStatus;
  total_budget?: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export type TripStatus = 'planning' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';

export interface CreateTripRequest {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  total_budget?: number;
  image_url?: string;
}

export interface UpdateTripRequest extends Partial<CreateTripRequest> {
  status?: TripStatus;
}

// Itinerary Types
export interface ItinerarySection {
  id: number;
  trip_id: number;
  day_number: number;
  section_order: number;
  title: string;
  description?: string;
  city?: string;
  start_time?: string;
  end_time?: string;
  estimated_cost?: number;
  created_at: string;
  updated_at: string;
}

export interface ItineraryItem {
  id: number;
  itinerary_section_id: number;
  activity_id?: number;
  title: string;
  description?: string;
  location_name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  start_time?: string;
  end_time?: string;
  cost?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateItinerarySectionRequest {
  trip_id: number;
  day_number: number;
  section_order: number;
  title: string;
  description?: string;
  city?: string;
  start_time?: string;
  end_time?: string;
  estimated_cost?: number;
}

export interface CreateItineraryItemRequest {
  itinerary_section_id: number;
  activity_id?: number;
  title: string;
  description?: string;
  location_name?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  start_time?: string;
  end_time?: string;
  cost?: number;
  notes?: string;
}

// Activity Types
export interface Activity {
  id: number;
  name: string;
  description?: string;
  city: string;
  country: string;
  category?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  price_level?: number;
  rating?: number;
  image_url?: string;
  website_url?: string;
  phone?: string;
  opening_hours?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

export interface ActivitySearchParams {
  city?: string;
  country?: string;
  category?: string;
  tags?: string[];
  search?: string;
  limit?: number;
  offset?: number;
}

// Budget Types
export interface Budget {
  id: number;
  trip_id: number;
  category: BudgetCategory;
  planned_amount: number;
  spent_amount?: number;
  remaining_amount?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type BudgetCategory = 'accommodation' | 'transportation' | 'food' | 'activities' | 'shopping' | 'other';

export interface CreateBudgetRequest {
  trip_id: number;
  category: BudgetCategory;
  planned_amount: number;
  notes?: string;
}

// Expense Types
export interface Expense {
  id: number;
  trip_id: number;
  budget_id?: number;
  category: BudgetCategory;
  description: string;
  amount: number;
  currency: string;
  expense_date: string;
  location?: string;
  payment_method?: string;
  receipt_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateExpenseRequest {
  trip_id: number;
  budget_id?: number;
  category: BudgetCategory;
  description: string;
  amount: number;
  currency: string;
  expense_date: string;
  location?: string;
  payment_method?: string;
  receipt_url?: string;
  notes?: string;
}

// Community Types
export interface Post {
  id: number;
  user_id: number;
  trip_id?: number;
  title: string;
  content: string;
  city?: string;
  country?: string;
  image_urls?: string[];
  created_at: string;
  updated_at: string;
  author?: User;
  reactions_count?: Record<string, number>;
  comments_count?: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  trip_id?: number;
  city?: string;
  country?: string;
  image_urls?: string[];
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  author?: User;
}

export type ReactionType = 'like' | 'love' | 'helpful' | 'inspiring';

export interface CreateReactionRequest {
  reaction_type: ReactionType;
}

// Calendar Types
export interface CalendarEvent {
  id: number;
  trip_id: number;
  user_id: number;
  title: string;
  description?: string;
  start_datetime: string;
  end_datetime: string;
  location?: string;
  event_type?: string;
  reminder_minutes?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCalendarEventRequest {
  trip_id: number;
  title: string;
  description?: string;
  start_datetime: string;
  end_datetime: string;
  location?: string;
  event_type?: string;
  reminder_minutes?: number;
  notes?: string;
}

// Saved Places Types
export interface SavedPlace {
  id: number;
  user_id: number;
  activity_id: number;
  note?: string;
  created_at: string;
  activity?: Activity;
}

export interface CreateSavedPlaceRequest {
  activity_id: number;
  note?: string;
}

// AI Types
export interface GenerateItineraryRequest {
  trip_id: number;
  preferences?: {
    pace?: 'slow' | 'moderate' | 'fast';
    budget_level?: 'budget' | 'moderate' | 'luxury';
    interests?: string[];
  };
}

export interface OptimizeBudgetRequest {
  trip_id: number;
  total_budget: number;
  priorities?: string[];
}

export interface TripSummaryRequest {
  trip_id: number;
}

// Analytics Types
export interface TripStats {
  total_days: number;
  total_expenses: number;
  total_activities: number;
  avg_cost_per_day: number;
  budgetComparison: Array<{
    category: string;
    planned: number;
    spent: number;
    remaining: number;
  }>;
  expensesByCategory: Record<string, number>;
}
