import React from 'react';
import Login from '../components/Login/LoginComponent.js';
import { useAuth } from '../hooks/useAuth';
import { login as loginService } from '../services/api';

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = async (cpfCnpj) => {
    try {
      const token = await loginService(cpfCnpj);
      login(token);
      alert('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao realizar login. Verifique suas credenciais.');
    }
  };

  return <Login onLogin={handleLogin} />;
};

export default LoginPage;
