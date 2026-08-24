// src/components/homepage/HeroSection.tsx
import Licas from "../../assets/Licas.png";
import SearchIcon from "../../assets/search.png";
import CalendarIcon from "../../assets/calendar.png";
import CategoryIcon from "../../assets/category.png";
import CatalogIcon from "../../assets/catalog.png";
import DownIcon from "../../assets/down.png";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect } from "react";

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

  
  // const hasToken = Boolean(localStorage.getItem("auth_token"));

  // console.log("Active token present from HeroSection:", hasToken);

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

                <div className="rounded-xl border border-gray-300 p-2 lg:p-2 max-w-4xl mx-auto lg:mx-0">
                  <div className="hidden lg:block">
                    <div className="flex items-center rounded-lg overflow-hidden">
                      <div className="flex items-center divide-x divide-gray-200 flex-1">
                        {/* Keywords */}
                        <div className="flex-1 px-6 py-5 relative">
                          <div className="text-sm font-bold text-gray-700 mb-1">Keywords</div>
                          <input
                            type="text"
                            placeholder="e.g. Harry Potter, mystery, fantasy"
                            className="w-full outline-none text-gray-800 placeholder:text-sm placeholder-gray-500 text-base pr-12 leading-6"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            onFocus={() => setFocusedField("keywords")}
                            onBlur={() => setFocusedField(null)}
                          />
                          <div className="absolute right-0 top-14 -translate-y-1/2 pr-4 pointer-events-none">
                            <img src={SearchIcon} alt="Search" className="h-5 w-5 opacity-50" />
                          </div>
                        </div>

                        {/* Events */}
                        <div className="flex-1 px-6 py-5 relative">
                          <div className="text-sm font-bold text-gray-700 mb-1">Events</div>
                          <input
                            type="text"
                            placeholder="e.g. story time, book fair, reading club"
                            className="w-full outline-none text-gray-800 placeholder:text-sm placeholder-gray-500 text-base pr-12 leading-6"
                            value={eventsInput}
                            onChange={(e) => setEventsInput(e.target.value)}
                            onFocus={() => setFocusedField("events")}
                            onBlur={() => setFocusedField(null)}
                          />
                          <div className="absolute right-0 top-14 -translate-y-1/2 pr-4 pointer-events-none">
                            <img src={CalendarIcon} alt="Calendar" className="h-5 w-5 opacity-50" />
                          </div>
                        </div>

                        {/* Category */}
                        <div className="flex-1 px-6 py-5 relative">
                          <div className="text-sm font-bold text-gray-700 mb-1">Category</div>
                          <select className="w-full outline-none text-sm text-gray-700 bg-transparent appearance-none cursor-pointer pr-12 leading-6">
                            <option value="" disabled selected>Select category</option>
                            <option>Fiction</option>
                            <option>Non-Fiction</option>
                            <option>Children</option>
                            <option>Reference</option>
                          </select>
                          <div className="absolute right-0 top-14 -translate-y-1/2 pr-4 pointer-events-none">
                            <img src={CategoryIcon} alt="Category" className="h-5 w-5 opacity-50" />
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-5 flex items-center bg-gray-50">
                        <button className="bg-[#025aa7] hover:bg-[#024d8f] text-white font-medium px-10 py-3 rounded-lg transition-colors whitespace-nowrap">
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Keywords Preview */}
                {showKeywordsPreview && (
                  <div className="absolute z-20 mt-2 lg:left-6 w-auto min-w-70 max-w-[45%] origin-top-left transition-all duration-200">
                    <div className="absolute -top-2 left-10 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-300 shadow-sm" />
                    <div className="bg-white/95 backdrop-blur-md rounded-xl border border-gray-200 shadow-xl p-5">
                      <div className="flex flex-wrap gap-2.5">
                        {keywordTags.map((tag, index) => (
                          <span key={index} className="inline-block px-3.5 py-1.5 rounded-full text-sm font-medium bg-linear-to-r from-blue-50 to-indigo-50 text-blue-800 border border-blue-200/70 shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Events Preview */}
                {showEventsPreview && (
                  <div className="absolute z-20 mt-2 lg:left-[38%] w-auto min-w-70 max-w-[45%] origin-top-left transition-all duration-200">
                    <div className="absolute -top-2 left-10 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-300 shadow-sm" />
                    <div className="bg-white/95 backdrop-blur-md rounded-xl border border-gray-200 shadow-xl p-5">
                      <div className="flex flex-wrap gap-2.5">
                        {eventTags.map((tag, index) => (
                          <span key={index} className="inline-block px-3.5 py-1.5 rounded-full text-sm font-medium bg-linear-to-r from-purple-50 to-pink-50 text-purple-800 border border-purple-200/70 shadow-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center">
                <div className="text-gray-400 font-medium text-md">or</div>
              </div>

              {/* Catalog Button */}
              <div className="rounded-xl border border-gray-300 p-2 lg:p-2 max-w-4xl mx-auto lg:mx-0">
                <button
                  onClick={() => window.location.href = "/catalog"}
                  className="w-full text-left flex items-center relative px-6 py-5 hover:bg-gray-50 transition-colors rounded-lg cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex gap-1 items-center">
                      <div className="text-sm font-bold text-gray-700">Catalog</div>
                      <img src={CatalogIcon} alt="Catalog" className="h-5 w-5 opacity-50" />
                    </div>
                    <div className="text-base text-gray-500 mt-1">Browse full catalog →</div>
                  </div>
                  <div className="pointer-events-none">
                    <img src={DownIcon} alt="Down" className="h-5 w-5 opacity-50" />
                  </div>
                </button>
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