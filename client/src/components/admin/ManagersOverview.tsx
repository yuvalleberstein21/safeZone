import type { User } from '../../types/user';

type Props = {
  users: User[];
};

const ManagersOverview = ({ users }: Props) => {
  const managers = users.filter((u) => u.role === 'manager');

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4 text-gray-800">מנהלים במערכת</h2>
      <ul className="space-y-2">
        {managers.map((manager) => (
          <li key={manager.id} className="border p-3 rounded">
            <p className="font-semibold">{manager.name}</p>
            <p className="text-sm text-gray-600">מקום עבודה: {manager.area}</p>
          </li>
        ))}
        {managers.length === 0 && <p>אין מנהלים עדיין</p>}
      </ul>
    </div>
  );
};

export default ManagersOverview;
