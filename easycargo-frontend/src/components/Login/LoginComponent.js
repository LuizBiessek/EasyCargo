import React, { useState } from 'react';
import './loginStyle.css';

const Login = ({ onLogin }) => {
  const [cpfCnpj, setCpfCnpj] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!cpfCnpj) {
      alert('Por favor, insira o CPF/CNPJ.');
      return;
    }
    await onLogin(cpfCnpj);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Digite seu CPF/CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
