import { User, LogOut, MapPin } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white shadow-sm">
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
    </div>
  );
};

export default Header;
