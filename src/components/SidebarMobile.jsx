import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai';
import logo from '../assets/logo.png';
import useAuthStore from '../store/authStore';

const SidebarMobile = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { userProfile } = useAuthStore();

  return (
    <div className="flex flex-row">
      <div className='flex flex-row w-full justify-between items-center px-2 md:hidden bg-white shadow-md'>
        <AiOutlineMenu fontSize={40} onClick={() => setToggleSidebar(true)} className='hover:cursor-pointer'/>
        <Link to="/" className="w-190 my-6 px-5" onClick={() => setToggleSidebar(false)}>
          <img src={logo}></img>
        </Link>
        <Link to={`/user-profile/${userProfile?._id}`} onClick={() => setToggleSidebar(false)}>
          <img src={userProfile?.image} className='w-12 h-12 block rounded-full' />
        </Link>
      </div>
      {toggleSidebar && (
        <div className="fixed w-4/5 h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className='absolute top-0 right-0 m-3 hover:cursor-pointer' onClick={() => setToggleSidebar(false)} >
              <AiFillCloseCircle fontSize={30} />
            </div>
            <Sidebar closeSidebar={setToggleSidebar}/>
        </div>
      )}

    </div>
  );
};

export default SidebarMobile;
