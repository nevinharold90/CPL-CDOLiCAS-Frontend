// src/pages/EventsPage.tsx
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import OurStoryModal from '../components/Modals/OurStoryModal';
import ContactModal from '../components/Modals/ContactModal';

const allEvents = [
  { 
    id: 1, 
    date: "28", 
    month: "MAR", 
    day: "Saturday", 
    title: "Storytime with Ate Maria", 
    time: "10:00 AM – 11:30 AM", 
    location: "Children’s Hall",
    color: "from-pink-500 to-rose-500",
    description: "Interactive storytelling session for kids aged 4-8 with songs and crafts."
  },
  { 
    id: 2, 
    date: "05", 
    month: "APR", 
    day: "Sunday", 
    title: "Book Fair & Author Meet", 
    time: "2:00 PM – 6:00 PM", 
    location: "Main Lobby",
    color: "from-amber-500 to-orange-500",
    description: "Meet local authors, discover new books, and enjoy special discounts."
  },
  { 
    id: 3, 
    date: "12", 
    month: "APR", 
    day: "Saturday", 
    title: "Teen Book Club: Fantasy Edition", 
    time: "3:30 PM – 5:00 PM", 
    location: "Reading Lounge",
    color: "from-purple-500 to-violet-500",
    description: "Discussing popular fantasy novels with fellow book lovers."
  },
  { 
    id: 4, 
    date: "19", 
    month: "APR", 
    day: "Saturday", 
    title: "Poetry Writing Workshop", 
    time: "1:00 PM – 3:00 PM", 
    location: "Creative Corner",
    color: "from-emerald-500 to-teal-500",
    description: "Learn poetic techniques and create your own pieces with guidance."
  },
];

const EventsPage = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [isOurStoryOpen, setIsOurStoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Modal handlers
  const openOurStoryModal = () => setIsOurStoryOpen(true);
  const closeOurStoryModal = () => setIsOurStoryOpen(false);

  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  // Prevent background scrolling when any modal is open
  useEffect(() => {
    const isAnyModalOpen = isOurStoryOpen || isContactOpen;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOurStoryOpen, isContactOpen]);

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins]">
      
      {/* Navbar */}
      <Navbar 
        onOpenContact={openContactModal}
        onOpenOurStory={openOurStoryModal}
      />

      {/* Hero Section */}
      <div className="bg-[#025aa7] text-white pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/20 px-8 py-3 rounded-full text-sm font-medium mb-6">
            <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
            COMMUNITY CALENDAR
          </div>
          <h1 className="text-6xl font-bold leading-tight">Events & Programs</h1>
          <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
            Discover inspiring workshops, storytelling sessions, book clubs, 
            and meaningful gatherings at the Cagayan de Oro City Public Library.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-8 py-10 flex gap-4 border-b border-gray-100">
        <button 
          onClick={() => setFilter("all")}
          className={`px-8 py-3 rounded-2xl font-medium transition-all ${filter === "all" ? "bg-[#025aa7] text-white shadow-md" : "bg-white hover:bg-gray-100 border border-gray-200"}`}
        >
          All Events
        </button>
        <button 
          onClick={() => setFilter("upcoming")}
          className={`px-8 py-3 rounded-2xl font-medium transition-all ${filter === "upcoming" ? "bg-[#025aa7] text-white shadow-md" : "bg-white hover:bg-gray-100 border border-gray-200"}`}
        >
          Upcoming
        </button>
        <button 
          onClick={() => setFilter("past")}
          className={`px-8 py-3 rounded-2xl font-medium transition-all ${filter === "past" ? "bg-[#025aa7] text-white shadow-md" : "bg-white hover:bg-gray-100 border border-gray-200"}`}
        >
          Past Events
        </button>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group border border-gray-100"
            >
              <div className={`h-3 bg-gradient-to-r ${event.color}`} />
              
              <div className="p-10">
                <div className="flex items-center gap-5 mb-8">
                  <div className="text-7xl font-bold text-gray-900 leading-none">{event.date}</div>
                  <div>
                    <div className="text-2xl font-semibold text-[#025aa7] tracking-widest">{event.month}</div>
                    <div className="text-gray-500">{event.day}</div>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold leading-tight mb-6 group-hover:text-[#025aa7] transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-5 text-gray-600 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="mt-1.5 w-4 h-px bg-gray-300 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1.5 w-4 h-px bg-gray-300 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-[15.5px]">
                  {event.description}
                </p>
              </div>

              <div className="border-t border-gray-100 px-10 py-6 bg-gray-50">
                <button className="w-full py-4 bg-white border-2 border-[#025aa7] text-[#025aa7] rounded-2xl font-medium hover:bg-[#025aa7] hover:text-white transition-all duration-300">
                  Add to My Calendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
};

export default EventsPage;