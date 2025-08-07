import axios from 'axios';

// Configurar baseURL do axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Interceptor para adicionar token automaticamente
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('token');
      window.location.href = '/login?error=token_invalid';
    }
    return Promise.reject(error);
  }
);

export default axios;