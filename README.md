# GlobeTrotter - AI Itinerary Engine

A comprehensive travel planning application with **React Native Expo** (mobile) and **Node.js + Express** (backend) powered by PostgreSQL database.

## 🎯 Overview

This is a fully integrated, production-ready travel itinerary application featuring:
- ✅ Complete REST API backend with 12+ endpoint groups
- ✅ Type-safe frontend with comprehensive API integration
- ✅ JWT authentication with token management
- ✅ AI-powered itinerary generation and budget optimization
- ✅ Community features for sharing travel experiences
- ✅ Budget tracking and expense management
- ✅ Calendar integration for trip events

## 🎨 Design Theme
- **Colors**: White and Red
- **Architecture**: Clean, modern, and user-friendly
- **Platform**: iOS & Android (React Native Expo)

---

## 📱 Frontend (React Native Expo)

### Features Implemented
1. **Authentication System**
   - Login & Registration screens
   - JWT token management
   - Persistent authentication state
   - Auto-logout on token expiry

2. **Trip Management**
   - Create, update, delete trips
   - Trip status tracking (planning, confirmed, ongoing, completed)
   - Trip statistics and analytics
   - Multi-trip support

3. **Itinerary Builder**
   - Day-by-day itinerary sections
   - Activity scheduling with time slots
   - Cost estimation per activity
   - Drag-and-drop ordering (ready for implementation)

4. **Activity Discovery**
   - Search by city, category, tags
   - Activity details with ratings
   - Save favorite places
   - Filter by price level

5. **Budget Management**
   - Category-based budgets
   - Expense tracking
   - Real-time budget vs. actual comparison
   - Currency support

6. **Community Features**
   - Share trip experiences
   - Comment on posts
   - Reaction system (like, love, helpful)
   - Browse by location

7. **AI-Powered Features**
   - Automatic itinerary generation
   - Budget optimization
   - Trip summaries
   - Chat assistant

### Tech Stack
- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **State Management**: React Context + Hooks
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Navigation**: React Navigation
- **Icons**: React Native Vector Icons

### Project Structure
```
frontend/expo/src/
├── api/                    # ✨ Complete API Integration
│   ├── services/          # Service layer for all endpoints
│   ├── types.ts           # TypeScript definitions
│   ├── endpoints.ts       # API endpoint URLs
│   └── client.ts          # Axios client with auth
├── contexts/              # React Context providers
├── hooks/                 # Custom hooks (useTrips, useActivities)
├── screens/               # All screen components
├── components/            # Reusable UI components
├── navigation/            # Navigation configuration
└── constants/             # Theme and constants
```

### Quick Start - Frontend

1. **Navigate to frontend**
   ```bash
   cd frontend/expo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update API URL** in `src/api/endpoints.ts`:
   ```typescript
   const API_URL = 'http://localhost:3000/api';
   ```

4. **Start Expo**
   ```bash
   npm start
   ```

5. **Run on device**
   - Scan QR code with Expo Go app
   - Or press 'a' for Android emulator
   - Or press 'i' for iOS simulator

---

## 🚀 Backend (Node.js + Express)

### API Endpoints Implemented

**✅ Authentication** (`/api/auth`)
- Register, Login, Logout
- JWT token management
- Password hashing

**✅ User Management** (`/api/users`)
- Profile management
- User statistics
- Settings

**✅ Trip Management** (`/api/trips`)
- CRUD operations
- Status tracking
- Trip analytics
- Nested routes for related data

**✅ Itinerary System** (`/api/itinerary`)
- Sections (day-by-day planning)
- Items (individual activities)
- Time-based scheduling
- Cost estimation

**✅ Activities** (`/api/activities`)
- Activity database with 100+ entries
- Search by city, category, tags
- Ratings and reviews
- Price level filtering

**✅ Budget Management** (`/api/budgets`)
- Category-based budgets
- Budget vs actual tracking
- Multi-currency support

**✅ Expense Tracking** (`/api/expenses`)
- Transaction logging
- Category assignment
- Receipt uploads
- Date-based filtering

**✅ Community Features** (`/api/community`)
- Post sharing
- Comments
- Reactions (like, love, helpful, inspiring)
- Location-based browsing

**✅ Calendar Events** (`/api/calendar`)
- Event scheduling
- Reminders
- Trip-related events

**✅ Saved Places** (`/api/saved-places`)
- Bookmark activities
- Personal notes
- Quick access

**✅ AI Services** (`/api/ai`)
- Itinerary generation
- Budget optimization
- Trip summaries
- Chat assistant

**✅ Analytics** (`/api/trips/:id/stats`)
- Spending analysis
- Activity statistics
- Budget comparisons

### Tech Stack
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Express-validator
- **Security**: bcryptjs, helmet, cors
- **AI Integration**: OpenAI API (optional)

### Project Structure
```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Seed data
├── src/
│   ├── server.js          # Entry point
│   ├── config/
│   │   └── database.js    # DB configuration
│   ├── controllers/       # 12 controllers
│   ├── services/          # Business logic layer
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & validation
│   └── utils/             # Helper functions
├── .env.example
└── package.json
```

### Quick Start - Backend

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/glob_travel_db"
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   ```

