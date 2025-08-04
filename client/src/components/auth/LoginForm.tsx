import { Shield } from 'lucide-react';
import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { toast } from 'react-hot-toast';
import { isAxiosError } from 'axios';

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin();
  const { refetch } = useCurrentUser();

  const handleLogin = () => {
    mutate(loginForm, {
      onSuccess: async () => {
        const { data: user } = await refetch();

        if (!user) return;

        toast.success(`שלום ${user.name}! התחברת בהצלחה`);

        if (user.role === 'manager') {
          navigate('/manager-dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      },
      onError: (err: unknown) => {
        let msg = 'התחברות נכשלה. נסה שוב.';

        if (isAxiosError(err)) {
          msg = err.response?.data?.message || msg;
        }

        toast.error(msg);
      },
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full mx-4 max-w-md">
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
              value={loginForm.username}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, username: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="הכנס שם משתמש"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              סיסמא
            </label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="הכנס סיסמה"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isPending ? 'טוען...' : 'כניסה'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
