# Quick Start Guide - GLOB Travel API

## ⚡ Fast Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
# Create PostgreSQL database
createdb glob_travel_db

# Or using psql
psql -U postgres -c "CREATE DATABASE glob_travel_db;"
```

### 3. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env - Update DATABASE_URL with your PostgreSQL credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/glob_travel_db"
```

### 4. Run Migrations & Seed
```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### 5. Start Server
```bash
npm run dev
```

Server runs at: **http://localhost:3000**

---

## 🧪 Quick Test

### Test Health Endpoint
```bash
curl http://localhost:3000/api/health
```

### Login with Seeded User
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com","password":"password123"}'
```

Copy the `token` from response and use in subsequent requests:

```bash
export TOKEN="your-token-here"

# Get user profile
curl http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📚 Essential Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Trips
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trips` | Get all user trips |
| POST | `/api/trips` | Create new trip |
| GET | `/api/trips/:id` | Get trip details |
| PUT | `/api/trips/:id` | Update trip |
| DELETE | `/api/trips/:id` | Delete trip |

### Itinerary
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trips/:tripId/itinerary` | Get trip itinerary |
| POST | `/api/itinerary/sections` | Create section |
| POST | `/api/itinerary/items` | Create item |

### Activities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activities?city=Paris` | Search activities |
| GET | `/api/activities/:id` | Get activity details |

### Budget & Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trips/:tripId/budgets` | Get trip budgets |
| POST | `/api/budgets` | Create budget |
| GET | `/api/trips/:tripId/expenses` | Get expenses |
| POST | `/api/expenses` | Create expense |

### AI Features
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/generate-itinerary` | Generate itinerary |
| POST | `/api/ai/optimize-budget` | Optimize budget |
| POST | `/api/ai/trip-summary` | Get trip summary |

### Community
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/community/posts` | Get posts |
| POST | `/api/community/posts` | Create post |
| POST | `/api/community/posts/:id/comments` | Add comment |

---

## 🔑 Test Credentials

After running seed:
- **Email**: `john.doe@example.com`
- **Password**: `password123`

---

## 📦 NPM Scripts

```bash
npm start                  # Start production server
npm run dev               # Start development server (auto-reload)
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run database migrations
npm run prisma:studio     # Open Prisma Studio (DB viewer)
npm run prisma:seed       # Seed sample data
npm run prisma:deploy     # Deploy migrations (production)
```

---

## 🗂️ File Structure (Simplified)

```
GLOB/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── routes/            # API routes
│   ├── middleware/        # Auth, validation, errors
│   └── server.js          # Main entry point
├── .env                   # Environment config
└── package.json           # Dependencies
```

---

## 🐛 Common Issues

### Database Connection Error
```bash
# Check PostgreSQL is running
sudo service postgresql status   # Linux
# or check Windows Services

# Verify DATABASE_URL in .env
```

### Port Already in Use
```bash
# Change PORT in .env
PORT=3001
```

### Migration Failed
```bash
# Reset database
npm run prisma:migrate reset
npm run prisma:seed
```

---

## 🔗 Resources

- **API Documentation**: `API_DOCS.md`
- **Full Setup Guide**: `SETUP_GUIDE.md`
- **Architecture Details**: `PROJECT_STRUCTURE.md`
- **Prisma Studio**: `http://localhost:5555` (run `npm run prisma:studio`)

---

## 🎯 Next Steps

1. ✅ Test endpoints with Postman/Insomnia
2. ✅ Connect React Native frontend
3. ✅ Customize business logic in services
4. ✅ Add more activities via Prisma Studio
5. ✅ Deploy to production

---

**Happy Coding! 🚀**
