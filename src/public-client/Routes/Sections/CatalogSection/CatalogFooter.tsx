import Logo from "../../../assets/logo.png";

const CatalogFooter = () => {
  return (
    <footer className="border-t border-[#025aa7] bg-[#025aa7]">
      <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Library identity */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-10 h-10 shrink-0">
                <img
                  src={Logo}
                  alt="City Public Library"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-base text-white tracking-tight">
                  City Public Library
                </div>
                <div className="text-[10px] text-white/70">Cagayan de Oro</div>
              </div>
            </div>
          </div>

          {/* Address / location */}
          <div>
            <span className="block font-mono text-[11px] tracking-[0.2em] text-white/80 uppercase mb-3">
              Location
            </span>
            <div className="flex items-start gap-2 text-sm text-white/90">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>
                Capitol Drive, Cagayan de Oro City, Misamis Oriental,
                Philippines
              </span>
            </div>
            <a
              href="https://maps.google.com/?q=Cagayan+de+Oro+City"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 font-mono text-xs tracking-wider uppercase text-white hover:text-white/80 hover:underline transition-colors"
            >
              View on map ↗
            </a>
          </div>

          {/* Contact */}
          <div>
            <span className="block font-mono text-[11px] tracking-[0.2em] text-white/80 uppercase mb-3">
              Contact
            </span>
            <div className="space-y-2.5 text-sm text-white/90">
              <a
                href="tel:+639171234567"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 shrink-0 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +63 917 123 4567
              </a>
              <a
                href="mailto:library@cdo.edu.ph"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 shrink-0 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                library@cdo.edu.ph
              </a>
            </div>
          </div>

          {/* Socials */}
          <div>
            <span className="block font-mono text-[11px] tracking-[0.2em] text-white/80 uppercase mb-3">
              Follow the library
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Library on Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-sm border border-white/40 text-white hover:bg-white hover:text-[#025aa7] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Library on Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-sm border border-white/40 text-white hover:bg-white hover:text-[#025aa7] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 011.772 1.153 4.9 4.9 0 011.153 1.772c.248.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 01-1.153 1.772 4.9 4.9 0 01-1.772 1.153c-.637.248-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 01-1.772-1.153 4.9 4.9 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428a4.9 4.9 0 011.153-1.772A4.9 4.9 0 015.45 2.525c.637-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.467.182-.8.399-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.06 1.37-.06 4.04 0 2.67.01 2.986.06 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.05 1.37.06 4.041.06 2.67 0 2.987-.01 4.04-.06.976-.045 1.505-.207 1.858-.344a3.1 3.1 0 001.15-.748c.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.05-1.055.06-1.37.06-4.041 0-2.67-.01-2.986-.06-4.04-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 00-.748-1.15 3.1 3.1 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.05-1.37-.06-4.041-.06zm0 4.595a5.603 5.603 0 110 11.206 5.603 5.603 0 010-11.206zm0 1.802a3.801 3.801 0 100 7.602 3.801 3.801 0 000-7.602zm5.723-1.998a1.31 1.31 0 11-2.62 0 1.31 1.31 0 012.62 0z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Library on LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-sm border border-white/40 text-white hover:bg-white hover:text-[#025aa7] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.058-1.865-3.058-1.868 0-2.154 1.459-2.154 2.962v5.7h-3v-11h2.879v1.503h.041c.401-.759 1.379-1.559 2.838-1.559 3.036 0 3.6 1.998 3.6 4.596v6.46z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="font-mono text-[10px] tracking-wider uppercase text-white/60">
            © {new Date().getFullYear()} CDO LiCAS — Library Cataloging and
            Information System
          </span>
        </div>
      </div>
    </footer>
  );
};

export default CatalogFooter;