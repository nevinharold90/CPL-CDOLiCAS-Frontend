// src/components/Sections/AboutUsSection.tsx
import CplFam from "../../../assets/cpl-fam.png";
import Book from "../../../assets/books.png";

interface AboutUsSectionProps {
  onOpenStory?: () => void;
}

const AboutUsSection = ({ onOpenStory }: AboutUsSectionProps) => {
  return (
    <section className="py-35 px-5 md:px-10 lg:px-16 bg-white scroll-mt-24">
      <div id="about-us" className="max-w-10/12 mx-auto scroll-animate">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-[#025aa7]/10 text-[#025aa7] px-6 py-2.5 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-[#025aa7] rounded-full animate-pulse"></span>
            ABOUT OUR LIBRARY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Cagayan de Oro City Public Library
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl text-lg">
            The heart of knowledge and community in the City of Golden Friendship
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
              <div>
                <h3 className="text-[#025aa7] text-3xl font-semibold mb-4">Our Vision</h3>
                <p>
                  The Cagayan de Oro City Public Library envisions a future where every member of our community is informed, engaged, and inspired. We aspired to be the most trusted and dynamic hub of knowdledge and cultural exchange, actively shaping a resilient and thriving community for generations to come.
                </p>
              </div>
              <div>
                <h3 className="text-[#025aa7] text-3xl font-semibold mb-4">Our Mission</h3>
                <p>
                  The mission of the City Public Library is to enrich, educate, and empower our diverse community by providing equitable access to resources, fostering lifelong learning, and serving as a welcoming, essential center for connection, information, and creativity.
                </p>
              </div>
            </div>

            <button 
              onClick={onOpenStory}
              className="cursor-pointer inline-flex items-center gap-3 text-[#025aa7] font-semibold hover:text-[#024d8f] transition-colors group text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#025aa7]/50"
            >
              Discover Our Story 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="relative">
            <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <img src={CplFam} alt="Cagayan de Oro City Public Library" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-60 border border-gray-100 hidden xl:block">
              <div className="flex items-center gap-4">
                <div className="w-20 h-12 bg-[#025aa7] text-white rounded-2xl flex items-center justify-center text-3xl">
                  <img src={Book} alt="Library Icon" className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">Est. 1950</div>
                  <div className="text-sm text-gray-500">Serving the City of Golden Friendship</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;