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
    <div className="flex justify-start gap-4 mx-4 py-4">
      <div>
        <label className="block text-sm text-gray-700">מתאריך</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-700">עד תאריך</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>
      {(startDate || endDate) && (
        <button
          onClick={() => {
            setStartDate('');
            setEndDate('');
          }}
          className="text-sm text-blue-600 hover:underline self-end"
        >
          איפוס סינון
        </button>
      )}
    </div>
  </div>
);

export default ReportFilters;
