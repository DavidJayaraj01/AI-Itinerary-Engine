# GLOB Travel API - Project Structure

```
GLOB/
├── prisma/
│   ├── schema.prisma              # Database schema definition (matches exact requirements)
│   └── seed.js                    # Sample data seeder
│
├── src/
│   ├── config/
│   │   └── database.js            # Prisma client & connection management
│   │
│   ├── controllers/               # Request handlers (thin layer)
│   │   ├── ai.controller.js       # AI feature endpoints
│   │   ├── activity.controller.js # Activity search & management
│   │   ├── analytics.controller.js# Trip statistics
│   │   ├── auth.controller.js     # Registration & login
│   │   ├── budget.controller.js   # Budget management
│   │   ├── calendar.controller.js # Calendar events
│   │   ├── community.controller.js# Posts, comments, reactions
│   │   ├── expense.controller.js  # Expense tracking
│   │   ├── itinerary.controller.js# Sections & items
│   │   ├── savedPlace.controller.js# Saved places/favorites
│   │   ├── trip.controller.js     # Trip CRUD operations
│   │   └── user.controller.js     # User profile management
│   │
│   ├── services/                  # Business logic (main layer)
│   │   ├── ai.service.js          # ✨ AI itinerary generation, budget optimization, summaries
│   │   ├── activity.service.js    # Activity search with filters & tags
│   │   ├── analytics.service.js   # 📊 Trip stats calculation & caching
│   │   ├── auth.service.js        # 🔐 JWT + bcrypt authentication
│   │   ├── budget.service.js      # Budget planning with spent tracking
│   │   ├── calendar.service.js    # Calendar event sync
│   │   ├── community.service.js   # Community features (posts/comments/reactions)
│   │   ├── expense.service.js     # Expense tracking with category breakdown
│   │   ├── itinerary.service.js   # ⏰ Day-wise itinerary with time overlap validation
│   │   ├── savedPlace.service.js  # Saved places management
│   │   ├── trip.service.js        # 🎯 Trip ownership & status management
│   │   └── user.service.js        # User profile & password management
│   │
│   ├── routes/                    # API route definitions
│   │   ├── ai.routes.js           # AI endpoints
│   │   ├── activity.routes.js     # Activity search routes
│   │   ├── auth.routes.js         # Auth routes (public)
│   │   ├── budget.routes.js       # Budget routes
│   │   ├── calendar.routes.js     # Calendar routes
│   │   ├── community.routes.js    # Community routes (some public)
│   │   ├── expense.routes.js      # Expense routes
│   │   ├── itinerary.routes.js    # Itinerary routes
│   │   ├── savedPlace.routes.js   # Saved places routes
│   │   ├── trip.routes.js         # Trip CRUD routes
│   │   ├── tripNested.routes.js   # Trip nested routes (/trips/:id/...)
│   │   ├── user.routes.js         # User routes
│   │   └── index.js               # Route aggregator
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js     # 🛡️ JWT verification & user injection
│   │   ├── error.middleware.js    # Global error handler + 404
│   │   └── validators/
│   │       └── validate.js        # express-validator wrapper
│   │
│   ├── utils/
│   │   └── helpers.js             # Utility functions (tokens, date calc, etc.)
│   │
│   └── server.js                  # 🚀 Express app entry point
│
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies & scripts
├── README.md                      # Project overview
├── SETUP_GUIDE.md                # Installation instructions
├── API_DOCS.md                   # Complete API documentation
└── PROJECT_STRUCTURE.md          # This file

```

## Architecture Overview

### Clean Architecture Pattern
```
Controller → Service → ORM (Prisma)
    ↓          ↓          ↓
 Request   Business   Database
 Handler    Logic     Operations
```

### Key Principles

1. **Separation of Concerns**
   - Controllers: Handle HTTP requests/responses
   - Services: Contain all business logic
   - Prisma: Database operations only

2. **Authentication Flow**
   ```
   Request → Auth Middleware → Verify JWT → Inject User → Controller
   ```

3. **Error Handling**
   ```
   AppError (thrown) → Error Middleware → JSON Response
   ```

4. **Validation**
   ```
   Request → express-validator → validate middleware → Controller
   ```

## Database Schema Summary

