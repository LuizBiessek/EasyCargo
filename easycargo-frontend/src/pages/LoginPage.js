import React from 'react';
import LoginComponent from '../components/Login/LoginComponent';
import { useRouter } from 'next/router';
import axios from 'axios';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (cpfCnpj) => {
    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/login', { cpfCnpj });
      const token = data.token;

      try {
        const driverResponse = await axios.get(`http://localhost:3000/api/drivers?cpfCnpj=${cpfCnpj}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (driverResponse.data) {
          localStorage.setItem('token', token);
          localStorage.setItem('userType', 'D');
          localStorage.setItem('userId', driverResponse.data.id);

          router.push(`/driver/${driverResponse.data.id}`);
          return;
        }
      } catch (driverError) {
        if (driverError.response && driverError.response.status !== 404) {
          console.error('Erro ao verificar motorista:', driverError);
          alert('Erro ao tentar realizar o login. Verifique seus dados.');
          return;
        }
      }

      try {
        const companyResponse = await axios.get(`http://localhost:3000/api/companies?cpfCnpj=${cpfCnpj}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (companyResponse.data) {
          localStorage.setItem('token', token);
          localStorage.setItem('userType', 'C');
          localStorage.setItem('userId', companyResponse.data.id);

          router.push(`/company/${companyResponse.data.id}`);
          return;
        }
        alert('CPF/CNPJ não encontrado');
      } catch (companyError) {
        if (companyError.response && companyError.response.status === 404) {
          alert('CPF/CNPJ não encontrado');
        } else {
          console.error('Erro ao buscar empresa:', companyError);
          alert('Erro ao tentar realizar o login. Verifique seus dados.');
        }
      }

    } catch (error) {
      console.error('Erro ao tentar realizar o login:', error);
      if (error.response && error.response.status === 404) {
        alert('Usuário não encontrado.');
      } else {
        alert('Erro ao tentar realizar o login. Verifique seus dados.');
      }
    }
  };

  return <LoginComponent onLogin={handleLogin} />;
};

export default LoginPage;
