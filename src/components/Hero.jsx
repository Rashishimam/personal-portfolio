import React from 'react';
import { ArrowDown, ExternalLink, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Hero() {
  const { personal, socialLinks } = portfolioData;

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium mb-8 glow-pill backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{personal.heroBadge}</span>
        </div>

        {/* Name Intro */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-px bg-cyan-500/40" />
          <span className="text-xs sm:text-sm uppercase tracking-widest text-cyan-400 font-mono font-semibold">
            {personal.name} • {personal.role}
          </span>
          <div className="w-6 h-px bg-cyan-500/40" />
        </div>

        {/* Main Bold Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
          Building <span className="cyan-gradient-text">modern digital experiences</span> & solving real-world problems.
        </h1>

        {/* Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 mb-10 leading-relaxed font-normal">
          {personal.heroDescription}
        </p>

        {/* 3 Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {/* Button 1: View My Work */}
          <a
            href="#projects"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm sm:text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 group"
          >
            <span>View My Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Button 2: GitHub Profile */}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white font-medium text-sm sm:text-base shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm group"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          </a>

          {/* Button 3: LinkedIn */}
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-slate-200 hover:text-white font-medium text-sm sm:text-base shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm group"
          >
            <LinkedinIcon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          </a>
        </div>

      </div>
    </section>
  );
}
