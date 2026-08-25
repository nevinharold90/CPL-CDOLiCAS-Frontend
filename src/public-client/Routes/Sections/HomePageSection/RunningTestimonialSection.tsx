// src/components/RunningTestimonialSection.tsx
import React from 'react';

const testimonials = [
  {
    name: "Maria Santos",
    role: "Product Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback: "The new dashboard is incredibly intuitive. I went from confused to productive in under 10 minutes.",
    rating: 5,
  },
  {
    name: "Alex Rivera",
    role: "Startup Founder",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback: "The speed and responsiveness blew me away. Saves us hours every week.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Marketing Manager",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    feedback: "Finally a tool that actually understands what small teams need.",
    rating: 4,
  },
  {
    name: "James Chen",
    role: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    feedback: "The attention to detail is insane. Every micro-interaction feels thoughtful.",
    rating: 5,
  },
  {
    name: "Aisha Khan",
    role: "Freelance Consultant",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    feedback: "This feature single-handedly replaced three different tools for me.",
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    role: "CTO",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    feedback: "Our whole company adopted it within a week. Learning curve is almost zero.",
    rating: 4,
  },
];


const RunningTestimonialSection = () => {
  // Duplicate ONLY once → this creates the perfect loop
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-linear-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-10 scroll-animate">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-linear-to-r from-[#025aa7]/10 to-blue-500/10 text-[#025aa7] px-6 py-2 rounded-full text-sm font-medium">
            REAL STORIES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-6">
            What People Are Saying
          </h2>
          <p className="text-gray-600 mt-4 text-lg max-w-md mx-auto">
            Don't take our word for it — see how we're making a difference
          </p>
        </div>

        <div className="relative">
          {/* Gradient fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div 
              className="flex gap-6 animate-marquee"
              style={{ animationDuration: '38s' }}   // you can change this
            >
              {allTestimonials.map((t, index) => (
                <div
                  key={index}
                  className="min-w-[280px] max-w-[280px] bg-white border border-gray-100 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex-shrink-0"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-2xl object-cover ring-2 ring-offset-2 ring-white group-hover:ring-[#025aa7]/20 transition-all"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{t.name}</h4>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < t.rating ? 'text-amber-400' : 'text-gray-200'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700 text-[15px] leading-relaxed line-clamp-4">
                    “{t.feedback}”
                  </p>

                  <div className="mt-6 h-px w-10 bg-gradient-to-r from-[#025aa7] to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          Hover to pause • Seamless rotating testimonials
        </p>
      </div>
    </section>
  );
};

export default RunningTestimonialSection;