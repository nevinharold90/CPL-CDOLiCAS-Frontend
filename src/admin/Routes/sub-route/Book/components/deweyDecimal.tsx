import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import axios from 'axios';
import { DeweyDecimalSelectProps } from '../BookRegister';

// API Response Item Type matching your Laravel controller select fields
    export interface DeweyItem {
        id: number;
        dewey_number: string;
        class_name: string;
        description: string | null;
    }

    // Base API URL from Vite environment
    const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

    export function DeweyDecimalSelect({ value, onChange, className }: DeweyDecimalSelectProps) {
        const [query, setQuery] = useState<string>(value || '');
        const [results, setResults] = useState<DeweyItem[]>([]);
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        
        const dropdownRef = useRef<HTMLDivElement | null>(null);

        // Sync internal state with parent form state
        useEffect(() => {
            setQuery(value || '');
        }, [value]);

    // Fetch suggestions using Axios with cancellation token/controller support
    useEffect(() => {
        if (!isOpen || query.trim().length < 2) {
            setResults([]);
            return;
        }

        const controller = new AbortController();

        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<DeweyItem[]>(`${API_BASE_URL}/dewey/search`, {
                    params: { q: query.trim() },
                    signal: controller.signal,
                });
                setResults(response.data);
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error('Failed to search Dewey Decimal DB via Axios:', err);
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

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: globalThis.MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (item: DeweyItem) => {
        onChange(item.dewey_number, item); // Passes the whole object including description
        setQuery(item.dewey_number);
        setIsOpen(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuery(newValue);
        onChange(newValue); // Handled manually by user, item is undefined
        setIsOpen(true);
    };

    return (
        <div className="relative" ref={dropdownRef}>
        <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={handleInputChange}
            placeholder="Search DDC (e.g., 005.13 or Computer)"
            className={className}
        />

        {isOpen && query.trim().length >= 2 && (
            <div className="absolute z-30 w-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg max-h-60 overflow-y-auto text-sm">
            {isLoading ? (
                <div className="p-3 text-zinc-400 text-center text-xs">Searching DDC database...</div>
            ) : results.length === 0 ? (
                <div className="p-3 text-zinc-400 text-center text-xs">No matching DDC entry</div>
            ) : (
                results.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-3 py-2.5 hover:bg-indigo-50 transition border-b border-zinc-50 last:border-0 cursor-pointer group"
                >
                    <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-indigo-600 group-hover:text-indigo-700">
                        {item.dewey_number}
                    </span>
                    <span className="text-xs font-medium text-zinc-700 truncate max-w-[200px]">
                        {item.class_name}
                    </span>
                    </div>
                    {item.description && (
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {item.description}
                    </p>
                    )}
                </button>
                ))
            )}
            </div>
        )}
        </div>
    );
}