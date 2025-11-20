# Todo App

A simple Todo application with web and iOS support.

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL + Prisma ORM
- Google OAuth 2.0

### Frontend (Web)
- React + Vite
- Tailwind CSS
- Google OAuth 2.0

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Google OAuth 2.0 credentials

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

2. Configure environment variables:
   - Copy `.env.example` to `.env` in backend folder
   - Fill in database URL and Google OAuth credentials

3. Run database migrations:
```bash
cd backend
npx prisma migrate dev
```

4. Start development servers:
```bash
npm run dev
```

This will start:
- Backend API on http://localhost:3000
- Frontend on http://localhost:5173

## Project Structure

```
.
├── backend/          # Express API server
│   ├── prisma/      # Database schema and migrations
│   └── src/         # Source code
└── frontend/         # React application
    └── src/         # Source code
```
