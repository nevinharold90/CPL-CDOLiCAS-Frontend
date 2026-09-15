import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CplFam from "../assets/cpl-fam.png";
import SearchIcon from "../assets/search.png";
import ContactModal from '../components/Modals/ContactModal';
import OurStoryModal from '../components/Modals/OurStoryModal';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: 'events' | 'facilities' | 'community';
  categoryLabel: string;
  date: string;
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'events' | 'facilities' | 'community'>('all');
  const [activeModalImage, setActiveModalImage] = useState<GalleryItem | null>(null);

  // Modal States
  const [isOurStoryOpen, setIsOurStoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openOurStoryModal = () => setIsOurStoryOpen(true);
  const closeOurStoryModal = () => setIsOurStoryOpen(false);

  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  // Prevent background scrolling when any modal is open
  useEffect(() => {
    const isAnyModalOpen = isOurStoryOpen || isContactOpen || activeModalImage !== null;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'visible';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOurStoryOpen, isContactOpen, activeModalImage]);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: CplFam,
      title: "Community Library Family Day Gathering",
      category: "community",
      categoryLabel: "Community",
      date: "October 2025"
    },
    {
      id: 2,
      src: "/assets/gallery-1.jpg",
      title: "Children's Storytelling Hour at the Main Hall",
      category: "events",
      categoryLabel: "Events",
      date: "September 2025"
    },
    {
      id: 3,
      src: "/assets/gallery-2.jpg",
      title: "Quiet Study and Research Section",
      category: "facilities",
      categoryLabel: "Facilities",
      date: "August 2025"
    },
    {
      id: 4,
      src: "/assets/gallery-3.jpg",
      title: "Filipiniana Special Collection Archives Display",
      category: "facilities",
      categoryLabel: "Facilities",
      date: "July 2025"
    },
    {
      id: 5,
      src: "/assets/gallery-4.jpg",
      title: "Youth Bookmaking Workshop & Arts Tutorial",
      category: "events",
      categoryLabel: "Events",
      date: "June 2025"
    },
    {
      id: 6,
      src: "/assets/gallery-5.jpg",
      title: "National Book Week Celebration Opening",
      category: "events",
      categoryLabel: "Events",
      date: "May 2025"
    },
    {
      id: 7,
      src: "/assets/gallery-6.jpg",
      title: "Computer and Digital Literacy Lab Sessions",
      category: "facilities",
      categoryLabel: "Facilities",
      date: "April 2025"
    },
    {
      id: 8,
      src: "/assets/gallery-7.jpg",
      title: "Local Authors Book Signing Event",
      category: "community",
      categoryLabel: "Community",
      date: "March 2025"
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins]">
      <Navbar 
        onOpenContact={openContactModal}
        onOpenOurStory={openOurStoryModal}
      />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#025aa7] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            City Public Library • Captured Moments
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Inside Our Library Gallery
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            Take a visual tour through our learning spaces, community workshops, and special moments shared across Cagayan de Oro.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#025aa7] text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Moments
          </button>
          <button
            onClick={() => setSelectedCategory('events')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              selectedCategory === 'events'
                ? 'bg-[#025aa7] text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Library Events
          </button>
          <button
            onClick={() => setSelectedCategory('facilities')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              selectedCategory === 'facilities'
                ? 'bg-[#025aa7] text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Facilities & Spaces
          </button>
          <button
            onClick={() => setSelectedCategory('community')}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              selectedCategory === 'community'
                ? 'bg-[#025aa7] text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Community
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalImage(item)}
              className="group relative overflow-hidden rounded-3xl aspect-4/3 bg-slate-900 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] uppercase tracking-widest font-semibold px-2.5 py-0.5 bg-white/20 rounded-md backdrop-blur-md">
                    {item.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">{item.date}</span>
                </div>
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
              </div>

              <div className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-md">
                <img src={SearchIcon} alt="Zoom" className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {activeModalImage && (
          <div 
            onClick={() => setActiveModalImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-200"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setActiveModalImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-all cursor-pointer text-lg font-bold"
              >
                ✕
              </button>

              <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img 
                  src={activeModalImage.src} 
                  alt={activeModalImage.title} 
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 bg-blue-500/20 text-blue-400 rounded-md">
                      {activeModalImage.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400">{activeModalImage.date}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">{activeModalImage.title}</h2>
                </div>
                <button
                  onClick={() => setActiveModalImage(null)}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modals */}
      <OurStoryModal 
        isOpen={isOurStoryOpen} 
        onClose={closeOurStoryModal} 
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={closeContactModal} 
      />
    </div>
  );
}