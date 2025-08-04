import type { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Dashboard from './pages/manager/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { RedirectIfLoggedIn } from './components/auth/RedirectIfLoggedIn';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute allowedRoles={['employee']}>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <RedirectIfLoggedIn />,
    // element: <Login />,
  },
  {
    path: '/manager-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['manager']}>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
