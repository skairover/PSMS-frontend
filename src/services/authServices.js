import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Set default baseURL for all axios requests
const api = axios.create({
  baseURL,
});

// Attach token automatically to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register a new user
export const register = (formData) => {
  return api.post('/api/auth/register', formData);
};

// Login and store JWT
export const login = async (credentials) => {
  const res = await api.post('/api/auth/login', credentials);
  const token = res.data.token;
  if (token) {
    localStorage.setItem('token', token);
  }
  return res;
};

// Logout (manual token removal, backend optional)
export const logout = () => {
  localStorage.removeItem('token');
};
