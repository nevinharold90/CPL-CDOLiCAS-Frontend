// src/Routes/BookList.tsx

import { useState, useMemo, useRef, useEffect } from "react";
import { FiCopy, FiCalendar } from "react-icons/fi";
import JsBarcode from "jsbarcode";
import SearchIcon from "../assets/search.png";
import CodeIcon from "../assets/code.png";
import PrintIcon from "../assets/print.png";
import BackIcon from "../assets/back.png";
import CalendarIcon from "../assets/calendar.png";

import { useNavigate } from 'react-router-dom';

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
    isbn: "978-0201616224",
    category: "Programming",
    status: "Borrowed",
    registeredAt: "2026-03-12T11:40:00Z",
  },
  {
    id: "3",
    code: "LIB-202603-0003",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "978-0735211292",
    category: "Self-Help",
    status: "Available",
    registeredAt: "2026-03-13T08:22:10Z",
  },
];

function BookList() {
  const [viewMode, setViewMode] = useState<"list" | "barcode">("list");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const navigate = useNavigate();

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  const categories = Array.from(new Set(mockBooks.map((b) => b.category)));

  const filteredBooks = useMemo(() => {
    let books = mockBooks;

    if (search.trim()) {
      const term = search.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(term) ||
          b.author.toLowerCase().includes(term) ||
          b.code.toLowerCase().includes(term) ||
          (b.isbn && b.isbn.toLowerCase().includes(term)) ||
          b.category.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      books = books.filter((b) => b.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      books = books.filter((b) => b.category === categoryFilter);
    }

    return books;
  }, [search, statusFilter, categoryFilter]);

  const barcodeBooks = useMemo(() => {
    let books = filteredBooks;

    if (selectedDate) {
      books = books.filter((b) => {
        const bookDate = new Date(b.registeredAt)
          .toISOString()
          .split("T")[0];
        return bookDate === selectedDate;
      });
    }

    return books;
  }, [filteredBooks, selectedDate]);

  useEffect(() => {
    if (viewMode !== "barcode" || barcodeBooks.length === 0) return;

    barcodeBooks.forEach((book, idx) => {
      const canvas = canvasRefs.current[idx];
      if (canvas) {
        JsBarcode(canvas, book.code, {
          format: "CODE128",
          width: 2.3,
          height: 90,
          fontSize: 18,
          displayValue: true,
          textAlign: "center",
          margin: 15,
        });
      }
    });
  }, [viewMode, barcodeBooks]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Code copied!");
  };

  const handleRegisterBook = () => {
    console.log("Registering book.");
    navigate('/book-list/book-registration'); // Navigate to the book registration page
  };

  const startBarcodeGeneration = () => {
    setViewMode("barcode");
  };

  const backToList = () => {
    setViewMode("list");
    setSelectedDate(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const availableCount = filteredBooks.filter(
    (b) => b.status === "Available"
  ).length;
  const borrowedCount = filteredBooks.filter(
    (b) => b.status === "Borrowed"
  ).length;
  const reservedCount = filteredBooks.filter(
    (b) => b.status === "Reserved"
  ).length;

  return (
      <div className="p-6 md:p-8 lg:p-8 min-h-screen bg-linear-to-b from-zinc-50 to-white font-[Poppins]">
        <div className="space-y-5">

          <h1 className="text-3xl md:text-4xl font-bold text-zinc-800">
            Book List
          </h1>

          {/* SEARCH */}
          <div className="space-y-5">
            <div className="relative max-w-xl">
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
              />
              <input
                type="text"
                placeholder="Search by title, author, code, ISBN, category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-5 py-3 bg-white border border-zinc-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-zinc-300 rounded-lg bg-white text-sm"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Reserved">Reserved</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-zinc-300 rounded-lg bg-white text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <button
                onClick={startBarcodeGeneration}
                className="flex items-center cursor-pointer gap-3 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all"
              >
                <img src={CodeIcon} className="w-5 h-5 invert" alt="Barcode" />
                Generate Barcodes
              </button>
              <button 
                onClick={() => handleRegisterBook()}
                className="ml-auto cursor-pointer gap-3 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all"
              >
                Register Books
              </button>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="flex flex-wrap gap-6 text-sm text-zinc-600">
            <span>Total: {filteredBooks.length}</span>
            <span>Available: {availableCount}</span>
            <span>Borrowed: {borrowedCount}</span>
            <span>Reserved: {reservedCount}</span>
          </div>

          {/* LIST VIEW */}
          {viewMode === "list" && (
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-100">
                  <thead className="bg-zinc-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        ISBN
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                        Registered
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-zinc-100">
                    {filteredBooks.map((book) => (
                      <tr key={book.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="px-6 py-4 font-mono text-sm">
                          <div className="flex items-center gap-2 group">
                            {book.code}
                            <button
                              onClick={() => copyToClipboard(book.code)}
                              className="opacity-0 group-hover:opacity-100 transition"
                            >
                              <FiCopy size={14} />
                            </button>
                          </div>
                        </td>

                        <td className="px-6 py-4 font-medium text-zinc-900">
                          {book.title}
                        </td>

                        <td className="px-6 py-4 text-zinc-600">
                          {book.author}
                        </td>

                        <td className="px-6 py-4 font-mono text-sm text-zinc-600">
                          {book.isbn || "—"}
                        </td>

                        <td className="px-6 py-4 text-zinc-600">{book.category}</td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              book.status === "Available"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : book.status === "Borrowed"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : "bg-rose-100 text-rose-800 border border-rose-200"
                            }`}
                          >
                            {book.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-zinc-600">
                          {formatDate(book.registeredAt)}
                        </td>
                      </tr>
                    ))}

                    {filteredBooks.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center py-10 text-zinc-500"
                        >
                          No books found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* BARCODE VIEW – FIXED OVERLAP */}
          {viewMode === "barcode" && (
            <div className="space-y-6 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm min-h-[60vh] overflow-y-auto max-h-[80vh]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-100">
                <h2 className="text-xl font-bold text-zinc-800 flex items-center gap-3">
                  <img src={CodeIcon} alt="Barcode" className="w-6 h-6" />
                  Barcode Generator
                </h2>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={backToList}
                    className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-zinc-200 hover:bg-zinc-300 rounded-lg text-sm font-medium transition"
                  >
                    <img src={BackIcon} className="w-5 h-5" alt="Back" />
                    Back
                  </button>

                  <button
                    onClick={handlePrint}
                    className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition"
                  >
                    <img src={PrintIcon} className="w-5 h-5 invert" alt="Print" />
                    Print
                  </button>
                </div>
              </div>

              {/* Date filter – only in barcode view */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <label className="text-sm font-medium text-zinc-700 flex items-center gap-2 whitespace-nowrap">
                  <img src={CalendarIcon} alt="Calendar" className="w-5 h-5" />
                  Filter by registration date:
                </label>
                <div className="flex items-center cursor-pointer gap-3 bg-white border border-zinc-300 rounded-xl px-4 py-2.5 shadow-sm min-w-[240px]">
                  <input
                    type="date"
                    value={selectedDate ?? ""}
                    onChange={(e) => setSelectedDate(e.target.value || null)}
                    className="bg-transparent outline-none text-zinc-700 w-full text-sm cursor-pointer"
                  />
                </div>

                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-sm cursor-pointer text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Barcode grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {barcodeBooks.map((book, idx) => (
                  <div
                    key={book.id}
                    className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 text-center shadow-sm min-h-[220px] flex flex-col justify-between"
                  >
                    <div className="font-semibold text-zinc-800 text-base mb-3 line-clamp-2">
                      {book.title}
                    </div>

                    <div className="flex-grow flex items-center justify-center">
                      <canvas
                        ref={(el) => { canvasRefs.current[idx] = el; }}
                        className="w-full max-w-[300px] mx-auto"
                      />
                    </div>

                    <div className="mt-3 font-mono text-sm text-zinc-700">
                      {book.code}
                    </div>
                  </div>
                ))}
              </div>

              {barcodeBooks.length === 0 && (
                <div className="text-center py-16 text-zinc-500 text-lg">
                  No books match the selected filters.
                </div>
              )}
            </div>
          )}

        </div>
      </div>
  );
}

export default BookList;