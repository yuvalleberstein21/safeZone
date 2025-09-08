import { Send } from 'lucide-react';
import { useState } from 'react';
import { usePostReport } from '../../hooks/usePostReport';
import type { ReportData } from '../../types/report';
import axios from 'axios';
import { getUserLocation } from '../../utils/getUserLocation';
import toast from 'react-hot-toast';

type ReportModelProps = {
  setShowReportModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReportModel = ({ setShowReportModal }: ReportModelProps) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [detailedLocation, setDetailedLocation] = useState('');
  const [reason, setReason] = useState('');

  const postReportMutation = usePostReport();

  const handleSubmit = async () => {
    if (!selectedCity && !detailedLocation) {
      alert('אנא בחר עיר או הזן מיקום מדויק');
      return;
    }

    try {
      // שימוש במיקום דמה במקום מיקום אמיתי
      const location = await getUserLocation();

      const reportData: ReportData = {
        is_safe: false,
        latitude: location.latitude,
        longitude: location.longitude,
        reason,
        area: detailedLocation || selectedCity,
        timestamp: new Date().toISOString(),
      };

      console.log('Sending report:', reportData);

      postReportMutation.mutate(reportData, {
        onSuccess: () => {
          toast.success('הדיווח נשלח בהצלחה');
          setShowReportModal(false);
        },
        onError: (error: unknown) => {
          console.error('Error posting report:', error);
          if (axios.isAxiosError(error)) {
            alert(
              'שגיאה בשליחת הדיווח: ' +
                (error.response?.data?.message || error.message)
            );
          } else {
            alert('שגיאה בשליחת הדיווח: ' + String(error));
          }
        },
      });
    } catch (error) {
      alert('שגיאה בלתי צפויה.');
      console.error('Error:', error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">דיווח מצב לא בטוח</h3>
          <button
            onClick={() => setShowReportModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* מיקום גאוגרפי - מבוטל כי לא בשימוש */}
          {/* אפשר להוריד את החלק הזה אם רוצים */}

          {/* בחירת עיר */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              בחר עיר
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">בחר עיר</option>
              <option value="תל אביב">תל אביב</option>
              <option value="ירושלים">ירושלים</option>
              <option value="חיפה">חיפה</option>
            </select>
          </div>

          {/* מיקום מדויק טקסטואלי */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              מיקום מדויק בתוך העיר (רחוב, קומה, אגף וכו׳)
            </label>
            <input
              type="text"
              value={detailedLocation}
              onChange={(e) => setDetailedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="לדוגמה: משרד החינוך קומה 4 אגף A"
            />
          </div>

          {/* סיבה */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              סיבת הדיווח (אופציונלי)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={3}
              placeholder="תאר/י בקצרה מה הבעיה..."
            />
          </div>

          {/* כפתור שליחה */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Send className="h-4 w-4" />
            <span>שלח דיווח</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModel;
