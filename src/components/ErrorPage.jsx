import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { HiExclamation } from 'react-icons/hi';
import logo from '../assets/logo.png';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error.error);

  return (
      <>
        <div className='w-full h-screen bg-gray-50 flex items-center justify-center '>
          <div className='flex flex-col gap-1 md:gap-3 rounded-full bg-white p-10 md:p-20 text-center items-center shadow-sm'>
          <Link to="/"><img src={logo} className='mb-7 md:mb-11 w-44 md:w-275'/></Link>
            <div className='flex flex-col justify-center items-center'>
              <HiExclamation fontSize={60} />
              <h3>Page Not Found</h3>
            </div>
            <p>Sorry, the page you are looking<br />for could not be found.</p>
            <Link to="/" className='font-semibold underline'>Go Home</Link>
          </div>
        </div>
      </>
  );
};

export default ErrorPage;
