# Quick Fix for "npm run dev" Error

## Most Common Issues:

### Issue 1: Missing .env file
**Error:** `MONGO_URI is not set` or `Cannot find module`

**Fix:**
1. Create a `.env` file in the `backend` folder
2. Add this content (replace with your actual values):
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
   JWT_SECRET=your_random_secret_key_here
   OPENAI_API_KEY=your_openai_key_here
   ```

### Issue 2: Dependencies not installed
**Error:** `nodemon: command not found` or `Cannot find module`

**Fix:**
```bash
cd backend
npm install
```

### Issue 3: MongoDB connection string incorrect
**Error:** `MongoDB connection failed`

**Fix:**
- Check your MongoDB Atlas connection string
- Make sure your IP is whitelisted in MongoDB Atlas
- URL encode special characters in password

## Step-by-Step Fix:

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies (if not done):**
   ```bash
   npm install
   ```

3. **Create/Check .env file:**
   - Make sure `.env` file exists in `backend` folder
   - It should contain:
     ```
     PORT=5000
     MONGO_URI=your_connection_string
     JWT_SECRET=your_secret
     ```

4. **Run the server:**
   ```bash
   npm run dev
   ```

## If Still Getting Errors:

Run the setup checker:
```bash
node check-setup.js
```

This will tell you exactly what's missing!

## Common Error Messages:

- **"MONGO_URI is not set"** → Create/update `.env` file
- **"nodemon: command not found"** → Run `npm install`
- **"MongoDB connection failed"** → Check your connection string
- **"Cannot find module"** → Run `npm install`

