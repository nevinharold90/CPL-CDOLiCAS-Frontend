import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import api from '../../../../../_api/axios'; // Direct import to your axios.ts file

export interface BookItem {
  id?: number;
  isbn: string;
  title: string;
  summary?: string | null;
  description?: string | null;
}

export interface BookItem {
  id?: number;
  isbn: string;
  title: string;
  summary?: string | null;
  description?: string | null;
}

interface IsbnProps {
  value: string;
  onChange: (isbn: string, selectedBook?: BookItem) => void;
  className?: string;
}

export function Isbn({ value, onChange, className }: IsbnProps) {
  const [query, setQuery] = useState<string>(value || '');
  const [results, setResults] = useState<BookItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    if (!isOpen || query.trim().length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await api.get<BookItem[]>('/books/search-isbn', {
          params: { q: query.trim() },
          signal: controller.signal,
        });
        setResults(response.data);
      } catch (err: any) {
        if (err?.name !== 'CanceledError' && err?.code !== 'ERR_CANCELED') {
          console.error('Failed to search ISBN database:', err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (book: BookItem) => {
    setQuery(book.isbn);
    onChange(book.isbn, book);
    setIsOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onChange(val);
    setIsOpen(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onFocus={() => setIsOpen(true)}
        onChange={handleInputChange}
        placeholder="Type ISBN or Title..."
        className={className}
        autoComplete="off"
      />

      {isOpen && query.trim().length >= 2 && (
        <div className="absolute z-30 w-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg max-h-60 overflow-y-auto text-sm">
          {isLoading ? (
            <div className="p-3 text-zinc-400 text-center text-xs">Searching books...</div>
          ) : results.length === 0 ? (
            <div className="p-3 text-zinc-400 text-center text-xs">No matching ISBN or Title</div>
          ) : (
            results.map((book) => (
              <button
                key={book.id || book.isbn}
                type="button"
                onClick={() => handleSelect(book)}
                className="w-full text-left px-3 py-2.5 hover:bg-indigo-50 transition border-b border-zinc-50 last:border-0 cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-indigo-600 group-hover:text-indigo-700">
                    {book.isbn}
                  </span>
                  <span className="text-xs font-medium text-zinc-700 truncate max-w-[200px]">
                    {book.title}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}