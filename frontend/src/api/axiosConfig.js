import axios from 'axios';

// Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== Auth ====================
export const login = (credentials) => api.post('/api/auth/login', credentials);
export const register = (userData) => api.post('/api/auth/register', userData);
export const getProfile = () => api.get('/api/auth/profile');

// ==================== Students ====================
export const getStudents = () => api.get('/api/students');
export const getStudent = (id) => api.get(`/api/students/${id}`);
export const createStudent = (studentData) => api.post('/api/students', studentData);
export const updateStudent = (id, studentData) => api.put(`/api/students/${id}`, studentData);
export const deleteStudent = (id) => api.delete(`/api/students/${id}`);

// ==================== Rooms ====================
export const getRooms = () => api.get('/api/rooms'); // Only one getRooms export
export const getRoom = (id) => api.get(`/api/rooms/${id}`);
export const createRoom = (roomData) => api.post('/api/rooms', roomData);
export const updateRoom = (id, roomData) => api.put(`/api/rooms/${id}`, roomData);
export const deleteRoom = (id) => api.delete(`/api/rooms/${id}`);

// ==================== Requests ====================
export const getRequests = () => api.get('/api/requests');
export const getRequest = (id) => api.get(`/api/requests/${id}`);
export const createRequest = (requestData) => api.post('/api/requests', requestData);
export const updateRequest = (id, requestData) => api.put(`/api/requests/${id}`, requestData);
export const deleteRequest = (id) => api.delete(`/api/requests/${id}`);
export const approveRequest = (id) => api.post(`/api/requests/${id}/approve`);
export const rejectRequest = (id) => api.post(`/api/requests/${id}/reject`);

// ==================== Export Axios Instance ====================
export default api;
