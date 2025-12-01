const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true
  },
  className: {
    type: String,
    required: [true, 'Class name is required'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
studentSchema.index({ className: 1 });
studentSchema.index({ rollNumber: 1 });

module.exports = mongoose.model('Student', studentSchema);

