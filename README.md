# Hostel Management System

A complete full-stack hostel management system with React frontend and Node.js/Express backend, featuring AI integration.

## Features

- 🔐 **Authentication**: JWT-based login/register system
- 🏠 **Room Management**: View and manage hostel rooms
- 🎫 **Ticket System**: Create and manage complaints/tickets
- 🤖 **AI Assistant**: OpenAI-powered chat assistant
- 👥 **Role-based Access**: Student and Admin roles

## Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Axios
- TailwindCSS

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- JWT Authentication
- OpenAI API

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
```

Start backend:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start frontend:
```bash
npm run dev
```

### 3. Access Application

Open browser: **http://localhost:3000**

## Detailed Setup

See [HOW_TO_RUN.md](./HOW_TO_RUN.md) for complete setup instructions.

## Project Structure

```
hostel management/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── api/
    └── package.json
```

## API Endpoints

### Public
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Protected (Require JWT)
- `GET /api/rooms` - Get all rooms
- `POST /api/rooms` - Create room (Admin)
- `POST /api/tickets` - Create ticket
- `GET /api/tickets` - Get tickets
- `POST /api/ai` - AI chat

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `OPENAI_API_KEY` - OpenAI API key (optional)

### Frontend (.env)
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:5000)

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.

## License

MIT

