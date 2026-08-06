import { useState, useMemo } from "react";
import { 
  FiSearch, FiCopy, 
  FiCode, FiCalendar, FiClock 
} from "react-icons/fi";
import { format, parseISO, isToday } from "date-fns";
import BookDetailModal from "../components/BookDetailModal";

// Icons – your custom PNGs
import ViewIcon from "../assets/eye-1.png";
import ViewIconHover from "../assets/eye-2.png";
import EditIcon from "../assets/edit-1.png";
import EditIconHover from "../assets/edit-2.png";
import DeleteIcon from "../assets/trash-1.png";
import DeleteIconHover from "../assets/trash-2.png";
import SearchIcon from "../assets/search.png"
import AllBooksIcon from "../assets/book-open.png";
import TodayIcon from "../assets/calendar.png";
import CalendarIcon from "../assets/calendar.png";
import CodeIcon from "../assets/code.png";

type Book = {
  id: string;
  code: string;
  title: string;
  author: string;
  isbn?: string;
  category: string;
  status: "Available" | "Borrowed" | "Reserved";
  registeredAt: string;
};

const mockBooks: Book[] = [
  {
    id: "1",
    code: "LIB-202603-0001",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    category: "Programming",
    status: "Available",
    registeredAt: "2026-03-10T09:15:22Z",
  },
  {
    id: "2",
    code: "LIB-202603-0002",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    category: "Programming",
    status: "Borrowed",
    registeredAt: "2026-03-12T11:40:00Z",
  },
  {
    id: "3",
    code: "LIB-202603-0003",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    status: "Available",
    registeredAt: "2026-03-13T08:22:10Z",
  },
];

