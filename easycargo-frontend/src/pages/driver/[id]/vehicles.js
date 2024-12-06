import React from 'react';
import VehicleManagementComponent from '../../../components/VehicleManagement/VehicleManagementComponent';
import { useRouter } from 'next/router';

const VehiclesPage = () => {
  const router = useRouter();
  const driverId = router.query.id;

  return <VehicleManagementComponent driverId={driverId} />;
};

export default VehiclesPage;
