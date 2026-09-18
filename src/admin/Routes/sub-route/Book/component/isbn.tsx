import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import api from '../../../../../_api/axios';

export interface Author {
  id: number;
  full_name: string;
}

export interface DeweyDecimal {
  id: number;
  dewey_number: string;
  class_name: string;
}

export interface BookClassification {
  id: number;
  book_id: number;
  dewey_decimal_id: number;
  book_type?: string;
  cutter?: string;
  year_published?: string;
  category?: string;
  place_of_publication?: string;
  dewey_decimal?: DeweyDecimal;
}

export interface IsbnSearchResult {
  id?: number;
  isbn11?: string | null;
  isbn13?: string | null;
  issn?: string | null;
  title: string;
  summary?: string | null;
  description?: string | null;
  image_url?: string | null;
  authors?: Author[];
  classification?: BookClassification;
}

interface IsbnProps {
  value: string;
  onChange: (isbn: string, selectedBook?: IsbnSearchResult) => void;
  className?: string;
}

export function Isbn({ value, onChange, className }: IsbnProps) {
  const [query, setQuery] = useState<string>(value || '');
  const [results, setResults] = useState<IsbnSearchResult[]>([]);
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
        const response = await api.get<IsbnSearchResult[]>('/books/search-isbn', {
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

  const handleSelect = (book: IsbnSearchResult) => {
    const selectedIsbn = book.isbn13 || book.isbn11 || book.issn || '';
    setQuery(selectedIsbn);
    
    // Passes both the string ISBN and the full book object up to the parent
    onChange(selectedIsbn, book); 
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
        placeholder="Type ISBN, ISSN, Title, or Author..."
        className={className}
        autoComplete="off"
      />

      {isOpen && query.trim().length >= 2 && (
        <div className="absolute z-30 w-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg max-h-60 overflow-y-auto text-sm">
          {isLoading ? (
            <div className="p-3 text-zinc-400 text-center text-xs">Searching books...</div>
          ) : results.length === 0 ? (
            <div className="p-3 text-zinc-400 text-center text-xs">No matching results</div>
          ) : (
            results.map((book) => {
              const displayIsbn = book.isbn13 || book.isbn11 || book.issn || 'No Identifier';
              const authorNames = book.authors?.map((a) => a.full_name).join(', ') || 'Unknown Author';

              return (
                <button
                  key={book.id || displayIsbn}
                  type="button"
                  onClick={() => handleSelect(book)}
                  className="w-full text-left px-3 py-2.5 hover:bg-indigo-50 transition border-b border-zinc-50 last:border-0 cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-indigo-600 group-hover:text-indigo-700 text-xs">
                      {displayIsbn}
                    </span>
                    <span className="text-xs font-semibold text-zinc-800 truncate max-w-[220px]">
                      {book.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                    by {authorNames}
                  </p>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}