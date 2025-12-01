import React, { useState, useEffect } from 'react';
import { FaSave, FaCalendar } from 'react-icons/fa';
import { studentAPI, attendanceAPI } from '../services/api';

const AttendanceMarking = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchStudents();
  }, [selectedClass]);

  useEffect(() => {
    if (students.length > 0) {
      fetchAttendance();
    }
  }, [selectedDate, students]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const params = selectedClass ? { className: selectedClass } : {};
      const response = await studentAPI.getAll(params);
      setStudents(response.data.data);
    } catch (error) {
      showMessage('error', 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendance = async () => {
    try {
      const params = { date: selectedDate };
      if (selectedClass) params.className = selectedClass;

      const response = await attendanceAPI.getByDate(params);
      
      // Map attendance data
      const attendanceMap = {};
      response.data.data.forEach((item) => {
        if (item.attendance) {
          attendanceMap[item.student._id] = {
            status: item.attendance.status,
            remarks: item.attendance.remarks || '',
          };
        }
      });
      
      setAttendanceData(attendanceMap);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceData({
      ...attendanceData,
      [studentId]: {
        ...attendanceData[studentId],
        status,
      },
    });
  };

  const handleRemarksChange = (studentId, remarks) => {
    setAttendanceData({
      ...attendanceData,
      [studentId]: {
        ...attendanceData[studentId],
        remarks,
      },
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const attendanceRecords = Object.entries(attendanceData)
        .filter(([_, data]) => data.status)
        .map(([studentId, data]) => ({
          studentId,
          status: data.status,
          remarks: data.remarks || '',
        }));

      if (attendanceRecords.length === 0) {
        showMessage('error', 'Please mark attendance for at least one student');
        return;
      }

      await attendanceAPI.markAttendance({
        date: selectedDate,
        attendanceRecords,
      });

      showMessage('success', 'Attendance saved successfully');
    } catch (error) {
      showMessage('error', error.response?.data?.message || 'Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const markAllAs = (status) => {
    const newData = {};
    students.forEach((student) => {
      newData[student._id] = {
        status,
        remarks: attendanceData[student._id]?.remarks || '',
      };
    });
    setAttendanceData(newData);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-300';
      case 'absent': return 'bg-red-100 text-red-800 border-red-300';
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const uniqueClasses = [...new Set(students.map(s => s.className))];

  const stats = {
    present: Object.values(attendanceData).filter(d => d.status === 'present').length,
    absent: Object.values(attendanceData).filter(d => d.status === 'absent').length,
    late: Object.values(attendanceData).filter(d => d.status === 'late').length,
  };

  return (
    <div className="space-y-6">
      {/* Message Alert */}
      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mark Daily Attendance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCalendar className="inline mr-2" />
              Select Date
            </label>
            <input
              type="date"
              className="input-field"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Class</label>
            <select
              className="input-field"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">All Classes</option>
              {uniqueClasses.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <FaSave /> {saving ? 'Saving...' : 'Save Attendance'}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">Quick Mark All:</span>
          <button
            onClick={() => markAllAs('present')}
            className="px-3 py-1 rounded-lg bg-green-100 text-green-800 hover:bg-green-200 text-sm font-medium"
          >
            Present
          </button>
          <button
            onClick={() => markAllAs('absent')}
            className="px-3 py-1 rounded-lg bg-red-100 text-red-800 hover:bg-red-200 text-sm font-medium"
          >
            Absent
          </button>
          <button
            onClick={() => markAllAs('late')}
            className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-sm font-medium"
          >
            Late
          </button>
        </div>

        {/* Stats */}
        {Object.values(attendanceData).some(d => d.status) && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="text-2xl font-bold text-green-700">{stats.present}</div>
              <div className="text-sm text-green-600">Present</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-red-50 border border-red-200">
              <div className="text-2xl font-bold text-red-700">{stats.absent}</div>
              <div className="text-sm text-red-600">Absent</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-700">{stats.late}</div>
              <div className="text-sm text-yellow-600">Late</div>
            </div>
          </div>
        )}
      </div>

      {/* Student List */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Loading students...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No students found</p>
            <p className="text-sm mt-2">Add students first to mark attendance</p>
          </div>
        ) : (
          <div className="space-y-3">
            {students.map((student) => {
              const attendance = attendanceData[student._id] || {};
              return (
                <div
                  key={student._id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    getStatusColor(attendance.status)
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        Roll No: {student.rollNumber} | Class: {student.className}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {['present', 'absent', 'late'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(student._id, status)}
                          className={`
                            px-4 py-2 rounded-lg font-medium text-sm capitalize transition-all
                            ${attendance.status === status
                              ? status === 'present' ? 'bg-green-600 text-white'
                                : status === 'absent' ? 'bg-red-600 text-white'
                                : 'bg-yellow-600 text-white'
                              : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                            }
                          `}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {attendance.status && (
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Add remarks (optional)"
                        className="input-field text-sm"
                        value={attendance.remarks || ''}
                        onChange={(e) => handleRemarksChange(student._id, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceMarking;

