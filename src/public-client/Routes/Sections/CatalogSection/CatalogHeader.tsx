import { SEARCH_SCOPES, ALPHABET_RANGES } from "../../../hooks/constants";

interface CatalogHeaderProps {
  query: string;
  setQuery: (value: string) => void;
  searchScope: string;
  setSearchScope: (value: string) => void;
  activeRange: string | null;
  setActiveRange: (value: string | null) => void;
}

const CatalogHeader = ({
  query,
  setQuery,
  searchScope,
  setSearchScope,
  activeRange,
  setActiveRange,
}: CatalogHeaderProps) => {
  const getPlaceholder = () => {
    switch (searchScope) {
      case "title":
        return "Enter book title…";
      case "author":
        return "Enter author name…";
      case "subject":
        return "Enter subject or topic…";
      case "isbn":
        return "Enter ISBN…";
      case "issn":
        return "Enter ISSN…";
      case "series":
        return "Enter series title…";
      case "call_number":
        return "Enter call number…";
      default:
        return "Search by title, author, or keyword…";
    }
  };

  return (
    <header className="border-b border-[#dce8f2] bg-white px-5 md:px-10 lg:px-16 py-10">
      <div className="max-w-6xl mx-auto">
        <span className="block font-mono text-sm tracking-[0.2em] text-[#3f7fb3] uppercase mb-3">
          Catalog · CDO LiCAS
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1f2a37] mb-8">
          Search the collection
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl">
          <div className="flex flex-col sm:flex-row rounded-sm border-2 border-[#dce8f2] bg-white overflow-hidden focus-within:border-[#025aa7] transition-colors shadow-[0_1px_2px_rgba(2,90,167,0.04)]">
            {/* Scope dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={searchScope}
                onChange={(e) => setSearchScope(e.target.value)}
                className="appearance-none w-full sm:w-48 h-full font-mono text-sm text-[#1f2a37] bg-[#eaf1f8] pl-4 pr-10 py-4 border-b sm:border-b-0 sm:border-r border-[#dce8f2] focus:outline-none cursor-pointer hover:bg-[#dce8f2] transition-colors"
              >
                {SEARCH_SCOPES.map((scope) => (
                  <option key={scope.value} value={scope.value}>
                    {scope.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#3f7fb3]">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Input + search icon */}
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={getPlaceholder()}
                className="w-full px-5 py-4 text-lg text-[#1f2a37] placeholder:text-gray-400 focus:outline-none font-mono bg-transparent"
              />
              <div className="pr-4 text-[#3f7fb3] pointer-events-none">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <p className="mt-2.5 font-mono text-xs text-gray-400 tracking-wide">
            Currently searching in:{" "}
            <span className="text-[#3f7fb3]">
              {SEARCH_SCOPES.find((s) => s.value === searchScope)?.label}
            </span>
          </p>
        </div>

        {/* Alphabet tabs */}
        <div className="flex flex-wrap gap-2 mt-7">
          <button
            onClick={() => setActiveRange(null)}
            className={`font-mono text-sm tracking-wider uppercase px-5 py-2.5 rounded-sm border transition-colors
              ${
                !activeRange
                  ? "bg-[#025aa7] border-[#025aa7] text-white font-bold"
                  : "bg-[#eaf1f8] border-[#dce8f2] text-[#3f7fb3] hover:bg-[#dce8f2]"
              }`}
          >
            All
          </button>
          {ALPHABET_RANGES.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`font-mono text-sm tracking-wider uppercase px-5 py-2.5 rounded-sm border transition-colors
                ${
                  activeRange === range
                    ? "bg-[#025aa7] border-[#025aa7] text-white font-bold"
                    : "bg-[#eaf1f8] border-[#dce8f2] text-[#3f7fb3] hover:bg-[#dce8f2]"
                }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default CatalogHeader;