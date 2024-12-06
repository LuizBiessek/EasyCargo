import React, { useEffect, useState, useCallback } from 'react';
import styles from './freightOfferDetails.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const FreightOfferDetailsComponent = ({ driverId, freightOfferId }) => {
  const router = useRouter();
  const [offer, setOffer] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [loadingMap, setLoadingMap] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPS_API_KEY,
    libraries: ['places']
  });

  const fetchOffer = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você não está logado.');
        router.push('/');
        return;
      }

      const response = await axios.get(`http://localhost:3000/api/freight-offers/${freightOfferId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOffer(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da oferta:', error);
      alert('Erro ao buscar detalhes da oferta.');
      router.push(`/driver/${driverId}/encontrar-fretes`);
    }
  };

  useEffect(() => {
    if (driverId && freightOfferId) {
      fetchOffer();
    }
  }, [driverId, freightOfferId]);

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
  

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você não está logado.');
        router.push('/');
        return;
      }

      await axios.post('http://localhost:3000/api/freight-requests', {
        freightOfferId,
        driverId,
        status: 'aguardando'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      router.push(`/driver/${driverId}/encontrar-fretes?aplicacao=sucesso`);
    } catch (error) {
      console.error('Erro ao aplicar para oferta:', error);
      alert('Erro ao aplicar para a oferta.');
    }
  };

  const loadDirections = useCallback(() => {
    if (!offer) return;
    const { destCity, destState } = parseDeliveryCityState(offer.deliveryAddress);
    
    const origin = `${offer.LoadingLocation.city}, ${offer.LoadingLocation.state}`;
    const destination = `${destCity}, ${destState}`;

    if (isLoaded) {
      setLoadingMap(false);
      setDirectionsResponse({ origin, destination });
    }
  }, [offer, isLoaded]);

  useEffect(() => {
    loadDirections();
  }, [offer, loadDirections]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes da Oferta</h1>
      {(!offer || loadingMap) && <div className={styles.loading}>Carregando...</div>}
      {offer && !loadingMap && isLoaded && (
        <div className={styles.mapContainer}>
          <GoogleMap
            center={{ lat: -23.55052, lng: -46.633308 }} 
            zoom={5}
            mapContainerStyle={{ width: '100%', height: '300px' }}
          >
            {directionsResponse && directionsResponse.origin && directionsResponse.destination && (
              <>
                <DirectionsService
                  options={{
                    origin: directionsResponse.origin,
                    destination: directionsResponse.destination,
                    travelMode: 'DRIVING'
                  }}
                  callback={(res, status) => {
                    if (status === 'OK') {
                      setDirectionsResponse((prev) => ({ ...prev, result: res }));
                    } else {
                      console.error('Não foi possível obter direções:', status);
                    }
                  }}
                />
                {directionsResponse.result && (
                  <DirectionsRenderer directions={directionsResponse.result} />
                )}
              </>
            )}
          </GoogleMap>
        </div>
      )}
      {offer && (
        <div className={styles.infoContainer}>
          <p>
            Transporte de {offer.cargoType}, saindo de {offer.LoadingLocation.city}, {offer.LoadingLocation.state} para {parseDeliveryCityState(offer.deliveryAddress).destCity}, {parseDeliveryCityState(offer.deliveryAddress).destState}
          </p>
          <p>Peso: {offer.cargoWeight}kg</p>
          <p>Documentos especiais: {offer.requiresSpecialDocuments ? 'Sim' : 'Não'}</p>
          <p>Veículo necessário: {offer.vehicleAvailability}</p>
          <p>Valor do frete: R${offer.freightValue}</p>
          <button className={styles.applyButton} onClick={handleApply}>Aplicar para oferta</button>
        </div>
      )}
    </div>
  );
};

export default FreightOfferDetailsComponent;

