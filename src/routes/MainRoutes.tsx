import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Layout from '@/components/layout';

import Loadable from '@/components/Loadable';
import SearchPage from '@/pages/search';
import Read from '@/pages/read';
import { getCookie } from '@/utils/cookie';

const Admin = Loadable(lazy(() => import('@/pages/admin')));
const Home = Loadable(lazy(() => import('@/pages/home')));
const logined = getCookie('token') != undefined;
const MainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <Navigate to={logined ? '/search' : '/home'} />
    },
    {
      path: '/admin',
      element: <Admin />
    },
    {
      path: '/search',
      element: <SearchPage />
    },
    {
      path: '/read',
      element: <Read />
    },
    {
      path: '/home',
      element: <Home />
    }
  ]
};

export default MainRoutes;
