import React, { useState, useEffect } from 'react';
import CinematicIntro from './components/CinematicIntro';
import BackgroundGlow from './components/BackgroundGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Check if intro has already been viewed in the current session
    const hasSeenIntro = sessionStorage.getItem('has_seen_rashish_intro');
    if (hasSeenIntro) {
      setShowIntro(false);
      setIsRevealed(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('has_seen_rashish_intro', 'true');
    setShowIntro(false);
    setIsRevealed(true);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      
      {/* 1. Cinematic Loading Intro (Only on initial load) */}
      {showIntro && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* 2. Global Floating Back to Top Button (Fixed over entire screen with z-[9999]) */}
      {!showIntro && <BackToTop />}

      {/* 3. Main Portfolio Application */}
      <div className={`transition-all duration-700 ${isRevealed ? 'animate-app-reveal' : 'opacity-0'}`}>
        {/* Ambient background light orbs and tech grid */}
        <BackgroundGlow />

        {/* Fixed Sticky Header */}
        <Navbar />

        {/* Main Content Area */}
        <main className="relative z-10 flex flex-col">
          {/* Hero Section */}
          <Hero />

          {/* About Me Section */}
          <About />

          {/* Technical Skills Section */}
          <Skills />

          {/* Projects Showcase Section */}
          <Projects />

          {/* Education Timeline Section */}
          <Education />

          {/* Achievements & Experience Section */}
          <Achievements />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>

    </div>
  );
}

export default App;
