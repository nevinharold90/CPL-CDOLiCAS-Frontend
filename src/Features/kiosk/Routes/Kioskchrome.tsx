import logo from '../assets/logo.png'

interface KioskHeaderProps {
  onHome?: () => void
  showHome?: boolean
}

export const KioskHeader = ({ onHome, showHome = false }: KioskHeaderProps) => {
  return (
    <header className="shrink-0 h-20 md:h-24 flex items-center justify-between px-6 md:px-10 bg-[#17223a] border-b-2 border-[#a97d33]">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Cagayan de Oro City Public Library seal"
          className="w-13 h-13 md:w-14 md:h-14 rounded-full border-2 border-[#fff] object-contain"
        />
        <div className="leading-tight">
          <p className="font-[Poppins,sans-serif] font-semibold text-lg md:text-xl text-[#f5f1e6]">
            Cagayan de Oro City Public Library
          </p>
          <p className="text-xs md:text-sm text-[#c9a35f]">
            Information &amp; Catalog Access System (CPLiCAS)
          </p>
        </div>
      </div>

      {showHome && onHome && (
        <button
          onClick={onHome}
          className="cursor-pointer text-sm md:text-base font-medium px-4 py-2 md:px-5 md:py-2.5 rounded-md border border-[#f5f1e6]/30 text-[#f5f1e6] hover:bg-[#f5f1e6]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9a35f]"
        >
          ‹ Home
        </button>
      )}
    </header>
  )
}

export const KioskFooter = () => {
  return (
    <footer className="shrink-0 h-10 md:h-11 flex items-center justify-between px-6 md:px-10 bg-[#0d1526] text-xs md:text-sm text-[#8791a3]">
      <span>Cagayan de Oro City Public Library</span>
      <span className="flex items-center gap-3">
        <span>Need help? Ask a librarian at the front desk.</span>
        <span aria-hidden="true" className="w-px h-3.5 bg-[#8791a3]/40" />
        <span>CPLiCAS Kiosk</span>
      </span>
    </footer>
  )
}