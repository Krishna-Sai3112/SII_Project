# Frontend - Student Attendance Manager

React-based frontend application with modern UI using Tailwind CSS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Features

### 1. Student Management
- Add, edit, delete students
- Search by name or roll number
- Filter by class
- Responsive table view

### 2. Mark Attendance
- Select date and mark attendance
- Status options: Present, Absent, Late
- Quick mark all feature
- Real-time statistics
- Optional remarks

### 3. Monthly Summary
- View attendance summary by month
- Filter by class
- Overall statistics dashboard
- Download CSV reports
- Color-coded attendance percentages

## Components

```
src/
├── components/
│   ├── StudentManagement.js     # Student CRUD operations
│   ├── AttendanceMarking.js     # Daily attendance marking
│   └── MonthlySummary.js        # Reports and summaries
├── services/
│   └── api.js                   # API service layer
├── App.js                       # Main app with navigation
├── index.js                     # React entry point
└── index.css                    # Tailwind CSS
```

## Technologies

- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Icons** - Icon library

## API Configuration

The app proxies API requests to the backend server. Default: `http://localhost:5000`

To change, update `proxy` in `package.json` or set `REACT_APP_API_URL` environment variable.

## Design System

### Colors
- Primary: Blue (`primary-600`)
- Success: Green (Present status)
- Danger: Red (Absent status)
- Warning: Yellow (Late status)

### Components
- Cards with shadow
- Rounded buttons with hover effects
- Responsive tables
- Loading spinners
- Toast notifications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

