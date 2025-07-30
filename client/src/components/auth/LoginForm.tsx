import { Shield } from 'lucide-react';

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            מערכת דיווח בטיחות
          </h1>
          <p className="text-gray-600">כניסה למערכת</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              שם משתמש
            </label>
            <input
              type="text"
              // value={'שם משתמש'}
              // onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="הכנס שם משתמש"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              סיסמא
            </label>
            <input
              type="password"
              // value={'סיסמא'}
              // onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="הכנס סיסמה"
            />
          </div>

          <button
            //   onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            התחבר
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p className="font-medium mb-2">משתמשים לדוגמה:</p>
          <p>עובד: user123 / 123</p>
          <p>מנהל: admin1231 / admin1231</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
