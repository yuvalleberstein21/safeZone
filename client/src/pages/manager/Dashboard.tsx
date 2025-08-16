import { useState, useMemo } from 'react';
import { useManagerReports } from '../../hooks/useManagerReports';
import Loader from '../../components/ui/Loader';
import RegisterModel from '../../components/RegisterModel';
import StatsCards from '../../components/manager/StatsCards';
import ReportFilters from '../../components/manager/ReportFilters';
import ReportsTable from '../../components/manager/ReportsTable';
import UsersTable from '../../components/admin/UsersTable';
import { useManagerUsers } from '../../hooks/useManagerUsers';

const Dashboard = () => {
  const { data: reports = [], isLoading, error } = useManagerReports();
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useManagerUsers();

  console.log(users);
  const [showRegisterModel, setShowRegisterModel] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );

  const recentReports = useMemo(() => {
    return reports.filter((report) => {
      const timestamp = new Date(report.timestamp);
      return timestamp >= startOfToday && timestamp < endOfToday;
    });
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const timestamp = new Date(report.timestamp);
      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate) : null;
      return (!from || timestamp >= from) && (!to || timestamp <= to);
    });
  }, [reports, startDate, endDate]);

  const displayReports = useMemo(() => {
    const base = startDate || endDate ? filteredReports : recentReports;
    return [...base].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [filteredReports, recentReports, startDate, endDate]);

  const stats = useMemo(() => {
    const safe = displayReports.filter((r) => r.is_safe).length;
    const unsafe = displayReports.length - safe;
    const total = displayReports.length;
    const safePercentage = total ? Math.round((safe / total) * 100) : 0;
    return { safe, unsafe, total, safePercentage };
  }, [displayReports]);

  if (isLoading) return <Loader />;
  if (error) return <p>שגיאה בטעינת הדוחות</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => setShowRegisterModel(true)}
        className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium"
      >
        יצירת עובד חדש
      </button>

      <p className="text-md text-gray-500 mt-2 text-center mb-5">
        {startDate || endDate
          ? `מציג דיווחים בין ${startDate || 'התחלה'} ל־${endDate || 'היום'}`
          : 'מציג דיווחים של היום'}
      </p>

      <StatsCards stats={stats} />
      <ReportFilters
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <ReportsTable reports={displayReports} />
      <UsersTable users={users} />

      {showRegisterModel && (
        <RegisterModel
          setShowRegisterModel={setShowRegisterModel}
          isAdmin={false}
        />
      )}
    </div>
  );
};

export default Dashboard;
