# Quick MongoDB Atlas Setup - 5 Steps

## Step 1: Get MongoDB Atlas Connection String

### Option A: If you already have MongoDB Atlas
1. Go to: https://cloud.mongodb.com/
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js"
5. Copy the connection string

### Option B: Create new MongoDB Atlas account (FREE)
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create M0 FREE cluster (takes 1-3 minutes)
4. Create database user (Database Access → Add New Database User)
5. Whitelist IP (Network Access → Add IP Address → Allow from anywhere)
6. Get connection string (Connect → Connect your application → Node.js)

## Step 2: Format Your Connection String

Your connection string looks like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Replace:**
- `<username>` → Your MongoDB username
- `<password>` → Your MongoDB password

**Add database name:**
Add `/hostelDB` before the `?`:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
```

## Step 3: Update backend/.env File

Create or edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
JWT_SECRET=any_random_long_string_123456789
OPENAI_API_KEY=your_key_here
```

**Replace:**
- `yourusername` → Your MongoDB username
- `yourpassword` → Your MongoDB password  
- `cluster0.xxxxx` → Your cluster address
- `any_random_long_string_123456789` → Any random secret (for JWT)

## Step 4: Test Connection

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected
✅ Server running on port 5000
```

## Step 5: If You Get Errors

### "Authentication failed"
- Check username/password
- URL encode special characters in password (@ → %40, # → %23)

### "IP not whitelisted"  
- Go to MongoDB Atlas → Network Access
- Add IP or allow from anywhere (0.0.0.0/0)

### "Connection timeout"
- Check internet connection
- Verify cluster is running

## Example .env File

```env
PORT=5000
MONGO_URI=mongodb+srv://admin:MyPassword123@cluster0.abc123.mongodb.net/hostelDB?retryWrites=true&w=majority
JWT_SECRET=mySuperSecretJWTKey123456789!@#$%^&*
OPENAI_API_KEY=sk-...
```

That's it! 🎉

