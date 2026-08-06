import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

//icons 
import CloseIcon from "../assets/circle-xmark-1.png";
import CloseIconHover from "../assets/circle-xmark-2.png";
import DeleteIcon from "../assets/trash-1.png";
import DeleteIconHover from "../assets/trash-2.png";

interface Borrowing {
  id: number;
  borrower: string;
  email: string;
  phone: string;
  book: string;
  borrowDate: string;
  dueDate: string;
  status: "Active" | "Overdue" | "Returned";
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  borrowings: Borrowing[];
}

export default function AllBorrowingsModal({ isOpen, onClose, borrowings: initial }: Props) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [isOpen, onClose]);

  const handleDelete = (id: number) => {
    if (window.confirm("Delete this borrowing record?")) {
      setData((prev) => prev.filter((b) => b.id !== id));
    }
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
                <h2 className="text-xl font-semibold">All Book Borrowings</h2>
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
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Borrower</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Book</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Borrow Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium">{item.borrower}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{item.book}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.borrowDate}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.dueDate}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              item.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : item.status === "Overdue"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t bg-gray-50 text-right text-sm text-gray-500">
                {data.length} records shown
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}