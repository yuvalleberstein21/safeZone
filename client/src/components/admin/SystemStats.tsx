import type { User } from '../../types/user';

type Props = {
  users: User[];
};

const SystemStats = ({ users }: Props) => {
  const total = users.length;
  const managers = users?.filter((u) => u.role === 'manager').length;
  const employees = users?.filter((u) => u.role === 'employee').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard label="סה״כ משתמשים" value={total} />
      <StatCard label="מנהלים" value={managers} />
      <StatCard label="עובדים" value={employees} />
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: number }) => (
  <div className="bg-white p-4 rounded-lg shadow text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default SystemStats;
