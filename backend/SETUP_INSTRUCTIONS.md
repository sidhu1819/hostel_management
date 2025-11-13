# Backend Setup Instructions

## If `npm run dev` shows an error, follow these steps:

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

This will install all required packages including nodemon.

### Step 2: Create .env File

Create a file named `.env` in the `backend` folder with this content:

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
- Replace `your_super_secret_jwt_key_here_make_it_long_and_random` with a random secret (you can use https://randomkeygen.com/)
- `OPENAI_API_KEY` is optional - you can leave it empty if you don't have one

### Step 3: Run the Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
✅ Server running on port 5000
```

## Common Errors and Solutions:

### Error: "nodemon: command not found"
**Solution:** Run `npm install` in the backend folder

### Error: "MONGO_URI is not set"
**Solution:** Create the `.env` file as shown in Step 2

### Error: "MongoDB connection failed"
**Solution:** 
- Check your MongoDB connection string
- Make sure your IP is whitelisted in MongoDB Atlas
- Verify username and password are correct

### Error: "Cannot find module"
**Solution:** Run `npm install` to install all dependencies

## Quick Test:

After setup, test if everything works:
1. Server should start without errors
2. Open browser and go to: http://localhost:5000
3. You should see: `{"message":"Hostel Management System Backend API"}`

