import React from 'react';
import { Trophy, Award, Briefcase, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Achievements() {
  const { achievements } = portfolioData;

  const getTypeIcon = (category) => {
    if (category.includes('Hackathon')) {
      return <Trophy className="w-5 h-5 text-amber-400" />;
    }
    if (category.includes('Internship')) {
      return <Briefcase className="w-5 h-5 text-cyan-400" />;
    }
    if (category.includes('Certification')) {
      return <CheckCircle className="w-5 h-5 text-emerald-400" />;
    }
    return <Award className="w-5 h-5 text-blue-400" />;
  };

  return (
    <section id="achievements" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Honors & Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Achievements & Experience
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            Hackathons, Smart India Hackathon, internships, certifications, and technical milestones
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header with Icon & Category */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                      {getTypeIcon(item.category)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Issuer & Date */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800/60">
                  <span className="font-medium text-slate-300">{item.issuer}</span>
                  <span>•</span>
                  <span className="font-mono text-cyan-300/80">{item.date}</span>
                  {item.badge && (
                    <>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-700 text-[11px] font-medium">
                        {item.badge}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Action Link / Proof if available */}
              {item.link && item.link !== '#' && (
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>View Credential / Proof</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
