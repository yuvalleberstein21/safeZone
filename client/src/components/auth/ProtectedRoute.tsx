import { Navigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import type { JSX } from 'react';
import Loader from '../ui/Loader';

type Props = {
  children: JSX.Element;
  allowedRoles?: ('manager' | 'user' | 'admin')[];
};

export const ProtectedRoute = ({ children, allowedRoles = [] }: Props) => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};