### Core Tables
- **users** - User accounts with authentication
- **trips** - Trip planning and management
- **itinerary_sections** - Day/section organization
- **itinerary_items** - Individual activities per section
- **activities** - Activity database with tags
- **trip_budgets** - Budget planning by category
- **expenses** - Expense tracking
- **calendar_events** - Calendar synchronization
- **community_posts** - Community sharing
- **community_comments** - Post comments
- **community_reactions** - Post reactions
- **saved_places** - User favorites
- **trip_stats** - Cached analytics
- **user_trip_links** - Trip sharing/collaboration

### Relationships
- User → Trips (1:many)
- Trip → Itinerary Sections (1:many)
- Section → Itinerary Items (1:many)
- Activity → Itinerary Items (1:many)
- Trip → Budgets & Expenses (1:many)
- Activity ↔ Tags (many:many)

## Key Features Implemented

### 🔐 Authentication & Security
- JWT token-based authentication
- bcrypt password hashing (10 rounds)
- Auth middleware for protected routes
- Optional auth for public endpoints

### 📋 Trip Management
- CRUD operations with ownership validation
- Status tracking (planning → confirmed → ongoing → completed)
- Budget planning and tracking
- Multi-user trip collaboration (user_trip_links)

### 🗓️ Itinerary Builder
- Day-by-day organization
- Section-based planning (morning, afternoon, etc.)
- Time overlap validation
- Activity integration
- Cost estimation

### 💰 Budget & Expense Tracking
- Category-based budgets
- Real-time expense tracking
- Budget vs actual comparison
- Currency support
- Automatic calculations

### 🎯 Activity Management
- Advanced search with filters
- Tag-based categorization
- Location-based queries
- Rating system
- Duration and cost estimates

### 👥 Community Features
- Trip sharing and posts
- Comments and reactions
- Location-based discovery
- User interactions

### 📊 Analytics
- Automatic trip statistics
- Budget analysis
- Expense categorization
- Daily breakdowns
- Performance optimized with caching

### 🤖 AI Services (Backend Logic)
- **Itinerary Generation**: Rule-based suggestions
- **Budget Optimization**: Smart category allocation
- **Trip Summaries**: Automated insights
- Extensible for external AI APIs (OpenAI, etc.)

## API Design Principles

### RESTful Structure
- Resource-based URLs
- HTTP verbs (GET, POST, PUT, PATCH, DELETE)
- Consistent response format
- Proper status codes

### Response Format
```json
{
  "success": true,
  "data": {...},
  "count": 10,        // for lists
  "pagination": {...} // when applicable
}
```

### Error Format
```json
{
  "success": false,
  "error": "Error message"
}
```

## Security Features

- Password hashing with bcrypt
- JWT with configurable expiration
- Environment-based secrets
- SQL injection prevention (Prisma ORM)
- Input validation (express-validator)
- CORS configuration
- Error message sanitization

## Performance Optimizations

- Prisma query optimization
- Indexed database fields
- Statistics caching (trip_stats)
- Efficient filtering and pagination
- Selective field loading
- Connection pooling

## Development Workflow

### 1. Database Changes
```bash
# Edit schema.prisma
npm run prisma:generate
npm run prisma:migrate
```

### 2. Testing
```bash
# Use seeded data
npm run prisma:seed

# Test with Postman/curl
# Check Prisma Studio
npm run prisma:studio
```

### 3. Running
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

## File Naming Conventions

- **Controllers**: `<resource>.controller.js`
- **Services**: `<resource>.service.js`
- **Routes**: `<resource>.routes.js`
- **Middleware**: `<name>.middleware.js`

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection
- `JWT_SECRET` - Token signing key
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

Optional:
- `CORS_ORIGIN` - CORS configuration
- `JWT_EXPIRES_IN` - Token expiration
- AI API keys (for future AI integration)

## Deployment Checklist

- [ ] Set production environment variables
- [ ] Update DATABASE_URL to production DB
- [ ] Generate secure JWT_SECRET
- [ ] Run migrations: `npm run prisma:deploy`
- [ ] Configure CORS for frontend domain
- [ ] Set up logging/monitoring
- [ ] Enable HTTPS
- [ ] Set up backup strategy

## Future Enhancements

- Image upload for activities/profiles
- Real-time notifications (WebSocket)
- Social features (follow users, trip sharing)
- Advanced search (ElasticSearch)
- Caching layer (Redis)
- Email notifications
- External AI API integration
- Rate limiting
- API versioning

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator
- **Logging**: morgan
- **Architecture**: MVC with service layer

---

**Ready for hackathon and production use! 🚀**
