# 🚀 Quick Start - Student Attendance Manager

## ⚡ Super Quick Setup (3 Steps)

### 1️⃣ Install Dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2️⃣ Start MongoDB
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 3️⃣ Run the App

**For Windows Users:**
- Just double-click `start-windows.bat` in the project root
- OR manually run:
  ```bash
  cd backend
  npm run dev
  ```
  Then in a new terminal:
  ```bash
  cd frontend
  npm start
  ```

**For Mac/Linux Users:**
```bash
chmod +x start-unix.sh
./start-unix.sh
```

## 🌐 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

## 📝 First Steps After Launch

1. **Add Students**
   - Click "Student Management" tab
   - Click "Add Student" button
   - Fill: Name, Roll Number, Class
   - Click "Add Student"

2. **Mark Attendance**
   - Click "Mark Attendance" tab
   - Select today's date
   - Mark each student (Present/Absent/Late)
   - Click "Save Attendance"

3. **View Summary**
   - Click "Monthly Summary" tab
   - Select current month and year
   - Click "View Summary"
   - Download CSV if needed

## 🎨 UI Features

✅ **Modern Design** - Tailwind CSS with smooth animations
✅ **Color Coded** - Green (Present), Red (Absent), Yellow (Late)
✅ **Responsive** - Works on desktop, tablet, mobile
✅ **Real-time Stats** - See attendance counts instantly
✅ **Search & Filter** - Find students quickly
✅ **CSV Export** - Download reports easily

## 🔧 Tech Stack at a Glance

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Icons | React Icons |
| HTTP | Axios |
| CSV | json2csv |

## ⚠️ Common Issues & Quick Fixes

### MongoDB Not Found?
```bash
# Download from: https://www.mongodb.com/try/download/community
```

### Port 5000 Already Used?
Edit `backend/.env`:
```env
PORT=5001
```

### Port 3000 Already Used?
When prompted, press `Y` to use port 3001

### Can't Connect to Backend?
1. Check backend is running (Terminal 1)
2. Check MongoDB is running
3. Try `http://127.0.0.1:5000/api` instead

## 📊 Sample Usage Flow

```
1. Add 3-5 Students
   ↓
2. Mark Today's Attendance
   ↓
3. View Monthly Summary
   ↓
4. Download CSV Report
```

## 🎯 Key Features Checklist

- ✅ Add/Edit/Delete Students
- ✅ Search Students by Name/Roll Number
- ✅ Filter by Class
- ✅ Mark Daily Attendance (Present/Absent/Late)
- ✅ Quick "Mark All" Feature
- ✅ View Monthly Summary
- ✅ Calculate Attendance Percentage
- ✅ Download CSV Reports
- ✅ Responsive UI
- ✅ Real-time Statistics

## 📚 Documentation

- **Full Documentation:** See [README.md](README.md)
- **Detailed Setup:** See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Backend API:** See [backend/README.md](backend/README.md)
- **Frontend Details:** See [frontend/README.md](frontend/README.md)
- **Requirements:** See [prd.md](prd.md)

## 🆘 Need Help?

1. Check [README.md](README.md) for detailed docs
2. Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for troubleshooting
3. Verify MongoDB is running
4. Check both terminals for error messages
5. Ensure ports 3000 and 5000 are free

---

**You're all set! Start managing attendance efficiently! 🎓✨**

