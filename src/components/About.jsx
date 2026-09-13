import React from 'react';
import { User, CheckCircle2, Terminal, BookOpen, Layers, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { about, personal } = portfolioData;

  return (
    <section id="about" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3 glow-pill">
            <User className="w-3.5 h-3.5" />
            <span>Profile Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {about.title}
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            {about.subtitle}
          </p>
        </div>

        {/* About Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story Text Card */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-slate-500 font-mono ml-2">rashish_imam_profile.md</span>
            </div>

            <div className="space-y-4 text-slate-300 leading-relaxed pt-2">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-sm sm:text-base font-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Focus Areas Chips */}
            <div className="pt-6 border-t border-slate-800/80">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Academic & Technical Focus</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.focusAreas.map((focus, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900/80 text-cyan-200 border border-cyan-500/20 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Side Cards: Snapshot & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {about.highlights.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover rounded-2xl p-5 text-center flex flex-col justify-center items-center"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1">
                    {stat.value}
                  </span>
                  <span className="text-xs font-bold text-slate-200 tracking-wider">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    {stat.helper}
                  </span>
                </div>
              ))}
            </div>

            {/* Student Snapshot Card */}
            <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{personal.name}</h4>
                  <p className="text-xs text-slate-400">{personal.role}</p>
                </div>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-500">Degree</span>
                  <span className="text-slate-300 font-medium">B.Tech in CSE</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-400 font-medium">3rd Year Student</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Collaboration</span>
                  <span className="text-cyan-300 font-medium">Open to Internships</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
