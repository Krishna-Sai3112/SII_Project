#!/bin/bash

echo "========================================"
echo "Student Attendance Manager"
echo "========================================"
echo ""

echo "Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

echo "Waiting for backend to start..."
sleep 3

echo "Starting Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "Both servers are running"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for any process to exit
wait $BACKEND_PID $FRONTEND_PID

