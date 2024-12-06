import React from 'react';
import LoadingLocationManagementComponent from '../../../components/LoadingLocationManagement/LoadingLocationManagementComponent';
import { useRouter } from 'next/router';

const LoadingLocationsPage = () => {
  const router = useRouter();
  const companyId = router.query.id;

  return <LoadingLocationManagementComponent companyId={companyId} />;
};

export default LoadingLocationsPage;
