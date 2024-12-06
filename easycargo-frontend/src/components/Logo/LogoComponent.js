import React from 'react';
import styles from './logo.module.css';

const LogoComponent = () => {
  return (
    <div className={styles.logoContainer}>
      <span className={styles.easy}>Easy</span>
      <span className={styles.cargo}>Cargo</span>
    </div>
  );
};

export default LogoComponent;
