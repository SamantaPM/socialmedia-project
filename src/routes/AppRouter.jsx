import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { loaderFeed, loaderCategory, loaderSearch, loaderPin, loaderProfileFeed } from './loaders';
import MainLayout from '../layouts/MainLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import UserProfile from '../components/UserProfile';
import Login from '../components/Login';
import CreatePin from '../components/CreatePin';
import PinDetail from '../components/PinDetail';
import Feed from '../components/Feed';
import ErrorPage from '../components/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Feed />,
        loader: loaderFeed
      },
      {
        path: '/search',
        element: <Feed />,
        loader: loaderSearch
      },
      {
        path: '/pin-detail/:pinId',
        element: <PinDetail />,
        loader: loaderPin
      },
      {
        path: '/create-pin',
        element: <CreatePin />
      },
      {
        path: '/category/:categoryId',
        element: <Feed />,
        loader: loaderCategory
      }
    ]
  },
  {
    path: '/user-profile/:userId',
    element: <ProfileLayout />,
    children: [
      {
        index: true,
        element: <UserProfile />,
        loader: loaderProfileFeed
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export default router;
