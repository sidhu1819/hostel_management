# How to Run the Hostel Management System

## Prerequisites Checklist

Before running, make sure you have:
- ✅ Node.js installed (v14 or higher)
- ✅ MongoDB Atlas account and connection string
- ✅ All files are in place

## Step-by-Step Setup

### Step 1: Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create/Update .env file:**
   Create a `.env` file in the `backend` folder with:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/hostelDB?retryWrites=true&w=majority
   JWT_SECRET=your_random_secret_key_here_make_it_long
   OPENAI_API_KEY=your_openai_key_here
   ```
   
   **Replace:**
   - `yourusername` → Your MongoDB Atlas username
   - `yourpassword` → Your MongoDB password
   - `cluster0.xxxxx` → Your MongoDB cluster address
   - `your_random_secret_key_here_make_it_long` → Any random long string (e.g., use https://randomkeygen.com/)

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   ✅ MongoDB connected
   ✅ Server running on port 5000
   ```
   
   **Keep this terminal window open!**

### Step 2: Frontend Setup

1. **Open a NEW terminal window** (keep backend running)

2. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Verify .env file exists:**
   The `.env` file should already exist with:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

5. **Start the frontend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   VITE v5.x.x  ready in xxx ms
   
   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ```

### Step 3: Use the Application

1. **Open your browser** and go to: `http://localhost:3000`

2. **Register a new account:**
   - Click "Register here" or go to `/register`
   - Fill in all fields:
     - Name
     - Email
     - Password
     - Roll Number
     - Department
     - Year (1-4)
     - Role (Student or Admin)
   - Click "Register"

3. **Login:**
   - If you already have an account, go to `/login`
   - Enter email and password
   - Click "Login"

4. **Use the features:**
   - **Dashboard**: View statistics
   - **Rooms**: View/manage rooms (Admin can create/delete)
   - **Tickets**: Create tickets (Students) or manage them (Admin)
   - **AI Assistant**: Ask questions about the hostel

## Quick Start (All Commands)

### Terminal 1 - Backend:
```bash
cd backend
npm install
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm run dev
```

Then open: **http://localhost:3000**

## Troubleshooting

### Backend won't start:
- ✅ Check `.env` file exists in `backend` folder
- ✅ Verify `MONGO_URI` is set correctly
- ✅ Make sure MongoDB Atlas IP is whitelisted
- ✅ Run `npm install` in backend folder

### Frontend won't start:
- ✅ Check `.env` file exists in `frontend` folder
- ✅ Verify `VITE_API_BASE_URL=http://localhost:5000`
- ✅ Run `npm install` in frontend folder

### Can't connect to backend:
- ✅ Make sure backend is running on port 5000
- ✅ Check browser console (F12) for errors
- ✅ Verify `VITE_API_BASE_URL` in frontend `.env`

### Registration/Login errors:
- ✅ Make sure backend is running
- ✅ Check MongoDB connection
- ✅ Verify JWT_SECRET is set in backend `.env`

## Application Features

### For Students:
- ✅ Register and login
- ✅ View rooms
- ✅ Create tickets/complaints
- ✅ Use AI assistant

### For Admins:
- ✅ All student features
- ✅ Create/delete rooms
- ✅ View all tickets
- ✅ Update ticket status

## Testing the Setup

1. **Test Backend:**
   - Open: http://localhost:5000
   - Should see: `{"message":"Hostel Management System Backend API"}`

2. **Test Frontend:**
   - Open: http://localhost:3000
   - Should see the login/register page

3. **Test Registration:**
   - Register a new account
   - Should redirect to dashboard after successful registration

## You're Ready! 🎉

Once both servers are running, you can use the application!

