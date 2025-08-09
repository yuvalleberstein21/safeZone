import { Search } from 'lucide-react';
import type { User } from '../../types/user';

type Props = {
  users: User[];
};

const UsersTable = ({ users }: Props) => (
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
        className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
        // value={searchTerm}
        // onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* טבלה רגילה למסכים גדולים */}
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100 text-right">
            <th className="px-4 py-3 text-sm font-medium text-gray-700">שם</th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">
              מקום עבודה
            </th>
            <th className="px-4 py-3 text-sm font-medium text-gray-700">
              תפקיד
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-900">{u.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{u.area}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* תצוגת כרטיסים למובייל */}
    <div className="md:hidden space-y-3">
      {users.map((u) => (
        <div key={u.id} className="bg-gray-50 rounded-lg p-4 border">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600">שם:</span>
              <span className="font-medium text-gray-900 text-right">
                {u.name}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600">מקום עבודה:</span>
              <span className="text-gray-700 text-right">{u.area}</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-sm text-gray-600">תפקיד:</span>
              <span className="text-gray-700 text-right">{u.role}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* הודעה כאשר אין תוצאות */}
    {users.length === 0 && (
      <div className="text-center py-8">
        <p className="text-gray-500">לא נמצאו משתמשים התואמים לחיפוש</p>
      </div>
    )}

    {/* סטטיסטיקה */}
    <div className="mt-4 pt-4 border-t border-gray-200">
      <p className="text-sm text-gray-600 text-center">
        מציג {users.length} מתוך {users.length} משתמשים
      </p>
    </div>
  </div>
  // <div className="bg-white p-4 rounded-lg shadow">
  //   <h2 className="text-lg font-bold mb-4 text-gray-800">משתמשים</h2>
  //   <table className="min-w-full">
  //     <thead>
  //       <tr className="bg-gray-100 text-right">
  //         <th className="px-4 py-2">שם</th>
  //         <th className="px-4 py-2">מקום עבודה</th>
  //         <th className="px-4 py-2">תפקיד</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {users.map((u) => (
  //         <tr key={u.id} className="border-t text-right">
  //           <td className="px-4 py-2">{u.name}</td>
  //           <td className="px-4 py-2">{u.area}</td>
  //           <td className="px-4 py-2">{u.role}</td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // </div>
);

export default UsersTable;
