import { User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRegister } from '../hooks/useRegister';
import { isAxiosError } from 'axios';

type RegisterModelProps = {
  setShowRegisterModel: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
};
const RegisterModel = ({
  setShowRegisterModel,
  isAdmin,
}: RegisterModelProps) => {
  const [RegisterForm, setRegisterForm] = useState({
    username: '',
    name: '',
    area: '',
    password: '',
    confirmPassword: '',
  });

  const { mutate, isPending } = useRegister();

  const handleRegister = () => {
    if (RegisterForm.confirmPassword !== RegisterForm.password) {
      toast.error('סיסמאות לא תואמות ,נסה שוב.');
      return;
    }
    mutate(RegisterForm, {
      onSuccess: (data) => {
        toast.success(`${data.user.name} נרשם/ה בהצלחה`);
        setShowRegisterModel(false);
      },
      onError: (err: unknown) => {
        let msg = 'ההרשמה נכשלה נסה שוב.';

        if (isAxiosError(err)) {
          msg = err.response?.data?.message || msg;
        }

        toast.error(msg);
      },
    });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full mx-4 max-w-md">
        <button
          onClick={() => setShowRegisterModel(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <div className="text-center mb-6 py-2 flex justify-center items-center flex-row-reverse">
          <User className="mx-auto h-8 w-8 text-blue-600" />
          <p className="text-gray-600 text-xl">
            {isAdmin ? 'יצירת מנהל חדש למערכת' : 'יצירת עובד חדש למערכת'}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              שם משתמש
            </label>
            <input
              type="text"
              value={RegisterForm.username}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="הכנס שם משתמש"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              שם מלא
            </label>
            <input
              type="text"
              value={RegisterForm.name}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="הכנס את שם העובד"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              סיסמא
            </label>
            <input
              type="password"
              value={RegisterForm.password}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="הכנס סיסמה"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              אשר סיסמא
            </label>
            <input
              type="password"
              value={RegisterForm.confirmPassword}
              onChange={(e) =>
                setRegisterForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="אשר סיסמא"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              מקום העבודה
            </label>
            <input
              type="text"
              value={RegisterForm.area}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, area: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="מקום העבודה(לדוג: קרית הממשלה נוף הגליל משרד החינוך)"
            />
          </div>
          {isAdmin && (
            <div>
              <div>
                <input
                  type="radio"
                  id="huey"
                  name="drone"
                  value="huey"
                  checked
                />
                <label htmlFor="huey" className="px-2">
                  מנהל
                </label>
              </div>
              <div>
                <input type="radio" id="dewey" name="drone" value="dewey" />
                <label htmlFor="dewey" className="px-2">
                  עובד
                </label>
              </div>
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isPending ? 'טוען...' : 'הרשמה'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModel;
