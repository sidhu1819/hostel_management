# Troubleshooting Registration Errors

## Common Registration Errors and Solutions

### 1. "Cannot connect to server" or "Network Error"

**Problem:** Frontend cannot reach the backend.

**Solutions:**
- Make sure the backend server is running:
  ```bash
  cd backend
  npm run dev
  ```
- Check that the backend is running on port 5000
- Verify the `.env` file in `frontend` folder has:
  ```
  VITE_API_BASE_URL=http://localhost:5000
  ```
- Check browser console (F12) for CORS errors

### 2. "Server configuration error" or JWT errors

**Problem:** Missing environment variables in backend.

**Solutions:**
- Check that `backend/.env` file exists and has:
  ```
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key_here
  OPENAI_API_KEY=your_openai_key (optional)
  ```
- Make sure `JWT_SECRET` is set (generate a random string)
- Restart the backend server after updating `.env`

### 3. "MongoDB connection failed"

**Problem:** Cannot connect to MongoDB database.

**Solutions:**
- Verify your MongoDB Atlas connection string in `backend/.env`
- Check that your IP is whitelisted in MongoDB Atlas (Network Access)
- Ensure your MongoDB username and password are correct
- URL encode special characters in password (e.g., `@` → `%40`)

### 4. "Student with this email or roll number already exists"

**Problem:** Trying to register with existing email or roll number.

**Solutions:**
- Use a different email address
- Use a different roll number
- Or login instead of registering

### 5. "All fields are required"

**Problem:** Missing required form fields.

**Solutions:**
- Fill in all required fields:
  - Name
  - Email
  - Password
  - Roll Number
  - Department
  - Year (1-4)

### 6. Validation Errors

**Problem:** Invalid data format.

**Solutions:**
- Email must be a valid email format
- Year must be a number between 1 and 4
- All text fields should not be empty

### 7. CORS Errors

**Problem:** Browser blocking requests due to CORS policy.

**Solutions:**
- Make sure backend has `cors` middleware enabled (already configured)
- Check that frontend is making requests to the correct URL
- If using a different port, update `VITE_API_BASE_URL` in frontend `.env`

## Quick Checklist

Before registering, make sure:

- [ ] Backend server is running (`npm run dev` in backend folder)
- [ ] MongoDB is connected (check backend console for "✅ MongoDB connected")
- [ ] `.env` file exists in `backend` folder with all required variables
- [ ] `.env` file exists in `frontend` folder with `VITE_API_BASE_URL`
- [ ] All form fields are filled correctly
- [ ] Email and roll number are unique (not already registered)
- [ ] Browser console (F12) shows no errors

## Testing the Connection

1. **Test Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Should see:
   ```
   ✅ MongoDB connected
   ✅ Server running on port 5000
   ```

2. **Test Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Should open in browser at `http://localhost:3000`

3. **Test API directly:**
   Open browser and go to: `http://localhost:5000/`
   Should see: `{"message":"Hostel Management System Backend API"}`

## Getting More Details

If you're still seeing errors:

1. **Check Browser Console (F12):**
   - Look for red error messages
   - Check the Network tab to see failed requests

2. **Check Backend Console:**
   - Look for error messages in the terminal where backend is running

3. **Check Backend Logs:**
   - The backend will log detailed error messages

## Still Having Issues?

Share the exact error message you're seeing, and I can help you fix it!

