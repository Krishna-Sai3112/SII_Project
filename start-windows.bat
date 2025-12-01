@echo off
echo ========================================
echo Student Attendance Manager
echo ========================================
echo.

echo Starting Backend Server...
cd backend
start cmd /k "npm run dev"
cd ..

timeout /t 3 /nobreak > nul

echo Starting Frontend...
cd frontend
start cmd /k "npm start"
cd ..

echo.
echo ========================================
echo Both servers are starting in new windows
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
pause

