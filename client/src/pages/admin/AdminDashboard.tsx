import { useEffect, useState } from 'react';
import SystemStats from '../../components/admin/SystemStats';
import ManagersOverview from '../../components/admin/ManagersOverview';
import UsersTable from '../../components/admin/UsersTable';
import ActivityLogs from '../../components/admin/ActivityLogs';
import { useAlerts } from '../../hooks/useAlerts';
import Loader from '../../components/ui/Loader';
// import UsersTable from './components/UsersTable';
// import ManagersOverview from './components/ManagersOverview';
// import SystemStats from './components/SystemStats';
// import ActivityLogs from './components/ActivityLogs';
// import { getAllUsers, getActivityLogs } from '../api/adminApi'; // נניח שיש לך API כזה

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
};

type Log = {
  id: string;
  action: string;
  timestamp: string;
  user_name: string;
};
const AdminDashboard = () => {
  // const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  const { data, isLoading, isError } = useAlerts();

  if (isLoading) return <Loader />;
  if (isError) return <div>שגיאה בטעינת נתונים</div>;

  const { users, alerts } = data;
  console.log(users, alerts);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // Mock Users
  //     const usersData: User[] = [
  //       {
  //         id: '1',
  //         name: 'אייל כהן',
  //         email: 'eyal@example.com',
  //         role: 'manager',
  //       },
  //       {
  //         id: '2',
  //         name: 'רות לוי',
  //         email: 'ruth@example.com',
  //         role: 'employee',
  //       },
  //       {
  //         id: '3',
  //         name: 'יוסי דניאל',
  //         email: 'yossi@example.com',
  //         role: 'manager',
  //       },
  //       {
  //         id: '4',
  //         name: 'admin ראשי',
  //         email: 'admin@example.com',
  //         role: 'admin',
  //       },
  //     ];

  //     // Mock Logs
  //     const logsData: Log[] = [
  //       {
  //         id: 'log1',
  //         action: 'הוסיף משתמש חדש',
  //         timestamp: new Date().toISOString(),
  //         user_name: 'admin ראשי',
  //       },
  //       {
  //         id: 'log2',
  //         action: 'עדכן פרטי משתמש',
  //         timestamp: new Date(Date.now() - 3600000).toISOString(), // שעה אחורה
  //         user_name: 'אייל כהן',
  //       },
  //       {
  //         id: 'log3',
  //         action: 'צפה בדוחות',
  //         timestamp: new Date(Date.now() - 7200000).toISOString(), // שעתיים אחורה
  //         user_name: 'רות לוי',
  //       },
  //     ];

  //     // סימולציה של המתנה משרת
  //     await new Promise((res) => setTimeout(res, 500));

  //     setUsers(usersData);
  //     setLogs(logsData);
  //   };

  //   fetchData();
  // }, []);
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">לוח ניהול ראשי</h1>

      <SystemStats users={data.users} />

      <ManagersOverview users={data.users} />

      <UsersTable users={data.users} />

      <ActivityLogs logs={logs} />
    </div>
  );
};

export default AdminDashboard;
