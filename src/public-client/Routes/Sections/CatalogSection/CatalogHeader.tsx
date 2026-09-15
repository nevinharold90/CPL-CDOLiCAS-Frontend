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
    <header className="relative border-b border-[#025aa7] bg-[#014a8c] px-5 md:px-10 lg:px-16 py-10 font-['Poppins'] overflow-hidden">
      {/* Card-catalog texture layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Ruled index-card lines */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 27px, #ffffff 27px, #ffffff 28px)",
          }}
        />
        {/* Left margin rule, like a ruled card's red guide line */}
        <div className="absolute top-0 bottom-0 left-10 md:left-16 w-px bg-white/15" />

        {/* Punch-hole strip, like the rod holes in a catalog drawer */}
        <div
          className="absolute top-0 bottom-0 left-3 md:left-6 w-2 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, #ffffff 0, #ffffff 3px, transparent 3px, transparent 22px)",
            maskImage:
              "radial-gradient(circle, black 55%, transparent 60%)",
            WebkitMaskImage:
              "radial-gradient(circle, black 55%, transparent 60%)",
          }}
        />

      </div>

      <div className="relative max-w-6xl mx-auto">
        <span className="block font-mono text-sm tracking-[0.2em] text-blue-200 uppercase mb-3">
          Catalog · CDO LiCAS
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
          Search the collection
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl">
          <div className="flex flex-col sm:flex-row rounded-sm border-2 border-white/20 bg-white/10 backdrop-blur-sm overflow-hidden focus-within:border-white/50 transition-colors">
            {/* Scope dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={searchScope}
                onChange={(e) => setSearchScope(e.target.value)}
                className="appearance-none w-full sm:w-48 h-full text-sm text-white bg-white/10 pl-4 pr-10 py-4 border-b sm:border-b-0 sm:border-r border-white/20 focus:outline-none cursor-pointer hover:bg-white/20 transition-colors [&>option]:text-[#1f2a37]"
              >
                {SEARCH_SCOPES.map((scope) => (
                  <option key={scope.value} value={scope.value}>
                    {scope.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white/80">
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
                className="w-full px-5 py-4 text-lg text-white placeholder:text-blue-200/70 focus:outline-none bg-transparent"
              />
              <div className="pr-4 text-white/80 pointer-events-none">
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

          <p className="mt-2.5 font-mono text-xs text-blue-200 tracking-wide">
            Currently searching in:{" "}
            <span className="text-white">
              {SEARCH_SCOPES.find((s) => s.value === searchScope)?.label}
            </span>
          </p>
        </div>

        {/* Alphabet tabs */}
        <div className="flex flex-wrap gap-2 mt-7">
          <button
            onClick={() => setActiveRange(null)}
            className={`text-sm tracking-wider uppercase px-5 py-2.5 rounded-sm border transition-colors
              ${
                !activeRange
                  ? "bg-white border-white text-[#025aa7] font-bold"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
          >
            All
          </button>
          {ALPHABET_RANGES.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`text-sm tracking-wider uppercase px-5 py-2.5 rounded-sm border transition-colors
                ${
                  activeRange === range
                    ? "bg-white border-white text-[#025aa7] font-bold"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
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