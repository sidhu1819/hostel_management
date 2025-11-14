import axios from 'axios';

// ====================== FIX 1: Correct API Base URL ======================
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://hostel-management-ht2a.onrender.com'; // backend URL (without trailing slash)

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ====================== JWT Token Interceptor ======================
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

// ====================== Error Handling ======================
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

// ==================== Rooms ====================
export const getRooms = () => api.get('/api/rooms');
export const getRoom = (id) => api.get(`/api/rooms/${id}`);
export const createRoom = (roomData) => api.post('/api/rooms', roomData);
export const updateRoom = (id, roomData) => api.put(`/api/rooms/${id}`, roomData);
export const deleteRoom = (id) => api.delete(`/api/rooms/${id}`);

// ==================== Tickets ====================
export const createTicket = (ticketData) => api.post('/api/tickets', ticketData);
export const getTickets = () => api.get('/api/tickets');
export const getTicket = (id) => api.get(`/api/tickets/${id}`);

// ==================== AI Chat ====================
export const sendAIQuery = (data) => api.post('/api/ai/query', data);

// Export Axios instance
export default api;
