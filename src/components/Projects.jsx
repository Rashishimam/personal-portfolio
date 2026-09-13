import React from 'react';
import { FolderGit2, ExternalLink, ArrowUpRight, Terminal, Sparkles, CheckCircle } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 glow-pill">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Selected Projects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="cyan-gradient-text">GitHub Repositories</span>
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Real software systems, machine learning classification models, and full-stack applications built by Rashish Imam.
          </p>
        </div>

        {/* Large Alternating Projects List */}
        <div className="space-y-12 sm:space-y-16">
          {projects.map((project, index) => {
            const isEven = index % 2 === 1; // Alternating index

            return (
              <div
                key={project.num}
                className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                {/* Background Ambient Radial Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500 pointer-events-none" />

                {/* Alternating Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                  
                  {/* Visual / Mockup Code Window Column */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-[#070c18] to-slate-950 border border-slate-800/90 group-hover:border-cyan-500/30 transition-all duration-300 p-5 sm:p-6 overflow-hidden shadow-xl">
                      {/* Window Controls Bar */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                          <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          {project.codePreview?.file || `${project.title.toLowerCase().replace(/\s+/g, '_')}.js`}
                        </span>
                      </div>

                      {/* Code Visual Snippet */}
                      <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-slate-300 border border-slate-900 overflow-x-auto">
                        <pre className="text-slate-300 leading-relaxed">
                          <code>{project.codePreview?.snippet || `// Repository: ${project.title}\nconst repository = "${project.githubUrl}";\nexport default repository;`}</code>
                        </pre>
                      </div>

                      {/* Highlights Pill List */}
                      {project.highlights && project.highlights.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-1.5">
                          {project.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-400">
                              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Information Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-between ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      {/* Number & Category Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-500/30 group-hover:text-cyan-400/80 transition-colors">
                          {project.num}
                        </span>
                        <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/20 text-cyan-300">
                          {project.category}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-tight">
                        {project.title}
                      </h3>

                      {/* Tagline */}
                      {project.tagline && (
                        <p className="text-sm font-medium text-cyan-400/90 mb-3">
                          {project.tagline}
                        </p>
                      )}

                      {/* Full Description */}
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-xs font-medium px-3 py-1 rounded-lg bg-slate-900/90 text-slate-200 border border-slate-800 group-hover:border-cyan-500/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons with high z-index and direct clickability */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80 relative z-20">
                      {/* Primary Button: View on GitHub */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center gap-2 group/btn pointer-events-auto"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <GithubIcon className="w-4 h-4 text-white" />
                        <span>View on GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>

                      {/* Secondary Live Demo Button (ONLY if real live demo exists) */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-20 cursor-pointer px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white font-medium text-xs sm:text-sm transition-all duration-200 inline-flex items-center gap-1.5 pointer-events-auto"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        </a>
                      )}
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* GitHub Full Profile Banner */}
        <div className="mt-16 glass-panel rounded-2xl p-6 sm:p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6 border border-cyan-500/20 relative z-10">
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              Want to explore more repositories & code?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Visit my GitHub profile to see all contributions, commits, and upcoming projects.
            </p>
          </div>
          <a
            href="https://github.com/Rashishimam"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 cursor-pointer px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all duration-200 shrink-0 pointer-events-auto"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400" />
            <span>github.com/Rashishimam</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
