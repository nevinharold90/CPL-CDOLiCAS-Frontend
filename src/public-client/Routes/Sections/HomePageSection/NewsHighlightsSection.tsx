// src/components/homepage/NewsHighlightsSection.tsx
import { useState, useEffect } from "react";
import CplFam from "../../../assets/cpl-fam.png";

const newsHighlights = [
  { image: CplFam, category: "HIGHLIGHT", title: "Community Reading Day", desc: "Hundreds of families gathered for our monthly storytelling session." },
  { image: "/assets/national-library-update.jpg", category: "NATIONAL NEWS", title: "New Digital Collection", desc: "Free access to over 5,000 digitized rare books from the National Library." },
  { image: "/assets/children-workshop.jpg", category: "EVENT", title: "Summer Reading Workshop 2026", desc: "Registration is now open for our free summer program." },
  { image: "/assets/library-renovation.jpg", category: "LIBRARY UPDATE", title: "Renovation Completed", desc: "New children’s section and study area now open." },
];

const NewsHighlightsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsHighlights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-35 px-5 md:px-10 lg:px-16 bg-gray-50">
      <div id="highlights" className="max-w-10/12 mx-auto scroll-animate">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#025aa7] text-sm font-medium tracking-widest">LATEST NEWS & HIGHLIGHTS</div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">Stories from Our Library</h2>
        </div>

        <div className="relative h-140 md:h-170 rounded-3xl overflow-hidden shadow-2xl">
          {newsHighlights.map((item, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"}`}>
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 text-white">
                <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium tracking-widest mb-4">{item.category}</div>
                <h3 className="text-4xl md:text-5xl font-semibold leading-tight mb-4 max-w-2xl">{item.title}</h3>
                <p className="text-lg text-white/90 max-w-lg">{item.desc}</p>
              </div>
            </div>
          ))}

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {newsHighlights.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === i ? "bg-white scale-125 shadow-md" : "bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHighlightsSection;