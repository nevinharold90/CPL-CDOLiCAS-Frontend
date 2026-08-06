// src/Routes/Dashboard.tsx
import { useState, Suspense, lazy } from "react";
// Icons
import VisitIcon from "../assets/people.png";
import FeedbackIcon from "../assets/feedback.png";
import BooksIcon from "../assets/book.png";
import BorrowIcon from "../assets/books.png";
import MembersIcon from "../assets/membership.png";
import StarIcon from "../assets/star.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Lazy load the modals (code splitting + only load when needed)
const AllTrendsModal = lazy(() => import("../components/AllTrendsModal"));
const AllBorrowingsModal = lazy(() => import("../components/AllBorrowingsModal"));
const AllFeedbackModal = lazy(() => import("../components/AllFeedbackModal"));

// ───────────────────────────────────────────────
// Short preview for main dashboard (feedback table)
const recentFeedbacksPreview = [
  {
    id: 1,
    name: "Maria Santos",
    feedback: "The borrowing process was smooth and fast. Great selection of books!",
    rating: 5,
    date: "Mar 10, 2026",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    feedback: "Some books are outdated. Please add more recent titles in programming.",
    rating: 3,
    date: "Mar 8, 2026",
  },
  {
    id: 3,
    name: "Ana Reyes",
    feedback: "Love the quiet reading area. Will come back again soon.",
    rating: 5,
    date: "Mar 5, 2026",
  },
];

// Full feedback data (with email) – passed to modal
const allFeedbackData = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    feedback: "The borrowing process was smooth and fast. Great selection of books!",
    rating: 5,
    date: "Mar 10, 2026",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    email: "juan.delacruz@email.com",
    feedback: "Some books are outdated. Please add more recent titles in programming.",
    rating: 3,
    date: "Mar 8, 2026",
  },
  {
    id: 3,
    name: "Ana Reyes",
    email: "ana.reyes@email.com",
    feedback: "Love the quiet reading area. Will come back again soon.",
    rating: 5,
    date: "Mar 5, 2026",
  },
  {
    id: 4,
    name: "Pedro Lim",
    email: "pedro.lim@email.com",
    feedback: "App is very user-friendly. Easy to search and reserve books.",
    rating: 4,
    date: "Mar 3, 2026",
  },
  {
    id: 5,
    name: "Liza Tan",
    email: "liza.tan@email.com",
    feedback: "Membership renewal was confusing at first, but staff helped quickly.",
    rating: 4,
    date: "Feb 28, 2026",
  },
];

// Short preview for borrowings table
const recentBorrowingsPreview = [
  {
    id: 1,
    borrower: "Juan Dela Cruz",
    book: "Clean Code - Robert C. Martin",
    borrowDate: "Mar 5, 2026",
    dueDate: "Mar 19, 2026",
    status: "Active",
  },
  {
    id: 2,
    borrower: "Maria Santos",
    book: "The Pragmatic Programmer",
    borrowDate: "Mar 3, 2026",
    dueDate: "Mar 17, 2026",
    status: "Active",
  },
  {
    id: 3,
    borrower: "Ana Reyes",
    book: "Atomic Habits - James Clear",
    borrowDate: "Feb 28, 2026",
    dueDate: "Mar 14, 2026",
    status: "Active",
  },
];

// Full borrowings data (with email & phone)
const allBorrowingsData = [
  {
    id: 1,
    borrower: "Juan Dela Cruz",
    email: "juan.delacruz@email.com",
    phone: "+63 912 345 6789",
    book: "Clean Code - Robert C. Martin",
    borrowDate: "Mar 5, 2026",
    dueDate: "Mar 19, 2026",
    status: "Active" as const,
  },
  {
    id: 2,
    borrower: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "+63 917 555 1234",
    book: "The Pragmatic Programmer",
    borrowDate: "Mar 3, 2026",
    dueDate: "Mar 17, 2026",
    status: "Active" as const,
  },
  {
    id: 3,
    borrower: "Ana Reyes",
    email: "ana.reyes@email.com",
    phone: "+63 922 888 7766",
    book: "Atomic Habits - James Clear",
    borrowDate: "Feb 28, 2026",
    dueDate: "Mar 14, 2026",
    status: "Active" as const,
  },
  {
    id: 4,
    borrower: "Pedro Lim",
    email: "pedro.lim@email.com",
    phone: "+63 915 222 3344",
    book: "Designing Data-Intensive Applications",
    borrowDate: "Feb 25, 2026",
    dueDate: "Mar 11, 2026",
    status: "Overdue" as const,
  },
  {
    id: 5,
    borrower: "Liza Tan",
    email: "liza.tan@email.com",
    phone: "+63 918 777 1122",
    book: "You Don't Know JS Yet",
    borrowDate: "Feb 20, 2026",
    dueDate: "Mar 6, 2026",
    status: "Returned" as const,
  },
];

const COLORS = {
  blue: "#3b82f6",
  emerald: "#10b981",
  violet: "#8b5cf6",
  amber: "#f59e0b",
  rose: "#ec4899",
};

