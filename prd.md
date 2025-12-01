1. Project Overview

The Student Attendance Manager is a simple full-stack web application designed to help teachers easily manage student records, mark daily attendance, and generate monthly attendance summaries.
This system replaces manual registers with a clean digital interface, allowing quick tracking and downloadable reports for documentation or academic use.

The project is built using:

Frontend: React

Backend: Node.js + Express

Database: MongoDB

This PRD describes the functional and non-functional requirements, user flows, data models, and constraints of the system.

2. Problem Statement

Most educational institutions still rely on manual registers or Excel-based processes for attendance tracking. These methods lead to:

Data inconsistency

Difficulty in generating monthly reports

Time-consuming daily marking

Lack of centralized student records

A simple web-based attendance system solves these problems efficiently.

3. Goals & Objectives
✔ Primary Goals

Allow teachers to add and manage student details.

Provide a simple UI to mark daily attendance for each student.

Generate monthly attendance summaries automatically.

Allow users to download attendance reports (CSV).

❌ Out of Scope (for now)

Multi-teacher system

Authentication & roles

Timetable integration

Push notifications or SMS alerts

4. User Personas
👩‍🏫 Teacher / Instructor

Needs to mark attendance quickly

Needs to review monthly summaries

Needs simple downloadable reports

🧑‍🎓 Student (Indirect User)

Does not interact with the system

Their data appears in reports

5. Core Features (MUST-HAVE)
5.1 Student Management

Add new students

Edit student details

Delete a student

List all students

Filter by class

Search by name or roll number

5.2 Daily Attendance Marking

Teacher selects a date

Student list loads for that date

For each student: choose

Present

Absent

Late

Save attendance records for selected date

Auto-fill previously saved attendance when re-opened

5.3 Monthly Attendance Summary

Select month & year

View attendance summary per student:

Total days

Present count

Absent count

Late count

Attendance percentage

5.4 Downloadable Report

Download CSV report of attendance for:

Selected month

Selected class (optional)

CSV contains:

Roll Number

Student Name

Date

Attendance Status

6. Nice-to-Have Features (Optional)

Tailwind UI components

Color indicators (green/present, red/absent, yellow/late)

Local storage caching

Chart (Pie/Bar) for attendance breakdown

Class-wise multiple tabs

7. User Flows
7.1 Add Student Flow

Teacher opens Students page

Fills the student form

Clicks Add Student

Student appears in the list

7.2 Mark Attendance Flow

Teacher selects date

System loads students

Teacher selects attendance status for each

Clicks Save Attendance

Success message displayed

7.3 View Monthly Summary

Teacher selects Month + Year

System fetches summary

Each student’s aggregated data is shown

7.4 Download Report

Teacher clicks Download CSV

Browser downloads attendance.csv

8. System Architecture
Frontend (React)
      |
      v
Backend API (Node.js + Express)
      |
      v
Database (MongoDB)

API Base URL Example
http://localhost:5000/api

9. Data Models
Student Model
{
  "name": "string",
  "rollNumber": "string",
  "className": "string",
  "createdAt": "date"
}

Attendance Record
{
  "student": "ObjectId",
  "date": "date",
  "status": "present | absent | late",
  "remarks": "string"
}

10. API Requirements
10.1 Students
Method	Endpoint	Description
POST	/api/students	Add a student
GET	/api/students	List students (with filters)
GET	/api/students/:id	Get single student
PUT	/api/students/:id	Update student
DELETE	/api/students/:id	Delete student
10.2 Attendance
Method	Endpoint	Description
POST	/api/attendance/mark	Mark attendance for a date
GET	/api/attendance/by-date	Fetch attendance for a date
GET	/api/attendance/monthly-summary	Fetch summary for month
GET	/api/attendance/report	Download CSV report
11. Non-Functional Requirements
✔ Performance

API responses < 200ms for common queries

Should handle 200+ students easily

✔ Scalability

Data model supports multiple classes

✔ Usability

Simple UI

Fast load time

No complex navigation

✔ Reliability

Attendance data must not be overwritten incorrectly

Date–Student combination unique per day

12. Constraints & Considerations

No authentication (to keep project simple)

Basic UI acceptable (no need for advanced styling)

Internet connection required if hosted

Should run on localhost for demo

13. Risks
Risk	Mitigation
Duplicate roll numbers	Add unique constraint
Overwriting attendance	Implement upsert logic
Incorrect summaries	Validate date ranges & aggregation
14. Future Enhancements

Login system for teachers

PDF report generation

Mobile app version

Notification system

Role-based access (Admin/Teacher)

15. Acceptance Criteria

The project is complete when:

✔ Students can be added, edited, deleted
✔ Attendance can be marked/retrieved
✔ Monthly summary works correctly
✔ CSV report downloads
✔ UI is clean and bug-free
✔ README explains setup clearly