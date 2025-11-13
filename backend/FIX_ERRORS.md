# Fixing "npm run dev" Errors

## Common Errors and Solutions

### Error 1: "nodemon: command not found" or "nodemon is not recognized"

**Problem:** nodemon is not installed

**Solution:**
```bash
cd backend
npm install
```

This will install all dependencies including nodemon.

---

### Error 2: "MONGO_URI is not set" or "Cannot read property 'MONGO_URI'"

**Problem:** Missing or incomplete .env file

**Solution:**
1. Create a `.env` file in the `backend` folder
2. Add this content (replace with your actual values):
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
   JWT_SECRET=any_random_long_string_here_123456789
   OPENAI_API_KEY=your_key_here
   ```

---

### Error 3: "MongoDB connection failed"

**Problem:** Invalid MongoDB connection string or network issue

**Solutions:**
- Check your MongoDB Atlas connection string
- Make sure your IP is whitelisted in MongoDB Atlas
- Verify username and password are correct
- URL encode special characters in password (e.g., `@` → `%40`)

---

### Error 4: "Cannot find module" or "Module not found"

**Problem:** Dependencies not installed

**Solution:**
```bash
cd backend
npm install
```

---

### Error 5: "EADDRINUSE: address already in use :::5000"

**Problem:** Port 5000 is already in use

**Solutions:**
- Close the other application using port 5000
- Or change PORT in `.env` file to a different port (e.g., 5001)

---

### Error 6: "SyntaxError" or "Unexpected token"

**Problem:** Code syntax error or Node.js version issue

**Solutions:**
- Make sure you're using Node.js v14 or higher
- Check `node --version`
- Update Node.js if needed

---

## Step-by-Step Fix

### Step 1: Run Diagnostic
```bash
cd backend
node diagnose.js
```

This will tell you exactly what's wrong.

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create/Update .env File
Create `.env` in `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
```

### Step 4: Try Again
```bash
npm run dev
```

---

## Alternative: Run Without Nodemon

If nodemon is causing issues, you can run directly with Node:

```bash
node server.js
```

This won't auto-restart on file changes, but it will work.

---

## Still Having Issues?

1. **Check the exact error message** - Copy the full error
2. **Run the diagnostic:**
   ```bash
   node diagnose.js
   ```
3. **Check Node.js version:**
   ```bash
   node --version
   ```
   Should be v14 or higher

4. **Verify file structure:**
   - `backend/server.js` exists
   - `backend/package.json` exists
   - `backend/.env` exists

## Quick Test

Try running the server directly:
```bash
cd backend
node server.js
```

This will show you the exact error message without nodemon.

