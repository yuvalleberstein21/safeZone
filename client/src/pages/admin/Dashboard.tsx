import { useMemo, useState } from 'react';
import { AlertTriangle, BarChart3, Shield, Users } from 'lucide-react';
import { useManagerReports } from '../../hooks/useManagerReports';
import Loader from '../../components/ui/Loader';
import RegisterModel from '../../components/RegisterModel';

const Dashboard = () => {
  const { data: reports = [], isLoading, error } = useManagerReports();
  const [ShowRegisterModel, setShowRegisterModel] = useState<boolean>(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const recentReports = useMemo(() => {
    return reports.filter((report) => new Date(report.timestamp) >= oneDayAgo);
  }, [reports]);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const timestamp = new Date(report.timestamp);
      const from = startDate ? new Date(startDate) : null;
      const to = endDate ? new Date(endDate) : null;

      return (!from || timestamp >= from) && (!to || timestamp <= to);
    });
  }, [reports, startDate, endDate]);

  const displayReports = startDate || endDate ? filteredReports : recentReports;

  const stats = useMemo(() => {
    const safe = displayReports.filter((r) => r.is_safe).length;
    const unsafe = displayReports.filter((r) => !r.is_safe).length;
    const total = displayReports.length;
    const safePercentage = total ? Math.round((safe / total) * 100) : 0;

    return {
      safe,
      unsafe,
      total,
      safePercentage,
    };
  }, [displayReports]);

  console.log(reports);
  if (isLoading) return <Loader />;
  if (error) return <p>שגיאה בטעינה</p>;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => setShowRegisterModel(true)}
        className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        יצירת עובד חדש
      </button>
      <p className="text-md text-gray-500 mt-2 text-center mb-5">
        {startDate || endDate
          ? `מציג דיווחים בין ${startDate || 'התחלה'} ל־${endDate || 'היום'}`
          : 'מציג דיווחים מה-24 שעות האחרונות'}
      </p>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 mx-8 ">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-green-600">
                דיווחים בטוחים
              </p>
              <p className="text-2xl font-bold text-green-900">{stats.safe}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-red-600">
                דיווחים לא בטוחים
              </p>
              <p className="text-2xl font-bold text-red-900">{stats.unsafe}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-blue-600">
                סה"כ דיווחים היום
              </p>
              <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-purple-600">אחוז בטיחות</p>
              <p className="text-2xl font-bold text-purple-900">
                {stats.safePercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-start gap-4 mx-4 py-4">
          <div>
            <label className="block text-sm text-gray-700">מתאריך</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700">עד תאריך</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">דיווחים אחרונים</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  עובד
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סטטוס
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  זמן
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  אזור
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  סיבה
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {displayReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-900">
                    {report.user_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.is_safe
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {report.is_safe ? '✅ בטוח' : '🚨 לא בטוח'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(report.timestamp).toLocaleString('he-IL', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                      timeZone: 'Asia/Jerusalem',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.area}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {report.reason || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              אין דיווחים עדיין
            </div>
          )}
        </div>
      </div>
      {ShowRegisterModel && (
        <RegisterModel setShowRegisterModel={setShowRegisterModel} />
      )}
    </div>
  );
};

export default Dashboard;
