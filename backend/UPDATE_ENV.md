# Update .env File with Your Connection String

## Option 1: Manual Update (Recommended)

1. **Open** `backend/.env` file in a text editor

2. **Replace** the `MONGO_URI` line with your connection string:
   ```env
   PORT=5000
   MONGO_URI=YOUR_CONNECTION_STRING_HERE
   JWT_SECRET=any_random_long_string_here_123456789
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Make sure** your connection string includes the database name:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
   ```
   (Notice `/hostelDB` before the `?`)

4. **Save** the file

5. **Run** the server:
   ```bash
   npm run dev
   ```

## Option 2: Using the Script

Run the update script:
```bash
node update-env.js
```

Then paste your connection string when prompted.

## Format Your Connection String

Your connection string should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
```

**Important:**
- Replace `username` and `password` with your MongoDB credentials
- Replace `cluster0.xxxxx` with your cluster address
- Add `/hostelDB` (or any database name) before the `?`

## After Updating

Restart your server:
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
✅ Server running on port 5000
```

