import type { User } from '../../types/user';

type Props = {
  users: User[];
};

const UsersTable = ({ users }: Props) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-bold mb-4 text-gray-800">משתמשים</h2>
    <table className="min-w-full">
      <thead>
        <tr className="bg-gray-100 text-right">
          <th className="px-4 py-2">שם</th>
          <th className="px-4 py-2">מקום עבודה</th>
          <th className="px-4 py-2">תפקיד</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t text-right">
            <td className="px-4 py-2">{u.name}</td>
            <td className="px-4 py-2">{u.area}</td>
            <td className="px-4 py-2">{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UsersTable;
