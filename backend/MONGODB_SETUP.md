# MongoDB Atlas Connection Guide

## Step 1: Get Your MongoDB Atlas Connection String

### If you already have a MongoDB Atlas cluster:

1. **Log in to MongoDB Atlas**
   - Go to https://cloud.mongodb.com/
   - Sign in to your account

2. **Get Your Connection String**
   - Click on "Connect" button for your cluster
   - Choose "Connect your application"
   - Select "Node.js" as the driver
   - Copy the connection string (it looks like this):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

3. **Replace Placeholders**
   - Replace `<username>` with your MongoDB Atlas username
   - Replace `<password>` with your MongoDB Atlas password
   - Optionally, add your database name at the end:
     ```
     mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
     ```

### If you need to create a new MongoDB Atlas cluster:

1. **Sign up/Login**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Create a free account (M0 Free Tier is available)

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select a cloud provider and region (closest to you)
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter username and password (save these!)
   - Set user privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your IP
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" (Clusters)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" and copy the connection string

## Step 2: Update Your .env File

1. Open the `.env` file in the `backend` folder

2. Replace the `MONGO_URI` value with your connection string:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   OPENAI_API_KEY=your_openai_api_key_here
   ```

   **Important:**
   - Replace `yourusername` with your MongoDB Atlas username
   - Replace `yourpassword` with your MongoDB Atlas password
   - Replace `cluster0.xxxxx` with your actual cluster address
   - The `hostelDB` part is your database name (you can change it)

3. **Set a Strong JWT Secret**
   - Generate a random string for `JWT_SECRET`
   - You can use: https://randomkeygen.com/ or any random string generator
   - Example: `JWT_SECRET=mySuperSecretJWTKey123!@#$%^&*()`

4. **Add OpenAI API Key (Optional)**
   - If you have an OpenAI API key, add it here
   - Get one from: https://platform.openai.com/api-keys

## Step 3: Test the Connection

1. Make sure your `.env` file is saved

2. Start your backend server:
   ```bash
   cd backend
   npm install  # if you haven't already
   npm run dev
   ```

3. You should see:
   ```
   ✅ MongoDB connected
   ✅ Server running on port 5000
   ```

## Troubleshooting

### Connection Error: "authentication failed"
- Check your username and password in the connection string
- Make sure there are no special characters that need URL encoding
- If your password has special characters, URL encode them (e.g., `@` becomes `%40`)

### Connection Error: "IP not whitelisted"
- Go to MongoDB Atlas → Network Access
- Add your current IP address or allow access from anywhere (0.0.0.0/0)

### Connection Error: "timeout"
- Check your internet connection
- Verify the cluster is running in MongoDB Atlas
- Make sure the connection string is correct

### Example Connection String Format:
```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/hostelDB?retryWrites=true&w=majority
```

## Security Notes

- **Never commit your `.env` file to Git!**
- Make sure `.env` is in your `.gitignore` file
- Keep your MongoDB Atlas password secure
- Use environment variables in production

