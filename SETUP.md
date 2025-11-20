# Setup Guide

## Prerequisites

1. Node.js v18 or higher
2. PostgreSQL database (remote)
3. Google OAuth 2.0 credentials

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Set application type to "Web application"
6. Add authorized redirect URI: `http://localhost:3000/auth/google/callback`
7. Save your Client ID and Client Secret

## Installation Steps

### 1. Install Dependencies

```bash
npm run install:all
```

This will install dependencies for:
- Root package (concurrently)
- Backend (Express, Prisma, etc.)
- Frontend (React, Vite, Tailwind, etc.)

### 2. Configure Backend Environment

Copy the example environment file:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your actual values:

```env
# Database - Your remote PostgreSQL connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Google OAuth - From Google Cloud Console
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# Session - Generate a random string
SESSION_SECRET="your-random-session-secret-here"

# App Settings
PORT=3000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

### 3. Configure Frontend Environment

Copy the example environment file:

```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Setup Database

Run Prisma migrations to create database tables:

```bash
cd backend
npx prisma migrate dev --name init
```

Optional: Open Prisma Studio to view your database:

```bash
npx prisma studio
```

### 5. Start Development Servers

From the root directory:

```bash
npm run dev
```

This will start both:
- Backend API: http://localhost:3000
- Frontend: http://localhost:5173

## Testing the Application

1. Open http://localhost:5173 in your browser
2. Click "Continue with Google"
3. Sign in with your Google account
4. You'll be redirected back to the app
5. Start creating todos!

## Project Structure

```
.
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js        # Prisma client
│   │   │   └── passport.js        # Passport configuration
│   │   ├── controllers/
│   │   │   └── todoController.js  # Todo CRUD logic
│   │   ├── middleware/
│   │   │   └── auth.js            # Auth middleware
│   │   ├── routes/
│   │   │   ├── auth.js            # Auth routes
│   │   │   └── todos.js           # Todo routes
│   │   └── server.js              # Express app
│   ├── .env                       # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginPage.jsx      # Login page
│   │   │   └── TodoList.jsx       # Todo list page
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth context
│   │   ├── services/
│   │   │   └── api.js             # API client
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Tailwind imports
│   ├── .env                       # Environment variables
│   └── package.json
│
├── package.json                   # Root package.json
└── README.md                      # Project documentation
```

## Available Scripts

### Root Directory

- `npm run dev` - Start both frontend and backend
- `npm run dev:backend` - Start backend only
- `npm run dev:frontend` - Start frontend only
- `npm run install:all` - Install all dependencies

### Backend Directory

- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend in production
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Frontend Directory

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### Port Already in Use

If port 3000 or 5173 is already in use:

1. Change backend port in `backend/.env`:
   ```env
   PORT=3001
   ```

2. Update frontend API URL in `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

3. Update Google OAuth callback in Google Cloud Console and `backend/.env`

### CORS Issues

Make sure:
- `FRONTEND_URL` in backend `.env` matches your frontend URL
- Both servers are running
- Cookies are enabled in your browser

### Authentication Not Working

1. Verify Google OAuth credentials are correct
2. Check callback URL matches in Google Console and `.env`
3. Ensure `SESSION_SECRET` is set in backend `.env`
4. Clear browser cookies and try again

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Ensure database is accessible from your machine
3. Check firewall settings if using remote database
4. Test connection with `npx prisma studio`
