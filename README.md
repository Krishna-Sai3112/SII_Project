# Student Attendance Manager

A full-stack web application for managing student records and tracking daily attendance with monthly summary reports.

## 🚀 Features

### ✅ Student Management
- Add, edit, and delete student records
- Search students by name or roll number
- Filter students by class
- Unique roll number validation

### ✅ Daily Attendance Marking
- Select date and mark attendance (Present/Absent/Late)
- Quick mark all students with one click
- Real-time attendance statistics
- Add optional remarks for each student
- Auto-save and auto-fill previously marked attendance

### ✅ Monthly Summary & Reports
- View comprehensive monthly attendance summary
- Filter by class and date range
- Calculate attendance percentage automatically
- Download attendance reports in CSV format
- Overall statistics dashboard

## 🛠️ Technology Stack

**Frontend:**
- React 18
- Tailwind CSS (Modern, responsive UI)
- Axios (API communication)
- React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JSON2CSV (Report generation)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- npm (comes with Node.js)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SII-Project
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_db
```

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

### 5. Run the Application

**Start Backend Server** (in backend directory):
```bash
npm run dev
# or
npm start
```
Backend will run on `http://localhost:5000`

**Start Frontend** (in frontend directory, open a new terminal):
```bash
npm start
```
Frontend will run on `http://localhost:3000`

## 📱 Usage Guide

### Adding Students
1. Navigate to **Student Management** tab
2. Click **Add Student** button
3. Fill in the form (Name, Roll Number, Class)
4. Click **Add Student** to save

### Marking Attendance
1. Go to **Mark Attendance** tab
2. Select the date
3. Optionally filter by class
4. Mark each student as Present/Absent/Late
5. Use "Quick Mark All" for faster entry
6. Click **Save Attendance**

### Viewing Monthly Summary
1. Go to **Monthly Summary** tab
2. Select month and year
3. Optionally filter by class
4. Click **View Summary**
5. Click **Download CSV Report** to export data

## 📁 Project Structure

```
SII-Project/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── models/
│   │   ├── Student.js         # Student schema
│   │   └── Attendance.js      # Attendance schema
│   ├── routes/
│   │   ├── studentRoutes.js   # Student API endpoints
│   │   └── attendanceRoutes.js # Attendance API endpoints
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentManagement.js
│   │   │   ├── AttendanceMarking.js
│   │   │   └── MonthlySummary.js
│   │   ├── services/
│   │   │   └── api.js         # API service layer
│   │   ├── App.js             # Main app component
│   │   ├── index.js
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── prd.md                      # Product Requirements Document
└── README.md                   # This file
```

## 🔌 API Endpoints

### Students
- `GET /api/students` - Get all students (supports filters)
- `GET /api/students/:id` - Get single student
- `POST /api/students` - Add new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Attendance
- `POST /api/attendance/mark` - Mark attendance
- `GET /api/attendance/by-date` - Get attendance by date
- `GET /api/attendance/monthly-summary` - Get monthly summary
- `GET /api/attendance/report` - Download CSV report

## 🎨 Design Features

- **Modern UI** with Tailwind CSS
- **Responsive Design** - works on desktop, tablet, and mobile
- **Color-coded Status** - Green (Present), Red (Absent), Yellow (Late)
- **Real-time Statistics** - see attendance counts instantly
- **Smooth Animations** - loading states and transitions
- **User-friendly Forms** - clear validation and error messages

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check the `MONGODB_URI` in `.env` file
- Try: `mongodb://127.0.0.1:27017/attendance_db` instead of localhost

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Set `PORT=3001` before running `npm start`

### CORS Issues
- Backend includes CORS middleware
- If issues persist, check frontend proxy in `package.json`

## 📝 Notes

- This is a simple demonstration system **without authentication**
- Not intended for production use without security enhancements
- Roll numbers must be unique across all classes
- Attendance can be updated for past dates
- One attendance record per student per day

## 🚀 Future Enhancements

- User authentication (Teacher/Admin roles)
- Student login to view their own attendance
- PDF report generation
- Email/SMS notifications
- Attendance analytics with charts
- Bulk student import (CSV)
- Mobile application

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Support

For issues or questions, please refer to the PRD document or create an issue in the repository.

---

**Built with ❤️ using React, Node.js, Express, and MongoDB**

