import { User, LogOut, MapPin, Shield, UserLock } from 'lucide-react';

import { useCurrentUser } from '../../hooks/useCurrentUser';
import Loader from './Loader';
import { useLogout } from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  const navigate = useNavigate();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  if (isLoading) return <Loader />;
  if (error || !user) return null;

  return (
    <div className="bg-white shadow-sm">
      {user?.role !== 'manager' ? (
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* צד שמאל - פרטי משתמש */}
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="font-bold text-gray-900">
                {user?.name || 'שלום אורח'}
              </h1>
              <p className="flex items-center text-md text-gray-600">
                מגדל העמק
                <MapPin className="h-4 w-4 ml-1" />
              </p>
            </div>
          </div>

          {/* צד ימין - פרופיל + התנתקות */}
          <div className="flex items-center space-x-4">
            <Link to="/profile" className="text-gray-600 hover:text-gray-900">
              <UserLock className="h-5 w-5" />
            </Link>
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">דשבורד מנהל</h1>
                <p className="text-sm text-gray-600">שלום מנהל</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              <span>התנתק</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
