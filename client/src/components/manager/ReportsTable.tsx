type Report = {
  id?: number;
  user_name: string;
  is_safe: boolean;
  timestamp: string;
  area: string;
  reason?: string;
};

type ReportsTableProps = {
  reports: Report[];
};
const ReportsTable = ({ reports }: ReportsTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">דיווחים אחרונים</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                עובד
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                זמן
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                אזור
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                סיבה
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-3 py-1 text-sm font-semibold text-gray-900">
                  {report.user_name}
                </td>
                <td className="px-6 py-4">
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
                <td className="px-6 py-4 text-sm text-gray-900">
                  {new Date(report.timestamp).toLocaleString('he-IL', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                    timeZone: 'Asia/Jerusalem',
                  })}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {report.area}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {report.reason || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            אין דיווחים להצגה
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsTable;
