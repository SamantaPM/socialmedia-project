import React, { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import useAuthStore from '../store/authStore';

const UserProfile = () => {
  const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
  const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';
  const navigate = useNavigate();
  const { userProfile, removeUser } = useAuthStore();
  const { userId } = useParams();
  const { created, saved } = useLoaderData();
  const [pins, setPins] = useState(created);
  const [activeBtn, setActiveBtn] = useState('created');
  const [loading, setLoading] = useState(false);

  const handleButton = (e) => {
    const btn = e.target.name;
    setActiveBtn(e.target.name);
    setLoading(true);
    if (btn === 'created') {
      setPins(created);
    } else {
      setPins(saved);
    }
    setLoading(false);
  };
  const handleLogOut = () => {
    removeUser();
    googleLogout();

    navigate('/login');
  };

  return (
    <div className='relative w-full'>
        <div className='w-full h-370 2xl:h-420 shadow-lg object-cover'>
          <img className='w-full h-370 2xl:h-420 shadow-lg object-cover'
                src='https://source.unsplash.com/1600x900/?nature,photography,technology'
                alt='user-pic' />
        </div>
        <div className='flex flex-col items-center gap-4'>

          <img src={userProfile?.image} alt='User Image' className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'/>
          <h1 className='font-bold text-3xl text-center mb-3'>{userProfile?.username}</h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === userProfile?._id && (
              <button
                type="button"
                className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={handleLogOut}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            )}
          </div>
          <div className='flex gap-4'>
            <button className={(activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles)}
                    name='created'
                    disabled={activeBtn === 'created'}
                    onClick={handleButton} >
                    Created
            </button>
            <button className={(activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles)}
                    name='saved'
                    disabled={activeBtn === 'saved'}
                    onClick={handleButton} >
                    Saved
            </button>
          </div>
          <div>
              {loading
                ? (
                <Spinner />
                  )
                : (
                <MasonryLayout pins={pins} />
                  )}

          </div>
        </div>
    </div>
  );
};

export default UserProfile;
