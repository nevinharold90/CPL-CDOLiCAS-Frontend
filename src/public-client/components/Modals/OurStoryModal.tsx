// src/components/modals/OurStoryModal.tsx
import { useEffect, useState } from 'react';
import CloseIcon from "../../assets/circle-xmark-1.png";
import CloseHoverIcon from "../../assets/circle-xmark-2.png";
import Book from "../../assets/books.png";
import LibraryImage from "../../assets/cpl-fam.png";

interface OurStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OurStoryModal = ({ isOpen, onClose }: OurStoryModalProps) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'visible';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-lg p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-[82vw] max-h-[92vh] aspect-video overflow-hidden shadow-2xl border border-gray-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#025aa7] via-[#0380d0] to-[#024d8f] z-20" />

        {/* Close Button - Positioned at Top Right (Outside Header) */}
        <button
          onClick={onClose}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute top-8 right-8 z-30 w-16 h-16 flex items-center justify-center rounded-3xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Close modal"
        >
          <img
            src={isHovered ? CloseHoverIcon : CloseIcon}
            alt="Close"
            className="w-6 h-6 transition-all duration-200"
          />
        </button>

        {/* Header */}
        <div className="px-14 pt-12 pb-7 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#025aa7]/10 rounded-3xl flex items-center justify-center flex-shrink-0">
              <img src={Book} alt="Book" className="w-9 h-9" />
            </div>
            <div>
              <div className="inline-flex items-center gap-3 bg-[#025aa7]/10 text-[#025aa7] px-7 py-2.5 rounded-full text-base font-semibold tracking-widest">
                <span className="w-3 h-3 bg-[#025aa7] rounded-full animate-pulse" />
                OUR STORY
              </div>
              <h3 className="text-5xl font-bold text-gray-900 mt-4 leading-none">
                Cagayan de Oro City Public Library
              </h3>
              <p className="text-gray-600 mt-3 text-xl">
                Since 1950 • City of Golden Friendship
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto h-[calc(100%-195px)]">
          {/* Hero Image */}
          <div className="relative h-[380px] bg-gray-900">
            <img 
              src={LibraryImage} 
              alt="Cagayan de Oro City Public Library" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-10 left-14 text-white">
              <p className="text-sm tracking-[3px] uppercase font-medium">Est. 1950</p>
              <p className="text-3xl font-light mt-1">The Heart of Knowledge in Cagayan de Oro City</p>
            </div>
          </div>

          {/* Scrollable Text Content */}
          <div className="px-14 py-12 text-gray-700 leading-relaxed text-[17.5px]">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-14">
              {/* Vision & Mission */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h4 className="text-[#025aa7] text-3xl font-semibold mb-5">Our Vision</h4>
                  <p className="text-lg leading-snug">
                    To be the vibrant heart of Cagayan de Oro — a welcoming space where every mind is inspired, every story is heard, and lifelong learning lights the path to a brighter future for all.
                  </p>
                </div>

                <div>
                  <h4 className="text-[#025aa7] text-3xl font-semibold mb-5">Our Mission</h4>
                  <p className="text-lg leading-snug">
                    We provide free and equitable access to books, information, and ideas that empower our community. We foster curiosity, preserve local heritage, ignite imagination through stories and programs, and build connections that strengthen the social and cultural fabric of Cagayan de Oro.
                  </p>
                </div>
              </div>

              {/* Our Story */}
              <div className="lg:col-span-3 prose prose-lg max-w-none">
                <h4 className="text-3xl font-semibold text-gray-900 mb-6">Our Story</h4>
                
                <p className="mb-7">
                  Since 1950, the Cagayan de Oro City Public Library has served as a beacon of knowledge and community connection in the City of Golden Friendship.
                </p>
                
                <p className="mb-8">
                  What began as a modest collection has grown into a cherished institution that continues to nurture minds, preserve local stories, and inspire generations of readers, students, and dreamers across Northern Mindanao.
                </p>
                
                {/* Add more of your actual story content here */}
              </div>
            </div>

            {/* EST. 1950 Highlight Box */}
            <div className="mt-20 bg-[#025aa7]/5 border border-[#025aa7]/10 rounded-3xl p-9 flex items-center gap-7">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow flex-shrink-0">
                <img src={Book} alt="Book Icon" className="w-12 h-12" />
              </div>
              <div>
                <div className="text-[#025aa7] font-semibold text-3xl">Est. 1950</div>
                <div className="text-gray-700 mt-3 leading-tight text-[17px]">
                  Serving generations of readers, learners, and dreamers in Northern Mindanao for over 75 years.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryModal;