// src/pages/Homepage.tsx
import { useState, lazy, useEffect, useRef } from "react";

// Lazy imports
const AboutUsSection = lazy(() => import("./Sections/AboutUsSection"));
const NewsHighlightsSection = lazy(() => import("./Sections/NewsHighlightsSection"));
const UpcomingEventsSection = lazy(() => import("./Sections/UpcomingEventsSection"));
const KnowdledgeCornerSection = lazy(() => import("./Sections/KnowdledgeCornerSection"));
const PhotoGallerySection = lazy(() => import("./Sections/PhotoGallerySection"));
const RunningTestimonialSection = lazy(() => import("./Sections/RunningTestimonialSection"));
const FeedbackSection = lazy(() => import("./Sections/FeedbackSection"));
const FooterSection = lazy(() => import("./Sections/FooterSection"));

import HeroSection from "./Sections/HeroSection";
import ImageModal from "../components/Modals/ImageModal";
import ContactModal from "../components/Modals/ContactModal";
import FeedbackModal from "../components/Modals/FeedbackModal";
import OurStoryModal from "../components/Modals/OurStoryModal";
import FloatingFeedbackButton from "../components/FloatingFeedbackButton";
import LazySection from "../components/LazySection";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Navbar from "../components/Navbar";
import LoginModal from "../components/Modals/LoginModal";

import api from "../../_api/axios"; // 👈 This is the centralized call for Axios

const Homepage = () => {
  const [keywordInput, setKeywordInput] = useState("");
  const [eventsInput, setEventsInput] = useState("");
  const [focusedField, setFocusedField] = useState<"keywords" | "events" | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [feedbackData, setFeedbackData] = useState<{ rating: number; message: string } | null>(null);

  // Modal States
  const [showContactModal, setShowContactModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const hasCheckedSession = useRef(false);

  const handleFeedbackLoginClick = () => {
  setFeedbackData(null);          // close the feedback modal
  setShowLoginModal(true);        // open the login modal
};

  useEffect(() => {
    // Stop Strict Mode's second execution in dev mode
    if (hasCheckedSession.current) return;
    hasCheckedSession.current = true;

    const checkSession = async () => {
      const token = localStorage.getItem('auth_token');

      if (!token) {
        console.log('Active session:', 'No');
        return;
      }

      try {
        await api.get('/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Active session:', 'Yes');
      } catch (error) {
        console.log('Active session:', 'No');
      }
    };

    checkSession();
  }, []);

  // Prevent background scroll when any modal is open
  useEffect(() => {
    const isAnyModalOpen = showContactModal || 
                          !!selectedImage || 
                          !!feedbackData ||
                          showStoryModal ||
                          showLoginModal;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContactModal, selectedImage, feedbackData, showStoryModal, showLoginModal]);

  // ESC Key to close all modals
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (showContactModal) setShowContactModal(false);
        if (selectedImage) setSelectedImage(null);
        if (feedbackData) setFeedbackData(null);
        if (showStoryModal) setShowStoryModal(false);
        if (showLoginModal) setShowLoginModal(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [showContactModal, selectedImage, feedbackData, showStoryModal, showLoginModal]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins]">
      
      <Navbar 
        onOpenContact={() => setShowContactModal(true)} 
        onOpenLogin={() => setShowLoginModal(true)}
      />

      <HeroSection
        keywordInput={keywordInput}
        setKeywordInput={setKeywordInput}
        eventsInput={eventsInput}
        setEventsInput={setEventsInput}
        focusedField={focusedField}
        setFocusedField={setFocusedField}
      />

      <LazySection>
        <AboutUsSection 
          onOpenStory={() => setShowStoryModal(true)} 
        />
      </LazySection>

      <LazySection><NewsHighlightsSection /></LazySection>
      <LazySection><UpcomingEventsSection /></LazySection>
      <LazySection><KnowdledgeCornerSection /></LazySection>
      <LazySection><PhotoGallerySection onImageClick={setSelectedImage} /></LazySection>
      <LazySection><RunningTestimonialSection /></LazySection>

      <LazySection>
        <FeedbackSection 
          onFeedbackSubmit={(rating, message) => {
            setFeedbackData({ rating, message });
          }} 
        />
      </LazySection>

      <LazySection fallbackHeight="350px">
        <FooterSection />
      </LazySection>

      {/* Modals - All rendered at root level for full page coverage */}
      <ImageModal 
        selectedImage={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />

      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />

      <OurStoryModal 
        isOpen={showStoryModal} 
        onClose={() => setShowStoryModal(false)} 
      />

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {feedbackData && (
        <FeedbackModal
          rating={feedbackData.rating}
          message={feedbackData.message}
          isLoggedIn={false}            // still hardcoded for now – see note below
          onClose={() => setFeedbackData(null)}
          onLoginClick={handleFeedbackLoginClick}
        />
      )}

      <FloatingFeedbackButton />
      <ScrollToTopButton />
    </div>
  );
};

export default Homepage;