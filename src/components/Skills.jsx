import React from 'react';
import { Cpu, Code, Database, Wrench, BookOpen, Sparkles, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skillCategories } = portfolioData;

  const categoryIcons = {
    'Programming': <Code className="w-5 h-5 text-cyan-400" />,
    'Web Development': <Terminal className="w-5 h-5 text-blue-400" />,
    'Tools': <Wrench className="w-5 h-5 text-teal-400" />,
    'Computer Science': <BookOpen className="w-5 h-5 text-indigo-400" />,
  };

  return (
    <section id="skills" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3 glow-pill">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & <span className="cyan-gradient-text">Core Knowledge</span>
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-lg">
            Core programming languages, web fundamentals, tools, and computer science subjects
          </p>
        </div>

        {/* 4 Clean Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 relative overflow-hidden group border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300"
            >
              {/* Subtle top border accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-5 pb-3 border-b border-slate-800/70">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                  {categoryIcons[cat.category] || <Sparkles className="w-5 h-5 text-cyan-400" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.category}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Skills Badges List */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all duration-200 flex items-center justify-between gap-3 group/item"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover/item:text-white">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                        {skill.tag}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
