import { Search, Trash2 } from 'lucide-react';
import type { User } from '../../types/user';
import { useEffect, useState } from 'react';
import { useDeleteUser } from '../../hooks/useDeleteUser';

type Props = {
  users: User[];
};

const UsersTable = ({ users }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const deleteUser = useDeleteUser();

  // debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase().trim())
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4 text-gray-800">משתמשים</h2>

      {/* שדה חיפוש */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="חיפוש לפי שם משתמש..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
        />
      </div>

      {/* טבלה רספונסיבית */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-right">
              <th className="px-4 py-2 whitespace-nowrap">#</th>
              <th className="px-4 py-2 whitespace-nowrap">שם</th>
              <th className="px-4 py-2 whitespace-nowrap">מקום עבודה</th>
              <th className="px-4 py-2 whitespace-nowrap">תפקיד</th>
              <th className="px-4 py-2 whitespace-nowrap">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-t text-right even:bg-gray-100">
                <td className="px-4 py-3 whitespace-nowrap">{u.id}</td>
                <td className="px-4 py-3 whitespace-nowrap">{u.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{u.area}</td>
                <td
                  className={`px-4 py-3 whitespace-nowrap font-medium ${
                    u.role === 'manager' ? 'text-blue-600' : 'text-green-600'
                  }`}
                >
                  {u.role}
                </td>
                <td
                  onClick={() => {
                    if (window.confirm('למחוק את המשתמש הזה?')) {
                      deleteUser.mutate(u.id);
                    }
                  }}
                  className="px-6 py-3 whitespace-nowrap"
                >
                  <Trash2 color="red" size={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* הודעה כאשר אין תוצאות */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">לא נמצאו משתמשים התואמים לחיפוש</p>
        </div>
      )}

      {/* סטטיסטיקה */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          מציג {filteredUsers.length} מתוך {users.length} משתמשים
        </p>
      </div>
    </div>
  );
};

export default UsersTable;
