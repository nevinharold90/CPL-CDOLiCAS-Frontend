import React from 'react';
import Logo from "../../../assets/logo.png";
import PhoneIcon from "../../../assets/phone.png";
import EmailIcon from "../../../assets/email.png"
import LocationIcon from "../../../assets/gps.png";
import ClockIcon from "../../../assets/clock.png";
import FacebookIcon from "../../../assets/facebook.png";
import MapIcon from "../../../assets/google-maps.png"

const FooterSection = () => {
  return (
    <footer className="bg-[#025aa7] text-white pt-20 pb-12 relative overflow-hidden">
      {/* Subtle decorative pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[40px_40px]"></div>

      <div className="max-w-10/12 mx-auto px-5 md:px-10 lg:px-16 relative scroll-animate">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
        {/* Logo + About Column - BIGGER LOGO + Unique Follow Us */}
        <div className="md:col-span-5">
            <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center justify-center shadow-inner">
                <img 
                    src={Logo} 
                    alt="City Public Library Logo" 
                    className="w-32 h-32"   // Made it even bigger as requested
                />
                </div>
                <div>
                <div className="text-3xl font-bold tracking-tight">City Public Library</div>
                <div className="text-sm text-blue-200">Cagayan de Oro City</div>
                </div>
            </div>

            <p className="text-blue-100 text-[15.5px] leading-relaxed max-w-md">
                The heart of knowledge and community in the City of Golden Friendship since 1950. 
                We inspire minds, preserve heritage, and connect people through stories, learning, and creativity.
            </p>

            {/* Unique Follow Us Section */}
            <div className="mt-10">
                <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-blue-300"></div>
                <h4 className="text-lg font-semibold text-white tracking-wider">FOLLOW OUR JOURNEY</h4>
                <div className="h-px flex-1 bg-blue-300"></div>
                </div>

                <div className="text-blue-200 text-sm mb-5">
                Stay connected with us on Facebook for updates, events, and stories from the library.
                </div>

                <a 
                href="https://www.facebook.com/cagayandeorocitypubliclibrary"   // ← Change this to your real Facebook link
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-all duration-300 w-fit px-6 py-4 rounded-3xl border border-white/20 hover:border-white/40"
                >
                <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                    <img src={FacebookIcon} alt="Facebook" />
                </div>
                <div>
                    <div className="font-semibold text-white">City Public Library CDO</div>
                    <div className="text-blue-200 text-sm">Facebook Page</div>
                </div>
                <div className="ml-4 text-2xl text-blue-200 group-hover:text-white transition-colors">→</div>
                </a>
            </div>
            </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-semibold mb-6 tracking-widest text-blue-200">QUICK LINKS</h4>
            <div className="space-y-3 text-blue-100">
              <a href="/" className="block hover:text-white transition-colors">Home</a>
              <a href="#about-us" className="block hover:text-white transition-colors">About Us</a>
              <a href="#knowledge" className="block hover:text-white transition-colors">Knowledge Corner</a>
              <a href="/catalog" className="block hover:text-white transition-colors">Catalog</a>
              <a href="/events" className="block hover:text-white transition-colors">Events &amp; Programs</a>
              <a href="/gallery" className="block hover:text-white transition-colors">Photo Gallery</a>
            </div>
          </div>

          {/* Contact Information - Highlighted with Google Maps Button */}
          <div className="md:col-span-4">
            <h4 className="text-lg font-semibold mb-6 tracking-widest text-blue-200">GET IN TOUCH</h4>
            
            <div className="space-y-6">
              {/* Location with Google Maps Button */}
              <div className="flex gap-4">
                <div className="w-6 h-6 mt-1 text-blue-300"><img src={LocationIcon} alt="" /></div>
                <div className="flex-1">
                  <div className="font-medium">Main Library</div>
                  <div className="text-blue-100 text-sm leading-tight">
                    Capt. Vicente Roa Street,<br />
                    Cagayan de Oro City, Misamis Oriental
                  </div>
                  
                  {/* Google Maps Button */}
                  <a 
                    href="https://maps.google.com/?q=City+Public+Library+Cagayan+de+Oro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 bg-white text-[#025aa7] hover:bg-gray-100 font-medium px-6 py-3 rounded-2xl transition-all duration-300 text-sm shadow-md"
                  >
                    <img src={MapIcon} alt="" className='w-5 h-5'/> Open in Google Maps
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 mt-1 text-blue-300"><img src={PhoneIcon} alt="" /></div>
                <div>
                  <div className="font-medium">Phone</div>
                  <a href="tel:+63888561234" className="text-blue-100 hover:text-white transition-colors">
                    (088) 856-1234
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 mt-1 text-blue-300"><img src={EmailIcon} alt="" /></div>
                <div>
                  <div className="font-medium">Email</div>
                  <a href="mailto:info@cplcdo.gov.ph" className="text-blue-100 hover:text-white transition-colors">
                    info@cplcdo.gov.ph
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-6 h-6 mt-1 text-blue-300"><img src={ClockIcon} alt="" /></div>
                <div>
                  <div className="font-medium">Opening Hours</div>
                  <div className="text-blue-100 text-sm">
                    Monday – Friday: 8:00 AM – 6:00 PM<br />
                    Saturday: 8:00 AM – 5:00 PM<br />
                    Sunday: Closed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-200">
          <div>
            © {new Date().getFullYear()} City Public Library • Cagayan de Oro City. All Rights Reserved.
          </div>
          
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/accessibility" className="hover:text-white transition-colors">Accessibility</a>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;