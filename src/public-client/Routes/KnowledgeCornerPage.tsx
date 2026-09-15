import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, BookOpen, Palette, Clock, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import ContactModal from '../components/Modals/ContactModal';
import OurStoryModal from '../components/Modals/OurStoryModal';

export default function KnowledgeCornerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  // Modal States
  const [isOurStoryOpen, setIsOurStoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openOurStoryModal = () => setIsOurStoryOpen(true);
  const closeOurStoryModal = () => setIsOurStoryOpen(false);

  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  // Sync state if URL search params change externally
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Mock video dataset representing library media content
  const allVideos = [
    {
      id: 1,
      title: "The Legend of the Golden Cowrie",
      category: "storytelling",
      categoryLabel: "Live Storytelling",
      duration: "18 mins",
      views: "1.2k views",
      desc: "Magical folklore and regional legends brought to life by local city storytellers.",
      color: "from-blue-500 to-[#025aa7]"
    },
    {
      id: 2,
      title: "Traditional Paper Bookmaking & Repair",
      category: "arts-crafts",
      categoryLabel: "Tutorial",
      duration: "25 mins",
      views: "850 views",
      desc: "Learn hands-on bookbinding techniques, page conservation, and basic origami.",
      color: "from-violet-500 to-purple-600"
    },
    {
      id: 3,
      title: "Historical Archives: Cagayan de Oro in World War II",
      category: "history",
      categoryLabel: "Historical Video",
      duration: "42 mins",
      views: "3.4k views",
      desc: "A deep dive into local heritage, historical landmarks, and accounts from regional archives.",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 4,
      title: "Mindanao Children's Literature Hour",
      category: "storytelling",
      categoryLabel: "Live Storytelling",
      duration: "15 mins",
      views: "920 views",
      desc: "Engaging reading sessions designed to stimulate early childhood imagination and vocabulary.",
      color: "from-blue-500 to-[#025aa7]"
    },
    {
      id: 5,
      title: "Creative Bookmark Design using Recycled Materials",
      category: "arts-crafts",
      categoryLabel: "Tutorial",
      duration: "12 mins",
      views: "640 views",
      desc: "An eco-friendly arts and crafts session teaching kids and teens how to craft custom art bookmarks.",
      color: "from-violet-500 to-purple-600"
    },
    {
      id: 6,
      title: "The Heritage Buildings of Capistrano Street",
      category: "history",
      categoryLabel: "Historical Video",
      duration: "30 mins",
      views: "2.1k views",
      desc: "Tracing architectural histories and milestones that shaped the city center over decades.",
      color: "from-amber-500 to-orange-600"
    }
  ];

  // Filter videos based on category tab & search input
  const filteredVideos = allVideos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          video.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins]">
      {/* Pass modal triggers to Navbar if your Navbar supports them */}
      <Navbar 
        onOpenOurStory={openOurStoryModal} 
        onOpenContact={openContactModal} 
      />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#025aa7] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            City Public Library • Video Library
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Knowledge Corner Directory
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            Browse our full catalog of educational sessions, creative crafting tutorials, and historical documentaries.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#025aa7] text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Videos
            </button>
            <button
              onClick={() => handleCategoryChange('storytelling')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'storytelling'
                  ? 'bg-[#025aa7] text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Storytelling
            </button>
            <button
              onClick={() => handleCategoryChange('arts-crafts')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'arts-crafts'
                  ? 'bg-[#025aa7] text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Palette className="w-4 h-4" /> Arts & Crafts
            </button>
            <button
              onClick={() => handleCategoryChange('history')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategory === 'history'
                  ? 'bg-[#025aa7] text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" /> History
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search video titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div 
                key={video.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-slate-900 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${video.color} opacity-30 group-hover:opacity-40 transition-opacity`} />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                        <Play className="w-6 h-6 text-[#025aa7] ml-0.5" fill="#025aa7" />
                      </div>
                    </div>

                    <div className="absolute top-4 left-4 bg-black/60 text-white text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-md">
                      {video.duration}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-md">
                      {video.views}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider bg-blue-50 text-[#025aa7] rounded-full mb-3">
                      {video.categoryLabel}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#025aa7] transition-colors line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                      {video.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button className="w-full bg-slate-50 hover:bg-[#025aa7] hover:text-white text-[#025aa7] font-medium py-2.5 rounded-xl transition-all text-sm border border-slate-100 cursor-pointer">
                    Watch Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100">
            <p className="text-slate-500 text-base">No videos found matching your criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSearchParams({}); }}
              className="mt-4 text-[#025aa7] font-medium text-sm underline cursor-pointer"
            >
              Reset filters
            </button>
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