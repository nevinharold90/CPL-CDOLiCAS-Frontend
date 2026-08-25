// src/components/homepage/PhotoGallerySection.tsx
import CplFam from "../../../assets/cpl-fam.png";
import SearchIcon from "../../../assets/search.png";

const galleryImages = [
  CplFam,
  "/assets/gallery-1.jpg",
  "/assets/gallery-2.jpg",
  "/assets/gallery-3.jpg",
  "/assets/gallery-4.jpg",
  "/assets/gallery-5.jpg",
  "/assets/gallery-6.jpg",
  "/assets/gallery-7.jpg",
];

interface PhotoGallerySectionProps {
  onImageClick: (img: string) => void;
}

const PhotoGallerySection = ({ onImageClick }: PhotoGallerySectionProps) => {
  return (
    <section className="py-35 px-5 md:px-10 lg:px-16 bg-white">
      <div id="gallery" className="max-w-10/12 mx-auto scroll-animate">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[#025aa7] text-sm font-medium tracking-widest">CAPTURED MOMENTS</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Inside Our Library</h2>
            <p className="text-gray-600 mt-3 max-w-md">
              Glimpses of learning, laughter, and community at the Cagayan de Oro City Public Library
            </p>
          </div>
          
          <a href="/gallery" className="group flex items-center gap-3 text-[#025aa7] font-semibold hover:text-[#024d8f] transition-colors">
            View Full Gallery <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {galleryImages.slice(0, 2).map((img, index) => (
            <div
              key={index}
              onClick={() => onImageClick(img)}
              className="group relative overflow-hidden rounded-3xl aspect-16/10 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <img src={img} alt={`Library moment ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium mb-1">
                  <span className="w-2 h-px bg-white/70"></span>
                  MOMENT {index + 1}
                </div>
                <p className="text-lg font-medium leading-tight">A story captured in our halls</p>
              </div>

              <div className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <img src={SearchIcon} alt="Zoom" className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a href="/gallery" className="px-10 py-4 bg-[#025aa7] hover:bg-[#024d8f] text-white font-medium rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-md hover:shadow-lg">
            Explore All Moments
          </a>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallerySection;