type ReportFiltersProps = {
  startDate: string;
  endDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
};
const ReportFilters = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: ReportFiltersProps) => (
  <div className="bg-white rounded-lg shadow mb-4">
    {/* עוטף את כל השורה */}
    <div className="flex flex-col sm:flex-row justify-start items-center gap-4 mx-4 py-4">
      {/* פילטר מתאריך */}
      <div className="w-full sm:w-auto">
        <label className="block text-sm text-gray-700">מתאריך</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1 w-full sm:w-auto"
        />
      </div>

      {/* פילטר עד תאריך */}
      <div className="w-full sm:w-auto">
        <label className="block text-sm text-gray-700">עד תאריך</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1 w-full sm:w-auto"
        />
      </div>

      {/* כפתור האיפוס */}
      {(startDate || endDate) && (
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <button
            onClick={() => {
              setStartDate('');
              setEndDate('');
            }}
            className="text-md bg-gray-100 px-4 py-2 rounded-md text-blue-600 hover:underline"
          >
            איפוס סינון
          </button>
        </div>
      )}
    </div>
  </div>
);

export default ReportFilters;
