import { AlertTriangle, BarChart3, Shield, Users } from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  //       const [currentUser, setCurrentUser] = useState(null);
  //       const [reportForm, setReportForm] = useState({
  //     reason: '',
  //     image: null,
  //     location: null
  //   });
  const [reports, setReports] = useState([]);
  // const handleSafetyReport = (isSafe) => {
  //     const now = new Date();
  //     const report = {
  //       id: Date.now(),
  //       userId: currentUser.id,
  //       userName: currentUser.name,
  //       userArea: currentUser.area,
  //       isSafe,
  //       timestamp: now,
  //       reason: reportForm.reason,
  //       location: reportForm.location,
  //       image: reportForm.image
  //     };

  //     setReports(prev => [report, ...prev]);

  //     if (!isSafe) {
  //       // התרעה למנהל
  //       setTimeout(() => {
  //         alert(`🚨 התרעה: ${currentUser.name} דיווח על מצב לא בטוח!`);
  //       }, 500);
  //     } else {
  //       alert('✅ הדיווח נקלט בהצלחה - תודה על הדיווח!');
  //     }

  //     setShowReportModal(false);
  //     setReportForm({ reason: '', image: null, location: null });
  //   };

  const getReportStats = () => {
    const today = new Date().toDateString();
    const todayReports = reports.filter(
      (r) => r.timestamp.toDateString() === today
    );
    const safeReports = todayReports.filter((r) => r.isSafe).length;
    const unsafeReports = todayReports.filter((r) => !r.isSafe).length;
    const totalReports = todayReports.length;

    return {
      safe: safeReports,
      unsafe: unsafeReports,
      total: totalReports,
      safePercentage:
        totalReports > 0 ? Math.round((safeReports / totalReports) * 100) : 0,
    };
  };

  const stats = getReportStats();
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              {/* {reports.slice(0, 10).map((report) => ( */}
              <tr key={3}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  יובל
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                  //   className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  //     report.isSafe
                  //       ? 'bg-green-100 text-green-800'
                  //       : 'bg-red-100 text-red-800'
                  //   }`}
                  >
                    לא בטוח 🚨{/* {report.isSafe ? '✅ בטוח' : '🚨 לא בטוח'} */}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {/* {report.timestamp.toLocaleString('he-IL')} */}
                  10/07/25, 14:25
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {/* {report.userArea} */}
                  קומה 4
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {/* {report.reason || '-'} */}
                  המעלית לא עובדת
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
          {[].length === 0 && (
            <div className="text-center py-8 text-gray-500">
              אין דיווחים עדיין
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