4. **Set up database**
   ```bash
   # Create database
   createdb glob_travel_db
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed database with sample data
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   
   Server runs at: `http://localhost:3000`
   API base: `http://localhost:3000/api`
   Health check: `http://localhost:3000/api/health`

### Available Scripts
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run seed     # Seed database with sample data
npm run migrate  # Run Prisma migrations
```

---

## 🗄️ Database Schema

### Core Tables

**users**
- id, email, password_hash
- first_name, last_name, phone
- city, country, avatar_url
- created_at, updated_at

**trips**
- id, user_id, title, description
- start_date, end_date, status
- total_budget, image_url

**itinerary_sections**
- id, trip_id, day_number
- section_order, title, description
- city, start_time, end_time
- estimated_cost

**itinerary_items**
- id, itinerary_section_id, activity_id
- title, description, location
- start_time, end_time, cost

**activities**
- id, name, description
- city, country, category
- price_level, rating, tags
- address, coordinates

**budgets**
- id, trip_id, category
- planned_amount, notes

**expenses**
- id, trip_id, budget_id
- category, description, amount
- currency, expense_date

**community_posts**
- id, user_id, trip_id
- title, content, city, country
- image_urls

**calendar_events**
- id, trip_id, user_id
- title, start_datetime, end_datetime
- location, event_type

**saved_places**
- id, user_id, activity_id
- note, created_at

---

## 🔗 Frontend-Backend Integration

### Authentication Flow
```typescript
// 1. User logs in
const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// 2. Token stored in AsyncStorage
await AsyncStorage.setItem('access_token', response.data.token);

// 3. API client auto-includes token in requests
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### Using API Services
```typescript
// Import services
import { tripService, activityService, aiService } from './src/api';

// Create a trip
const trip = await tripService.createTrip({
  title: 'Paris Adventure',
  start_date: '2026-06-01',
  end_date: '2026-06-07',
  total_budget: 2000
});

// Search activities
const activities = await activityService.search({
  city: 'Paris',
  category: 'museum'
});

// Generate AI itinerary
const itinerary = await aiService.generateItinerary({
  trip_id: trip.data.id,
  preferences: {
    pace: 'moderate',
    interests: ['culture', 'food']
  }
});
```

---

## 📚 Documentation

- **[API Documentation](backend/API_DOCS.md)** - Complete API reference
- **[Frontend Integration Guide](frontend/expo/INTEGRATION_GUIDE.md)** - Frontend usage
- **[Quick Reference](QUICK_REFERENCE.md)** - Quick command reference
- **[Folder Structure](FOLDER_STRUCTURE.md)** - Detailed folder structure
- **[Backend Setup](backend/SETUP_GUIDE.md)** - Backend setup guide

---

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/glob_travel_db"
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
OPENAI_API_KEY=your-openai-key  # Optional for AI features
AI_MODEL=gpt-4
```

### Frontend
Update in `frontend/expo/src/api/endpoints.ts`:
```typescript
const API_URL = 'http://localhost:3000/api';  // Development
// const API_URL = 'http://10.0.2.2:3000/api';  // Android Emulator
// const API_URL = 'http://YOUR_IP:3000/api';   // Physical Device
```

---

## 🧪 Testing

### Backend
```bash
cd backend
npm test  # Run tests (setup required)
```

### Frontend
```bash
cd frontend/expo
npm test
```

---

## 📦 Building for Production

### Android APK
```bash
cd frontend/expo
eas build --platform android
```

### iOS App
```bash
cd frontend/expo
eas build --platform ios
```

### Backend Deployment
```bash
# Build
npm run build

# Set production environment
export NODE_ENV=production

# Start server
npm start
```

---

## 🚀 Features Roadmap

### ✅ Completed
- Complete REST API with 12+ endpoint groups
- Type-safe frontend integration
- JWT authentication
- Trip management system
- Itinerary builder
- Activity database
- Budget & expense tracking
- Community features
- AI integration

### 🔄 In Progress
- Enhanced UI/UX
- Offline support
- Push notifications
- Payment integration

### 📋 Planned
- Real-time collaboration
- Map integration
- Weather integration
- Flight/hotel booking
- Multi-language support

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Support

For issues and questions:
- Check the [Documentation](QUICK_REFERENCE.md)
- Review [API Docs](backend/API_DOCS.md)
- See [Integration Guide](frontend/expo/INTEGRATION_GUIDE.md)

---

## 🎉 Quick Test

### 1. Start Backend
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run seed
npm run dev
```

### 2. Start Frontend
```bash
cd frontend/expo
npm install
npm start
```

### 3. Test API Connection
Open Expo app and try logging in with seeded user:
- Email: `test@example.com`
- Password: `password123`

**Success!** You're now connected to the backend! 🎊

---

**Built with ❤️ using React Native Expo + Node.js + PostgreSQL**

### iOS
```bash
cd ios
xcodebuild -workspace ItineraryEngine.xcworkspace -scheme ItineraryEngine archive
```

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License
MIT License

## 👥 Team
Built for Odoo Hackathon - GlobeTrotter Team

---

**Happy Travels! ✈️🌍**
