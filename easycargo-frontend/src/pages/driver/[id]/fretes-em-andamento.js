import React from 'react';
import ActiveFreightsComponent from '../../../components/ActiveFreights/ActiveFreightsComponent';
import { useRouter } from 'next/router';

const FretesEmAndamentoPage = () => {
  const router = useRouter();
  const { id: driverId } = router.query;

  return (
    <ActiveFreightsComponent driverId={driverId} />
  );
};

export default FretesEmAndamentoPage;
