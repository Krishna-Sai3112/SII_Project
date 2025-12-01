import axios from 'axios';

const API_BASE_URL = 'https://sii-project.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Student API
export const studentAPI = {
  getAll: (params = {}) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

// Attendance API
export const attendanceAPI = {
  markAttendance: (data) => api.post('/attendance/mark', data),
  getByDate: (params) => api.get('/attendance/by-date', { params }),
  getMonthlySummary: (params) => api.get('/attendance/monthly-summary', { params }),
  downloadReport: (params) => {
    return api.get('/attendance/report', {
      params,
      responseType: 'blob',
    });
  },
};

export default api;

