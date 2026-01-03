# Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation Steps

### 1. Clone and Install Dependencies

```bash
cd GLOB
npm install
```

### 2. Set Up PostgreSQL Database

Create a new PostgreSQL database:

```sql
CREATE DATABASE glob_travel_db;
```

Or using command line:

```bash
psql -U postgres
CREATE DATABASE glob_travel_db;
\q
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and update the following:

```env
# Update with your PostgreSQL credentials
DATABASE_URL="postgresql://username:password@localhost:5432/glob_travel_db?schema=public"

# Generate a secure JWT secret (use a random string generator)
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long

# Set port (optional)
PORT=3000

# Set environment
NODE_ENV=development
```

### 4. Generate Prisma Client and Run Migrations

```bash
# Generate Prisma Client
npm run prisma:generate

# Create and apply database migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

When running migrations for the first time, you'll be asked to name the migration. You can use: `init`

### 5. Seed the Database (Optional)

Add sample data to test the API:

```bash
npm run prisma:seed
```

This creates:
- 2 test users
- Sample activities in Paris, Tokyo
- A sample trip
- Activity tags
- Community posts

**Test Credentials:**
- Email: `john.doe@example.com`
- Password: `password123`

### 6. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

### 7. Test the API

Check if the server is running:

```bash
curl http://localhost:3000/api/health
```

Or visit in browser: `http://localhost:3000/api/health`

## Testing the API with Sample Requests

### 1. Register a User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the token from the response for subsequent requests.

### 3. Create a Trip

```bash
curl -X POST http://localhost:3000/api/trips \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Summer in Paris",
    "description": "Exploring the City of Lights",
    "start_date": "2026-07-01",
    "end_date": "2026-07-07",
    "total_budget": 2500
  }'
```

## Troubleshooting

### Database Connection Issues

**Error:** `Can't reach database server`

**Solution:**
1. Ensure PostgreSQL is running: `sudo service postgresql status` (Linux) or check Services (Windows)
2. Verify database credentials in `.env`
3. Check if the database exists: `psql -U postgres -l`

### Migration Issues

**Error:** `Migration failed`

**Solution:**
1. Reset database: `npm run prisma:migrate reset`
2. This will drop all tables and re-run migrations
3. Re-seed if needed: `npm run prisma:seed`

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
1. Change PORT in `.env` to another port (e.g., 3001)
2. Or kill the process using port 3000

### Prisma Client Issues

**Error:** `@prisma/client did not initialize yet`

**Solution:**
```bash
npm run prisma:generate
```

## Development Tools

### Prisma Studio
Visual database browser:
```bash
npm run prisma:studio
```

Access at: `http://localhost:5555`

### API Testing
Recommended tools:
- Postman
- Insomnia
- Thunder Client (VS Code extension)
- REST Client (VS Code extension)

### Logging
- Development mode shows detailed SQL queries
- Production mode shows only errors

## Production Deployment

### Environment Variables
Set these in your production environment:
```env
NODE_ENV=production
DATABASE_URL=your-production-database-url
JWT_SECRET=your-production-jwt-secret
PORT=3000
```

### Database Migrations
```bash
npm run prisma:deploy
```

### Start Server
```bash
npm start
```

## Next Steps

1. ✅ Read API_DOCS.md for endpoint documentation
2. ✅ Test all endpoints with Postman/Insomnia
3. ✅ Connect your React Native frontend
4. ✅ Implement additional features as needed
5. ✅ Set up CI/CD pipeline for deployment

## Need Help?

Check the following:
- API Documentation: `API_DOCS.md`
- Prisma Documentation: https://www.prisma.io/docs
- Express Documentation: https://expressjs.com
- PostgreSQL Documentation: https://www.postgresql.org/docs
