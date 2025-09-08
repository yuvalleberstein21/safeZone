import { useState } from 'react';
import SystemStats from '../../components/admin/SystemStats';
import ManagersOverview from '../../components/admin/ManagersOverview';
import UsersTable from '../../components/admin/UsersTable';
import { useAlerts } from '../../hooks/useAlerts';
import Loader from '../../components/ui/Loader';
import RegisterModel from '../../components/modelCards/RegisterModel';
import { Shield } from 'lucide-react';

const AdminDashboard = () => {
  const [showRegisterModel, setShowRegisterModel] = useState<boolean>(false);

  const { data, isLoading, isError } = useAlerts();

  if (isLoading) return <Loader />;
  if (isError) return <div>שגיאה בטעינת נתונים</div>;

  const { users, alerts } = data;
  console.log(users, alerts);

  return (
    <div className="p-3 lg:p-12 md:p-12 bg-gray-50 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          <Shield className="h-8 w-8 text-blue-600" /> לוח ניהול ראשי
        </h1>
        <button
          onClick={() => setShowRegisterModel(true)}
          className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium shadow-md"
        >
          יצירת מנהל חדש
        </button>
      </div>

      <div className="py-4">
        <SystemStats users={data.users} />
      </div>
      <div className="py-4">
        <h2 className="text-xl font-bold text-gray-700 mb-3 border-b pb-2">
          סטטיסטיקות מערכת
        </h2>
        <ManagersOverview users={data.users} />
      </div>
      <div className="py-4">
        <UsersTable users={data.users} />
      </div>

      {showRegisterModel && (
        <RegisterModel
          setShowRegisterModel={setShowRegisterModel}
          isAdmin={true}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
