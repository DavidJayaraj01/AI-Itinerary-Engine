# GLOB Travel API

Production-ready REST API for travel planning and itinerary management built with Node.js, Express, Prisma, and PostgreSQL.

## Features

- 🔐 JWT Authentication with bcrypt password hashing
- 🗺️ Complete trip and itinerary management
- 📍 Activity search and tagging system
- 💰 Budget planning and expense tracking
- 📅 Calendar event synchronization
- 👥 Community posts, comments, and reactions
- 🤖 AI-powered itinerary generation and optimization
- 📊 Trip analytics and statistics

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator

## Project Structure

```
GLOB/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── validators/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── .env.example
├── .gitignore
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Update `DATABASE_URL` with your PostgreSQL connection string.

### 3. Set up Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Seed database
npm run prisma:seed
```

### 4. Start Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/:id` - Get user by ID

### Trips
- `GET /api/trips` - Get all user trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/:id` - Get trip details
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip

### Itinerary
- `GET /api/trips/:tripId/itinerary` - Get trip itinerary
- `POST /api/itinerary/sections` - Create itinerary section
- `PUT /api/itinerary/sections/:id` - Update section
- `DELETE /api/itinerary/sections/:id` - Delete section
- `POST /api/itinerary/items` - Create itinerary item
- `PUT /api/itinerary/items/:id` - Update item
- `DELETE /api/itinerary/items/:id` - Delete item

### Activities
- `GET /api/activities` - Search activities (with filters)
- `GET /api/activities/:id` - Get activity details
- `POST /api/activities` - Create activity (admin)
- `GET /api/activities/tags` - Get all tags

### Budgets & Expenses
- `GET /api/trips/:tripId/budgets` - Get trip budgets
- `POST /api/budgets` - Create budget
- `PUT /api/budgets/:id` - Update budget
- `GET /api/trips/:tripId/expenses` - Get trip expenses
- `POST /api/expenses` - Create expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

### Calendar
- `GET /api/calendar/events` - Get user calendar events
- `POST /api/calendar/events` - Create calendar event
- `PUT /api/calendar/events/:id` - Update event
- `DELETE /api/calendar/events/:id` - Delete event

### Community
- `GET /api/community/posts` - Get community posts
- `POST /api/community/posts` - Create post
- `GET /api/community/posts/:id` - Get post details
- `PUT /api/community/posts/:id` - Update post
- `DELETE /api/community/posts/:id` - Delete post
- `POST /api/community/posts/:id/comments` - Add comment
- `POST /api/community/posts/:id/reactions` - Add reaction

### Saved Places
- `GET /api/saved-places` - Get user saved places
- `POST /api/saved-places` - Save a place
- `DELETE /api/saved-places/:id` - Remove saved place

### AI Services
- `POST /api/ai/generate-itinerary` - Generate AI itinerary
- `POST /api/ai/optimize-budget` - Optimize budget with AI
- `POST /api/ai/trip-summary` - Generate trip summary

### Analytics
- `GET /api/trips/:tripId/stats` - Get trip statistics

## Database Schema

See `prisma/schema.prisma` for the complete database schema including:
- Users & Authentication
- Trips & Itineraries
- Activities & Tags
- Budgets & Expenses
- Calendar Events
- Community Features
- Analytics

## Development

```bash
# View database in Prisma Studio
npm run prisma:studio

# Create new migration
npm run prisma:migrate

# Deploy migrations to production
npm run prisma:deploy
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Update `DATABASE_URL` to production database
3. Run `npm run prisma:deploy` to apply migrations
4. Start server with `npm start`

## License

ISC
