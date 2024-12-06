import React from 'react';
import styles from './driverHome.module.css';
import { useRouter } from 'next/router';

const DriverHomeComponent = () => {
  const router = useRouter();
  const driverId = router.query.id;

  const options = [
    { label: 'encontrar fretes', image: '/images/encontrar_fretes.png', link: `/driver/${driverId}/encontrar-fretes` },
    { label: 'fretes em andamento', image: '/images/fretes_andamento.png', link: `/driver/${driverId}/fretes-em-andamento` },
    { label: 'gerenciar propostas de frete', image: '/images/propostas_frete.png', link: `/driver/${driverId}/propostas` },
    { label: 'gerenciar veiculos', image: '/images/veiculos.png', link: `/driver/${driverId}/vehicles` },
    { label: 'gerenciar documentos', image: '/images/documentos.png', link: `/driver/${driverId}/documentos` },
    { label: 'informações pessoais', image: '/images/info_pessoais.png', link: `/driver/${driverId}/personalInfo` },
  ];

  const handleOptionClick = (opt) => {
    router.push(opt.link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {options.map((opt) => (
          <div key={opt.label} className={styles.card} onClick={() => handleOptionClick(opt)}>
            <div className={styles.cardImageContainer}>
              <img src={opt.image} alt={opt.label} className={styles.cardImage} />
            </div>
            <div className={styles.cardLabelContainer}>
              <span className={styles.cardLabel}>{opt.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverHomeComponent;
