import type { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/admin/Dashboard';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/manager-dashboard',
    element: <Dashboard />, //admin only
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
