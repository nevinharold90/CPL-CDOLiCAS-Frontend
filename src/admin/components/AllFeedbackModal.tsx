import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Icons
import CloseIcon from "../assets/circle-xmark-1.png";
import CloseIconHover from "../assets/circle-xmark-2.png";
import DeleteIcon from "../assets/trash-1.png";
import DeleteIconHover from "../assets/trash-2.png";
import StarIcon from "../assets/star.png";

import { motion, AnimatePresence } from "framer-motion";

interface FeedbackItem {
  id: number;
  name: string;
  email: string;
  feedback: string;
  rating: number;
  date: string;
}

interface AllFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedbacks: FeedbackItem[];
}

export default function AllFeedbackModal({
  isOpen,
  onClose,
  feedbacks: initialFeedbacks,
}: AllFeedbackModalProps) {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(feedbacks.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [feedbacks.length, currentPage, totalPages]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this feedback?")) {
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const paginatedFeedbacks = feedbacks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={StarIcon}  // or use two images: filled vs empty
        alt={i < rating ? "filled star" : "empty star"}
        className={`w-5 h-5 ${i < rating ? "" : "opacity-40 grayscale"}`}
      />
    ));

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

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
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900">All Client Feedback</h2>
                <button
                    onClick={onClose}
                    className="rounded-full transition-colors group cursor-pointer"
                    aria-label="Close modal"
                  >
                    {/* Normal state icon */}
                    <img
                      src={CloseIcon}
                      alt="Close"
                      className="w-5 h-5 group-hover:hidden"
                    />
                    
                    {/* Hover state icon */}
                    <img
                      src={CloseIconHover}           // ← your second icon here
                      alt="Close (hover)"
                      className="w-5 h-5 hidden group-hover:block"
                    />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Feedback</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedFeedbacks.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-2xl break-words">
                          {item.feedback}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex">{renderStars(item.rating)}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                        <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-800 transition-colors group cursor-pointer"
                              title="Delete borrowing record"
                              aria-label="Delete record"
                            >
                              <img
                                src={DeleteIcon}
                                alt="Delete"
                                className="w-5 h-5 group-hover:hidden"
                              />
                              <img
                                src={DeleteIconHover}
                                alt="Delete on hover"
                                className="w-5 h-5 hidden group-hover:block"
                              />
                            </button>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {paginatedFeedbacks.length === 0 && feedbacks.length > 0 && (
                  <div className="text-center py-10 text-gray-500">
                    No feedback on this page (data may have been deleted)
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                <div>
                  Showing {paginatedFeedbacks.length} of {feedbacks.length} feedback records
                </div>

                {feedbacks.length >= 10 && totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}