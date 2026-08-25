// src/components/homepage/HeroSection.tsx
import Licas from "../../../assets/Licas.png";
import CatalogIcon from "../../../assets/catalog.png";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface HeroSectionProps {
  keywordInput: string;
  setKeywordInput: (value: string) => void;
  eventsInput: string;
  setEventsInput: (value: string) => void;
  focusedField: "keywords" | "events" | null;
  setFocusedField: (field: "keywords" | "events" | null) => void;
}

const HeroSection = ({
  keywordInput,
  setKeywordInput,
  eventsInput,
  setEventsInput,
  focusedField,
  setFocusedField,
}: HeroSectionProps) => {
  const keywordTags = keywordInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  const eventTags = eventsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

  const showKeywordsPreview = focusedField === "keywords" && keywordTags.length > 0;
  const showEventsPreview = focusedField === "events" && eventTags.length > 0;

  return (
    <section className="py-38 px-5 md:px-10 lg:px-16">
      <div className="max-w-10/12 mx-auto scroll-animate">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_3fr] gap-10 lg:gap-12 items-start">
          <div className="space-y-10 lg:space-y-12 max-w-3xl">
            {/* Logo + Name */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="perspective-distant">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 transition-transform duration-1400 ease-[cubic-bezier(0.22,1,0.36,1)] transform-3d hover:transform-[rotateY(180deg)_scale(1.08)] cursor-pointer">
                  <div className="absolute inset-0 rounded-full overflow-hidden backface-hidden shadow-lg">
                    <img src={Licas} alt="Front Logo" className="w-full h-full object-contain bg-white" />
                  </div>
                  <div className="absolute inset-0 rounded-full overflow-hidden transform-[rotateY(180deg)] backface-hidden shadow-lg">
                    <img src={Licas} alt="Back Logo" className="w-full h-full object-contain bg-gray-100" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-[6px] border-gray-300 transform-[rotateY(90deg)]"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <h5 className="text-black uppercase text-xs sm:text-sm tracking-wider font-medium">Cagayan de Oro</h5>
                <h1 className="text-black uppercase text-xl sm:text-2xl md:text-3xl font-bold leading-tight">Library Cataloging and Information System</h1>
              </div>
            </div>

            {/* Search Area */}
            <div className="space-y-5 relative">
              <div>
                <h2 className="text-[#025aa7] text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Find Your Book</h2>
                <div className="text-gray-600 text-base sm:text-lg mb-6">
                  <p>Search by title, author, or category to discover available books.</p>
                  <p>Easily explore a wide collection and discover the perfect book for you.</p>
                </div>
              </div>

              {/* Catalog Card — styled like a library catalog index card */}
              <div className="relative max-w-4xl mx-auto lg:mx-0">
                <div
                  className="relative rounded-sm border border-[#dce8f2] bg-white shadow-[0_1px_3px_rgba(2,90,167,0.08)] px-6 py-7 sm:px-10 sm:py-9 overflow-hidden"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent, transparent 27px, #eaf1f8 28px)",
                  }}
                >
                  {/* vertical margin rule */}
                  <div className="absolute left-10 top-0 bottom-0 w-px bg-[#025aa7]/30 hidden sm:block" />

                  {/* corner stamp */}
                  <span className="absolute top-5 right-6 sm:right-8 -rotate-6 font-mono text-[10px] tracking-widest uppercase text-[#025aa7]/50 border border-[#025aa7]/30 rounded-sm px-2 py-0.5">
                    Open Access
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:pl-4">
                    <div>
                      <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] text-[#3f7fb3] uppercase mb-2">
                        <img src={CatalogIcon} alt="" className="h-3.5 w-3.5 opacity-70" />
                        Catalog · CDO Library
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#1f2a37]">
                        Browse the full collection
                      </h3>
                      <p className="text-gray-500 text-sm sm:text-base mt-1.5 max-w-sm">
                        Every title, sorted by call number and ready to find — fiction, reference, and periodicals all in one place.
                      </p>

                      {/* quick stats, styled like stamped index fields */}
                      <div className="flex gap-5 sm:gap-8 mt-5 font-mono">
                        <div>
                          <div className="text-lg font-bold text-[#025aa7]">2,400+</div>
                          <div className="text-[10px] tracking-wider uppercase text-gray-400">Titles</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#025aa7]">18</div>
                          <div className="text-[10px] tracking-wider uppercase text-gray-400">Categories</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#025aa7]">Daily</div>
                          <div className="text-[10px] tracking-wider uppercase text-gray-400">New arrivals</div>
                        </div>
                      </div>
                    </div>

                    {/* Stamp-style CTA — opens the catalog route in a new tab */}
                    <a
                      href="/catalog"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group shrink-0 self-start sm:self-auto -rotate-2 hover:rotate-0 focus-visible:rotate-0 transition-transform duration-300 ease-out cursor-pointer inline-block"
                    >
                      <span
                        className="inline-flex items-center gap-2 border-2 border-[#025aa7] text-[#025aa7]
                                   px-6 py-3 rounded-sm font-mono text-xs sm:text-sm font-bold uppercase tracking-widest
                                   group-hover:bg-[#025aa7] group-hover:text-white
                                   group-active:scale-90
                                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#025aa7]
                                   transition-all duration-150"
                      >
                        Go to Catalog
                        <span aria-hidden className="group-hover:translate-x-0.5 transition-transform">
                          ↗
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lottie Animation */}
          <div className="hidden lg:block">
            <div className="w-full h-157.5 rounded-2xl overflow-hidden">
              <DotLottieReact src="/src/public-client/assets/student.lottie" loop autoplay style={{ width: "100%", height: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;