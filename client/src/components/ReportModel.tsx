import { Camera, Clock, MapPin, Send } from 'lucide-react';

type ReportModelProps = {
  setShowReportModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReportModel = ({ setShowReportModal }: ReportModelProps) => {
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
          {/* Time and Location Info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="px-1">{new Date().toLocaleString('he-IL')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {/* <span>
                {reportForm.location
                  ? `${reportForm.location.lat.toFixed(
                      4
                    )}, ${reportForm.location.lng.toFixed(4)}`
                  : 'מקבל מיקום...'}
              </span> */}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              סיבת הדיווח (אופציונלי)
            </label>
            <textarea
              value={'אדם חשוד'}
              //   value={reportForm.reason}
              //   onChange={(e) =>
              //     setReportForm((prev) => ({ ...prev, reason: e.target.value }))
              //   }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="תאר/י בקצרה מה הבעיה..."
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              צירוף תמונה (אופציונלי)
            </label>
            <div className="flex items-center space-x-3">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Camera className="h-4 w-4" />
                <span className="text-sm px-1">בחר תמונה</span>
                <input
                  type="file"
                  accept="image/*"
                  //   onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {/* {reportForm.image && (
                <span className="text-sm text-green-600">✓ תמונה נבחרה</span>
              )} */}
            </div>
          </div>

          {/* Submit Button */}
          <button
            // onClick={() => handleSafetyReport(false)}
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
