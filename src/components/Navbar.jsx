import React, { useRef } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuthStore();
  const [searchParams] = useSearchParams();
  const searchInput = useRef();
  const query = searchParams.get('q');

  if (query && !searchInput?.current) {
    searchInput.current = query;
  }

  const search = (e) => {
    if (!searchInput.current?.value) return;

    navigate(`/search?q=${searchInput.current.value}`);
  };

  return (
    <div className="flex mt-5 pb-7 gap-2 md:gap-5">
      <div className="flex flex-1 gap-2 items-center text-black bg-white px-3 focus-within:shadow-sm rounded-md">
        <AiOutlineSearch onClick={search}/>
        <input type="search" id="searchInput" name="searchInput" placeholder='Search' ref={searchInput} className="w-full text-black hover:text-black outline-none" onKeyDown={(e) => (e.key === 'Enter') && search()}/>
      </div>
      <div className="flex flex-initial justify-center md:flex-row gap-3">
        <NavLink to={`/user-profile/${userProfile?._id}`} className="hidden md:block text-white  shadow-sm">
          <img src={userProfile?.image} alt='User Avatar' className='w-14 h-12 rounded-lg '/>
        </NavLink>

        <NavLink to="/create-pin" className="flex items-center justify-center bg-black text-white rounded-lg shadow-sm md:w-14 h-12 w-12">
          <AiOutlinePlus />
        </NavLink>
      </div>

    </div>
  );
};

export default Navbar;
