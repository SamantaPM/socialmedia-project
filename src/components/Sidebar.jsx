import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { categories } from '../utils/data';
import logo from '../assets/logo.png';

const Sidebar = ({ closeSidebar }) => {
  const textClasses = 'text-gray-500 hover:text-black';
  const baseLinkStyles = 'flex items-center gap-3 px-5 capitalize ';
  const isActive = ({ isActive }) => {
    return isActive ? baseLinkStyles + 'text-black font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out' : baseLinkStyles + textClasses;
  };
  const handleCloseSidebar = () => {
    if (closeSidebar) closeSidebar(false);
  };
  return (
      <div className={'md:flex bg-white flex-col h-full overflow-y-scroll hide-scrollbar min-w-210'}>
        <Link to="/" className="flex w-190 my-6 px-5" onClick={handleCloseSidebar}>
          <img src={logo} className="w-full"></img>
        </Link>
        <div className="flex gap-4 flex-col">
          <NavLink to="/" className={isActive} onClick={handleCloseSidebar}>
            <RiHomeFill />Home
          </NavLink>
          <h3 className='px-5 text-base font-semibold 2xl:text-xl'>Discovery Categories</h3>
          {categories.map((category) => {
            return (
                  <NavLink
                    to={`/category/${category.name}`}
                    key={category.name}
                    onClick={handleCloseSidebar}
                    className={isActive}>
                      <img src={category.image} className="w-8 h-8 rounded-full shadow-sm " />
                      {category.name}
                  </NavLink>
            );
          })}
          </div>
      </div>
  );
};

export default Sidebar;
