import { useState } from "react";

const SEARCH_FIELD_OPTIONS = [
  { value: "keyword", label: "Keyword" },
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "subject", label: "Subject" },
  { value: "series", label: "Series title" },
  { value: "isbn", label: "ISBN" },
  { value: "issn", label: "ISSN" },
  { value: "call_number", label: "Call number" },
  { value: "publisher", label: "Publisher" },
];

const ITEM_TYPES = [
  "Activity Card", "Analytics", "Art Original", "Audiobook",
  "Baby Thesis", "Book", "Braille", "Cartographic Material",
  "Chart", "Continuing resource", "Diorama", "E-books",
  "Electronic resource", "FLash card", "Filmstrip", "Game",
  "Journal", "Kit", "Magazine", "Manuscript",
  "Map", "Microform", "Microscope slide", "Mixed Materials",
  "Model", "Monograph", "Motion Picture", "Music",
  "Newsletter", "Newspaper", "Pamphlet", "Picture",
  "Provincial Newspaper", "Realia", "Serial", "Slide",
  "Sound recording", "Souvenir Program", "Technical Drawing", "Text",
  "Thesis", "Thesis Abstract", "Toy", "Transparency",
  "Video Recording", "Visual Material",
];

// Split the flat list into 4 columns to mirror the reference layout
const ITEM_TYPE_COLUMNS: string[][] = [[], [], [], []];
ITEM_TYPES.slice()
  .sort((a, b) => a.localeCompare(b))
  .forEach((item, i) => {
    ITEM_TYPE_COLUMNS[i % 4].push(item);
  });

export interface AdvancedSearchQuery {
  rows: { field: string; value: string }[];
  itemTypes: string[];
  availableOnly: boolean;
  sortBy: string;
  publicationDateRange: string;
  language: string;
}

interface CatalogAdvancedSearchProps {
  onSearch: (query: AdvancedSearchQuery) => void;
  onBackToResults?: () => void;
}

const emptyRows = [
  { field: "keyword", value: "" },
  { field: "keyword", value: "" },
  { field: "keyword", value: "" },
];

