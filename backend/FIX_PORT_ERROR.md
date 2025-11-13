# Fix "Port 5000 Already in Use" Error

## Quick Solutions

### Solution 1: Kill the Process Using Port 5000 (Recommended)

**Option A: Using PowerShell Script**
```powershell
cd backend
.\kill-port.ps1
```

**Option B: Manual Method**

1. Find the process:
   ```powershell
   netstat -ano | findstr :5000
   ```
   This will show something like:
   ```
   TCP    0.0.0.0:5000    0.0.0.0:0    LISTENING    12345
   ```
   Note the PID (last number, e.g., 12345)

2. Kill the process:
   ```powershell
   taskkill /PID 12345 /F
   ```
   Replace `12345` with the actual PID from step 1.

3. Try running again:
   ```bash
   npm run dev
   ```

### Solution 2: Change the Port

If you can't kill the process or want to use a different port:

1. Edit `backend/.env` file
2. Change the PORT:
   ```env
   PORT=5001
   ```
   (or any other available port like 5002, 3001, etc.)

3. Update `frontend/.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5001
   ```
   (Change 5000 to match the new port)

4. Restart both servers

## Why This Happens

This error occurs when:
- You have another instance of the server already running
- Another application is using port 5000
- A previous server instance didn't close properly

## Prevention

Always stop the server properly:
- Press `Ctrl + C` in the terminal where the server is running
- Wait for the server to stop before starting it again

## Quick Check

To see what's using port 5000:
```powershell
netstat -ano | findstr :5000
```

To see all Node.js processes:
```powershell
tasklist | findstr node
```

