import { User } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRegister } from '../hooks/useRegister';

type RegisterModelProps = {
  setShowRegisterModel: React.Dispatch<React.SetStateAction<boolean>>;
};
const RegisterModel = ({ setShowRegisterModel }: RegisterModelProps) => {
  const [RegisterForm, setRegisterForm] = useState({
    username: '',
    name: '',
    area: '',
    password: '',
  });

  const { mutate, isPending } = useRegister();

  const handleRegister = () => {
    mutate(RegisterForm, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(`${data.user.name} נרשם/ה בהצלחה`);
        setShowRegisterModel(false);
      },
      onError: (err: any) => {
        const msg = err.response?.data?.message || 'הרישום נכשל. נסה שוב.';
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
          <p className="text-gray-600 text-xl">יצירת עובד חדש למערכת</p>
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

          <button
            onClick={handleRegister}
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isPending ? 'טוען...' : 'הרשמה'}
          </button>
        </div>
        {/* 
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p className="font-medium mb-2">משתמשים לדוגמה:</p>
          <p>עובד: employee1 / employee1</p>
          <p>מנהל עובדים: manager1 / manager1</p>
          <p>מנהל: admin1 / admin1</p>
        </div> */}
      </div>
    </div>
  );
};

export default RegisterModel;
