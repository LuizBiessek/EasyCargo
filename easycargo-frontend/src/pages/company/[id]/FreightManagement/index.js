import React from 'react';
import FreightManagementComponent from '../../../../components/FreightManagement/FreightManagementComponent';
import { useRouter } from 'next/router';

const FreightManagementPage = () => {
  const router = useRouter();
  const companyId = router.query.id;

  return <FreightManagementComponent companyId={companyId} />;
};

export default FreightManagementPage;
