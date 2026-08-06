import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO } from "date-fns";
import { FiCode, FiSave, FiX } from "react-icons/fi";

import CloseIcon from "../assets/circle-xmark-1.png";
import CloseIconHover from "../assets/circle-xmark-2.png";

interface Book {
  id: string;
  code: string;
  title: string;
  author: string;
  isbn?: string;
  category: string;
  status: "Available" | "Borrowed" | "Reserved";
  registeredAt: string;
}

interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  mode?: "view" | "edit";
  onSave?: (updatedBook: Book) => void;
}

export default function BookDetailModal({
  isOpen,
  onClose,
  book,
  mode = "view",
  onSave,
}: BookDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Book | null>(null);

  useEffect(() => {
    if (isOpen && book) {
      setFormData({ ...book });
    }
  }, [isOpen, book]);

  useEffect(() => {
    if (!isOpen) {
      setFormData(null);
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev ? { ...prev, [name]: value } : null
    );
  };

  const handleSave = () => {
    if (formData && onSave) {
      onSave(formData);
    }
    onClose();
  };

  if (!book || !isOpen) return null;

  const isEditMode = mode === "edit";
  const displayData = isEditMode && formData ? formData : book;

  const formattedDate = format(parseISO(book.registeredAt), "MMMM d, yyyy • h:mm a");

  const statusColor = {
    Available: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Borrowed: "bg-amber-100 text-amber-800 border-amber-200",
    Reserved: "bg-rose-100 text-rose-800 border-rose-200",
  }[book.status];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none font-[Poppins]">
            <motion.div
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.75, opacity: 0 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden pointer-events-auto border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/80">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEditMode ? "Edit Book" : "Book Details"}
                </h2>
                <button
                  onClick={onClose}
                  className="rounded-full transition-colors group cursor-pointer p-1 hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <img
                    src={CloseIcon}
                    alt="Close"
                    className="w-6 h-6 group-hover:hidden"
                  />
                  <img
                    src={CloseIconHover}
                    alt="Close hover"
                    className="w-6 h-6 hidden group-hover:block"
                  />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Code / Accession No.</label>
                      {isEditMode ? (
                        <input
                          name="code"
                          value={displayData.code}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-lg font-mono font-medium text-gray-900">{displayData.code}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500">Status</label>
                      {isEditMode ? (
                        <select
                          name="status"
                          value={displayData.status}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="Available">Available</option>
                          <option value="Borrowed">Borrowed</option>
                          <option value="Reserved">Reserved</option>
                        </select>
                      ) : (
                        <div className="mt-1">
                          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${statusColor}`}>
                            {displayData.status}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500">Title</label>
                      {isEditMode ? (
                        <input
                          name="title"
                          value={displayData.title}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-xl font-semibold text-gray-900">{displayData.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500">Author</label>
                      {isEditMode ? (
                        <input
                          name="author"
                          value={displayData.author}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-base text-gray-800">{displayData.author}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500">Category</label>
                      {isEditMode ? (
                        <input
                          name="category"
                          value={displayData.category}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-base text-gray-800">{displayData.category}</p>
                      )}
                    </div>

                    {book.isbn !== undefined && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-500">ISBN</label>
                        {isEditMode ? (
                          <input
                            name="isbn"
                            value={displayData.isbn ?? ""}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        ) : (
                          <p className="mt-1 font-mono text-gray-800">{displayData.isbn}</p>
                        )}
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500">Registered At</label>
                      <p className="mt-1 text-gray-700">{formattedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Sample Barcode Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiCode className="text-indigo-600" />
                    Sample Barcode
                  </h3>

                  <div className="flex flex-col items-center justify-center bg-white border border-gray-300 rounded-lg p-6 shadow-inner">
                    <img
                      src="https://via.placeholder.com/300x100/000000/FFFFFF?text=BARCODE+EXAMPLE+%7C+"
                      alt={`Sample barcode for ${book.code}`}
                      className="max-w-full h-auto mb-4"
                    />

                    <p className="text-sm text-gray-600 text-center">
                      This is a preview/sample barcode for book code: <strong>{book.code}</strong>
                    </p>

                    <p className="text-xs text-gray-500 mt-2 italic">
                      In a real system, this would be generated using JsBarcode or a backend service.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Information</h3>
                  <p className="text-gray-600">
                    No additional details available in this demo.
                  </p>
                </div>
              </div>

              {/* Footer – conditional buttons */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Book ID: {book.id} • Last updated: {new Date().toLocaleDateString()}
                </div>

                <div className="flex gap-3">
                 <div className="flex gap-3">
                    {isEditMode && (
                        <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                        >
                        <FiX size={16} />
                        Cancel
                        </button>
                    )}
                    {isEditMode ? (
                        <button
                        onClick={handleSave}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-sm"
                        >
                        <FiSave size={16} />
                        Save Changes
                        </button>
                    ) : null}  
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}