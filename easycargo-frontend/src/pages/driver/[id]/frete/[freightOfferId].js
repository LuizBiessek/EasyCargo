import React from 'react';
import FreightOfferDetailsComponent from '../../../../components/OfertaFrete/FreightOfferDetailsComponent';
import { useRouter } from 'next/router';

const FreightOfferDetailsPage = () => {
  const router = useRouter();
  const { id: driverId, freightOfferId } = router.query;

  if (!driverId || !freightOfferId) {
    return <div>Carregando...</div>;
  }

  return <FreightOfferDetailsComponent driverId={driverId} freightOfferId={freightOfferId} />;
};

export default FreightOfferDetailsPage;
