import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './applicationManagementStyle.module.css';

const ApplicationManagementComponent = ({ companyId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:3000/api/freight-requests/company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(data);
    } catch (error) {
      console.error('Erro ao buscar aplicações:', error);
      alert('Erro ao carregar aplicações. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptApplication = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/api/freight-requests/${applicationId}`,
        { status: 'aceito' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Aplicação aceita com sucesso!');
      fetchApplications();
    } catch (error) {
      console.error('Erro ao aceitar aplicação:', error);
      alert('Erro ao aceitar a aplicação. Tente novamente.');
    }
  };

  const handleRejectApplication = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/api/freight-requests/${applicationId}`,
        { status: 'rejeitado' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Aplicação rejeitada com sucesso!');
      fetchApplications();
    } catch (error) {
      console.error('Erro ao rejeitar aplicação:', error);
      alert('Erro ao rejeitar a aplicação. Tente novamente.');
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchApplications();
    }
  }, [companyId]);

  if (loading) {
    return <p className={styles.loading}>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerenciar Aplicações</h1>
      <div className={styles.list}>
        {applications.map((application) => (
          <div key={application.id} className={styles.card}>
            <h2>Motorista: {application.Driver?.User?.name || 'Informação indisponível'}</h2>
            <p>CPF: {application.Driver?.User?.cpfCnpj || 'Informação indisponível'}</p>
            <p>Email: {application.Driver?.User?.email || 'Informação indisponível'}</p>
            <p>Telefone: {application.Driver?.User?.phone || 'Informação indisponível'}</p>
            <p>Oferta de Frete: {application.FreightOffer?.cargoType || 'Informação indisponível'}</p>
            <div className={styles.buttonContainer}>
              <button
                className={styles.acceptButton}
                onClick={() => handleAcceptApplication(application.id)}
              >
                Aceitar
              </button>
              <button
                className={styles.rejectButton}
                onClick={() => handleRejectApplication(application.id)}
              >
                Rejeitar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationManagementComponent;
