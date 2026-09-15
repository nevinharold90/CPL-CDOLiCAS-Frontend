import { useState, useEffect } from 'react';
import Book from "../../assets/book.png";
import CloseIcon from "../../assets/circle-xmark-1.png";
import CloseHoverIcon from "../../assets/circle-xmark-2.png";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          onMouseEnter={() => setIsCloseHovered(true)}
          onMouseLeave={() => setIsCloseHovered(false)}
          className="cursor-pointer p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all absolute top-4 right-4 z-20 flex items-center justify-center"
          aria-label="Close modal"
        >
          <img 
            src={isCloseHovered ? CloseHoverIcon : CloseIcon} 
            alt="Close" 
            className="w-4 h-4 transition-all" 
          />
        </button>

        <div className="flex flex-col md:flex-row">
          
          {/* Left Side - Modern Sidebar Info */}
          <div className="bg-gradient-to-br from-slate-900 to-[#025aa7] md:w-5/12 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-3.5 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/15 shadow-inner">
                  <img src={Book} alt="Library" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Get in Touch</h2>
                  <p className="text-blue-200 text-sm">City Public Library</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Have questions about memberships, book availability, or upcoming community events? Reach out to our team.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10">
              <a href="mailto:info@citylibrarycdo.gov.ph" className="flex items-center gap-3.5 group p-2.5 -mx-2.5 rounded-xl hover:bg-white/10 transition-all">
                <span className="text-lg bg-white/10 p-2 rounded-lg">✉️</span>
                <div className="overflow-hidden">
                  <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Email Us</div>
                  <div className="text-sm text-slate-100 group-hover:text-white truncate">info@citylibrarycdo.gov.ph</div>
                </div>
              </a>

              <a href="tel:+63882234567" className="flex items-center gap-3.5 group p-2.5 -mx-2.5 rounded-xl hover:bg-white/10 transition-all">
                <span className="text-lg bg-white/10 p-2 rounded-lg">📞</span>
                <div>
                  <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Call Us</div>
                  <div className="text-sm text-slate-100 group-hover:text-white">(088) 223-4567</div>
                </div>
              </a>

              <div className="flex items-start gap-3.5 p-2.5 -mx-2.5 rounded-xl">
                <span className="text-lg bg-white/10 p-2 rounded-lg mt-0.5">📍</span>
                <div>
                  <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Location & Hours</div>
                  <div className="text-sm text-slate-100">Capistrano St, Cagayan de Oro</div>
                  <div className="text-xs text-blue-200 mt-1">Mon - Sat • 8:00 AM - 5:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Form */}
          <div className="md:w-7/12 p-8 sm:p-10 bg-white flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-800">Send us a message</h3>
                <p className="text-slate-500 text-sm mt-0.5">Fill out the form below and we'll get back to you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/20 outline-none transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/20 outline-none transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/20 outline-none text-slate-700 transition-all"
                  >
                    <option value="">Select an inquiry type...</option>
                    <option value="Membership">Library Membership Inquiry</option>
                    <option value="Book Request">Book / Material Request</option>
                    <option value="Event">Events & Programs</option>
                    <option value="Feedback">Feedback / Suggestion</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/20 outline-none resize-none transition-all"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#025aa7] hover:bg-[#014582] active:scale-[0.99] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20 text-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>

            <p className="text-center text-xs text-slate-400 mt-6">
              We typically respond within 1–2 business days.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}