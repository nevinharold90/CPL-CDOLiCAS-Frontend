import { useState } from "react";
import { Book } from "../../../hooks/type";

export interface SearchHistoryItem {
  id: string;
  date: string;
  search: string;
  resultsCount: number;
  type?: "Catalog" | "Authority";
}

interface ExtendedBook extends Omit<Book, "year" | "rating"> {
  coverImage?: string;
  availabilityStatus?: string;
  year?: number | string;
  rating?: number;
}

interface CatalogResultsProps {
  books: Book[];
  totalResultsCount: number;
  isSearching: boolean;
  searchQuery: string;
  bookmarkQuery: string;
  setBookmarkQuery: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isViewingHistory?: boolean;
  searchHistoryList?: SearchHistoryItem[];
  onSelectHistorySearch?: (searchQuery: string) => void;
  onDeleteHistoryItems?: (ids: string[]) => void;
  onClearAllHistory?: () => void;
}

const LIST_VIEW_THRESHOLD = 6;

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5" title={`${rating} out of 5`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${star <= rating ? "text-amber-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const CatalogResults = ({
  books,
  totalResultsCount,
  isSearching,
  searchQuery,
  bookmarkQuery,
  setBookmarkQuery,
  sortBy,
  setSortBy,
  bookmarkedIds,
  onToggleBookmark,
  currentPage,
  totalPages,
  onPageChange,
  isViewingHistory = false,
  searchHistoryList = [
    { id: "1", date: "25/08/2026 13:18", search: 'ti,wrdl: science,', resultsCount: 760, type: "Catalog" },
    { id: "2", date: "25/08/2026 12:26", search: 'ti,wrdl: science,', resultsCount: 760, type: "Catalog" },
    { id: "3", date: "25/08/2026 10:20", search: 'ti,wrdl: science,', resultsCount: 760, type: "Catalog" },
    { id: "4", date: "25/08/2026 10:20", search: 'ti,wrdl: "spiderman",', resultsCount: 0, type: "Catalog" },
  ],
  onSelectHistorySearch,
  onDeleteHistoryItems,
  onClearAllHistory,
}: CatalogResultsProps) => {
  const [activeTab, setActiveTab] = useState<"Catalog" | "Authority">("Catalog");
  const [selectedHistoryIds, setSelectedHistoryIds] = useState<string[]>([]);
  const [historyFilter, setHistoryFilter] = useState("");

  const useListView = books.length >= LIST_VIEW_THRESHOLD;

  const filteredHistory = searchHistoryList.filter(
    (item) =>
      item.type === activeTab &&
      item.search.toLowerCase().includes(historyFilter.toLowerCase())
  );

  const handleCheckboxToggle = (id: string) => {
    setSelectedHistoryIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // 1. Render Search History View
  if (isViewingHistory) {
    return (
      <main className="flex-1 px-5 md:px-10 lg:px-16 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-[#1f2a37] mb-4">Search history</h1>

          {/* Tabs */}
          <div className="flex border-b border-[#dce8f2] mb-6">
            <button
              onClick={() => setActiveTab("Catalog")}
              className={`px-6 py-2.5 font-mono text-sm border-b-2 transition-colors ${
                activeTab === "Catalog"
                  ? "border-[#025aa7] text-[#025aa7] bg-white font-bold"
                  : "border-transparent text-gray-500 hover:text-[#1f2a37] bg-[#f7fafd]"
              }`}
            >
              Catalog
            </button>
            <button
              onClick={() => setActiveTab("Authority")}
              className={`px-6 py-2.5 font-mono text-sm border-b-2 transition-colors ${
                activeTab === "Authority"
                  ? "border-[#025aa7] text-[#025aa7] bg-white font-bold"
                  : "border-transparent text-gray-500 hover:text-[#1f2a37] bg-[#f7fafd]"
              }`}
            >
              Authority
            </button>
          </div>

          {/* Main Container */}
          <div className="border border-[#dce8f2] rounded-sm bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-[#f7fafd] border-b border-[#dce8f2]">
              <h2 className="font-mono text-sm font-bold text-[#1f2a37] uppercase tracking-wider">
                Current session
              </h2>
            </div>

            {/* Action Bar */}
            <div className="px-6 py-3 bg-gray-50 border-b border-[#dce8f2] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedHistoryIds(filteredHistory.map((i) => i.id))}
                  className="font-mono text-xs text-[#025aa7] hover:underline"
                >
                  Select all
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => {
                    if (onClearAllHistory) onClearAllHistory();
                    setSelectedHistoryIds([]);
                  }}
                  className="font-mono text-xs text-[#025aa7] hover:underline"
                >
                  Clear all
                </button>
                <span className="text-gray-300">|</span>
                <span className="font-mono text-xs text-gray-600">Select searches to:</span>
                <button
                  onClick={() => {
                    if (onDeleteHistoryItems) onDeleteHistoryItems(selectedHistoryIds);
                    setSelectedHistoryIds([]);
                  }}
                  disabled={selectedHistoryIds.length === 0}
                  className="font-mono text-xs text-[#b3402f] disabled:opacity-40 disabled:cursor-not-allowed hover:underline flex items-center gap-1 font-semibold"
                >
                  🗑 Delete
                </button>
              </div>
            </div>

            {/* Filter & Options */}
            <div className="px-6 py-4 border-b border-[#dce8f2] flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={historyFilter}
                  onChange={(e) => setHistoryFilter(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-3 py-1.5 text-sm font-mono text-[#1f2a37] bg-white border border-[#dce8f2] rounded-sm focus:outline-none focus:border-[#025aa7]"
                />
              </div>
              <div className="flex items-center gap-4 font-mono text-xs text-[#025aa7]">
                <button onClick={() => setHistoryFilter("")} className="hover:underline">✕ Clear filter</button>
                <button className="hover:underline">🖹 CSV</button>
                <button className="hover:underline">📋 Copy</button>
                <button className="hover:underline">🖨 Print</button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f7fafd] border-b border-[#dce8f2] font-mono text-xs text-gray-600 uppercase">
                    <th className="py-3 px-4 w-12 text-center">ℹ</th>
                    <th className="py-3 px-4">Date ↕</th>
                    <th className="py-3 px-4">Search ↕</th>
                    <th className="py-3 px-4 text-right">Results ↕</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaf1f8] font-mono text-sm">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-400">
                        No search history entries found
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-[#f7fafd] transition-colors">
                        <td className="py-3 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedHistoryIds.includes(item.id)}
                            onChange={() => handleCheckboxToggle(item.id)}
                            className="rounded border-gray-300 text-[#025aa7] focus:ring-[#025aa7] cursor-pointer"
                          />
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs">{item.date}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => {
                              if (onSelectHistorySearch) onSelectHistorySearch(item.search);
                            }}
                            className="text-[#025aa7] hover:underline flex items-center gap-1.5 text-left font-mono"
                          >
                            <span>📡</span> {item.search}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">{item.resultsCount}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                if (onDeleteHistoryItems) onDeleteHistoryItems(selectedHistoryIds);
                setSelectedHistoryIds([]);
              }}
              disabled={selectedHistoryIds.length === 0}
              className="px-4 py-2 bg-[#b3402f] text-white font-mono text-xs uppercase rounded-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8a2e22] transition-colors shadow-sm"
            >
              Remove selected searches
            </button>
          </div>
        </div>
      </main>
    );
  }

  // 2. Render Normal Catalog Results View with Full Book Details & Images
  return (
    <main className="flex-1 px-5 md:px-10 lg:px-16 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#dce8f2] pb-6">
          <div>
            <p className="font-mono text-sm text-[#1f2a37] uppercase tracking-wider">
              {!isSearching ? (
                <span className="text-[#025aa7] font-bold">
                  ★ Marked Books Collection ({totalResultsCount})
                </span>
              ) : (
                <span>
                  Found <strong className="text-[#025aa7]">{totalResultsCount}</strong> record(s) related to &quot;{searchQuery}&quot;
                </span>
              )}
            </p>
            {useListView && <span className="font-mono text-xs text-[#3f7fb3] mt-1 block">· List view active</span>}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-80">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2.5 text-sm font-mono text-[#1f2a37] bg-white border border-[#dce8f2] rounded-sm focus:outline-none focus:border-[#025aa7] cursor-pointer appearance-none pr-10 truncate"
              >
                <option value="relevance">Relevance</option>
                <optgroup label="Popularity">
                  <option value="popularity_desc">Popularity (most to least)</option>
                  <option value="popularity_asc">Popularity (least to most)</option>
                </optgroup>
                <optgroup label="Author">
                  <option value="author_az">Author (A-Z)</option>
                  <option value="author_za">Author (Z-A)</option>
                </optgroup>
                <optgroup label="Call number">
                  <option value="callnumber_az">Call number (0-9 to A-Z)</option>
                  <option value="callnumber_za">Call number (Z-A to 9-0)</option>
                </optgroup>
                <optgroup label="Dates">
                  <option value="date_new_old">Publication/Copyright date: Newest to oldest</option>
                  <option value="date_old_new">Publication/Copyright date: Oldest to newest</option>
                </optgroup>
                <optgroup label="Title">
                  <option value="title_az">Title (A-Z)</option>
                  <option value="title_za">Title (Z-A)</option>
                </optgroup>
              </select>
            </div>

            {!isSearching && (
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={bookmarkQuery}
                  onChange={(e) => setBookmarkQuery(e.target.value)}
                  placeholder="Search marked books..."
                  className="w-full px-4 py-2.5 text-sm font-mono text-[#1f2a37] bg-white border border-[#dce8f2] rounded-sm focus:outline-none focus:border-[#025aa7] placeholder:text-gray-400"
                />
              </div>
            )}
          </div>
        </div>

        {books.length === 0 ? (
          <div className="border border-dashed border-[#dce8f2] rounded-sm py-20 text-center">
            <p className="font-mono text-base text-gray-400 uppercase tracking-wider">
              {!isSearching ? "No matching marked books found" : "No records found for this query"}
            </p>
          </div>
        ) : (
          <div className={useListView ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
            {books.map((rawBook) => {
              const book = rawBook as ExtendedBook;
              const isBookmarked = bookmarkedIds.includes(book.id);
              return (
                <div
                  key={book.id}
                  className={`border border-[#dce8f2] rounded-sm bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex ${
                    useListView ? "flex-row gap-6 items-center" : "flex-col justify-between"
                  }`}
                >
                  {/* Book Cover Image */}
                  <div
                    className={`relative bg-[#f7fafd] border border-[#dce8f2] rounded-sm overflow-hidden shrink-0 flex items-center justify-center ${
                      useListView ? "w-24 h-32" : "w-full h-48 mb-4"
                    }`}
                  >
                    {book.coverImage || book.coverUrl ? (
                      <img
                        src={book.coverImage || book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-2">
                        <svg
                          className="w-10 h-10 mx-auto text-[#3f7fb3] opacity-40 mb-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-tighter">
                          No Cover
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => onToggleBookmark(book.id)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full border transition-colors ${
                        isBookmarked
                          ? "bg-[#025aa7] text-white border-[#025aa7]"
                          : "bg-white/90 text-gray-400 border-[#dce8f2] hover:text-[#025aa7]"
                      }`}
                      title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                    >
                      <svg className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>

                  {/* Book Info Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {book.callNumber && (
                          <span className="font-mono text-xs text-[#3f7fb3] uppercase tracking-wider block mb-1">
                            {book.callNumber}
                          </span>
                        )}
                        <h3 className="font-bold text-lg text-[#1f2a37] leading-snug line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-0.5">{book.author}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500">
                      {book.year !== undefined && <span>Year: {book.year}</span>}
                      {book.rating !== undefined && <StarRating rating={book.rating} />}
                    </div>

                    {(book.availabilityStatus || book.available !== undefined) && (
                      <div className="mt-3">
                        <span
                          className={`inline-block font-mono text-xs px-2 py-0.5 rounded-sm uppercase ${
                            (book.availabilityStatus?.toLowerCase().includes("available") || book.available)
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {book.availabilityStatus || (book.available ? "Available" : "Checked Out")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2 font-mono text-sm">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-[#dce8f2] rounded-sm bg-white text-[#025aa7] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f7fafd]"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-[#dce8f2] rounded-sm bg-white text-[#025aa7] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f7fafd]"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default CatalogResults;