function Dashboard() {
  const stats = [
  {
    title: "Total Visits",
    value: 1245,
    icon: <img src={VisitIcon} alt="Total Visits" className="w-8 h-8" />,
    color: "blue",
  },
  {
    title: "Client Feedback",
    value: 87,
    icon: <img src={FeedbackIcon} alt="Client Feedback" className="w-8 h-8" />,
    color: "emerald",
  },
  {
    title: "Total Books",
    value: 320,
    icon: <img src={BooksIcon} alt="Total Books" className="w-8 h-8" />,
    color: "violet",
  },
  {
    title: "Borrowed Books",
    value: 123,
    icon: <img src={BorrowIcon} alt="Borrowed Books" className="w-8 h-8" />,
    color: "amber",
  },
  {
    title: "Active Memberships",
    value: 56,
    icon: <img src={MembersIcon} alt="Active Memberships" className="w-8 h-8" />,
    color: "rose",
  },
];

  const [showTrendsModal, setShowTrendsModal] = useState(false);
  const [showBorrowingsModal, setShowBorrowingsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const chartDataForModal = stats.map((stat) => ({
    title: stat.title,
    color: stat.color,
    currentValue: stat.value,
  }));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={StarIcon}  // or use two images: filled vs empty
        alt={i < rating ? "filled star" : "empty star"}
        className={`w-5 h-5 ${i < rating ? "" : "opacity-40 grayscale"}`}
      />
    ));
  };

  return (
      <div className="p-6 md:p-8 lg:p-8 min-h-screen bg-linear-to-b from-zinc-50 to-white font-[Poppins]">
        <div className="">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 mb-10">
            Dashboard Overview
          </h1>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 md:gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`
                  group bg-white border border-zinc-100 
                  rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 
                  transition-all duration-300 overflow-hidden
                  flex items-center gap-2 p-5 md:p-6 relative
                `}
              >
                <div
                className={`
                  shrink-0 w-14 h-14 rounded-xl flex items-center justify-center mr-2
                  transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3
                `}
              >
                {stat.icon}
              </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-500 tracking-wide uppercase mb-1">
                    {stat.title}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">
                    {stat.value.toLocaleString()}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Trends */}
          <div className="mt-6 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-zinc-800">Monthly Trends</h2>
              <button
                onClick={() => setShowTrendsModal(true)}
                className="px-4 py-2 bg-zinc-800 text-white text-sm font-medium rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                Show all charts
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stats.slice(0, 2).map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border border-zinc-200 rounded-xl shadow-sm p-5 md:p-6"
                >
                  <h3 className="text-lg font-semibold text-zinc-800 mb-4">
                    {stat.title}
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { label: "Week 1", value: stat.value * 0.6 },
                          { label: "Week 2", value: stat.value * 0.75 },
                          { label: "Week 3", value: stat.value * 0.9 },
                          { label: "Week 4", value: stat.value },
                        ]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                      >
                        <XAxis dataKey="label" axisLine={{ stroke: "#d1d5db" }} tick={{ fill: "#6b7280", fontSize: 12 }} />
                        <YAxis axisLine={{ stroke: "#d1d5db" }} tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={(val) => val.toLocaleString()} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={COLORS[stat.color as keyof typeof COLORS]}
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: "white" }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Book Borrowings – preview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-800 mb-6">
              Recent Book Borrowings
            </h2>

            <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200">
                  <thead className="bg-zinc-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                        Borrower
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                        Book Title
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                        Borrow Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                        Due Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {recentBorrowingsPreview.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900">
                          {item.borrower}
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-700 max-w-md">
                          {item.book}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                          {item.borrowDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                          {item.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                              item.status === "Active"
                                ? "bg-emerald-100 text-emerald-800"
                                : item.status === "Overdue"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-zinc-100 text-zinc-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-zinc-200 text-right">
                <button
                  onClick={() => setShowBorrowingsModal(true)}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  View all borrowings →
                </button>
              </div>
            </div>
          </div>

          {/* Recent Client Feedback – preview */}
          <div>
            <h2 className="text-2xl font-bold text-zinc-800 mb-6">
              Recent Client Feedback
            </h2>

            <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-200">
                  <thead className="bg-zinc-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                        Feedback
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {recentFeedbacksPreview.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-zinc-600 max-w-md">
                          {item.feedback.length > 120
                            ? `${item.feedback.substring(0, 117)}...`
                            : item.feedback}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">{renderStars(item.rating)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                          {item.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-zinc-200 text-right">
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  View all feedback →
                </button>
              </div>
            </div>
          </div>
        </div>
         {/* All modals – wrapped in Suspense */}
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          }
        >
          {showTrendsModal && (
            <AllTrendsModal
              isOpen={showTrendsModal}
              onClose={() => setShowTrendsModal(false)}
              chartData={chartDataForModal}
            />
          )}

          {showBorrowingsModal && (
            <AllBorrowingsModal
              isOpen={showBorrowingsModal}
              onClose={() => setShowBorrowingsModal(false)}
              borrowings={allBorrowingsData}
            />
          )}

          {showFeedbackModal && (
            <AllFeedbackModal
              isOpen={showFeedbackModal}
              onClose={() => setShowFeedbackModal(false)}
              feedbacks={allFeedbackData}
            />
          )}
        </Suspense>
    </div>
  );
}

export default Dashboard;