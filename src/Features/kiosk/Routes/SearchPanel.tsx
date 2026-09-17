import { useState } from 'react'

const SearchPanel = () => {
  const [query, setQuery] = useState('')

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    // TODO: wire this up to your library catalog / search API
    console.log('Searching catalog for', query)
  }

  return (
    <div className="relative z-10 w-full h-full flex items-center justify-center p-8 bg-[#10192b]">
      <div className="relative w-[min(34rem,90vw)] bg-[#f5f1e6] text-[#1b1b1b] rounded-md border-2 border-[#a97d33] shadow-2xl p-8 md:p-12">
        <p className="text-sm text-[#57606f] mb-2">Catalog search</p>
        <h2 className="font-[Poppins,sans-serif] font-semibold text-2xl md:text-3xl mb-5">
          Search the catalog
        </h2>
        <form onSubmit={submitSearch} className="flex gap-3">
          <input
            type="text"
            autoFocus
            placeholder="Title, author or subject"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg px-4 py-3 border-2 border-[#57606f] rounded-md bg-white text-[#1b1b1b] focus:border-[#a97d33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a97d33]"
          />
          <button
            type="submit"
            className="cursor-pointer text-lg font-semibold px-6 py-3 rounded-md bg-[#17223a] text-[#f5f1e6] hover:bg-[#10192b]"
          >
            Search
          </button>
        </form>
        <p className="text-[#57606f] mt-4 text-sm">
          Results will appear here once the catalog is connected to CPLiCAS.
        </p>
      </div>
    </div>
  )
}

export default SearchPanel