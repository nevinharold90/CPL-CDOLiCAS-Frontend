// src/components/ContactModal.tsx
import { useState, useEffect } from 'react';
import Book from "../../assets/book.png";
import CloseIcon from "../../assets/circle-xmark-1.png";
import CloseHoverIcon from "../../assets/circle-xmark-2.png";   // Change this if you have a different hover icon

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCloseHovered, setIsCloseHovered] = useState(false);

  // ESC Key support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Thank you! Your message has been sent to City Public Library.");
      setFormData({ name: '', email: '', subject: '', message: '' });
      onClose();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row min-h-[500px]">
          
          {/* Left Side - Contact Info */}
          <div className="bg-[#025aa7] md:w-5/12 p-10 text-white flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <img src={Book} alt="Library" className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">Get in Touch</h2>
                <p className="text-blue-100 mt-1">City Public Library</p>
              </div>
            </div>

            <div className="space-y-8 mt-auto">
              <div>
                <h3 className="uppercase text-xs tracking-widest text-blue-200 mb-4">Contact Information</h3>
                
                <a href="mailto:info@citylibrarycdo.gov.ph" className="flex items-start gap-4 group mb-6 hover:bg-white/10 p-3 -mx-3 rounded-2xl transition-all">
                  <div className="text-3xl mt-0.5">✉️</div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-blue-100 group-hover:text-white">info@citylibrarycdo.gov.ph</div>
                  </div>
                </a>

                <a href="tel:+63882234567" className="flex items-start gap-4 group mb-6 hover:bg-white/10 p-3 -mx-3 rounded-2xl transition-all">
                  <div className="text-3xl mt-0.5">📞</div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-blue-100 group-hover:text-white">(088) 223-4567</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 hover:bg-white/10 p-3 -mx-3 rounded-2xl transition-all">
                  <div className="text-3xl mt-0.5">📍</div>
                  <div>
                    <div className="font-medium">Visit Us</div>
                    <div className="text-blue-100">Capistrano Street, Cagayan de Oro City</div>
                    <div className="text-xs text-blue-200 mt-2">Mon - Sat • 8:00 AM - 5:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form + Close Button Inside This Panel */}
          <div className="md:w-7/12 p-10 bg-white flex flex-col relative">
            
            {/* Close Button - Inside Right Content, Top Right */}
            <button
              onClick={onClose}
              onMouseEnter={() => setIsCloseHovered(true)}
              onMouseLeave={() => setIsCloseHovered(false)}
              className="flex items-center justify-end cursor-pointer"
            >
              <img 
                src={isCloseHovered ? CloseHoverIcon : CloseIcon} 
                alt="Close" 
                className="w-5 h-5 transition-all" 
              />
            </button>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col pt-4">
              <div className="space-y-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-[#025aa7] focus:ring-1 outline-none"
                    placeholder="Your full name"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-[#025aa7] focus:ring-1 outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-[#025aa7] focus:ring-1 outline-none text-gray-700"
                >
                  <option value="">What can we help you with?</option>
                  <option value="Membership">Library Membership Inquiry</option>
                  <option value="Book Request">Book / Material Request</option>
                  <option value="Event">Events & Programs</option>
                  <option value="Feedback">Feedback / Suggestion</option>
                  <option value="Other">Other Inquiry</option>
                </select>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-3xl focus:border-[#025aa7] focus:ring-1 outline-none resize-y"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 bg-[#025aa7] hover:bg-[#013f7a] disabled:bg-gray-400 text-white font-medium py-4 rounded-2xl transition-all text-lg"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              We usually reply within 1–2 business days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}