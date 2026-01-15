import axios from 'axios';

const API_URL = 'https://transaction-system-2.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const transactionAPI = {
  transfer: (data) => api.post('/transactions/transfer', data),
  getHistory: () => api.get('/transactions/history'),
  getBalance: () => api.get('/transactions/balance'),
};