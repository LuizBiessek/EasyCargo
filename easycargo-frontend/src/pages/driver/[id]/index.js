import React from 'react';
import { useRouter } from 'next/router';
import DriverHomeComponent from '../../../components/DriverHome/DriverHomeComponent';

const DriverHomePage = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return <DriverHomeComponent onLogout={handleLogout} />;
};

export default DriverHomePage;
