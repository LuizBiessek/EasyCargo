import React from 'react';
import PersonalInfoComponent from '../../../components/PersonalInfo/PersonalInfoComponent';
import { useRouter } from 'next/router';

const PersonalInfoPage = () => {
  const router = useRouter();
  const driverId = router.query.id;

  return <PersonalInfoComponent driverId={driverId} />;
};

export default PersonalInfoPage;