function BookInformation() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  const booksByDate = useMemo(() => {
    const map = new Map<string, Book[]>();
    mockBooks.forEach(book => {
      const dateStr = format(parseISO(book.registeredAt), "yyyy-MM-dd");
      if (!map.has(dateStr)) map.set(dateStr, []);
      map.get(dateStr)!.push(book);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, items]) => ({ date, items }));
  }, []);

  const allBooks = useMemo(() => booksByDate.flatMap(g => g.items), [booksByDate]);

  const filteredBooks = useMemo(() => {
    let list: Book[] = selectedDate 
      ? booksByDate.find(g => g.date === selectedDate)?.items ?? []
      : allBooks;

    if (!search.trim()) return list;

    const term = search.toLowerCase();
    return list.filter(b =>
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term) ||
      b.code.toLowerCase().includes(term) ||
      b.category.toLowerCase().includes(term)
    );
  }, [search, selectedDate, booksByDate, allBooks]);

  const selectedBooksForBarcode = selectedDate 
    ? booksByDate.find(g => g.date === selectedDate)?.items ?? []
    : [];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Code copied!");
  };

  const handleGenerateBarcodes = (date: string) => {
    const books = booksByDate.find(g => g.date === date)?.items ?? [];
    if (books.length === 0) return;
    alert(`Would generate barcodes for ${books.length} books registered on ${date}`);
  };

  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
    setModalMode("view");
    setIsDetailOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setModalMode("edit");
    setIsDetailOpen(true);
  };

  const handleSaveBook = (updatedBook: Book) => {
    console.log("Saving updated book:", updatedBook);
    alert("Book changes saved! (check console for details)");
    // In a real app: update state / call API / update mockBooks array
    setIsDetailOpen(false);
    setSelectedBook(null);
    setModalMode("view");
  };

  const getDisplayDate = (dateStr: string): string => {
    const d = parseISO(dateStr + "T00:00:00Z");
    if (isToday(d)) return "Today";
    return format(d, "MMMM d, yyyy");
  };

  const quickFilters = useMemo(() => {
    const todayGroup = booksByDate.find(g => isToday(parseISO(g.date + "T00:00:00Z")));
    const pastGroups = booksByDate.filter(g => !isToday(parseISO(g.date + "T00:00:00Z")));

    const filters = [{ date: undefined as string | undefined, label: "All Books", icon: FiClock }];

    if (todayGroup) {
      filters.push({ date: todayGroup.date, label: "Today", icon: FiCalendar });
    }

    if (pastGroups.length > 0) {
      const mostRecentPast = pastGroups[0];
      filters.push({
        date: mostRecentPast.date,
        label: getDisplayDate(mostRecentPast.date),
        icon: FiCalendar,
      });
    }

    return filters;
  }, [booksByDate]);

  return (
    <div className="p-6 md:p-8 lg:p-8 min-h-screen bg-linear-to-b from-zinc-50 to-white font-[Poppins]">
      <div className="space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-800">
            Book Registration Information
          </h1>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Date picker */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex items-center gap-4 bg-white border border-zinc-300 rounded-xl px-5 py-3 shadow-sm hover:shadow transition-all min-w-[280px]">
              <FiCalendar className="text-zinc-500" size={20} />
              <input
                type="date"
                value={selectedDate ?? ""}
                onChange={(e) => setSelectedDate(e.target.value || null)}
                className="bg-transparent outline-none text-zinc-700 w-full text-base"
              />
            </div>

            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Quick filters + Search */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="flex flex-wrap gap-4">
                  {quickFilters.map((filter) => {
                      // Determine if this filter is currently active
                      const isActive =
                      (filter.date === undefined && selectedDate === null) ||
                      filter.date === selectedDate;

                      return (
                    <button
                      key={filter.date ?? "all"}
                      onClick={() => setSelectedDate(filter.date ?? null)}
                      className={`group relative flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap shadow-sm cursor-pointer ${
                          isActive
                          ? "bg-zinc-800 text-white shadow-indigo-200/40"
                          : "bg-white border border-zinc-300 hover:border-zinc-400 hover:shadow-md text-zinc-700"
                      }`}
                      >
                      {filter.date === undefined ? (
                          <img
                          src={AllBooksIcon}
                          alt="All Books"
                          className={`w-5 h-5 transition ${
                              isActive ? "brightness-0 invert" : "opacity-50"
                          }`}
                          />
                      ) : filter.label === "Today" ? (
                          <img
                          src={TodayIcon}
                          alt="Today"
                          className={`w-5 h-5 transition ${
                              isActive ? "brightness-0 invert" : "opacity-50"
                          }`}
                          />
                      ) : (
                          <img
                          src={CalendarIcon}
                          alt="Date"
                          className={`w-5 h-5 transition ${
                              isActive ? "brightness-0 invert" : "opacity-50"
                          }`}
                          />
                      )}

                      {filter.label}

                      {filter.date && (
                          <span className="ml-1.5 px-2.5 py-1 bg-black/10 rounded-full text-xs font-medium">
                          {booksByDate.find(g => g.date === filter.date)?.items.length ?? 0}
                          </span>
                      )}
                      </button>
                      );
                  })}
              </div>

              <div className="relative w-full lg:w-96">
                  <img
                      src={SearchIcon}
                      alt="Search"
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
                  />

                  <input
                      type="text"
                      placeholder="Search title, author, code..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-12 pr-5 py-3 bg-white border border-zinc-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-base"
                  />
              </div>
          </div>
        </div>

        {/* SECTION 1: Book List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-800 flex items-center gap-2">
            Registered Books
          </h2>

          {filteredBooks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center text-zinc-500 shadow-sm">
              No books found {selectedDate ? `on ${getDisplayDate(selectedDate)}` : ""}
              {search && " matching your search"}
            </div>
          ) : (
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50/70">
                <div className="text-sm font-medium text-zinc-700">
                  {selectedDate ? (
                    <>Books registered on <span className="text-indigo-700">{getDisplayDate(selectedDate)}</span></>
                  ) : (
                    "All registered books"
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-100">
                  <thead className="bg-zinc-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Code</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-zinc-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {filteredBooks.map(book => (
                      <tr key={book.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 font-mono text-sm text-zinc-700">
                            {book.code}
                            <button
                              onClick={() => copyToClipboard(book.code)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-blue-600"
                            >
                              <FiCopy size={15} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-zinc-900">{book.title}</td>
                        <td className="px-6 py-4 text-zinc-600">{book.author}</td>
                        <td className="px-6 py-4 text-zinc-600">{book.category}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${
                              book.status === "Available" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                              book.status === "Borrowed" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {book.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-5 md:gap-6">

                            {/* View */}
                            <button
                              onClick={() => handleViewBook(book)}
                              title="View details"
                              className="group relative w-5 h-5 flex items-center justify-center rounded-md cursor-pointer"
                            >
                              <img
                                src={ViewIcon}
                                alt="View normal"
                                className="w-5 h-5 group-hover:opacity-0 transition-opacity duration-200 z-10"
                              />
                              <img
                                src={ViewIconHover}
                                alt="View hover"
                                className="w-5 h-5 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                              />
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => handleEditBook(book)}
                              title="Edit book"
                              className="group relative w-5 h-5 flex items-center justify-center rounded-md cursor-pointer"
                            >
                              <img
                                src={EditIcon}
                                alt="Edit normal"
                                className="w-5 h-5 group-hover:opacity-0 transition-opacity duration-200 z-10"
                              />
                              <img
                                src={EditIconHover}
                                alt="Edit hover"
                                className="w-5 h-5 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                              />
                            </button>

                            {/* Delete */}
                            <button
                              title="Delete book (not implemented)"
                              className="group relative w-5 h-5 flex items-center justify-center rounded-md cursor-pointer"
                            >
                              <img
                                src={DeleteIcon}
                                alt="Delete normal"
                                className="w-5 h-5 group-hover:opacity-0 transition-opacity duration-200 z-10"
                              />
                              <img
                                src={DeleteIconHover}
                                alt="Delete hover"
                                className="w-5 h-5 absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-zinc-200 text-sm text-zinc-500 flex justify-between items-center">
                <span>Showing {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""}</span>
                {selectedDate && <span className="text-indigo-600 font-medium">{getDisplayDate(selectedDate)}</span>}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: Barcode Generation */}
        {selectedDate && (
          <div className="space-y-4 pt-6 border-t border-zinc-200">
            <h2 className="text-xl font-semibold text-zinc-800 flex items-center gap-2">
              <img src={CodeIcon} alt="Barcode" className="w-5 h-5" />
              Barcode Generation – {getDisplayDate(selectedDate)}
            </h2>

            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-zinc-600">
                    {selectedBooksForBarcode.length} book{selectedBooksForBarcode.length !== 1 ? "s" : ""} registered on this date
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {format(parseISO(selectedDate), "MMMM d, yyyy")}
                  </p>
                </div>

                <button
                  onClick={() => handleGenerateBarcodes(selectedDate)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg active:scale-95 font-medium cursor-pointer"
                >
                    <img src={CodeIcon} alt="Barcode" className="w-5 h-5 invert"/>
                  Generate Barcodes for This Day
                </button>
              </div>

              {selectedBooksForBarcode.length > 0 && (
                <div className="border-t border-zinc-100 pt-4">
                  <p className="text-sm font-medium text-zinc-700 mb-3">Books to be barcoded:</p>
                  <ul className="space-y-2 text-sm text-zinc-600">
                    {selectedBooksForBarcode.map(book => (
                      <li key={book.id} className="flex justify-between">
                        <span className="font-mono">{book.code}</span>
                        <span className="text-zinc-500 truncate max-w-[60%]">{book.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
        {/* Book Detail Modal – used for both view and edit */}
        <BookDetailModal
          isOpen={isDetailOpen}
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedBook(null);
            setModalMode("view");
          }}
          book={selectedBook}
          mode={modalMode}
          onSave={handleSaveBook}
        />
    </div>
  );
}

export default BookInformation;