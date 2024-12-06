import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './loadingLocationManagementStyle.module.css';

const LoadingLocationManagementComponent = ({ companyId }) => {
  const [loadingLocations, setLoadingLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
  });

  const fetchLoadingLocations = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:3000/api/loading-locations/company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoadingLocations(data);
    } catch (error) {
      console.error('Erro ao carregar locais de carga:', error);
      alert('Erro ao carregar locais de carga. Tente novamente.');
    }
  };

  const handleAddLocation = async () => {
    try {
      const token = localStorage.getItem('token');
      const locationData = { ...newLocation, companyId };
      await axios.post('http://localhost:3000/api/loading-locations', locationData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Local de carga adicionado com sucesso!');
      fetchLoadingLocations();
      setNewLocation({
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      });
    } catch (error) {
      console.error('Erro ao adicionar local de carga:', error);
      alert('Erro ao adicionar local de carga. Tente novamente.');
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/loading-locations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Local de carga excluído com sucesso!');
      fetchLoadingLocations();
    } catch (error) {
      console.error('Erro ao excluir local de carga:', error);
      alert('Erro ao excluir local de carga. Tente novamente.');
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchLoadingLocations();
    }
  }, [companyId]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerenciar Locais de Carga</h1>
      <div className={styles.list}>
        {loadingLocations.map((location) => (
          <div key={location.id} className={styles.card}>
            <div className={styles.cardDetails}>
              <p>Endereço: {location.street}, {location.number}</p>
              <p>Cidade: {location.city}, {location.state}</p>
              <p>CEP: {location.zipCode}</p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteLocation(location.id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>Adicionar Novo Local</h2>
        <label className={styles.formLabel}>Rua:</label>
        <input
          type="text"
          className={styles.formInput}
          value={newLocation.street}
          onChange={(e) => setNewLocation({ ...newLocation, street: e.target.value })}
        />
        <label className={styles.formLabel}>Número:</label>
        <input
          type="text"
          className={styles.formInput}
          value={newLocation.number}
          onChange={(e) => setNewLocation({ ...newLocation, number: e.target.value })}
        />
        <label className={styles.formLabel}>Bairro:</label>
        <input
          type="text"
          className={styles.formInput}
          value={newLocation.neighborhood}
          onChange={(e) => setNewLocation({ ...newLocation, neighborhood: e.target.value })}
        />
        <label className={styles.formLabel}>Cidade:</label>
        <input
          type="text"
          className={styles.formInput}
          value={newLocation.city}
          onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
        />
        <label className={styles.formLabel}>Estado:</label>
        <input
          type="text"
          className={styles.formInput}
          value={newLocation.state}
          onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
        />
        <label className={styles.formLabel}>País:</label>
        <input
          type="text"
          className={styles.formInput}
          value={newLocation.country}
          onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
        />
        <label className={styles.formLabel}>CEP:</label>
        <input
          type="text"
          className={styles.formInput}
          value={newLocation.zipCode}
          onChange={(e) => setNewLocation({ ...newLocation, zipCode: e.target.value })}
        />
        <button onClick={handleAddLocation} className={styles.addButton}>
          Adicionar Local
        </button>
      </div>
    </div>
  );
};

export default LoadingLocationManagementComponent;
