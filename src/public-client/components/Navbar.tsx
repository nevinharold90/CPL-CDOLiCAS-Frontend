// src/components/public-client/components/modals/Navbar.tsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Licas from "../assets/Licas.png";
import { useCheckSession } from "../../utils/ActiveStatusChecker";
import api from '../../_api/axios'; 

const linkClass = `group relative inline-block text-gray-700 font-semibold text-[15px] tracking-wide transition-all duration-300 hover:text-[#025aa7] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2.5px] after:bg-[#025aa7] after:rounded-full after:w-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer`;

const contactClass = `group relative inline-block font-semibold text-[15px] tracking-wide 
                      text-white bg-[#025aa7] hover:bg-[#024d8f] px-6 py-2.5 rounded-2xl 
                      transition-all duration-300 hover:shadow-lg cursor-pointer
                      after:content-[''] after:absolute after:left-0 after:-bottom-1 
                      after:h-[2.5px] after:bg-white after:rounded-full after:w-0 
                      after:transition-all after:duration-300 hover:after:w-full`;

interface NavbarProps {
  onOpenContact?: () => void;
  onOpenOurStory?: () => void;
  onOpenLogin?: () => void;
}

function Navbar({ onOpenContact, onOpenOurStory, onOpenLogin }: NavbarProps) {

  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Dropdown state and ref for outside click detection
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isActive, user } = useCheckSession();

  const isHomePage = location.pathname === "/";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sticky header scroll behavior
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

const handleLogout = async () => {
    setLoggingOut(true);

    try {
      // Optional: Call backend to invalidate the Sanctum token
      await api.post('/user/logout');
    } catch (error) {
      console.warn("Backend logout request error, clearing local session anyway:", error);
    } finally {
      // 1. Wipe all stored session data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('user_data');

      // 2. Short 1-second delay so the user sees the backdrop before the refresh
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  return (

    <>
      {loggingOut && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
          <h3 className="text-lg font-semibold text-zinc-100">
            Logging out...
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Clearing session and redirecting
          </p>
        </div>
        )}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out font-normal font-[Poppins] 
        ${showNavbar ? "translate-y-0" : "-translate-y-full"} 
        ${isScrolled ? "bg-white/95 backdrop-blur-lg shadow-xl border-gray-100" : "bg-white shadow-sm"}`}>

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
            {isHomePage ? (
              <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={linkClass}>
                Home
              </button>
            ) : (
              <Link to="/" className={linkClass}>Home</Link>
            )}

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

            {/* Conditional Rendering: User Dropdown or Login */}
            {isActive ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#025aa7] bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer border border-blue-100"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  {/* <span>Welcome, {user?.first_name || "User"}</span> */}
                  <span>Welcome, {user?.first_name || "User"}</span>
                  <svg 
                    className={`w-4 h-4 text-[#025aa7] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{user?.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate("/dashboard");
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#025aa7] transition-colors duration-150 font-medium"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#025aa7] transition-colors duration-150 font-medium"
                    >
                      Profile Settings
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 font-medium"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={onOpenLogin} className={linkClass}>
                Login
              </button>
            )}

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
    </>
  );
}

export default Navbar;