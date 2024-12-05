import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const login = async (cpfCnpj) => {
  const response = await api.post('/auth/login', { cpfCnpj });
  return response.data.token;
};

export default api;
