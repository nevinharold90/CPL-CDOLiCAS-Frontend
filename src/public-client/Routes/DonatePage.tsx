import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ContactModal from '../components/Modals/ContactModal';
import OurStoryModal from '../components/Modals/OurStoryModal';

export default function DonatePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    donationCategory: 'Mixed Genres / General Library Collection',
    estimatedQuantity: '10+',
    condition: 'Good (Readable & Complete Pages)',
    bookSummary: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Modal States
  const [isOurStoryOpen, setIsOurStoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openOurStoryModal = () => setIsOurStoryOpen(true);
  const closeOurStoryModal = () => setIsOurStoryOpen(false);

  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  // Prevent background scrolling when any modal is open
  useEffect(() => {
    const isAnyModalOpen = isOurStoryOpen || isContactOpen;
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'visible';
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOurStoryOpen, isContactOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-[Poppins]">
      <Navbar 
        onOpenContact={openContactModal}
        onOpenOurStory={openOurStoryModal}
      />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#025aa7] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            City Public Library • Fast Donation Drive
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Share the Gift of Knowledge
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            Got a box or collection of mixed books? Donate them quickly and easily to help expand our community learning catalog across Cagayan de Oro.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-xl mb-6 text-[#025aa7]">
                📦
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Mixed Genres Welcome</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Don't worry about cataloging individual titles. We accept diverse bundles, personal libraries, and mixed collections.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-[#025aa7]">
              Fast and hassle-free
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-xl mb-6 text-[#025aa7]">
                📍
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Easy Drop-Off</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Submit this quick form to notify us, then drop off your books at our Capistrano Street main desk anytime.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-[#025aa7]">
              Capistrano St, CDO
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-xl mb-6 text-[#025aa7]">
                📜
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Official Recognition</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                All donors receive an official certificate of appreciation issued by the City Library administration.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-[#025aa7]">
              Government acknowledged
            </div>
          </div>
        </div>

        {/* Donation Form Section */}
        <div className="bg-white max-w-3xl mx-auto rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/80 px-8 py-6 border-b border-slate-100">
            <h3 className="text-xl font-bold text-slate-900">Quick Book Donation Form</h3>
            <p className="text-slate-500 text-sm mt-1">Just tell us roughly what you're donating and we'll handle the rest!</p>
          </div>

          {isSubmitted ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Donation Notice Received!</h3>
              <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed mb-8">
                Thank you for your generous contribution. A library staff member will email you confirmation details for your drop-off.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', donationCategory: 'Mixed Genres / General Library Collection', estimatedQuantity: '10+', condition: 'Good (Readable & Complete Pages)', bookSummary: '', message: '' });
                }}
                className="bg-[#025aa7] hover:bg-[#014582] text-white px-8 py-3 rounded-xl font-medium text-sm transition-all cursor-pointer"
              >
                Submit Another Donation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
              
              {/* Personal Information */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-[#025aa7] flex items-center justify-center text-xs">1</span>
                  Your Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Juan dela Cruz"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="juan@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/20 outline-none transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0912 345 6789"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Simplified Bundle Details */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-[#025aa7] flex items-center justify-center text-xs">2</span>
                  Book Bundle Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Primary Collection Type</label>
                    <select
                      name="donationCategory"
                      value={formData.donationCategory}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/20 outline-none text-slate-700 transition-all"
                    >
                      <option value="Mixed Genres / General Library Collection">Mixed Genres / General Collection</option>
                      <option value="Children's & Young Adult Books">Children's & Young Adult Books</option>
                      <option value="Academic Textbooks & References">Academic Textbooks & References</option>
                      <option value="Filipiniana & Local History">Filipiniana & Local History</option>
                      <option value="Novels & Fiction">Novels & Fiction</option>
                      <option value="Other / Miscellaneous Bundle">Other / Miscellaneous Bundle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Estimated Quantity</label>
                    <select
                      name="estimatedQuantity"
                      value={formData.estimatedQuantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-[#025aa7] focus:ring-2 focus:ring-[#025aa7]/20 outline-none text-slate-700 transition-all"
                    >
                      <option value="1-5 books">1 - 5 books</option>
                      <option value="6-10 books">6 - 10 books</option>
                      <option value="10+">10+ books (Box/Bundle)</option>
                      <option value="Multiple Boxes">Multiple Boxes</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#025aa7] hover:bg-[#014582] text-white py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting Donation...' : 'Submit Donation Notice'}
              </button>
            </form>
          )}
        </div>
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