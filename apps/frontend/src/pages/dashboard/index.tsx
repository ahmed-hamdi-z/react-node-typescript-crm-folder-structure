import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { UserButton } from '@/components/dashboard/Auth/user-button';
import DashboardLayout from '@/layouts/dashboard/Layout';
import { useCurrent } from '@/hooks/dashboard/auth/use-current';
import { appRoutes } from '@/config/routes-config';

const Home = () => {
  const redirect = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: user } = await useCurrent();
      if (!user) redirect(appRoutes.auth.login);
    };
    getUser();
  }, []);
  return (
    <DashboardLayout>
      <UserButton />
    </DashboardLayout>
  )
}

export default Home;