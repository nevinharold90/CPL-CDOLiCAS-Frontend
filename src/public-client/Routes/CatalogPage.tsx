import { useState, useMemo } from "react";
import CatalogNavbar from "../Routes/Sections/CatalogSection/CatalogNavbar";
import CatalogHeader from "../Routes/Sections/CatalogSection/CatalogHeader";
import CatalogResults, { SearchHistoryItem } from "../Routes/Sections/CatalogSection/CatalogResults";
import CatalogFooter from "../Routes/Sections/CatalogSection/CatalogFooter";
import { PLACEHOLDER_BOOKS } from "../hooks/constants";

const ITEMS_PER_PAGE = 20;

const CatalogPage = () => {
  const [query, setQuery] = useState("");
  const [searchScope, setSearchScope] = useState("catalog");
  const [activeRange, setActiveRange] = useState<string | null>(null);
  
  const [bookmarkQuery, setBookmarkQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["1"]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Navigation & History State
  const [isViewingHistory, setIsViewingHistory] = useState(false);
  const [searchHistoryList, setSearchHistoryList] = useState<SearchHistoryItem[]>([
    { id: "1", date: "25/08/2026 13:18", search: "science", resultsCount: 760, type: "Catalog" },
    { id: "2", date: "25/08/2026 12:26", search: "technology", resultsCount: 420, type: "Catalog" },
  ]);
  
  // Sort state matching the dropdown menu options
  const [sortBy, setSortBy] = useState("relevance");

  const bookmarkedBooks = useMemo(
    () => PLACEHOLDER_BOOKS.filter((b) => bookmarkedIds.includes(b.id)),
    [bookmarkedIds]
  );

  const isSearching = query.trim().length > 0 || activeRange !== null;

  // 1. Filtering logic
  const filteredBooks = useMemo(() => {
    if (!isSearching) {
      const q = bookmarkQuery.toLowerCase().trim();
      if (!q) return bookmarkedBooks;
      return bookmarkedBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.category.toLowerCase().includes(q) ||
          book.callNumber.toLowerCase().includes(q)
      );
    } else {
      return PLACEHOLDER_BOOKS.filter((book) => {
        const q = query.toLowerCase().trim();
        const matchesQuery =
          q === "" ||
          (() => {
            switch (searchScope) {
              case "title":
                return book.title.toLowerCase().includes(q);
              case "author":
                return book.author.toLowerCase().includes(q);
              case "subject":
                return book.category.toLowerCase().includes(q);
              case "call_number":
                return book.callNumber.toLowerCase().includes(q);
              default:
                return (
                  book.title.toLowerCase().includes(q) ||
                  book.author.toLowerCase().includes(q) ||
                  book.category.toLowerCase().includes(q) ||
                  book.callNumber.toLowerCase().includes(q)
                );
            }
          })();

        const matchesRange =
          !activeRange ||
          (() => {
            const letter = book.title[0].toUpperCase();
            const [start, end] = activeRange.replace("–", "-").split("-");
            return letter >= start && letter <= end;
          })();

        return matchesQuery && matchesRange;
      });
    }
  }, [isSearching, bookmarkQuery, bookmarkedBooks, query, searchScope, activeRange]);

  // 2. Sorting logic based on the dropdown selections
  const sortedAndDisplayedBooks = useMemo(() => {
    const list = [...filteredBooks];
    switch (sortBy) {
      case "popularity_desc":
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "popularity_asc":
        return list.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      case "author_az":
        return list.sort((a, b) => a.author.localeCompare(b.author));
      case "author_za":
        return list.sort((a, b) => b.author.localeCompare(a.author));
      case "callnumber_az":
        return list.sort((a, b) => (a.callNumber || "").localeCompare(b.callNumber || ""));
      case "callnumber_za":
        return list.sort((a, b) => (b.callNumber || "").localeCompare(a.callNumber || ""));
      case "date_new_old":
        return list.sort((a, b) => (b.year || 0) - (a.year || 0));
      case "date_old_new":
        return list.sort((a, b) => (a.year || 0) - (b.year || 0));
      case "title_az":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "title_za":
        return list.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return list; // 'relevance' or default
    }
  }, [filteredBooks, sortBy]);

  // Pagination (20 items per page limit)
  const totalPages = Math.ceil(sortedAndDisplayedBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedAndDisplayedBooks.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedAndDisplayedBooks, currentPage]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#f7fafd] flex flex-col">
      <CatalogNavbar
        bookmarkedBooks={bookmarkedBooks}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={toggleBookmark}
        onOpenHistory={() => setIsViewingHistory(true)}
        isViewingHistory={isViewingHistory}
      />

      <CatalogHeader
        query={query}
        setQuery={(q) => {
          setQuery(q);
          setCurrentPage(1);
        }}
        searchScope={searchScope}
        setSearchScope={(scope) => {
          setSearchScope(scope);
          setCurrentPage(1);
        }}
        activeRange={activeRange}
        setActiveRange={(range) => {
          setActiveRange(range);
          setCurrentPage(1);
        }}
      />

      <CatalogResults
        books={paginatedBooks}
        totalResultsCount={sortedAndDisplayedBooks.length}
        isSearching={isSearching}
        searchQuery={query}
        bookmarkQuery={bookmarkQuery}
        setBookmarkQuery={setBookmarkQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={toggleBookmark}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        isViewingHistory={isViewingHistory}
        searchHistoryList={searchHistoryList}
        onSelectHistorySearch={(searchQuery) => {
          setIsViewingHistory(false);
          setQuery(searchQuery);
          setCurrentPage(1);
        }}
        onDeleteHistoryItems={(ids) => {
          setSearchHistoryList((prev) => prev.filter((item) => !ids.includes(item.id)));
        }}
        onClearAllHistory={() => {
          setSearchHistoryList([]);
        }}
      />

      <CatalogFooter />
    </div>
  );
};

export default CatalogPage;