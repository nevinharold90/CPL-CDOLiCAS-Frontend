import { useState } from "react";
import Licas from "../../../assets/Licas.png";
import { Book } from "./../../../hooks/type";

interface CatalogNavbarProps {
  bookmarkedBooks: Book[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onOpenHistory?: () => void;
  isViewingHistory?: boolean;
}

const CatalogNavbar = ({
  bookmarkedBooks,
  bookmarkedIds,
  onToggleBookmark,
  onOpenHistory,
  isViewingHistory = false,
}: CatalogNavbarProps) => {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const user = {
    name: "Maria Santos",
    email: "maria.santos@cdo.edu.ph",
    role: "Student",
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#dce8f2] bg-white/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          <div className="w-11 h-11 flex-shrink-0">
            <img
              src={Licas}
              alt="CDO LiCAS"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg text-[#025aa7] tracking-tight">
              CDO LiCAS
            </div>
            <div className="text-xs text-gray-500">
              Library Cataloging and Information System
            </div>
          </div>
        </div>

        {/* History + Bookmarks + Account */}
        <div className="flex items-center gap-2">
          {/* Search History Button */}
          <button
            onClick={() => {
              if (onOpenHistory) onOpenHistory();
              setShowBookmarks(false);
              setShowAccount(false);
            }}
            className={`flex items-center gap-2 font-mono text-sm tracking-wider uppercase px-4 py-2.5 rounded-sm border transition-colors
              ${
                isViewingHistory
                  ? "bg-[#025aa7] border-[#025aa7] text-white"
                  : "bg-[#eaf1f8] border-[#dce8f2] text-[#3f7fb3] hover:bg-[#dce8f2]"
              }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            History
          </button>

          {/* Bookmarks */}
          <div className="relative">
            <button
              onClick={() => {
                setShowBookmarks((v) => !v);
                setShowAccount(false);
              }}
              className={`relative flex items-center gap-2 font-mono text-sm tracking-wider uppercase px-4 py-2.5 rounded-sm border transition-colors
                ${
                  showBookmarks
                    ? "bg-[#025aa7] border-[#025aa7] text-white"
                    : "bg-[#eaf1f8] border-[#dce8f2] text-[#3f7fb3] hover:bg-[#dce8f2]"
                }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              Bookmarks
              {bookmarkedIds.length > 0 && (
                <span
                  className={`ml-1 min-w-[22px] h-5 px-1.5 rounded-full text-xs font-bold flex items-center justify-center
                  ${
                    showBookmarks
                      ? "bg-white text-[#025aa7]"
                      : "bg-[#025aa7] text-white"
                  }`}
                >
                  {bookmarkedIds.length}
                </span>
              )}
            </button>

            {showBookmarks && (
              <div className="absolute right-0 mt-2 w-80 rounded-sm border border-[#dce8f2] bg-white shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-[#eaf1f8] bg-[#f7fafd]">
                  <span className="font-mono text-xs tracking-wider text-[#3f7fb3] uppercase">
                    Saved cards
                  </span>
                </div>
                {bookmarkedBooks.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <p className="font-mono text-sm text-gray-400">
                      No bookmarked books yet
                    </p>
                  </div>
                ) : (
                  <ul className="max-h-72 overflow-y-auto">
                    {bookmarkedBooks.map((book) => (
                      <li
                        key={book.id}
                        className="flex items-start gap-3 px-4 py-3.5 hover:bg-[#f7fafd] border-b border-[#eaf1f8] last:border-0"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-medium text-[#1f2a37] truncate">
                            {book.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate mt-0.5">
                            {book.author}
                          </p>
                        </div>
                        <button
                          onClick={() => onToggleBookmark(book.id)}
                          className="text-[#b3402f] hover:text-[#8a2e22] p-1"
                          title="Remove bookmark"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Account */}
          <div className="relative">
            <button
              onClick={() => {
                setShowAccount((v) => !v);
                setShowBookmarks(false);
              }}
              className={`flex items-center gap-2.5 font-mono text-sm tracking-wider uppercase px-4 py-2.5 rounded-sm border transition-colors
                ${
                  showAccount
                    ? "bg-[#025aa7] border-[#025aa7] text-white"
                    : "bg-[#eaf1f8] border-[#dce8f2] text-[#3f7fb3] hover:bg-[#dce8f2]"
                }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${
                  showAccount
                    ? "bg-white text-[#025aa7]"
                    : "bg-[#025aa7] text-white"
                }`}
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              Account
            </button>

            {showAccount && (
              <div className="absolute right-0 mt-2 w-72 rounded-sm border border-[#dce8f2] bg-white shadow-lg overflow-hidden z-50">
                <div className="px-5 py-4 border-b border-[#eaf1f8] bg-[#f7fafd]">
                  <p className="text-base font-semibold text-[#1f2a37]">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                  <span className="inline-block mt-2 font-mono text-xs tracking-wider uppercase px-2 py-1 rounded-sm bg-[#eaf1f8] text-[#3f7fb3]">
                    {user.role}
                  </span>
                </div>
                <div className="py-1.5">
                  <button className="w-full text-left px-5 py-3 text-base text-[#1f2a37] hover:bg-[#f7fafd] transition-colors">
                    My loans
                  </button>
                  <button className="w-full text-left px-5 py-3 text-base text-[#1f2a37] hover:bg-[#f7fafd] transition-colors">
                    Profile settings
                  </button>
                  <button className="w-full text-left px-5 py-3 text-base text-[#b3402f] hover:bg-[#fdf2f1] transition-colors">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CatalogNavbar;