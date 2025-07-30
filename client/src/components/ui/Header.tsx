import { User, LogOut, MapPin, Shield } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isEmployee, setIsEmployee] = useState<boolean>(false);
  return (
    <div className="bg-white shadow-sm">
      {isEmployee ? (
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <User className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="font-bold text-gray-900">שלום יובל ליברשטיין</h1>
              <p className="flex items-center text-md text-gray-600">
                מגדל העמק
                <MapPin className="h-4 w-4" />
              </p>
            </div>
          </div>
          <button
            // onClick={() => setCurrentUser(null)}
            className="text-gray-600 hover:text-gray-900"
          >
            <LogOut className="h-5 w-5" />
          </button>
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
              // onClick={() => setCurrentUser(null)}
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
