// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import Licas from "../assets/Licas.png";

const linkClass = `group relative inline-block text-gray-700 font-semibold text-[15px] tracking-wide transition-all duration-300 hover:text-[#025aa7] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2.5px] after:bg-[#025aa7] after:rounded-full after:w-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer`;

const contactClass = `group relative inline-block font-semibold text-[15px] tracking-wide 
                     text-white bg-[#025aa7] hover:bg-[#024d8f] px-6 py-2.5 rounded-2xl 
                     transition-all duration-300 hover:shadow-lg cursor-pointer
                     after:content-[''] after:absolute after:left-0 after:-bottom-1 
                     after:h-[2.5px] after:bg-white after:rounded-full after:w-0 
                     after:transition-all after:duration-300 hover:after:w-full`;

interface NavbarProps {
  onOpenContact?: () => void;
  onOpenOurStory?: () => void;     // Only for About Us
}

function Navbar({ onOpenContact, onOpenOurStory }: NavbarProps) {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    let ticking = false;
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(controlNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out font-normal font-[Poppins] 
      ${showNavbar ? "translate-y-0" : "-translate-y-full"} 
      ${isScrolled ? "bg-white/95 backdrop-blur-lg shadow-xl border-gray-100" : "bg-white shadow-sm"} `}>

      <div className="mx-auto px-20 py-5 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => window.location.href = "/"}
        >
          <div className="w-12 h-12">
            <img src={Licas} alt="Licas" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg text-[#025aa7] tracking-tight">CDO LiCAS</div>
            <div className="text-[10px] text-gray-500">Library Cataloging and Information System</div>
          </div>
        </div>

        {/* Menu Links */}
        <div className="space-x-7 hidden md:flex items-center">
          {/* Home Button */}
          {isHomePage ? (
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={linkClass}>
              Home
            </button>
          ) : (
            <Link to="/" className={linkClass}>Home</Link>
          )}

          {/* About Us - Only this one opens modal on other pages */}
          <button 
            onClick={() => {
              if (isHomePage) {
                scrollToSection("about-us");
              } else {
                onOpenOurStory?.();
              }
            }} 
            className={linkClass}
          >
            About Us
          </button>

          {/* Other buttons - Do nothing on non-home pages for now */}
          <button onClick={() => isHomePage && scrollToSection("highlights")} className={linkClass}>
            Highlights
          </button>

          <button onClick={() => isHomePage && scrollToSection("events")} className={linkClass}>
            Events
          </button>

          <button onClick={() => isHomePage && scrollToSection("knowledge")} className={linkClass}>
            Knowledge
          </button>

          <button onClick={() => isHomePage && scrollToSection("gallery")} className={linkClass}>
            Gallery
          </button>

          <Link to="/catalog" className={linkClass}>Catalog</Link>
          <Link to="/donate" className={linkClass}>Donate</Link>

          {/* Contact Us */}
          <button onClick={onOpenContact} className={contactClass}>
            Contact Us
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button className="text-2xl text-gray-700">☰</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;