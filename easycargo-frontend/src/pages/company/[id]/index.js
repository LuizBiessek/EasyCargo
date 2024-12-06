import React from 'react';
import CompanyHomeComponent from '../../../components/CompanyHome/CompanyHomeComponent';
import { useRouter } from 'next/router';

const CompanyHomePage = () => {
  const router = useRouter();
  const companyId = router.query.id;

  return <CompanyHomeComponent companyId={companyId} />;
};

export default CompanyHomePage;
