import React, { useState, useEffect } from 'react';
import { FaDownload, FaChartBar, FaCalendarAlt } from 'react-icons/fa';
import { studentAPI, attendanceAPI } from '../services/api';

const MonthlySummary = () => {
  const currentDate = new Date();
  const [month, setMonth] = useState(String(currentDate.getMonth() + 1).padStart(2, '0'));
  const [year, setYear] = useState(String(currentDate.getFullYear()));
  const [selectedClass, setSelectedClass] = useState('');
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await studentAPI.getAll();
      const uniqueClasses = [...new Set(response.data.data.map(s => s.className))];
      setClasses(uniqueClasses);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const params = { month, year };
      if (selectedClass) params.className = selectedClass;

      const response = await attendanceAPI.getMonthlySummary(params);
      setSummary(response.data.data);
      
      if (response.data.data.length === 0) {
        showMessage('info', 'No attendance records found for the selected period');
      }
    } catch (error) {
      showMessage('error', 'Failed to fetch attendance summary');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async () => {
    try {
      setDownloading(true);
      const params = { month, year };
      if (selectedClass) params.className = selectedClass;

      const response = await attendanceAPI.downloadReport(params);
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `attendance_${year}_${month}${selectedClass ? `_${selectedClass}` : ''}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showMessage('success', 'Report downloaded successfully');
    } catch (error) {
      showMessage('error', 'Failed to download report');
    } finally {
      setDownloading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-blue-600 bg-blue-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i);

  // Calculate overall stats
  const overallStats = summary.length > 0 ? {
    totalStudents: summary.length,
    avgAttendance: (summary.reduce((sum, s) => sum + s.attendancePercentage, 0) / summary.length).toFixed(2),
    totalPresent: summary.reduce((sum, s) => sum + s.presentCount, 0),
    totalAbsent: summary.reduce((sum, s) => sum + s.absentCount, 0),
    totalLate: summary.reduce((sum, s) => sum + s.lateCount, 0),
  } : null;

  return (
    <div className="space-y-6">
      {/* Message Alert */}
      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800' :
          message.type === 'error' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Header and Filters */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaChartBar /> Monthly Attendance Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCalendarAlt className="inline mr-2" />
              Month
            </label>
            <select
              className="input-field"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <select
              className="input-field"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              className="input-field"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={fetchSummary}
              className="btn-primary flex-1"
            >
              View Summary
            </button>
          </div>
        </div>

        {/* Download Button */}
        {summary.length > 0 && (
          <div className="mt-4">
            <button
              onClick={downloadReport}
              disabled={downloading}
              className="btn-secondary flex items-center gap-2"
            >
              <FaDownload /> {downloading ? 'Downloading...' : 'Download CSV Report'}
            </button>
          </div>
        )}
      </div>

      {/* Overall Statistics */}
      {overallStats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600">{overallStats.totalStudents}</div>
            <div className="text-sm text-gray-600 mt-1">Total Students</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600">{overallStats.totalPresent}</div>
            <div className="text-sm text-gray-600 mt-1">Total Present</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-red-600">{overallStats.totalAbsent}</div>
            <div className="text-sm text-gray-600 mt-1">Total Absent</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-yellow-600">{overallStats.totalLate}</div>
            <div className="text-sm text-gray-600 mt-1">Total Late</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600">{overallStats.avgAttendance}%</div>
            <div className="text-sm text-gray-600 mt-1">Avg Attendance</div>
          </div>
        </div>
      )}

      {/* Summary Table */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-600">Loading summary...</p>
          </div>
        ) : summary.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No summary data available</p>
            <p className="text-sm mt-2">Select month and year, then click "View Summary"</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Days
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Present
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Absent
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Late
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {summary.map((record) => (
                  <tr key={record.student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {record.student.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {record.student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                        {record.student.className}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                      {record.totalDays}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-800 font-medium">
                        {record.presentCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className="px-2 py-1 rounded bg-red-100 text-red-800 font-medium">
                        {record.absentCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-medium">
                        {record.lateCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`px-3 py-1 rounded-full font-bold ${getPercentageColor(record.attendancePercentage)}`}>
                        {record.attendancePercentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlySummary;

