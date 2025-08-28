import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  login: (email, password) => api.post('/users/login', { email, password }),
  register: (username, email, password) => 
    api.post('/users/register', { username, email, password }),
};

// Snippets API calls
export const snippetsAPI = {
  getAll: () => api.get('/snippets'),
  create: (snippetData) => api.post('/snippets', snippetData),
  update: (id, snippetData) => api.put(`/snippets/${id}`, snippetData),
  delete: (id) => api.delete(`/snippets/${id}`),
};

export default api;