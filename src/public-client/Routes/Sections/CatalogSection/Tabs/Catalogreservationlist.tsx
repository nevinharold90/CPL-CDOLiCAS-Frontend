import { useState } from "react";

export interface ReservationItem {
  id: string;
  reserverName: string;
  reserverEmail?: string;
  bookTitle: string;
  callNumber?: string;
  reservedDate: string;
  pickupBy?: string;
  status: "Pending" | "Ready for pickup" | "Expired";
}

interface CatalogReservationListProps {
  reservations?: ReservationItem[];
  onBackToResults?: () => void;
  onCancelReservations?: (ids: string[]) => void;
}

const DEFAULT_RESERVATIONS: ReservationItem[] = [
  {
    id: "1",
    reserverName: "Maria Santos",
    reserverEmail: "m.santos@example.edu",
    bookTitle: "Introduction to Algorithms",
    callNumber: "QA76.6 .C662 2009",
    reservedDate: "12/09/2026",
    pickupBy: "19/09/2026",
    status: "Ready for pickup",
  },
  {
    id: "2",
    reserverName: "Juan Dela Cruz",
    reserverEmail: "j.delacruz@example.edu",
    bookTitle: "Modern Physics for Scientists and Engineers",
    callNumber: "QC21.3 .T57 2013",
    reservedDate: "10/09/2026",
    pickupBy: "17/09/2026",
    status: "Pending",
  },
  {
    id: "3",
    reserverName: "Angela Reyes",
    reserverEmail: "a.reyes@example.edu",
    bookTitle: "The Elements of Style",
    callNumber: "PE1408 .S772 2000",
    reservedDate: "01/09/2026",
    pickupBy: "08/09/2026",
    status: "Expired",
  },
];

const statusStyles: Record<ReservationItem["status"], string> = {
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  "Ready for pickup": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Expired: "bg-gray-100 text-gray-500 border border-gray-200",
};

const CatalogReservationList = ({
  reservations = DEFAULT_RESERVATIONS,
  onBackToResults,
  onCancelReservations,
}: CatalogReservationListProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState("");

  const filteredReservations = reservations.filter(
    (item) =>
      item.reserverName.toLowerCase().includes(filter.toLowerCase()) ||
      item.bookTitle.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCheckboxToggle = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCancelSelected = () => {
    if (onCancelReservations) onCancelReservations(selectedIds);
    setSelectedIds([]);
  };

  return (
    <div className="font-['Poppins']">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#dce8f2] pb-6 mb-6">
        <h1 className="text-2xl font-bold text-[#1f2a37]">Reservations</h1>
        {onBackToResults && (
          <button
            type="button"
            onClick={onBackToResults}
            className="flex items-center gap-1.5 text-sm text-[#025aa7] hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to results
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="border border-[#dce8f2] rounded-sm bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-[#f7fafd] border-b border-[#dce8f2]">
          <h2 className="text-sm font-bold text-[#1f2a37] uppercase tracking-wider">
            Active reservations
          </h2>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-3 bg-gray-50 border-b border-[#dce8f2] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedIds(filteredReservations.map((i) => i.id))}
              className="text-xs text-[#025aa7] hover:underline"
            >
              Select all
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-[#025aa7] hover:underline"
            >
              Clear selection
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-xs text-gray-600">Select reservations to:</span>
            <button
              onClick={handleCancelSelected}
              disabled={selectedIds.length === 0}
              className="text-xs text-[#b3402f] disabled:opacity-40 disabled:cursor-not-allowed hover:underline flex items-center gap-1 font-semibold"
            >
              🗑 Cancel reservation
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="px-6 py-4 border-b border-[#dce8f2] flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search by name or book title..."
              className="w-full px-3 py-1.5 text-sm text-[#1f2a37] bg-white border border-[#dce8f2] rounded-sm focus:outline-none focus:border-[#025aa7]"
            />
          </div>
          <div className="flex items-center gap-4 text-xs text-[#025aa7]">
            <button onClick={() => setFilter("")} className="hover:underline">✕ Clear filter</button>
            <button className="hover:underline">🖹 CSV</button>
            <button className="hover:underline">🖨 Print</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f7fafd] border-b border-[#dce8f2] text-xs text-gray-600 uppercase">
                <th className="py-3 px-4 w-12 text-center">ℹ</th>
                <th className="py-3 px-4">Reserved by</th>
                <th className="py-3 px-4">Book title</th>
                <th className="py-3 px-4">Call number</th>
                <th className="py-3 px-4">Reserved on</th>
                <th className="py-3 px-4">Pickup by</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaf1f8] text-sm">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No reservations found
                  </td>
                </tr>
              ) : (
                filteredReservations.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f7fafd] transition-colors">
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleCheckboxToggle(item.id)}
                        className="rounded border-gray-300 text-[#025aa7] focus:ring-[#025aa7] cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-[#1f2a37] font-medium">{item.reserverName}</div>
                      {item.reserverEmail && (
                        <div className="text-xs text-gray-500">{item.reserverEmail}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#025aa7]">{item.bookTitle}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{item.callNumber}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{item.reservedDate}</td>
                    <td className="py-3 px-4 text-gray-600 text-xs">{item.pickupBy}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-sm uppercase ${statusStyles[item.status]}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleCancelSelected}
          disabled={selectedIds.length === 0}
          className="px-4 py-2 bg-[#b3402f] text-white text-xs uppercase rounded-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8a2e22] transition-colors shadow-sm"
        >
          Cancel selected reservations
        </button>
      </div>
    </div>
  );
};

export default CatalogReservationList;