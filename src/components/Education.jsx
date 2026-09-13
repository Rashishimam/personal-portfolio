import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Education
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            Undergraduate computer science and engineering coursework
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-28 space-y-10">
          {education.map((item, index) => (
            <div key={item.id || index} className="relative pl-6 sm:pl-8 group">
              
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-200" />

              {/* Date Badge on Desktop (Left Side) */}
              <div className="hidden sm:block absolute -left-32 top-1 text-right w-24">
                <span className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 font-semibold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                  {item.year}
                </span>
              </div>

              {/* Education Card */}
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7">
                
                {/* Mobile Date Badge */}
                <div className="sm:hidden mb-2">
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 font-semibold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                    <Calendar className="w-3 h-3" />
                    {item.year}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.degree}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 w-fit">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>{item.period}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-cyan-300 font-medium mb-4">
                  <span className="text-slate-200">{item.institution}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {item.location}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Coursework Tags */}
                {item.coursework && item.coursework.length > 0 && (
                  <div className="pt-4 border-t border-slate-800/70">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2.5">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Relevant Coursework</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.coursework.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
