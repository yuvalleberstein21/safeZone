import { AlertTriangle, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="py-3">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          איך אתה מרגיש/ה עכשיו?
        </h2>
        <p className="text-gray-600">
          לחץ/י על הכפתור המתאים למצב הביטחון האישי שלך
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          {/* Safe Button */}
          <button
            // onClick={() => handleSafetyReport(true)}
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
            // onClick={() => setShowReportModal(true)}
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
    </div>
  );
};

export default Home;
