// src/components/BorrowedBooksModal.tsx
import { AnimatePresence, motion } from "framer-motion";
import { format, parseISO, isPast } from "date-fns";
import { FiBookOpen } from "react-icons/fi";

import CloseIcon from "../assets/circle-xmark-1.png";
import CloseIconHover from "../assets/circle-xmark-2.png";

interface BorrowedBook {
  title: string;
  author: string;
  isbn?: string;
  borrowDate: string; // YYYY-MM-DD
  dueDate: string;   // YYYY-MM-DD
}

interface Member {
  name: string;
  memberId: string;
  borrowedBooks: number;
  borrowedBookDetails?: BorrowedBook[];
}

interface BorrowedBooksModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

export default function BorrowedBooksModal({
  isOpen,
  onClose,
  member,
}: BorrowedBooksModalProps) {
  if (!isOpen || !member) return null;

  const hasBooks = member.borrowedBooks > 0 && 
                   member.borrowedBookDetails && 
                   member.borrowedBookDetails.length > 0;

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
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Borrowed Books
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {member.name} • {member.memberId}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-full transition-colors group cursor-pointer p-1 hover:bg-gray-100"
                  aria-label="Close modal"
                >
                  <img
                    src={CloseIcon}
                    alt="Close"
                    className="w-7 h-7 group-hover:hidden"
                  />
                  <img
                    src={CloseIconHover}
                    alt="Close hover"
                    className="w-7 h-7 hidden group-hover:block"
                  />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {!hasBooks ? (
                  <div className="text-center py-16 text-gray-500 bg-gray-50/60 rounded-xl border border-gray-200">
                    <FiBookOpen className="mx-auto text-5xl text-gray-300 mb-4" />
                    <p className="text-lg font-medium">No books currently borrowed</p>
                    <p className="text-sm mt-2">
                      This member has returned all books or has none borrowed.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {member.borrowedBookDetails!.map((book, index) => {
                      const isOverdue = isPast(parseISO(book.dueDate));

                      return (
                        <div
                          key={index}
                          className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900">
                                {book.title}
                              </h4>
                              <p className="text-base text-gray-700 mt-1">
                                by {book.author}
                              </p>
                              {book.isbn && (
                                <p className="text-sm text-gray-500 font-mono mt-1">
                                  ISBN: {book.isbn}
                                </p>
                              )}
                            </div>

                            <span
                              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${
                                isOverdue
                                  ? "bg-rose-100 text-rose-800 border-rose-200"
                                  : "bg-emerald-100 text-emerald-800 border-emerald-200"
                              }`}
                            >
                              {isOverdue ? "Overdue" : "Borrowed"}
                            </span>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600 border-t border-gray-200 pt-4">
                            <div>
                              <span className="font-medium text-gray-700">Borrowed:</span><br />
                              {format(parseISO(book.borrowDate), "MMM d, yyyy")}
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Due Date:</span><br />
                              <span className={isOverdue ? "text-rose-700 font-medium" : ""}>
                                {format(parseISO(book.dueDate), "MMM d, yyyy")}
                              </span>
                              {isOverdue && (
                                <span className="ml-2 text-xs text-rose-600">(overdue)</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-sm">
                <div className="text-gray-500">
                  Member ID: {member.memberId} • {member.borrowedBooks} book
                  {member.borrowedBooks !== 1 ? "s" : ""} borrowed
                </div>

                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}