import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const auth = {
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const todos = {
  getAll: () => api.get('/api/todos'),
  create: (data) => api.post('/api/todos', data),
  update: (id, data) => api.patch(`/api/todos/${id}`, data),
  delete: (id) => api.delete(`/api/todos/${id}`),
};

export default api;
