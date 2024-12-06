import React, { useState } from 'react';
import styles from './loginStyle.module.css';

const LoginComponent = ({ onLogin }) => {
  const [cpfCnpj, setCpfCnpj] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cpfCnpj) {
      alert('Por favor, insira seu CPF/CNPJ.');
      return;
    }
    onLogin(cpfCnpj);
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>
        <input
          type="text"
          placeholder="Digite seu CPF/CNPJ"
          value={cpfCnpj}
          onChange={(e) => setCpfCnpj(e.target.value)}
          className={styles.loginInput}
        />
        <button type="submit" className={styles.loginButton}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
