import React, { useEffect, useState } from 'react';
import styles from './activeFreightsStyle.module.css';
import axios from 'axios';

const ActiveFreightsComponent = ({ driverId }) => {
  const [freights, setFreights] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveFreights = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:3000/api/driver-freights/active/${driverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFreights(data);
    } catch (error) {
      console.error('Erro ao buscar fretes ativos:', error);
      alert('Erro ao carregar fretes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteFreight = async (freightId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/api/driver-freights/${freightId}`,
        { status: 'concluído' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Frete concluído com sucesso!');
      fetchActiveFreights();
    } catch (error) {
      console.error('Erro ao concluir frete:', error);
      alert('Erro ao tentar concluir o frete. Tente novamente.');
    }
  };

  useEffect(() => {
    if (driverId) {
      fetchActiveFreights();
    }
  }, [driverId]);

  if (loading) {
    return <p className={styles.loading}>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fretes em Andamento</h1>
      <div className={styles.list}>
        {freights.map(({ id, freightOffer }) => (
          <div key={id} className={styles.card}>
            <h2>{freightOffer?.cargoType || 'Tipo de carga não especificado'}</h2>
            <p>
              Origem:{' '}
              {freightOffer?.loadingLocation
                ? `${freightOffer.loadingLocation.city}, ${freightOffer.loadingLocation.state}`
                : 'Localização não disponível'}
            </p>
            <p>Destino: {freightOffer?.deliveryAddress || 'Endereço não disponível'}</p>
            <p>Veículo: {freightOffer?.vehicleAvailability || 'Não especificado'}</p>
            <p>Peso: {freightOffer?.cargoWeight ? `${freightOffer.cargoWeight} kg` : 'Não informado'}</p>
            <p>Valor: R$ {freightOffer?.freightValue ? freightOffer.freightValue.toFixed(2) : 'Não informado'}</p>
            <button
              className={styles.completeButton}
              onClick={() => handleCompleteFreight(id)}
            >
              Concluir Frete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFreightsComponent;
