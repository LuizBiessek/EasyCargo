import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './vehicleManagementStyle.module.css';

const VehicleManagementComponent = ({ driverId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    type: '',
    brand: '',
    modelDescription: '',
    year: '',
    registrationNumber: '',
    registrationAddress: '',
  });

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:3000/api/vehicles?ownerId=${driverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles(data);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
      alert('Erro ao carregar veículos. Tente novamente.');
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/vehicles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Veículo excluído com sucesso!');
      fetchVehicles();
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
      alert('Erro ao excluir veículo. Tente novamente.');
    }
  };

  const handleAddVehicle = async () => {
    try {
      const token = localStorage.getItem('token');
      const vehicleData = { ...newVehicle, ownerId: driverId };
  
      // Validação local antes de enviar ao backend
      if (
        !vehicleData.type ||
        !vehicleData.brand ||
        !vehicleData.modelDescription ||
        !vehicleData.year ||
        !vehicleData.registrationNumber ||
        !vehicleData.registrationAddress
      ) {
        alert('Por favor, preencha todos os campos antes de adicionar um veículo.');
        return;
      }
  
      await axios.post('http://localhost:3000/api/vehicles', vehicleData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert('Veículo adicionado com sucesso!');
      setNewVehicle({
        type: '',
        brand: '',
        modelDescription: '',
        year: '',
        registrationNumber: '',
        registrationAddress: '',
      });
      fetchVehicles();
    } catch (error) {
      console.error('Erro ao adicionar veículo:', error);
      if (error.response && error.response.data) {
        alert(`Erro: ${error.response.data.error}`);
      } else {
        alert('Erro ao adicionar veículo. Tente novamente.');
      }
    }
  };
  

  useEffect(() => {
    if (driverId) {
      fetchVehicles();
    }
  }, [driverId]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerenciar Veículos</h1>
      <div className={styles.vehicleList}>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className={styles.vehicleCard}>
            <p><strong>Tipo:</strong> {vehicle.type}</p>
            <p><strong>Marca:</strong> {vehicle.brand}</p>
            <p><strong>Modelo:</strong> {vehicle.modelDescription}</p>
            <p><strong>Ano:</strong> {vehicle.year}</p>
            <p><strong>Placa:</strong> {vehicle.registrationNumber}</p>
            <p><strong>Endereço de Registro:</strong> {vehicle.registrationAddress}</p>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteVehicle(vehicle.id)}
            >
              Excluir
            </button>
          </div>
        ))}
        <div className={styles.newVehicleForm}>
          <h2>Adicionar Veículo</h2>
          <input
            type="text"
            placeholder="Tipo"
            value={newVehicle.type}
            onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
          />
          <input
            type="text"
            placeholder="Marca"
            value={newVehicle.brand}
            onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
          />
          <input
            type="text"
            placeholder="Modelo"
            value={newVehicle.modelDescription}
            onChange={(e) => setNewVehicle({ ...newVehicle, modelDescription: e.target.value })}
          />
          <input
            type="number"
            placeholder="Ano"
            value={newVehicle.year}
            onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
          />
          <input
            type="text"
            placeholder="Placa"
            value={newVehicle.registrationNumber}
            onChange={(e) => setNewVehicle({ ...newVehicle, registrationNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Endereço de Registro"
            value={newVehicle.registrationAddress}
            onChange={(e) => setNewVehicle({ ...newVehicle, registrationAddress: e.target.value })}
          />
          <button onClick={handleAddVehicle} className={styles.addButton}>
            Adicionar Veículo
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagementComponent;
