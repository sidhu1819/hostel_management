# Fix "Cannot connect to server" Error

## Quick Fixes

### 1. Check if Backend is Running

**Look at your backend terminal** - you should see:
```
✅ MongoDB connected
✅ Server running on port 5000
```

If you don't see these messages, the backend isn't running properly.

### 2. Restart Backend

If backend crashed or stopped:

```bash
cd backend
npm run dev
```

Make sure you see:
```
✅ MongoDB connected
✅ Server running on port 5000
```

### 3. Check Backend in Browser

Open: http://localhost:5000

You should see:
```json
{"message":"Hostel Management System Backend API"}
```

If you see this, backend is working!

### 4. Verify Frontend .env

Make sure `frontend/.env` exists with:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 5. Check for Port Conflicts

If port 5000 is in use:
- Kill the process using port 5000
- Or change PORT in backend/.env to 5001
- Update frontend/.env to match

### 6. Restart Both Servers

1. **Stop both servers** (Ctrl+C in terminals)
2. **Start backend first:**
   ```bash
   cd backend
   npm run dev
   ```
3. **Wait for "✅ Server running on port 5000"**
4. **Then start frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## Common Issues

### Backend Not Starting
- Check MongoDB connection
- Verify .env file has MONGO_URI
- Check for errors in backend terminal

### CORS Errors
- Backend has CORS enabled (should work)
- Check browser console (F12) for CORS errors

### Network Error
- Make sure both servers are running
- Check firewall isn't blocking port 5000
- Verify localhost:5000 is accessible

## Test Connection

1. Open browser
2. Go to: http://localhost:5000
3. Should see: `{"message":"Hostel Management System Backend API"}`

If this works, backend is fine. The issue is frontend connection.

