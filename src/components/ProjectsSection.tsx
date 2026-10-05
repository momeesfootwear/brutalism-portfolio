import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { DEFAULT_PROJECTS } from '../constants/defaultData';

export { DEFAULT_PROJECTS };
export const PROJECTS = DEFAULT_PROJECTS;

interface ProjectsSectionProps {
  projects?: Project[];
  onSelectProject: (project: Project) => void;
  onSeeAllProjects: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onSeeAllProjects,
}) => {
  const displayProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

  return (
    <section
      id="projects"
      className="relative w-full border-b-2 border-[#0A0A0A] bg-[#F4F0E6] py-10 sm:py-20 lg:py-24"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 sm:pb-14 border-b-2 border-[#0A0A0A] gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Arrow & Number */}
            <div className="flex items-center gap-1.5 sm:gap-2 font-mono font-bold text-xs sm:text-base text-[#0A0A0A]">
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              <span>02</span>
            </div>

            {/* Title */}
            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#0A0A0A] uppercase flex items-baseline">
              <span>PROJECTS</span>
              <span className="w-2 sm:w-3 h-2 sm:h-3 ml-1 bg-[#304FFE] rounded-full inline-block" />
            </h2>
          </div>

          <div className="mt-1 sm:mt-0">
            <button
              onClick={onSeeAllProjects}
              className="group inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-[#0A0A0A] hover:text-[#304FFE] transition-colors cursor-pointer"
            >
              <span>SEE ALL PROJECTS ({displayProjects.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 pt-6 sm:pt-12">
          {displayProjects.map((project) => {
            const isYellow = project.accentColor === '#EFFF00';
            const hasLiveUrl = Boolean(project.liveUrl) || project.id === 'dinebill';
            const liveUrlTarget = project.liveUrl || 'https://dinebill.vercel.app/';

            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative bg-[#F4F0E6] border-2 border-[#0A0A0A] shadow-brutal-md transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer flex flex-col justify-between overflow-hidden active:translate-x-0 active:translate-y-0"
              >
                {/* Right Accent Stripe */}
                <div
                  className={`absolute top-0 right-0 bottom-0 w-3.5 sm:w-12 border-l-2 border-[#0A0A0A] ${
                    isYellow ? 'bg-[#EFFF00]' : 'bg-[#304FFE]'
                  } transition-all duration-300 group-hover:w-5 sm:group-hover:w-14`}
                />

                {/* Card Content with Right Padding to account for accent block */}
                <div className="p-4 xs:p-6 sm:p-8 pr-7 xs:pr-9 sm:pr-18 flex flex-col h-full justify-between space-y-5 sm:space-y-8">
                  <div>
                    {/* Project Number & Category Badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-4">
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#0A0A0A]">
                        {project.number}
                      </span>
                      {project.fullDetails?.category && (
                        <span className="font-mono text-[9px] xs:text-[10px] px-2 py-0.5 border border-[#0A0A0A] bg-white font-semibold text-[#0A0A0A] uppercase truncate max-w-[180px] sm:max-w-[240px]">
                          {project.fullDetails.category}
                        </span>
                      )}
                    </div>

                    {/* Project Title */}
                    <h3 className="font-heading font-black text-2xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-[#0A0A0A] uppercase leading-tight group-hover:text-[#304FFE] transition-colors break-words">
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#0A0A0A] mt-1.5 sm:mt-3 uppercase">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="font-mono text-xs sm:text-sm text-[#0A0A0A] leading-relaxed mt-2.5 sm:mt-4 max-w-md font-medium">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom Action & Tags */}
                  <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* Square Arrow Button */}
                      <button
                        type="button"
                        aria-label={`Open ${project.title} details`}
                        className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center bg-transparent border-2 border-[#0A0A0A] shadow-brutal-sm group-hover:bg-[#0A0A0A] group-hover:text-white transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                      >
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                      </button>

                      {hasLiveUrl && (
                        <a
                          href={liveUrlTarget}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-2 bg-[#EFFF00] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-brutal-sm font-mono text-[11px] sm:text-xs font-bold tracking-wider hover:bg-[#304FFE] hover:text-white transition-colors flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5"
                        >
                          <span>VISIT APP</span>
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </a>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] xs:text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#0A0A0A] border border-[#0A0A0A] sm:border-2 bg-transparent uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