const CatalogAdvancedSearch = ({
  onSearch,
  onBackToResults,
}: CatalogAdvancedSearchProps) => {
  const [rows, setRows] = useState(emptyRows);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [publicationDateRange, setPublicationDateRange] = useState("");
  const [language, setLanguage] = useState("no_limit");

  const updateRow = (index: number, key: "field" | "value", value: string) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row))
    );
  };

  const toggleItemType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleReset = () => {
    setRows(emptyRows);
    setSelectedTypes([]);
    setAvailableOnly(false);
    setSortBy("relevance");
    setPublicationDateRange("");
    setLanguage("no_limit");
  };

  const handleSearch = () => {
    onSearch({
      rows,
      itemTypes: selectedTypes,
      availableOnly,
      sortBy,
      publicationDateRange,
      language,
    });
  };

  const ActionButtons = () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={handleSearch}
        className="px-6 py-2.5 text-sm font-medium text-white bg-[#025aa7] rounded-sm hover:bg-[#02498c] transition-colors shadow-sm"
      >
        Search
      </button>
      <button
        type="button"
        className="px-6 py-2.5 text-sm font-medium text-[#025aa7] bg-white border border-[#dce8f2] rounded-sm hover:bg-[#f7fafd] transition-colors"
      >
        More options
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="px-6 py-2.5 text-sm font-medium text-[#025aa7] bg-white border border-[#dce8f2] rounded-sm hover:bg-[#f7fafd] transition-colors"
      >
        New search
      </button>
    </div>
  );

  return (
    <div className="font-['Poppins']">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#dce8f2] pb-6 mb-6">
        <h1 className="text-2xl font-bold text-[#1f2a37]">Advanced search</h1>
        {onBackToResults && (
          <button
            type="button"
            onClick={onBackToResults}
            className="flex items-center gap-1.5 text-sm text-[#025aa7] hover:underline"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to results
          </button>
        )}
      </div>

      {/* Search for: rows */}
      <div className="mb-3 text-sm font-medium text-[#1f2a37]">Search for:</div>

      <div className="space-y-3 mb-6">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-8 text-sm text-gray-500 shrink-0">
              {index === 0 ? "" : "and"}
            </span>
            <select
              value={row.field}
              onChange={(e) => updateRow(index, "field", e.target.value)}
              className="w-full sm:w-52 px-3 py-2.5 text-sm text-[#1f2a37] bg-white border border-[#dce8f2] rounded-sm focus:outline-none focus:border-[#025aa7] cursor-pointer"
            >
              {SEARCH_FIELD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={row.value}
              onChange={(e) => updateRow(index, "value", e.target.value)}
              className="flex-1 px-3 py-2.5 text-sm text-[#1f2a37] bg-white border border-[#dce8f2] rounded-sm focus:outline-none focus:border-[#025aa7]"
            />
          </div>
        ))}
      </div>

      <div className="mb-8">
        <ActionButtons />
      </div>

      {/* Item type limiter */}
      <div className="border border-[#dce8f2] rounded-sm mb-6">
        <div className="px-5 pt-4">
          <span className="inline-block px-4 py-2 text-sm font-medium text-[#025aa7] border border-b-0 border-[#dce8f2] rounded-t-sm bg-white -mb-px">
            Item type
          </span>
        </div>
        <div className="border-t border-[#dce8f2] px-5 py-5">
          <div className="text-sm font-semibold text-[#3f7fb3] mb-4">
            Limit to any of the following:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-2">
            {ITEM_TYPE_COLUMNS.map((column, colIndex) => (
              <div key={colIndex} className="space-y-2">
                {column.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 text-sm text-[#025aa7] cursor-pointer hover:text-[#02498c]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleItemType(type)}
                      className="rounded border-gray-300 text-[#025aa7] focus:ring-[#025aa7] cursor-pointer"
                    />
                    {type}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter grid: Availability / Sort by / Publication date / Language */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border border-[#dce8f2] rounded-sm p-5">
          <div className="text-sm font-semibold text-[#1f2a37] mb-3">
            Availability:
          </div>
          <label className="flex items-start gap-2 text-sm text-[#1f2a37] cursor-pointer">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="mt-0.5 rounded border-gray-300 text-[#025aa7] focus:ring-[#025aa7] cursor-pointer"
            />
            Only items currently available for loan or reference
          </label>
        </div>

        <div className="border border-[#dce8f2] rounded-sm p-5">
          <div className="text-sm font-semibold text-[#1f2a37] mb-3">Sort by:</div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2.5 text-sm text-[#1f2a37] bg-white border border-[#dce8f2] rounded-sm focus:outline-none focus:border-[#025aa7] cursor-pointer"
          >
            <option value="relevance">Relevance</option>
            <option value="popularity_desc">Popularity (most to least)</option>
            <option value="popularity_asc">Popularity (least to most)</option>
            <option value="author_az">Author (A-Z)</option>
            <option value="author_za">Author (Z-A)</option>
            <option value="callnumber_az">Call number (0-9 to A-Z)</option>
            <option value="callnumber_za">Call number (Z-A to 9-0)</option>
            <option value="date_new_old">Date: Newest to oldest</option>
            <option value="date_old_new">Date: Oldest to newest</option>
            <option value="title_az">Title (A-Z)</option>
            <option value="title_za">Title (Z-A)</option>
          </select>
        </div>

        <div className="border border-[#dce8f2] rounded-sm p-5">
          <div className="text-sm font-semibold text-[#1f2a37] mb-3">
            Publication date range
          </div>
          <input
            type="text"
            value={publicationDateRange}
            onChange={(e) => setPublicationDateRange(e.target.value)}
            placeholder="e.g. 1999-2001"
            className="w-full px-3 py-2.5 text-sm text-[#1f2a37] bg-white border border-[#dce8f2] rounded-sm focus:outline-none focus:border-[#025aa7] mb-2"
          />
          <p className="text-xs text-gray-500 leading-relaxed">
            For example: 1999-2001. You could also use "-1987" for everything
            published in and before 1987, or "2008-" for everything published
            in 2008 and after.
          </p>
        </div>

        <div className="border border-[#dce8f2] rounded-sm p-5">
          <div className="text-sm font-semibold text-[#1f2a37] mb-3">Language</div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2.5 text-sm text-[#025aa7] font-medium bg-white border border-[#dce8f2] rounded-sm focus:outline-none focus:border-[#025aa7] cursor-pointer"
          >
            <option value="no_limit">No limit</option>
            <option value="en">English</option>
            <option value="fil">Filipino</option>
            <option value="ceb">Cebuano</option>
            <option value="es">Spanish</option>
            <option value="ja">Japanese</option>
          </select>
        </div>
      </div>

      <ActionButtons />
    </div>
  );
};

export default CatalogAdvancedSearch;