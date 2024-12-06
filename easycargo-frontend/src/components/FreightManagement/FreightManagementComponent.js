import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './freightManagementStyle.module.css';

const FreightManagementComponent = ({ companyId }) => {
  const [freights, setFreights] = useState([]);
  const [newFreight, setNewFreight] = useState({
    cargoType: '',
    cargoWeight: '',
    requiresSpecialDocuments: false,
    vehicleAvailability: '',
    freightValue: '',
    departureDate: '',
    deliveryDate: '',
    deliveryAddress: '',
  });

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Token não encontrado. Por favor, faça login novamente.');
    router.push('/');
  }
  
  const fetchFreights = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/freight-offers/company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFreights(data);
    } catch (error) {
      console.error('Erro ao carregar ofertas de frete:', error.response?.data || error.message);
      if (error.response?.status === 403) {
        alert('Token inválido ou expirado. Por favor, faça login novamente.');
        router.push('/');
      }
    }
  };
  

  const handleAddFreight = async () => {
    try {
      const token = localStorage.getItem('token');
      const freightData = { ...newFreight, companyId };
      await axios.post('http://localhost:3000/api/freight-offers', freightData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Oferta de frete adicionada com sucesso!');
      setNewFreight({
        cargoType: '',
        cargoWeight: '',
        requiresSpecialDocuments: false,
        vehicleAvailability: '',
        freightValue: '',
        departureDate: '',
        deliveryDate: '',
        deliveryAddress: '',
      });
      fetchFreights();
    } catch (error) {
      console.error('Error adding freight offer:', error);
      alert('Erro ao adicionar oferta de frete. Tente novamente.');
    }
  };

  const handleDeleteFreight = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/freight-offers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Oferta de frete excluída com sucesso!');
      fetchFreights();
    } catch (error) {
      console.error('Error deleting freight offer:', error);
      alert('Erro ao excluir oferta de frete. Tente novamente.');
    }
  };

  useEffect(() => {
    if (companyId) {
      fetchFreights();
    }
  }, [companyId]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerenciar Ofertas de Frete</h1>
      <div className={styles.list}>
        {freights.map((freight) => (
          <div key={freight.id} className={styles.card}>
            <h2>{freight.cargoType}</h2>
            <p>Peso: {freight.cargoWeight} kg</p>
            <p>Valor: R$ {freight.freightValue.toFixed(2)}</p>
            <p>Data de Saída: {new Date(freight.departureDate).toLocaleDateString()}</p>
            <p>Data de Entrega: {new Date(freight.deliveryDate).toLocaleDateString()}</p>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteFreight(freight.id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
      <div className={styles.form}>
        <h2>Adicionar Oferta de Frete</h2>
        <input
          type="text"
          placeholder="Tipo de carga"
          value={newFreight.cargoType}
          onChange={(e) => setNewFreight({ ...newFreight, cargoType: e.target.value })}
        />
        <input
          type="number"
          placeholder="Peso da carga (kg)"
          value={newFreight.cargoWeight}
          onChange={(e) => setNewFreight({ ...newFreight, cargoWeight: e.target.value })}
        />
        <input
          type="text"
          placeholder="Disponibilidade do veículo"
          value={newFreight.vehicleAvailability}
          onChange={(e) => setNewFreight({ ...newFreight, vehicleAvailability: e.target.value })}
        />
        <input
          type="number"
          placeholder="Valor do frete (R$)"
          value={newFreight.freightValue}
          onChange={(e) => setNewFreight({ ...newFreight, freightValue: e.target.value })}
        />
        <input
          type="date"
          value={newFreight.departureDate}
          onChange={(e) => setNewFreight({ ...newFreight, departureDate: e.target.value })}
        />
        <input
          type="date"
          value={newFreight.deliveryDate}
          onChange={(e) => setNewFreight({ ...newFreight, deliveryDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Endereço de Entrega"
          value={newFreight.deliveryAddress}
          onChange={(e) => setNewFreight({ ...newFreight, deliveryAddress: e.target.value })}
        />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={newFreight.requiresSpecialDocuments}
            onChange={(e) => setNewFreight({ ...newFreight, requiresSpecialDocuments: e.target.checked })}
          />
          Requer Documentos Especiais
        </label>
        <button onClick={handleAddFreight} className={styles.addButton}>
          Adicionar Oferta
        </button>
      </div>
    </div>
  );
};

export default FreightManagementComponent;
