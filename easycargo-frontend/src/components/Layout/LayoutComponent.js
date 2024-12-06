import React, { useEffect, useState } from 'react';
import styles from './layout.module.css';
import LogoComponent from '../Logo/LogoComponent';
import { useRouter } from 'next/router';

const LayoutComponent = ({ children }) => {
  const router = useRouter();
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    const storedUserId = localStorage.getItem('userId');
    if (storedUserType && storedUserId) {
      setUserType(storedUserType);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    router.push('/');
  };

  const handleMenu = () => {

    const userType = localStorage.getItem('userType')
    const userId = localStorage.getItem('userId')

    if (userType === 'D') {
      router.push(`/driver/${userId}`);
    } else if (userType === 'C') {
      router.push(`/company/${userId}/`);
    } else {
      alert('Tipo de usuário não definido. Faça login novamente.');
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      localStorage.removeItem('userId');
      router.push('/');
    }
  };

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.logoWrapper}>
        <LogoComponent />
        <button className={styles.menuButton} onClick={handleMenu}>Menu</button>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

export default LayoutComponent;
