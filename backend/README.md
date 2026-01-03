# 🌐 GlobeTrotter – Backend API

This directory contains the **RESTful backend API** for GlobeTrotter, built using **Node.js, Express, PostgreSQL, and Prisma ORM**.

---

## 🎯 Responsibilities

The backend handles:
- Authentication & authorization
- User and trip management
- Itinerary and activity logic
- Budget and expense tracking
- Community features
- AI service integration
- Data persistence and security

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt, helmet, cors
- OpenAI API (optional)

---

## 📂 Folder Structure

```
backend/
├── prisma/
│ ├── schema.prisma
│ └── seed.js
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ ├── middleware/
│ ├── utils/
│ └── server.js
├── .env.example
└── package.json
```
---

## 🚀 Getting Started

### 1. Navigate to backend
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```
### 3. Configure environment variables
```bash
cp .env.example .env
```
### Edit .env:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/globetrotter
JWT_SECRET=your_secret_key
PORT=3000
```
### 4. Database Setup
```bash
npx prisma migrate dev
npm run seed
```

### 5. Start Server
```bash
npm run dev
```
---

## 📌 Core API Modules

- /auth – Login & Registration
- /users – Profile & settings
- /trips – Trip management
- /itinerary – Day-wise planning
- /activities – Activity discovery
- /budgets – Budget planning
- /expenses – Expense tracking
- /community – Posts & reactions
- /calendar – Events & reminders
- /ai – AI itinerary services

---

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Input validation
- Secure headers with helmet
- CORS protection

---

## 📄 License

MIT License

---

