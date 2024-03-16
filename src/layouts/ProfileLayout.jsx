import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import SidebarMobile from '../components/SidebarMobile';
import useAuthStore from '../store/authStore';

const ProfileLayout = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuthStore();
  useEffect(() => {
    if (!userProfile) navigate('/login');
  }, []);

  return (
    <div className='flex flex-col md:flex-row bg-gray-50'>
      <div className='hidden md:flex  flex-initial h-screen '>
        <Sidebar />
      </div>
      <SidebarMobile />
      <div className='flex flex-col flex-1 h-screen pb-2 overflow-y-scroll'>
        <div >
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default ProfileLayout;
