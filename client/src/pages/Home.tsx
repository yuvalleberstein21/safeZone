import { AlertTriangle, Shield } from 'lucide-react';
import { useState } from 'react';
import ReportModel from '../components/modelCards/ReportModel';
import { getUserLocation } from '../utils/getUserLocation';
import type { ReportData } from '../types/report';
import { usePostReport } from '../hooks/usePostReport';
import toast from 'react-hot-toast';

const Home = () => {
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const postReportMutation = usePostReport();

  const handleSafetyReport = async (isSafe: boolean) => {
    try {
      const location = await getUserLocation();

      const reportData: ReportData = {
        is_safe: isSafe,
        latitude: location.latitude,
        longitude: location.longitude,
        reason: '',
        area: '',
        timestamp: new Date().toISOString(),
      };

      postReportMutation.mutate(reportData, {
        onSuccess: () => {
          toast.success('הדיווח נשלח בהצלחה');
          setShowReportModal(false);
        },
        onError: (error) => {
          toast.error('שגיאה בשליחת הדיווח');
          console.error(error);
        },
      });
    } catch (err) {
      toast.error('לא ניתן היה לקבל את המיקום');
      console.error(err);
    }
  };
  return (
    <div className="text-center py-2 mt-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        איך אתה מרגיש/ה עכשיו?
      </h2>
      <p className="text-gray-600">
        לחץ/י על הכפתור המתאים למצב הביטחון האישי שלך
      </p>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-3  mx-4 max-w-2xl w-full">
          {/* Safe Button */}
          <button
            onClick={() => handleSafetyReport(true)}
            className="group relative bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <Shield className="h-12 w-12" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">אני בטוח/ה</h3>
                <p className="text-green-100">הכל בסדר, אני במצב טוב</p>
              </div>
            </div>
          </button>

          {/* Unsafe Button */}
          <button
            onClick={() => setShowReportModal(true)}
            className="group relative bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <AlertTriangle className="h-12 w-12" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">אני לא בטוח/ה</h3>
                <p className="text-red-100">אני צריך/ה עזרה או יש בעיה</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      {showReportModal && (
        <ReportModel setShowReportModal={setShowReportModal} />
      )}
    </div>
  );
};

export default Home;
