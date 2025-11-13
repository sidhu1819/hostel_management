# Frontend Running on Port 3001

## ✅ Good News

Your frontend is running successfully on **http://localhost:3001** (port 3000 was in use, so Vite automatically used 3001).

## Next Steps

### 1. Open the Application

Go to: **http://localhost:3001**

### 2. Verify Backend Connection

Make sure your **backend is running** on port 5000.

Check your backend terminal - you should see:
```
✅ MongoDB connected
✅ Server running on port 5000
```

### 3. Test Backend Directly

Open in browser: **http://localhost:5000**

You should see:
```json
{"message":"Hostel Management System Backend API"}
```

### 4. If You See "Cannot connect to server"

**Check these:**

1. **Backend is running:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Frontend .env file exists:**
   - File: `frontend/.env`
   - Content: `VITE_API_BASE_URL=http://localhost:5000`

3. **Restart frontend after creating .env:**
   - Stop frontend (Ctrl+C)
   - Start again: `npm run dev`

4. **Check browser console (F12):**
   - Look for error messages
   - Check Network tab for failed requests

## Current Setup

- ✅ Frontend: http://localhost:3001
- ⚠️ Backend: http://localhost:5000 (verify it's running)

## Quick Test

1. Open: http://localhost:3001
2. Try to register/login
3. If you get connection error, check backend is running

## Note About Port 3001

This is fine! Vite automatically found an available port. Your frontend will work the same way on port 3001.

