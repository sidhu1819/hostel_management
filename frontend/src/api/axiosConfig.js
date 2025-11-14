import axios from "axios";

// ====================== API BASE URL ======================
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://hostel-management-ht2a.onrender.com";

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ====================== JWT Token Interceptor ======================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ====================== AUTH ======================
export const login = (credentials) => api.post("/api/auth/login", credentials);
export const register = (userData) => api.post("/api/auth/register", userData);
export const getProfile = () => api.get("/api/auth/profile");

// ====================== ROOMS ======================
export const getRooms = () => api.get("/api/rooms");
export const getRoom = (id) => api.get(`/api/rooms/${id}`);
export const createRoom = (data) => api.post("/api/rooms", data);
export const updateRoom = (id, data) => api.put(`/api/rooms/${id}`, data);
export const deleteRoom = (id) => api.delete(`/api/rooms/${id}`);

// ====== Room Assignment (New) ======
export const assignStudentToRoom = (roomId, studentId) =>
  api.post(`/api/rooms/${roomId}/assign`, { studentId });

export const removeStudentFromRoom = (roomId, studentId) =>
  api.post(`/api/rooms/${roomId}/remove`, { studentId });

// ====================== ROOM REQUESTS ======================

// Student submits request
export const requestRoom = (studentId) =>
  api.post("/api/requests", { studentId });

// Student gets their own request
export const getMyRoomRequest = () => api.get("/api/requests/my");

// Admin only — get all requests
export const getAllRequests = () => api.get("/api/requests");

// Admin approves request
export const approveRequest = (id, roomId) =>
  api.post(`/api/requests/${id}/approve`, { roomId });

// Admin rejects request
export const rejectRequest = (id) =>
  api.post(`/api/requests/${id}/reject`);

// ====================== TICKETS ======================
export const createTicket = (data) => api.post("/api/tickets", data);
export const getTickets = () => api.get("/api/tickets");
export const getTicket = (id) => api.get(`/api/tickets/${id}`);

// ====================== AI CHAT ======================
export const sendAIQuery = (data) => api.post("/api/ai/query", data);

export default api;
