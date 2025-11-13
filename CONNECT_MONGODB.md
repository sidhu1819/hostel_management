# Connect to MongoDB Atlas - Step by Step Guide

## Step 1: Get Your MongoDB Atlas Connection String

### If you already have a MongoDB Atlas account:

1. **Log in to MongoDB Atlas**
   - Go to: https://cloud.mongodb.com/
   - Sign in with your account

2. **Navigate to Your Cluster**
   - Click on your cluster (or create one if you don't have it)

3. **Get Connection String**
   - Click the **"Connect"** button on your cluster
   - Choose **"Connect your application"**
   - Select **"Node.js"** as the driver
   - Copy the connection string (it looks like this):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

### If you need to create a MongoDB Atlas account:

1. **Sign Up (Free)**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Click "Try Free" or "Sign Up"
   - Create an account (it's free!)

2. **Create a Free Cluster**
   - After signing up, click "Build a Database"
   - Choose **"M0 FREE"** (Free tier)
   - Select a cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region closest to you
   - Click **"Create"**
   - Wait 1-3 minutes for cluster to be created

3. **Create Database User**
   - Go to **"Database Access"** in the left sidebar
   - Click **"Add New Database User"**
   - Choose **"Password"** authentication
   - Enter a username (e.g., `hosteladmin`)
   - Enter a password (save this password!)
   - Set user privileges to **"Atlas admin"** or **"Read and write to any database"**
   - Click **"Add User"**

4. **Whitelist Your IP Address**
   - Go to **"Network Access"** in the left sidebar
   - Click **"Add IP Address"**
   - For development, click **"Allow Access from Anywhere"** (adds 0.0.0.0/0)
   - Or add your specific IP address
   - Click **"Confirm"**

5. **Get Connection String**
   - Go back to **"Database"** (Clusters) in the left sidebar
   - Click **"Connect"** on your cluster
   - Choose **"Connect your application"**
   - Select **"Node.js"** as the driver
   - Copy the connection string

## Step 2: Format Your Connection String

Your connection string will look like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Replace:**
- `<username>` → Your database username (from Step 1.3)
- `<password>` → Your database password (from Step 1.3)
- `cluster0.xxxxx` → Your actual cluster address

**Add database name:**
Add `/hostelDB` (or any name you want) before the `?`:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
```

**Important:** If your password has special characters like `@`, `#`, `%`, etc., you need to URL encode them:
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`

Or simply change your password to avoid special characters.

## Step 3: Update Your .env File

1. **Open or create** `backend/.env` file

2. **Add your connection string:**
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
   JWT_SECRET=your_random_secret_key_here_make_it_long
   OPENAI_API_KEY=your_openai_key_here
   ```

3. **Replace the values:**
   - `yourusername` → Your MongoDB username
   - `yourpassword` → Your MongoDB password
   - `cluster0.xxxxx` → Your cluster address
   - `your_random_secret_key_here_make_it_long` → Any random long string (for JWT)

## Step 4: Test the Connection

1. **Start your backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Look for this message:**
   ```
   ✅ MongoDB connected
   ✅ Server running on port 5000
   ```

3. **If you see an error:**
   - Check your connection string format
   - Verify username and password are correct
   - Make sure your IP is whitelisted in MongoDB Atlas
   - Check that your cluster is running

## Example Connection String

Here's what a complete connection string looks like:
```
mongodb+srv://hosteladmin:MyPassword123@cluster0.abc123.mongodb.net/hostelDB?retryWrites=true&w=majority
```

## Common Issues

### "Authentication failed"
- Double-check your username and password
- Make sure there are no extra spaces
- URL encode special characters in password

### "IP not whitelisted"
- Go to MongoDB Atlas → Network Access
- Add your IP or allow from anywhere (0.0.0.0/0)

### "Connection timeout"
- Check your internet connection
- Verify the cluster is running
- Check the connection string format

## Quick Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created (M0 FREE)
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] Connection string copied
- [ ] Connection string formatted correctly
- [ ] Added to `backend/.env` file
- [ ] Tested connection (server starts successfully)

## Need Help?

If you're stuck, share:
1. The error message you're seeing
2. Whether you have a MongoDB Atlas account
3. Whether you've created a cluster

I can help you troubleshoot!

