import React, { useState, useEffect } from 'react';
import styles from './encontrarFretes.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const EncontrarFretesComponent = ({ driverId }) => {
  const [city, setCity] = useState('');
  const [state, setStateFilter] = useState('');
  const [vehicleAvailability, setVehicleAvailability] = useState('');
  const [requiresSpecialDocuments, setRequiresSpecialDocuments] = useState(false);
  const [cargoType, setCargoType] = useState('');
  const [freights, setFreights] = useState([]);
  const [offset, setOffset] = useState(0);

  const limit = 25; 
  const router = useRouter();

  const parseDeliveryCityState = (address) => {
    if (!address) {
      return { destCity: 'Desconhecido', destState: 'Desconhecido' };
    }
  
    const parts = address.split(',').map(part => part.trim());
    if (parts.length >= 2) {
      const destCity = parts[0];
      const destState = parts[1];
      return { destCity, destState };
    }
  
    return { destCity: 'Desconhecido', destState: 'Desconhecido' };
  };
  

  const fetchFreights = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você não está logado ou o token não está definido.');
        return;
      }

      const params = { offset, limit };
      if (city) params.city = city;
      if (state) params.state = state;
      if (vehicleAvailability) params.vehicleAvailability = vehicleAvailability;
      if (requiresSpecialDocuments) params.requiresSpecialDocuments = 'true';
      if (cargoType) params.cargoType = cargoType;

      const response = await axios.get('http://localhost:3000/api/freight-offers', {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFreights(response.data);
    } catch (error) {
      console.error('Erro ao buscar fretes:', error);
      alert('Erro ao buscar fretes. Tente novamente.');
    }
  };

  useEffect(() => {
    if (driverId) {
      fetchFreights();
    }
  }, [driverId, offset]);

  const handleApplyFilters = () => {
    setOffset(0);
    fetchFreights();
  };

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const handleFreightClick = (freight) => {
    const driverIdFromQuery = driverId || '1'; // Ajuste caso necessário
    router.push(`/driver/${driverIdFromQuery}/frete/${freight.id}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Encontrar Fretes</h1>
      <form className={styles.filterForm} onSubmit={(e) => { e.preventDefault(); handleApplyFilters(); }}>
        <div className={styles.filterRow}>
          <input
            type="text"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={styles.filterInput}
          />
          <input
            type="text"
            placeholder="Estado"
            value={state}
            onChange={(e) => setStateFilter(e.target.value)}
            className={styles.filterInput}
          />
        </div>
        <div className={styles.filterRow}>
          <select
            value={vehicleAvailability}
            onChange={(e) => setVehicleAvailability(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Qualquer veículo</option>
            <option value="sim">Sim</option>
            <option value="não">Não</option>
            <option value="somente carreta">Somente carreta</option>
            <option value="somente cavalinho">Somente cavalinho</option>
          </select>
          <input
            type="text"
            placeholder="Tipo de carga"
            value={cargoType}
            onChange={(e) => setCargoType(e.target.value)}
            className={styles.filterInput}
          />
        </div>
        <div className={styles.filterRow}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={requiresSpecialDocuments}
              onChange={(e) => setRequiresSpecialDocuments(e.target.checked)}
            />
            Requer documentos especiais
          </label>
          <button type="submit" className={styles.applyButton}>Aplicar Filtros</button>
        </div>
      </form>
      <div className={styles.offersList}>
        {freights.length === 0 ? (
          <div className={styles.noOffers}>Nenhum frete encontrado.</div>
        ) : (
          freights.map((freight, index) => {
            console.log('Freight deliveryAddress:', freight.deliveryAddress);
            const { destCity, destState } = parseDeliveryCityState(freight.deliveryAddress);
            console.log(destCity, destState)
            return (
              <button
                key={index}
                className={styles.offerButton}
                onClick={() => handleFreightClick(freight)}
              >
                Transporte de {freight.cargoType}, saindo de {freight.LoadingLocation?.city}, {freight.LoadingLocation?.state} para {destCity}, {destState}
              </button>
            );
          })
        )}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={offset === 0} className={styles.pageButton}>Anterior</button>
        <button onClick={handleNextPage} className={styles.pageButton}>Próxima</button>
      </div>
    </div>
  );
};

export default EncontrarFretesComponent;
