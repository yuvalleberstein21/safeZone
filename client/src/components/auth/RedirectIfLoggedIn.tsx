// components/auth/RedirectIfLoggedIn.tsx
import { Navigate } from 'react-router-dom';
import Loader from '../ui/Loader';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import Login from '../../pages/Login';

export const RedirectIfLoggedIn = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <Loader />;

  if (user) {
    // הפניה לפי תפקיד
    if (user.role === 'admin') return <Navigate to="/admin-dashboard" />;
    if (user.role === 'manager') return <Navigate to="/manager-dashboard" />;
    return <Navigate to="/" />; // עובד רגיל
  }

  return <Login />; // לא מחובר? הצג את טופס ההתחברות
};
