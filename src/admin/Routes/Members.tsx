// src/pages/Members.tsx
import Layout from "../components/Layout";
import BorrowedBooksModal from "../components/BorrowedBooksModal";
import React, { useState, useMemo } from "react";
import { 
  FiSearch, FiUser, FiBookOpen, FiCheckCircle, FiXCircle, 
  FiPhone, FiMail, FiCalendar, FiMapPin, FiAlertTriangle 
} from "react-icons/fi";

// icons
import SearchIcon from "../assets/search.png"

type Member = {
  id: string;
  name: string;
  memberId: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  gender: "Male" | "Female" | "Other" | string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  status: "Active" | "Inactive";
  borrowedBooks: number;
  registeredAt: string; // format: "YYYY-MM-DD"
  borrowedBookDetails?: Array<{
    title: string;
    author: string;
    isbn?: string;
    borrowDate: string;
    dueDate: string;
  }>;
};

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Juan Dela Cruz",
    memberId: "MEM-0001",
    email: "juan@example.com",
    phone: "0912 345 6789",
    address: "Blk 12 Lot 5, Xavier Heights, Cagayan de Oro City",
    birthDate: "1995-06-15",
    gender: "Male",
    emergencyContactName: "Maria Dela Cruz",
    emergencyContactPhone: "0998 765 4321",
    status: "Active",
    borrowedBooks: 2,
    registeredAt: "2025-03-10",
    borrowedBookDetails: [
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        borrowDate: "2025-03-05",
        dueDate: "2025-04-05",
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt, David Thomas",
        borrowDate: "2025-02-28",
        dueDate: "2025-03-28",
      },
    ],
  },
  {
    id: "2",
    name: "Maria Santos",
    memberId: "MEM-0002",
    email: "maria@example.com",
    phone: "0998 765 4321",
    address: "Purok 7, Bulua, Cagayan de Oro City",
    birthDate: "1998-11-22",
    gender: "Female",
    emergencyContactName: "Pedro Santos",
    emergencyContactPhone: "0917 123 4567",
    status: "Inactive",
    borrowedBooks: 0,
    registeredAt: "2025-02-28",
  },  
];

const ITEMS_PER_PAGE = 10;

const Members = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, dateFilter]);

  const filteredMembers = useMemo(() => {
    return mockMembers.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.memberId.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || m.status === statusFilter;

      const matchesDate =
        !dateFilter || m.registeredAt === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [search, statusFilter, dateFilter]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Helper: Calculate validity (1 year from registeredAt)
  const getValidityDate = (registered: string): string => {
    if (!registered) return "—";
    const date = new Date(registered);
    date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split("T")[0];
  };

  return (
      <div className="p-6 md:p-8 lg:p-8 min-h-screen bg-gradient-to-b from-zinc-50 to-white font-[Poppins]"> 
        {/* Header + Filters */}
        <div className="mb-8 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 tracking-tight">
              Library Members
            </h1>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-zinc-700">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="border border-zinc-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-zinc-700">Registered on:</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border border-zinc-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter("")}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Clear
                  </button>
                )}
              </div> 
            </div>
            
            <div className="relative w-full lg:w-96">
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60"
              />

              <input
                type="text"
                placeholder="Search name, member ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-5 py-3 bg-white border border-zinc-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all text-base"
              />
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {paginatedMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white border border-zinc-200/80 rounded-2xl shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-300 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-600/5 to-purple-600/5 px-6 py-4 border-b border-zinc-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-700 shadow-sm">
                      <FiUser size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-zinc-800 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-mono text-indigo-600 tracking-wide mt-0.5">
                        {member.memberId}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
                      member.status === "Active"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-rose-100 text-rose-800 border border-rose-200"
                    }`}
                  >
                    {member.status === "Active" ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
                    {member.status}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3.5 text-sm">
                <div className="grid grid-cols-[110px,1fr] gap-x-3 gap-y-2.5 text-zinc-700">
                  <div className="font-medium text-zinc-600 flex items-center gap-2">
                    <FiCalendar size={15} /> Validity
                  </div>
                  <div className="font-medium text-emerald-700">
                    {getValidityDate(member.registeredAt)}
                  </div>

                  <div className="font-medium text-zinc-600 flex items-center gap-2">
                    <FiCalendar size={15} /> Registered
                  </div>
                  <div>{member.registeredAt}</div>

                  <div className="font-medium text-zinc-600 flex items-center gap-2">
                    <FiUser size={15} /> Gender
                  </div>
                  <div>{member.gender}</div>

                  <div className="font-medium text-zinc-600 flex items-center gap-2">
                    <FiMapPin size={15} /> Address
                  </div>
                  <div className="leading-snug">{member.address}</div>

                  <div className="font-medium text-zinc-600 flex items-center gap-2">
                    <FiMail size={15} /> Email
                  </div>
                  <div className="break-all">{member.email}</div>

                  <div className="font-medium text-zinc-600 flex items-center gap-2">
                    <FiPhone size={15} /> Phone
                  </div>
                  <div>{member.phone}</div>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                  <div className="flex items-center gap-2 text-rose-700 font-semibold mb-2.5 text-sm">
                    <FiAlertTriangle size={16} />
                    <span>IN CASE OF EMERGENCY</span>
                  </div>
                  <div className="grid grid-cols-[110px,1fr] gap-x-3 gap-y-1.5 text-sm text-zinc-700">
                    <div className="font-medium text-zinc-600">Contact Person</div>
                    <div>{member.emergencyContactName}</div>

                    <div className="font-medium text-zinc-600">Contact No.</div>
                    <div className="font-medium">{member.emergencyContactPhone}</div>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="w-full py-2.5 cursor-pointer bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-lg border border-indigo-200 transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={member.borrowedBooks === 0}
                  >
                    <FiBookOpen size={16} />
                    View Borrowed Books ({member.borrowedBooks})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredMembers.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
            <div>
              Showing <strong>{startIndex + 1}</strong>–<strong>{Math.min(startIndex + ITEMS_PER_PAGE, filteredMembers.length)}</strong> of{" "}
              <strong>{filteredMembers.length}</strong> members
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Previous
              </button>

              <span className="px-3 py-2 font-medium">
                Page {currentPage} of {totalPages || 1}
              </span>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}

          {filteredMembers.length === 0 && (
            <div className="mt-20 text-center text-zinc-500 text-lg">
              No members match the current filters.
            </div>
          )}
          <BorrowedBooksModal
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          member={selectedMember}
          />
      </div>
  );
};

export default Members;