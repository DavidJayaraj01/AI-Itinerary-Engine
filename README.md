# GlobeTrotter - AI Itinerary Engine

A comprehensive travel planning application built with React Native CLI (mobile) and FastAPI (backend) with PostgreSQL database.

## 🎨 Design Theme
- **Colors**: Black, White, and Red
- **Architecture**: Clean, modern, and user-friendly

## 📱 Mobile App (React Native CLI)

### Features
1. **Authentication**
   - Login Screen
   - Sign Up/Registration Screen

2. **Dashboard/Home**
   - Featured destinations
   - Search functionality
   - Regional selections
   - Previous trips list

3. **Trip Management**
   - Create New Trip
   - My Trips List
   - Trip Details
   - Itinerary Builder

4. **Search & Discovery**
   - City Search with filters
   - Activity Search by category
   - Browse destinations

5. **Budget Management**
   - Cost breakdown
   - Budget tracking
   - Expense analytics

6. **User Profile**
   - Profile settings
   - Account management
   - Preferences

### Tech Stack
- React Native 0.83
- React Navigation (Native Stack & Bottom Tabs)
- TypeScript
- React Native Vector Icons
- Axios for API calls
- AsyncStorage for local data

### Project Structure
```
ItineraryEngine/
├── src/
│   ├── screens/          # All screen components
│   ├── components/       # Reusable components
│   │   ├── buttons/
│   │   ├── inputs/
│   │   ├── cards/
│   │   └── forms/
│   ├── navigation/       # Navigation configuration
│   ├── constants/        # Theme, colors, sizes
│   ├── assets/          # Images, fonts, icons
│   ├── utils/           # Helper functions
│   ├── services/        # API services
│   ├── api/             # API configuration
│   └── types/           # TypeScript types
├── android/
├── ios/
└── App.tsx
```

### Installation & Setup

1. **Install Dependencies**
   ```bash
   cd ItineraryEngine
   npm install
   ```

2. **Install iOS Pods (Mac only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Run on Android**
   ```bash
   npx react-native run-android
   ```

4. **Run on iOS (Mac only)**
   ```bash
   npx react-native run-ios
   ```

## 🚀 Backend (FastAPI + PostgreSQL)

### Features
- User authentication with JWT
- Trip management (CRUD)
- City and destination database
- Activity management
- Budget tracking
- RESTful API endpoints

### Tech Stack
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- Pydantic for validation
- JWT authentication
- Alembic for migrations

### Project Structure
```
backend/
├── app/
│   ├── api/
│   │   └── endpoints/    # API route handlers
│   ├── models/           # Database models
│   ├── schemas/          # Pydantic schemas
│   ├── core/             # Config, security
│   ├── db/              # Database connection
│   └── services/        # Business logic
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
└── .env.example        # Environment variables template
```

### Installation & Setup

1. **Create Virtual Environment**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Mac/Linux
   source venv/bin/activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up PostgreSQL**
   - Install PostgreSQL
   - Create database: `globetrotter`
   - Update `.env` file with database credentials

4. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run Database Migrations**
   ```bash
   alembic upgrade head
   ```

6. **Start Server**
   ```bash
   uvicorn main:app --reload
   ```

   Server will run at: `http://localhost:8000`
   API docs at: `http://localhost:8000/docs`

### API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user

#### Trips
- `POST /api/v1/trips/` - Create trip
- `GET /api/v1/trips/` - Get user trips
- `GET /api/v1/trips/{trip_id}` - Get trip details
- `PUT /api/v1/trips/{trip_id}` - Update trip
- `DELETE /api/v1/trips/{trip_id}` - Delete trip

#### Cities
- `POST /api/v1/cities/` - Add city
- `GET /api/v1/cities/` - Search cities
- `GET /api/v1/cities/{city_id}` - Get city details

## 🗄️ Database Schema

### Users
- id, email, username, password
- first_name, last_name, phone
- city, country, additional_info
- created_at, updated_at

### Trips
- id, user_id, name, description
- start_date, end_date, status
- cover_image, is_public

### Cities
- id, name, country, region
- cost_index, popularity
- description, coordinates

### Stops
- id, trip_id, city_id
- order_index, dates, notes

### Activities
- id, stop_id, name, category
- duration, cost, rating
- scheduled_time, description

### Budget
- id, trip_id, total_budget
- breakdown by category
- currency, notes

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/globetrotter
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
BACKEND_CORS_ORIGINS=["http://localhost:3000", "http://localhost:8081"]
```

## 🧪 Testing

### Mobile App
```bash
npm test
```

### Backend
```bash
pytest
```

## 📦 Building for Production

### Android
```bash
cd android
./gradlew assembleRelease
```

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
