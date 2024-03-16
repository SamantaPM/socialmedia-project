import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Spinner from '../components/Spinner';
import Sidebar from '../components/Sidebar';
import SidebarMobile from '../components/SidebarMobile';
import useAuthStore from '../store/authStore';

const MainLayout = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuthStore();
  useEffect(() => {
    if (!userProfile) navigate('/login');
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50">
      <div className="hidden md:flex  flex-initial h-screen">
        <Sidebar />
      </div>
      <SidebarMobile />
      <div className="flex flex-col flex-1 h-screen pb-2 overflow-y-scroll">
        <div className="px-2 md:px-5">
          <Navbar />
          <div className="h-full">
            {(navigate.state === 'loading') && <Spinner />}
            <Outlet />
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainLayout;
