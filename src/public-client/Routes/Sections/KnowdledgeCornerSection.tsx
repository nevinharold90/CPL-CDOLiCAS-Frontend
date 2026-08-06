import { Play, BookOpen, Palette, Clock } from 'lucide-react';

const KnowledgeCornerSection = () => {
  const activities = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Storytelling Sessions",
      desc: "Magical stories and legends brought to life by our storytellers",
      type: "Live Storytelling",
      color: "from-blue-500 to-[#025aa7]",
      videoCount: "24 videos"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Arts & Crafts Tutorials",
      desc: "Creative hands-on tutorials: bookmaking, origami, painting & more",
      type: "Tutorial",
      color: "from-violet-500 to-purple-600",
      videoCount: "18 videos"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Historical Tales",
      desc: "Discover the rich history of Cagayan de Oro and the Philippines",
      type: "Historical Video",
      color: "from-amber-500 to-orange-600",
      videoCount: "12 videos"
    }
  ];

  return (
    <section className="py-35 px-5 md:px-10 lg:px-16 bg-linear-to-br from-white via-gray-50 to-white relative overflow-hidden">
      <div id="knowledge" className="max-w-10/12 mx-auto scroll-animate">
        
        {/* Updated Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="uppercase inline-flex items-center gap-3 bg-[#025aa7]/10 text-[#025aa7] px-6 py-2.5 rounded-full text-sm font-medium tracking-widest">
              <span className="w-2 h-2 bg-[#025aa7] rounded-full animate-pulse"></span>
              KNOWLEDGE CORNER
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
              Stories, Creativity &amp; History <span className="text-[#025aa7]">Come Alive</span>
            </h2>
            
            <p className="text-gray-600 mt-4 max-w-2xl text-lg">
              Watch captivating storytelling sessions, fun arts &amp; crafts tutorials, 
              and inspiring historical videos — all made to spark imagination and learning 
              in our community.
            </p>
          </div>

          <a 
            href="/knowledge-corner" 
            className="group flex items-center gap-3 text-[#025aa7] font-semibold hover:text-[#024d8f] transition-colors text-lg mt-4 md:mt-0 whitespace-nowrap"
          >
            Explore All Videos 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 cursor-pointer">
          {activities.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
            >
              {/* Colored Accent Bar */}
              <div className={`h-2 bg-linear-to-r ${item.color}`} />

              {/* Video Thumbnail Area */}
              <div className="relative h-64 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/30 to-transparent z-10" />
                
                {/* Gradient Background */}
                <div className={`w-full h-full bg-linear-to-br ${item.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* Big Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-20 h-20 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-[#025aa7] ml-1" fill="#025aa7" />
                  </div>
                </div>

                {/* Video Count */}
                <div className="absolute top-6 right-6 bg-black/70 text-white text-xs font-medium px-4 py-1.5 rounded-full backdrop-blur-md">
                  {item.videoCount}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-[#025aa7]/10 text-[#025aa7] rounded-2xl">
                    {item.icon}
                  </div>
                  <span className="inline-block px-3 py-1 text-xs font-medium tracking-widest bg-gray-100 text-gray-500 rounded-full">
                    {item.type}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-[#025aa7] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Hover Bottom Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#025aa7] to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a 
            href="/knowledge-corner"
            className="inline-flex items-center gap-3 bg-[#025aa7] hover:bg-[#024d8f] text-white font-semibold px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            Browse Full Knowledge Corner
          </a>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeCornerSection;