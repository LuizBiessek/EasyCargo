import React from 'react';
import styles from './companyHome.module.css';
import { useRouter } from 'next/router';

const CompanyHomeComponent = () => {
  const router = useRouter();
  const companyId = router.query.id;

  const options = [
    { label: 'gerenciar ofertas de frete', image: '/images/gerenciar_ofertas.png', link: `/company/${companyId}/FreightManagement` },
    { label: 'gerenciar aplicações', image: '/images/gerenciar_aplicacoes.png', link: `/company/${companyId}/application` },
    { label: 'gerenciar veiculos', image: '/images/veiculos.png', link: `/company/${companyId}/vehicles` },
    { label: 'gerenciar locais de carga', image: '/images/locais_carga.png', link: `/company/${companyId}/loading-locations` },
    { label: 'documentos obrigatórios', image: '/images/documentos_obrigatorios.png', link: `/company/${companyId}/mandatory-documents` },
    { label: 'informações corporativas', image: '/images/info_corporativas.png', link: `/company/${companyId}/corporate-info` },
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

export default CompanyHomeComponent;
