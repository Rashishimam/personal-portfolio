import React from 'react';

export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top subtle blue radial glow */}
      <div 
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[450px] sm:h-[600px] rounded-full bg-cyan-600/10 blur-[130px] animate-pulse-glow"
      />
      
      {/* Mid-right indigo/cyan ambient orb */}
      <div 
        className="absolute top-[35%] -right-[10%] w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] rounded-full bg-blue-600/8 blur-[150px]"
      />

      {/* Lower-left cyan subtle orb */}
      <div 
        className="absolute top-[70%] -left-[10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-cyan-500/8 blur-[140px]"
      />

      {/* Subtle modern engineering grid backdrop */}
      <div className="absolute inset-0 subtle-grid opacity-30 mask-gradient" />
    </div>
  );
}
