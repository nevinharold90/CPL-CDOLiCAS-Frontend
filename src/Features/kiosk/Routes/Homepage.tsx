import { useEffect, useState } from 'react'
import SearchPanel from './SearchPanel'
import BarcodeScan from './BarcodeScan'
import { KioskHeader, KioskFooter } from './Kioskchrome'
import bts from '../assets/BTS.png'
import ahboa from '../assets/ahboa.png'

type View = 'home' | 'search' | 'borrow'

// Files in src/assets must be imported (like bts above) so Vite can bundle them.
// Paths starting with '/' below assume the file lives in your public/ folder instead.
const SLIDESHOW_IMAGES = [
  bts,
  ahboa,
]

const SLIDE_DURATION_MS = 7000

const Homepage = () => {
  const [view, setView] = useState<View>('home')
  const [slideIndex, setSlideIndex] = useState(0)

  // Background slideshow — runs continuously while on the home screen
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % SLIDESHOW_IMAGES.length)
    }, SLIDE_DURATION_MS)
    return () => clearInterval(timer)
  }, [])

  const goHome = () => setView('home')

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col bg-[#10192b] text-[#f5f1e6] font-[Poppins,sans-serif]">
      <KioskHeader onHome={goHome} showHome={view !== 'home'} />

      <main className="relative flex-1 overflow-hidden">
        {view === 'home' && (
          <>
            <div className="absolute inset-0">
              {SLIDESHOW_IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                    i === slideIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10192b]/95 via-[#10192b]/70 to-[#10192b]/40" />
            </div>

            <div className="absolute top-6 right-6 z-10 flex gap-1.5">
              {SLIDESHOW_IMAGES.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === slideIndex ? 'bg-[#a97d33]' : 'bg-[#f5f1e6]/25'
                  }`}
                />
              ))}
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-16">
              <div className="mt-4 sm:mt-8 md:mt-12 max-w-xl">
                <p className="text-sm md:text-base text-[#c9a35f] tracking-wide mb-3">
                  Self-service kiosk
                </p>
                <h1 className="font-[Poppins,sans-serif] font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl leading-tight mb-3">
                  How can we help you today?
                </h1>
                <p className="text-lg sm:text-xl text-[#f5f1e6]/80">
                  Select a service below to get started.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-2 md:mb-4">
                <button
                  onClick={() => setView('search')}
                  className="cursor-pointer group relative flex-1 flex flex-col items-start gap-3 min-h-48 md:min-h-64 p-7 md:p-10 bg-[#f5f1e6] text-[#1b1b1b] rounded-2xl overflow-hidden text-left shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2c5f74] focus-visible:outline-offset-2"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[#2c5f74]" />
                  <span
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#2c5f74]/10 blur-2xl transition-transform duration-500 ease-out group-hover:scale-125"
                  />
                  <span
                    aria-hidden="true"
                    className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#2c5f74] text-white shadow-md transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-7 h-7 md:w-8 md:h-8"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                  <span className="relative text-xl md:text-2xl font-semibold font-[Poppins,sans-serif]">
                    Search for books
                  </span>
                  <span className="relative text-sm md:text-base text-[#57606f]">
                    Browse the catalog by title, author or subject
                  </span>
                </button>

                <button
                  onClick={() => setView('borrow')}
                  className="cursor-pointer group relative flex-1 flex flex-col items-start gap-3 min-h-48 md:min-h-64 p-7 md:p-10 bg-[#f5f1e6] text-[#1b1b1b] rounded-2xl overflow-hidden text-left shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#a97d33] focus-visible:outline-offset-2"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-[#a97d33]" />
                  <span
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#a97d33]/10 blur-2xl transition-transform duration-500 ease-out group-hover:scale-125"
                  />
                  <span
                    aria-hidden="true"
                    className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#a97d33] text-white shadow-md transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-7 h-7 md:w-8 md:h-8"
                    >
                      <path d="M12 6.5c-1.5-1.3-3.7-2-6-2-1 0-2 .1-3 .4v13c1-.3 2-.4 3-.4 2.3 0 4.5.7 6 2 1.5-1.3 3.7-2 6-2 1 0 2 .1 3 .4v-13c-1-.3-2-.4-3-.4-2.3 0-4.5.7-6 2z" />
                      <line x1="12" y1="6.5" x2="12" y2="19.5" />
                    </svg>
                  </span>
                  <span className="relative text-xl md:text-2xl font-semibold font-[Poppins,sans-serif]">
                    Borrow a book
                  </span>
                  <span className="relative text-sm md:text-base text-[#57606f]">
                    Scan the barcode on the back cover
                  </span>
                </button>
              </div>
            </div>
          </>
        )}

        {view === 'search' && <SearchPanel />}
        {view === 'borrow' && <BarcodeScan onClose={goHome} />}
      </main>

      <KioskFooter />
    </div>
  )
}

export default Homepage