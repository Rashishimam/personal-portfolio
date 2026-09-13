import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after user scrolls down past 200px
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollTop > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // Fallback for some mobile browsers
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] p-3 sm:p-3.5 rounded-xl bg-[#080d1a]/95 hover:bg-cyan-950/90 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:text-cyan-200 backdrop-blur-xl shadow-xl shadow-black/80 hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center cursor-pointer group pointer-events-auto select-none ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 hover:-translate-y-1 hover:scale-110 active:scale-95'
          : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
    </button>
  );
}
