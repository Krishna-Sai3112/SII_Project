# Backend API Server

Student Attendance Manager Backend built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Start MongoDB service

4. Run the server:
```bash
npm run dev  # Development mode with nodemon
npm start    # Production mode
```

## API Endpoints

### Students API

**GET** `/api/students`
- Query params: `className`, `search`
- Returns: List of students

**GET** `/api/students/:id`
- Returns: Single student details

**POST** `/api/students`
- Body: `{ name, rollNumber, className }`
- Returns: Created student

**PUT** `/api/students/:id`
- Body: `{ name, rollNumber, className }`
- Returns: Updated student

**DELETE** `/api/students/:id`
- Returns: Success message

### Attendance API

**POST** `/api/attendance/mark`
- Body: `{ date, attendanceRecords: [{ studentId, status, remarks }] }`
- Returns: Saved attendance records

**GET** `/api/attendance/by-date`
- Query params: `date`, `className`
- Returns: Attendance for specified date

**GET** `/api/attendance/monthly-summary`
- Query params: `month`, `year`, `className`
- Returns: Monthly summary with statistics

**GET** `/api/attendance/report`
- Query params: `month`, `year`, `className`
- Returns: CSV file download

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_db
```

## Models

### Student
- name: String (required)
- rollNumber: String (required, unique)
- className: String (required)
- createdAt: Date

### Attendance
- student: ObjectId (ref to Student)
- date: Date (required)
- status: enum ['present', 'absent', 'late']
- remarks: String
- Unique constraint: student + date

## Technologies

- Express.js - Web framework
- Mongoose - MongoDB ODM
- CORS - Cross-origin resource sharing
- dotenv - Environment variables
- json2csv - CSV generation

