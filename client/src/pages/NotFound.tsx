import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-center p-6">
      <AlertTriangle className="text-red-500 w-20 h-20 animate-bounce mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">אופס... הדף שחיפשת לא קיים</p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-500 text-white rounded-2xl shadow-md hover:bg-red-600 transition"
      >
        חזרה לדף הבית
      </Link>
    </div>
  );
};

export default NotFound;
