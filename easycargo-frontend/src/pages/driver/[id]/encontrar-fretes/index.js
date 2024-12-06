import React from 'react';
import { useRouter } from 'next/router';
import EncontrarFretesComponent from '../../../../components/EncontrarFretes/EncontrarFretesComponent';

const EncontrarFretesPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <EncontrarFretesComponent driverId={id} />;
};

export default EncontrarFretesPage;
