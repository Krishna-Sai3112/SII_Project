const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { Parser } = require('json2csv');

// Mark attendance for a date (bulk upsert)
router.post('/mark', async (req, res) => {
  try {
    const { date, attendanceRecords } = req.body;

    if (!date || !attendanceRecords || !Array.isArray(attendanceRecords)) {
      return res.status(400).json({
        success: false,
        message: 'Date and attendance records array are required'
      });
    }

    const results = [];
    
    // Process each attendance record
    for (const record of attendanceRecords) {
      const { studentId, status, remarks } = record;

      if (!studentId || !status) {
        continue;
      }

      // Upsert: update if exists, create if not
      const attendance = await Attendance.findOneAndUpdate(
        { student: studentId, date: new Date(date) },
        { status, remarks: remarks || '' },
        { upsert: true, new: true, runValidators: true }
      );

      results.push(attendance);
    }

    res.json({
      success: true,
      message: 'Attendance marked successfully',
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get attendance for a specific date
router.get('/by-date', async (req, res) => {
  try {
    const { date, className } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    // Get students for the class (if specified)
    let studentQuery = {};
    if (className) {
      studentQuery.className = className;
    }

    const students = await Student.find(studentQuery).sort({ rollNumber: 1 });
    
    // Get attendance records for the date
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const attendanceRecords = await Attendance.find({
      date: { $gte: startDate, $lte: endDate }
    }).populate('student');

    // Map attendance to students
    const attendanceMap = {};
    attendanceRecords.forEach(record => {
      if (record.student) {
        attendanceMap[record.student._id.toString()] = {
          status: record.status,
          remarks: record.remarks,
          _id: record._id
        };
      }
    });

    // Combine student list with attendance data
    const result = students.map(student => ({
      student: student,
      attendance: attendanceMap[student._id.toString()] || null
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get monthly attendance summary
router.get('/monthly-summary', async (req, res) => {
  try {
    const { month, year, className } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: 'Month and year are required'
      });
    }

    // Calculate date range
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Get students
    let studentQuery = {};
    if (className) {
      studentQuery.className = className;
    }

    const students = await Student.find(studentQuery).sort({ rollNumber: 1 });

    // Get all attendance records for the month
    const attendanceRecords = await Attendance.find({
      date: { $gte: startDate, $lte: endDate }
    });

    // Calculate summary for each student
    const summary = students.map(student => {
      const studentRecords = attendanceRecords.filter(
        record => record.student.toString() === student._id.toString()
      );

      const presentCount = studentRecords.filter(r => r.status === 'present').length;
      const absentCount = studentRecords.filter(r => r.status === 'absent').length;
      const lateCount = studentRecords.filter(r => r.status === 'late').length;
      const totalDays = studentRecords.length;
      
      const attendancePercentage = totalDays > 0 
        ? ((presentCount + lateCount) / totalDays * 100).toFixed(2)
        : 0;

      return {
        student,
        totalDays,
        presentCount,
        absentCount,
        lateCount,
        attendancePercentage: parseFloat(attendancePercentage)
      };
    });

    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Download CSV report
router.get('/report', async (req, res) => {
  try {
    const { month, year, className } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: 'Month and year are required'
      });
    }

    // Calculate date range
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Build query
    let query = {
      date: { $gte: startDate, $lte: endDate }
    };

    // Get attendance records with populated student data
    const records = await Attendance.find(query)
      .populate('student')
      .sort({ date: 1, 'student.rollNumber': 1 });

    // Filter by class if specified
    let filteredRecords = records;
    if (className) {
      filteredRecords = records.filter(r => r.student && r.student.className === className);
    }

    // Format data for CSV
    const csvData = filteredRecords.map(record => ({
      'Roll Number': record.student ? record.student.rollNumber : 'N/A',
      'Student Name': record.student ? record.student.name : 'N/A',
      'Class': record.student ? record.student.className : 'N/A',
      'Date': record.date.toISOString().split('T')[0],
      'Status': record.status.charAt(0).toUpperCase() + record.status.slice(1),
      'Remarks': record.remarks || ''
    }));

    // Convert to CSV
    const parser = new Parser();
    const csv = parser.parse(csvData);

    // Send as downloadable file
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=attendance_${month}_${year}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

