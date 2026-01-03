# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

---

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890",
  "city": "New York",
  "country": "USA"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "user@example.com",
      "created_at": "2026-01-03T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## User Endpoints

### Get Current User Profile
**GET** `/api/users/profile`

**Headers:** `Authorization: Bearer <token>`

### Update Profile
**PUT** `/api/users/profile`

**Request Body:**
```json
{
  "first_name": "John",
  "city": "San Francisco",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

---

## Trip Endpoints

### Get All User Trips
**GET** `/api/trips?status=planning`

**Query Parameters:**
- `status` (optional): Filter by status (planning, confirmed, ongoing, completed, cancelled)

### Create Trip
**POST** `/api/trips`

**Request Body:**
```json
{
  "title": "Summer Vacation in Paris",
  "description": "A wonderful trip to explore Paris",
  "start_date": "2026-06-01",
  "end_date": "2026-06-07",
  "total_budget": 2000
}
```

### Get Trip Details
**GET** `/api/trips/:id`

### Update Trip
**PUT** `/api/trips/:id`

### Delete Trip
**DELETE** `/api/trips/:id`

### Update Trip Status
**PATCH** `/api/trips/:id/status`

**Request Body:**
```json
{
  "status": "confirmed"
}
```

---

## Itinerary Endpoints

### Get Trip Itinerary
**GET** `/api/trips/:tripId/itinerary`

### Create Itinerary Section
**POST** `/api/itinerary/sections`

**Request Body:**
```json
{
  "trip_id": 1,
  "day_number": 1,
  "section_order": 1,
  "title": "Morning Activities",
  "description": "Explore the city center",
  "city": "Paris",
  "start_time": "2026-06-01T09:00:00Z",
  "end_time": "2026-06-01T12:00:00Z",
  "estimated_cost": 50
}
```

### Create Itinerary Item
**POST** `/api/itinerary/items`

**Request Body:**
```json
{
  "itinerary_section_id": 1,
  "activity_id": 5,
  "title": "Visit Eiffel Tower",
  "description": "Iconic Parisian landmark",
  "location_name": "Champ de Mars",
  "start_time": "2026-06-01T10:00:00Z",
  "end_time": "2026-06-01T12:00:00Z",
  "cost": 25
}
```

---

## Activity Endpoints

### Search Activities
**GET** `/api/activities?city=Paris&category=museum&search=louvre`

**Query Parameters:**
- `city`: Filter by city name
- `country`: Filter by country
- `category`: Filter by category
- `tags`: Filter by tags (can be array)
- `search`: Text search in name/description
- `limit`: Results per page (default: 50)
- `offset`: Pagination offset

### Get Activity Details
**GET** `/api/activities/:id`

### Get All Tags
**GET** `/api/activities/tags`

---

## Budget & Expense Endpoints

### Get Trip Budgets
**GET** `/api/trips/:tripId/budgets`

Returns budgets with spent amounts and remaining balance.

### Create Budget
**POST** `/api/budgets`

**Request Body:**
```json
{
  "trip_id": 1,
  "category": "accommodation",
  "planned_amount": 700,
  "notes": "Hotel bookings"
}
```

### Get Trip Expenses
**GET** `/api/trips/:tripId/expenses?category=food&start_date=2026-06-01`

### Create Expense
**POST** `/api/expenses`

**Request Body:**
```json
{
  "trip_id": 1,
  "category": "food",
  "description": "Dinner at restaurant",
  "amount": 45.50,
  "currency": "EUR",
  "expense_date": "2026-06-02"
}
```

---

## Community Endpoints

### Get Community Posts
**GET** `/api/community/posts?city=Paris&limit=20`

### Create Post
**POST** `/api/community/posts`

**Request Body:**
```json
{
  "title": "Amazing Paris Experience",
  "content": "Just returned from an incredible week in Paris...",
  "trip_id": 1,
  "city": "Paris",
  "country": "France"
}
```

### Add Comment
**POST** `/api/community/posts/:id/comments`

**Request Body:**
```json
{
  "content": "Thanks for sharing! Great tips."
}
```

### Add Reaction
**POST** `/api/community/posts/:id/reactions`

**Request Body:**
```json
{
  "reaction_type": "helpful"
}
```

Valid reaction types: `like`, `love`, `helpful`, `inspiring`

---

## Calendar Endpoints

### Get Calendar Events
**GET** `/api/calendar/events?trip_id=1&start_date=2026-06-01`

### Create Calendar Event
**POST** `/api/calendar/events`

**Request Body:**
```json
{
  "trip_id": 1,
  "title": "Flight to Paris",
  "start_datetime": "2026-06-01T08:00:00Z",
  "end_datetime": "2026-06-01T16:00:00Z",
  "location": "CDG Airport",
  "notes": "Flight AF123"
}
```

---

## Saved Places Endpoints

### Get Saved Places
**GET** `/api/saved-places`

### Save a Place
**POST** `/api/saved-places`

**Request Body:**
```json
{
  "activity_id": 5,
  "note": "Want to visit during next trip"
}
```

---

## AI Endpoints

### Generate Itinerary
**POST** `/api/ai/generate-itinerary`

**Request Body:**
```json
{
  "trip_id": 1,
  "preferences": {
    "pace": "moderate",
    "budget_level": "moderate",
    "interests": ["culture", "food", "historical"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sections": [...],
    "items": [...],
    "estimated_cost": 1250,
    "suggestions": [...]
  }
}
```

### Optimize Budget
**POST** `/api/ai/optimize-budget`

**Request Body:**
```json
{
  "trip_id": 1,
  "total_budget": 2000,
  "priorities": ["adventure", "food"]
}
```

### Generate Trip Summary
**POST** `/api/ai/trip-summary`

**Request Body:**
```json
{
  "trip_id": 1
}
```

---

## Analytics Endpoints

### Get Trip Statistics
**GET** `/api/trips/:tripId/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "total_days": 7,
    "total_expenses": 1450.50,
    "total_activities": 15,
    "avg_cost_per_day": 207.21,
    "budgetComparison": [...],
    "expensesByCategory": {...}
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (no permission)
- `404` - Not Found
- `500` - Server Error
