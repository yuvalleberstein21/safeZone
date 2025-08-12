import type { User } from '../../types/user';

type Props = {
  users: User[];
};

const ManagersOverview = ({ users }: Props) => {
  const managers = users.filter((u) => u.role === 'manager');

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4 text-gray-800">מנהלים במערכת</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {managers.map((manager) => (
          <li
            key={manager.id}
            className="border-l-4 border-blue-500 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <p className="font-semibold text-lg">{manager.name}</p>
            <p className="text-sm text-gray-600">מקום עבודה: {manager.area}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagersOverview;
