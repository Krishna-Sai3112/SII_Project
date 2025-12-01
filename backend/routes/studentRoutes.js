const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { className, search } = req.query;
    let query = {};

    // Filter by class
    if (className) {
      query.className = className;
    }

    // Search by name or roll number
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const students = await Student.find(query).sort({ className: 1, rollNumber: 1 });
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add new student
router.post('/', async (req, res) => {
  try {
    const { name, rollNumber, className } = req.body;

    // Validate required fields
    if (!name || !rollNumber || !className) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, roll number, and class name are required' 
      });
    }

    const student = new Student({ name, rollNumber, className });
    await student.save();

    res.status(201).json({ success: true, data: student, message: 'Student added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Roll number already exists' 
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const { name, rollNumber, className } = req.body;
    
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, rollNumber, className },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, data: student, message: 'Student updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Roll number already exists' 
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

