import { useState, useMemo } from "react";
import { PLACEHOLDER_BOOKS } from "./constants";
import { Book } from "./type";

export const useCatalog = () => {
  const [query, setQuery] = useState("");
  const [searchScope, setSearchScope] = useState("catalog");
  const [activeRange, setActiveRange] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(["1"]);

  const bookmarkedBooks = useMemo(
    () => PLACEHOLDER_BOOKS.filter((b) => bookmarkedIds.includes(b.id)),
    [bookmarkedIds]
  );

  const filteredBooks = useMemo(() => {
    return PLACEHOLDER_BOOKS.filter((book) => {
      const matchesQuery =
        query.trim() === "" ||
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase());

      const matchesRange =
        !activeRange ||
        (() => {
          const letter = book.title[0].toUpperCase();
          const [start, end] = activeRange.replace("–", "-").split("-");
          return letter >= start && letter <= end;
        })();

      return matchesQuery && matchesRange;
    });
  }, [query, activeRange]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return {
    // state
    query,
    setQuery,
    searchScope,
    setSearchScope,
    activeRange,
    setActiveRange,
    bookmarkedIds,
    bookmarkedBooks,
    filteredBooks,

    // actions
    toggleBookmark,
  };
};