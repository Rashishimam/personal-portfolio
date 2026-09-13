import React, { useState, useEffect } from 'react';

export default function CinematicIntro({ onComplete }) {
  const [step, setStep] = useState(0); 
  // 0: Initial black screen
  // 1: Background cyan glow appears
  // 2: "RASHISH" starts revealing letter by letter
  // 3: "IMAM" starts revealing
  // 4: Laser line expands & Subtitle appears
  // 5: Exit transition begins
  // 6: Intro finished & unmount

  const firstName = "RASHISH";
  const lastName = "IMAM";

  useEffect(() => {
    // Step 1: Subtle glow begins (at 150ms)
    const t1 = setTimeout(() => setStep(1), 150);

    // Step 2: "RASHISH" letter-by-letter starts (at 400ms)
    const t2 = setTimeout(() => setStep(2), 400);

    // Step 3: "IMAM" letter-by-letter starts (at 1100ms)
    const t3 = setTimeout(() => setStep(3), 1050);

    // Step 4: Line expands and Subtitle fades in (at 1600ms)
    const t4 = setTimeout(() => setStep(4), 1600);

    // Step 5: Hold finished title and begin cinematic fade/zoom exit (at 2500ms)
    const t5 = setTimeout(() => setStep(5), 2500);

    // Step 6: Complete intro and hand over to main portfolio (at 3100ms)
    const t6 = setTimeout(() => {
      setStep(6);
      onComplete();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStep(6);
    onComplete();
  };

  if (step === 6) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#04070e] select-none overflow-hidden transition-all ${
        step === 5 ? 'animate-cinematic-exit pointer-events-none' : ''
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div
        className={`absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none transition-all duration-1000 ${
          step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      />

      {/* Secondary Deep Blue Accent Glow */}
      <div
        className={`absolute w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-blue-600/10 blur-[90px] pointer-events-none transition-all duration-1000 delay-300 ${
          step >= 3 ? 'opacity-100 scale-110' : 'opacity-0 scale-50'
        }`}
      />

      {/* Subtle Film Grain Overlay */}
      <div className="absolute inset-0 subtle-grid opacity-15 pointer-events-none" />

      {/* Center Cinematic Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
        
        {/* Name Container */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider text-white">
          
          {/* First Name: RASHISH */}
          <div className="flex items-center">
            {firstName.split('').map((char, index) => (
              <span
                key={index}
                className={step >= 2 ? 'animate-intro-letter' : 'opacity-0'}
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  {char}
                </span>
              </span>
            ))}
          </div>

          {/* Last Name: IMAM */}
          <div className="flex items-center">
            {lastName.split('').map((char, index) => (
              <span
                key={index}
                className={step >= 3 ? 'animate-intro-letter' : 'opacity-0'}
                style={{
                  animationDelay: `${index * 85}ms`,
                }}
              >
                <span className="cyan-gradient-text drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                  {char}
                </span>
              </span>
            ))}
          </div>

        </div>

        {/* Thin Expanding Laser Line Underneath */}
        <div className="w-full max-w-[320px] sm:max-w-[480px] h-[1.5px] mt-4 sm:mt-5 overflow-hidden flex items-center justify-center">
          <div
            className={`h-full w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent ${
              step >= 4 ? 'animate-laser-line' : 'opacity-0 scale-x-0'
            }`}
          />
        </div>

        {/* Subtitle: COMPUTER SCIENCE & ENGINEERING */}
        <div className="mt-3.5 sm:mt-4 h-6">
          <p
            className={`text-[10px] sm:text-xs md:text-sm font-semibold uppercase text-cyan-200/90 font-mono ${
              step >= 4 ? 'animate-subtitle' : 'opacity-0'
            }`}
          >
            Computer Science & Engineering
          </p>
        </div>

      </div>

      {/* Skip Button in Top Right */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 text-[11px] font-mono text-slate-500 hover:text-cyan-400 px-3 py-1.5 rounded-lg bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 transition-all duration-200"
      >
        Skip [ESC]
      </button>

    </div>
  );
}
