import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
  onSeeAllProjects: () => void;
}

export const PROJECTS: Project[] = [
  {
    id: 'velstrada',
    number: '[ 01 ]',
    title: 'VELSTRADA',
    subtitle: 'LUXURY BRAND —',
    description:
      'A luxury brand focused on timeless design and elevated everyday essentials.',
    tags: ['BRANDING', 'STRATEGY', 'PRODUCT DIRECTION'],
    accentColor: '#EFFF00',
    accentPosition: 'right',
    fullDetails: {
      category: 'Brand Strategy & Identity',
      role: 'Brand Strategist & Creative Director',
      timeline: '2025 – Present',
      overview:
        'VELSTRADA is a modern luxury lifestyle house grounded in understated elegance, structural silhouettes, and enduring material craftsmanship. Stripping away noisy ornamentation to spotlight precision tailoring and raw texture.',
      challenge:
        'Contemporary luxury markets are oversaturated with superficial logo-driven drops and short-lived trend cycles. The objective was to architect a high-longevity brand narrative with strict typographic restraint, premium haptic packaging, and an aspirational yet functional product hierarchy.',
      solution:
        'Engineered an architectural brand identity system using stark monochromatic contrasts, bespoke packaging die-lines, and a curated capsule release schedule that commands premium pricing through intentional scarcity.',
      highlights: [
        'Complete brand identity guidelines and visual positioning bible',
        'Custom tactile packaging specifications and sensory unboxing experience',
        'Direct-to-consumer digital commerce strategy with zero-discount philosophy',
        'Lookbook art direction and minimalist material curation',
      ],
      metrics: [
        '100% Bespoke Brand Artifacts',
        'Ultra-Minimalist Visual Architecture',
        'Sustainable High-Grade Materials',
      ],
    },
  },
  {
    id: 'dinebill',
    number: '[ 02 ]',
    title: 'DineBill',
    subtitle: 'CAFÉ BILLING POS SOFTWARE —',
    description:
      'A simple and efficient billing solution for cafés and small restaurants.',
    tags: ['PRODUCT CONCEPT', 'BUSINESS STRATEGY', 'UI/UX', 'OPERATIONS'],
    accentColor: '#304FFE',
    accentPosition: 'right',
    fullDetails: {
      category: 'Product & SaaS POS Platform',
      role: 'Product Lead & System Architect',
      timeline: '2025 – Present',
      overview:
        'DineBill is a streamlined point-of-sale terminal software built explicitly to eliminate counter congestion, simplify split checks, and maintain zero-latency order dispatch in high-volume urban cafés.',
      challenge:
        'Traditional restaurant POS systems are bloated, require lengthy staff onboarding, run sluggishly on tablet hardware, and crash during peak morning rush hours when internet connections flicker.',
      solution:
        'Designed a high-contrast, thumb-optimized 2-tap billing workflow with instant receipt generation, local-first offline resilience, automated sales reconciliation, and clear visual order tickets for kitchen staff.',
      highlights: [
        'Sub-second order dispatch workflow designed for rapid baristas',
        'Offline-first architecture with background reconciliation',
        'Real-time table assignment & itemized split billing',
        'Integrated inventory telemetry and morning prep warnings',
      ],
      metrics: [
        '< 2s Average Order Checkout',
        'Zero-Latency Offline Mode',
        '99.9% Uptime During Rush Hours',
      ],
    },
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onSeeAllProjects,
}) => {
  return (
    <section
      id="projects"
      className="relative w-full border-b-2 border-[#0A0A0A] bg-[#F4F0E6] py-10 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 sm:pb-14 border-b-2 border-[#0A0A0A]">
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

          <div className="mt-2 sm:mt-0">
            <button
              onClick={onSeeAllProjects}
              className="group inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-[#0A0A0A] hover:text-[#304FFE] transition-colors cursor-pointer"
            >
              <span>SEE ALL PROJECTS</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 pt-6 sm:pt-12">
          {PROJECTS.map((project) => {
            const isYellow = project.accentColor === '#EFFF00';
            return (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative bg-[#F4F0E6] border-2 border-[#0A0A0A] shadow-brutal-md transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                {/* Right Accent Stripe */}
                <div
                  className={`absolute top-0 right-0 bottom-0 w-5 sm:w-12 border-l-2 border-[#0A0A0A] ${
                    isYellow ? 'bg-[#EFFF00]' : 'bg-[#304FFE]'
                  } transition-all duration-300 group-hover:w-7 sm:group-hover:w-14`}
                />

                {/* Card Content with Right Padding to account for accent block */}
                <div className="p-5 sm:p-8 pr-9 sm:pr-18 flex flex-col h-full justify-between space-y-6 sm:space-y-8">
                  <div>
                    {/* Project Number */}
                    <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#0A0A0A] mb-2 sm:mb-4">
                      {project.number}
                    </div>

                    {/* Project Title */}
                    <h3 className="font-heading font-black text-2xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-[#0A0A0A] uppercase leading-tight group-hover:text-[#304FFE] transition-colors">
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#0A0A0A] mt-2 sm:mt-3 uppercase">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="font-mono text-xs sm:text-sm text-[#0A0A0A] leading-relaxed mt-3 sm:mt-4 max-w-md font-medium">
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
                        className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center bg-transparent border-2 border-[#0A0A0A] shadow-brutal-sm group-hover:bg-[#0A0A0A] group-hover:text-white transition-all cursor-pointer"
                      >
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                      </button>

                      {project.id === 'dinebill' && (
                        <a
                          href="https://dinebill.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-2 bg-[#EFFF00] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-brutal-sm font-mono text-[11px] sm:text-xs font-bold tracking-wider hover:bg-[#304FFE] hover:text-white transition-colors flex items-center gap-1.5"
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
                          className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-mono font-bold tracking-wider text-[#0A0A0A] border border-[#0A0A0A] sm:border-2 bg-transparent uppercase"
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
