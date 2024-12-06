import React from 'react';
import ApplicationManagementComponent from '../../../components/ApplicationManagement/ApplicationManagementComponent'
import { useRouter } from 'next/router';

const ApplicationsPage = () => {
  const router = useRouter();
  const companyId = router.query.id;

  return <ApplicationManagementComponent companyId={companyId} />;
};

export default ApplicationsPage;
