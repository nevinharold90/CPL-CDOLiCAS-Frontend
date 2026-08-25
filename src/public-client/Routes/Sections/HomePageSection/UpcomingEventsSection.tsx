// src/components/homepage/UpcomingEventsSection.tsx
import CalendarIcon2 from "../../../assets/calendar-2.png";

const upcomingEvents = [
  { date: "28", month: "MAR", day: "Saturday", title: "Storytime with Ate Maria", time: "10:00 AM – 11:30 AM", location: "Children’s Hall", color: "from-pink-500 to-rose-500" },
  { date: "05", month: "APR", day: "Sunday", title: "Book Fair & Author Meet", time: "2:00 PM – 6:00 PM", location: "Main Lobby", color: "from-amber-500 to-orange-500" },
  { date: "12", month: "APR", day: "Saturday", title: "Teen Book Club: Fantasy Edition", time: "3:30 PM – 5:00 PM", location: "Reading Lounge", color: "from-purple-500 to-violet-500" },
  { date: "19", month: "APR", day: "Saturday", title: "Poetry Writing Workshop", time: "1:00 PM – 3:00 PM", location: "Creative Corner", color: "from-emerald-500 to-teal-500" },
];

const UpcomingEventsSection = () => {
  return (
    <section className="py-35 px-5 md:px-10 lg:px-16 bg-white">
      <div id="events" className="max-w-10/12 mx-auto scroll-animate">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-3 bg-[#025aa7]/10 text-[#025aa7] px-6 py-2.5 rounded-full text-sm font-medium">
             <span className="w-2 h-2 bg-[#025aa7] rounded-full animate-pulse"></span>
              SAVE THE DATE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">Upcoming Events & Schedule</h2>
            <p className="text-gray-600 mt-3 max-w-lg text-lg">
              Join us for exciting programs, workshops, and community gatherings at the City Public Library.
            </p>
          </div>

          {/* Updated navigation link - both buttons now go to /events */}
          <a 
            href="/events" 
            className="group flex items-center gap-3 text-[#025aa7] font-semibold hover:text-[#024d8f] transition-colors text-lg"
          >
            View Full Calendar <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className={`h-2 bg-linear-to-r ${event.color}`} />
              <div className="px-8 pt-8 pb-6 text-center border-b border-gray-100">
                <div className="flex justify-center items-center gap-3">
                  <div className="text-6xl font-bold text-gray-900 leading-none">{event.date}</div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-[#025aa7] tracking-widest">{event.month}</div>
                    <div className="text-xs text-gray-500">{event.day}</div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-semibold text-xl leading-tight mb-4 min-h-14 group-hover:text-[#025aa7] transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-5 h-px bg-gray-300 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-5 h-px bg-gray-300 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-center">
                <button className="text-[#025aa7] text-sm font-medium hover:text-[#024d8f] transition-colors flex items-center gap-2">
                  Add to Calendar 
                  <img src={CalendarIcon2} alt="Add to Calendar" className="w-5 h-5 opacity-50" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Both buttons now navigate to the full events page */}
        <div className="flex justify-center mt-16">
          <a 
            href="/events" 
            className="px-12 py-4 bg-[#025aa7] hover:bg-[#024d8f] text-white font-medium rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-3 text-lg"
          >
            See All Upcoming Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;