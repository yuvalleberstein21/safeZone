type Props = {
  logs: { id: string; action: string; timestamp: string; user_name: string }[];
};

const ActivityLogs = ({ logs }: Props) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-bold mb-4 text-gray-800">פעולות אחרונות</h2>
    <ul className="space-y-2">
      {logs.map((log) => (
        <li key={log.id} className="text-sm border-b py-2">
          <strong>{log.user_name}</strong> ביצע: <em>{log.action}</em> <br />
          <span className="text-xs text-gray-500">
            {new Date(log.timestamp).toLocaleString('he-IL')}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default ActivityLogs;
