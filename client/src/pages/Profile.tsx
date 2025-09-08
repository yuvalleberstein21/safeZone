import React from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import Loader from '../components/ui/Loader';

const Profile = () => {
  const { data: user, isLoading, error } = useCurrentUser();

  if (isLoading) return <Loader />;
  if (error || !user) return <div>שגיאה בטעינת פרטי המשתמש</div>;

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ✨ הפרופיל שלי
      </h2>

      <form className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            שם מלא
          </label>
          <input
            type="text"
            name="name"
            value={user?.name || ''}
            placeholder="שם מלא"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            שם משתמש
          </label>
          <input
            type="text"
            name="username"
            value={user?.username || ''}
            placeholder="שם משתמש"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            אזור
          </label>
          <input
            type="text"
            name="area"
            placeholder="אזור"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          💾 שמור שינויים
        </button>
      </form>
    </div>
  );
};

export default Profile;
