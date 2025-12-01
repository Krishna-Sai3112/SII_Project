# Quick Setup Guide

## First Time Setup

### Step 1: Install Dependencies

Run this command from the project root directory:

```bash
npm run install-all
```

This will install dependencies for both backend and frontend.

### Step 2: Configure Backend

1. Navigate to the `backend` folder
2. Create a `.env` file by copying `.env.example`:
   ```bash
   cd backend
   cp .env.example .env
   ```
3. Edit `.env` if needed (default settings should work)

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
net start MongoDB
```

**macOS (with Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Step 4: Run the Application

**Option 1: Run Manually (Recommended)**

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Wait until you see: `✓ Server running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
The browser will open automatically at `http://localhost:3000`

**Option 2: Using Root Scripts**

From the project root:

**Terminal 1:**
```bash
npm run dev-backend
```

**Terminal 2:**
```bash
npm run frontend
```

## Verify Installation

1. Backend API should be accessible at: `http://localhost:5000/api`
2. Frontend should open automatically at: `http://localhost:3000`
3. You should see the Student Attendance Manager interface

## Common Issues

### Issue: MongoDB Connection Failed
**Solution:** 
- Make sure MongoDB is installed and running
- Check if MongoDB is running on the default port (27017)
- Try using `127.0.0.1` instead of `localhost` in `.env`

### Issue: Port 5000 Already in Use
**Solution:**
- Change the `PORT` value in `backend/.env` to another port (e.g., 5001)
- Update the proxy in `frontend/package.json` to match

### Issue: Port 3000 Already in Use
**Solution:**
- When prompted, press `Y` to run on a different port (3001)
- Or set `PORT=3001` before running: `PORT=3001 npm start`

### Issue: Dependencies Installation Failed
**Solution:**
- Delete `node_modules` folders and `package-lock.json` files
- Run `npm install` separately in backend and frontend directories
- Make sure you have Node.js v14 or higher

## Next Steps

Once everything is running:

1. **Add Students:** Go to the "Student Management" tab and add some students
2. **Mark Attendance:** Switch to "Mark Attendance" tab and mark today's attendance
3. **View Summary:** Check the "Monthly Summary" tab to see attendance reports

## Need Help?

Refer to the main [README.md](README.md) for detailed documentation and API endpoints.

---

Happy tracking! 📊✅

