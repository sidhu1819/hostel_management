# Setup .env File - Quick Guide

## Your .env file has been created!

Now you need to **replace the placeholder values** with your actual MongoDB connection string.

## Step 1: Get Your MongoDB Connection String

### If you have MongoDB Atlas:
1. Go to: https://cloud.mongodb.com/
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js"
5. Copy the connection string

### If you need to create MongoDB Atlas:
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (FREE)
3. Create M0 FREE cluster
4. Create database user
5. Whitelist IP (allow from anywhere for development)
6. Get connection string

## Step 2: Edit backend/.env File

Open `backend/.env` and replace:

```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/hostelDB?retryWrites=true&w=majority
JWT_SECRET=any_random_long_string_here_123456789
OPENAI_API_KEY=your_key_here
```

**Replace:**
- `YOUR_USERNAME` → Your MongoDB Atlas username
- `YOUR_PASSWORD` → Your MongoDB Atlas password
- `YOUR_CLUSTER` → Your cluster address (e.g., cluster0.abc123)

## Step 3: Generate JWT Secret

For `JWT_SECRET`, use any random long string. Examples:
- `mySuperSecretJWTKey123456789!@#$%^&*()`
- `hostelManagementSecretKey2024`
- Or generate one at: https://randomkeygen.com/

## Step 4: Test

After updating `.env`, restart your server:
```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
✅ Server running on port 5000
```

## Example .env File

```env
PORT=5000
MONGO_URI=mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/hostelDB?retryWrites=true&w=majority
JWT_SECRET=mySuperSecretJWTKey123456789!@#$%^&*()
OPENAI_API_KEY=sk-proj-...
```

## Important Notes

- **Never share your .env file!**
- Keep your MongoDB password secure
- If password has special characters, URL encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`

## Need Help?

If you don't have a MongoDB connection string yet, I can guide you through creating a MongoDB Atlas account!

