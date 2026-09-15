import Logo from "../../../assets/logo.png";

const CatalogFooter = () => {
  return (
    <footer className="bg-[#014a8c] font-['Poppins']">
      <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Library identity */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 shrink-0">
                <img
                  src={Logo}
                  alt="City Public Library"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="font-semibold text-base text-white">
                  City Public Library
                </div>
                <div className="text-xs text-white/60">Cagayan de Oro</div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Cataloging and information services for the City of Cagayan de
              Oro.
            </p>
          </div>

          {/* Address / location */}
          <div>
            <div className="text-sm font-medium text-white mb-3">Location</div>
            <p className="text-sm text-white/70 leading-relaxed">
              Capitol Drive, Cagayan de Oro City,
              <br />
              Misamis Oriental, Philippines
            </p>
            <a
              href="https://maps.google.com/?q=Cagayan+de+Oro+City"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm text-white/80 hover:text-white hover:underline transition-colors"
            >
              View on map
            </a>
          </div>

          {/* Contact */}
          <div>
            <div className="text-sm font-medium text-white mb-3">Contact</div>
            <div className="space-y-2 text-sm text-white/70">
              <a
                href="tel:+639171234567"
                className="block hover:text-white transition-colors"
              >
                +63 917 123 4567
              </a>
              <a
                href="mailto:library@cdo.edu.ph"
                className="block hover:text-white transition-colors"
              >
                library@cdo.edu.ph
              </a>
            </div>
          </div>

          {/* Socials */}
          <div>
            <div className="text-sm font-medium text-white mb-3">Follow us</div>
            <div className="space-y-2 text-sm text-white/70">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
                </svg>
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 011.772 1.153 4.9 4.9 0 011.153 1.772c.248.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 01-1.153 1.772 4.9 4.9 0 01-1.772 1.153c-.637.248-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 01-1.772-1.153 4.9 4.9 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.065.217-1.79.465-2.428a4.9 4.9 0 011.153-1.772A4.9 4.9 0 015.45 2.525c.637-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.467.182-.8.399-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.05 1.055-.06 1.37-.06 4.04 0 2.67.01 2.986.06 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.05 1.37.06 4.041.06 2.67 0 2.987-.01 4.04-.06.976-.045 1.505-.207 1.858-.344a3.1 3.1 0 001.15-.748c.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.05-1.055.06-1.37.06-4.041 0-2.67-.01-2.986-.06-4.04-.045-.976-.207-1.505-.344-1.858a3.1 3.1 0 00-.748-1.15 3.1 3.1 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.05-1.37-.06-4.041-.06zm0 4.595a5.603 5.603 0 110 11.206 5.603 5.603 0 010-11.206zm0 1.802a3.801 3.801 0 100 7.602 3.801 3.801 0 000-7.602zm5.723-1.998a1.31 1.31 0 11-2.62 0 1.31 1.31 0 012.62 0z" />
                </svg>
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.025-3.058-1.865-3.058-1.868 0-2.154 1.459-2.154 2.962v5.7h-3v-11h2.879v1.503h.041c.401-.759 1.379-1.559 2.838-1.559 3.036 0 3.6 1.998 3.6 4.596v6.46z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="text-xs text-white/50">
            © {new Date().getFullYear()} CDO LiCAS — Library Cataloging and
            Information System
          </span>
        </div>
      </div>
    </footer>
  );
};

export default CatalogFooter;