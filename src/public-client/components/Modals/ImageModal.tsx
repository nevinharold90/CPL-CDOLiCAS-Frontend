// src/components/homepage/ImageModal.tsx

interface ImageModalProps {
  selectedImage: string | null;
  onClose: () => void;
}

const ImageModal = ({ selectedImage, onClose }: ImageModalProps) => {
  if (!selectedImage) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-100 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-14 right-4 text-white text-5xl hover:text-gray-300 transition-colors">×</button>
        <img src={selectedImage} alt="Gallery photo enlarged" className="w-full max-h-[85vh] object-contain rounded-3xl shadow-2xl" />
      </div>
    </div>
  );
};

export default ImageModal;