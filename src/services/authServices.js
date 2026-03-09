import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Axios instance
const api = axios.create({
  baseURL,
  withCredentials: true, // ✅ important for CORS if using cookies/auth
});

// Attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register user
export const register = (formData) => api.post('/api/auth/register', formData);

// Login and store token
export const login = async (credentials) => {
  const res = await api.post('/api/auth/login', credentials);
  const token = res.data.token;
  if (token) localStorage.setItem('token', token);
  return res;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
};