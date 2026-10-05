import React from 'react';

export const SKILLS_LIST = [
  'Business Strategy',
  'Branding & Marketing',
  'Product Development',
  'Research & Analysis',
  'UI/UX Thinking',
  'Content Strategy',
  'Presentation Design',
  'Communication & Storytelling',
];

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full border-b-2 border-[#0A0A0A] bg-[#F4F0E6] py-10 sm:py-20 lg:py-24"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 sm:pb-14 border-b-2 border-[#0A0A0A] gap-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2 font-mono font-bold text-xs sm:text-base text-[#0A0A0A]">
              <span className="w-[2px] h-5 sm:h-6 bg-[#0A0A0A] inline-block mr-1" />
              <span>04</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#0A0A0A] uppercase flex items-baseline">
              <span>SKILLS</span>
              <span className="w-2 sm:w-3 h-2 sm:h-3 ml-1 bg-[#304FFE] rounded-full inline-block" />
            </h2>
          </div>

          <div className="mt-1 sm:mt-0 font-mono text-xs sm:text-sm font-bold tracking-widest text-[#0A0A0A] uppercase">
            ALWAYS LEARNING —
          </div>
        </div>

        {/* 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 pt-6 sm:pt-12 w-full max-w-full min-w-0">
          {SKILLS_LIST.map((skillName) => (
            <div
              key={skillName}
              className="w-full min-w-0 text-center p-2.5 xs:p-3 sm:p-5 font-mono text-[10px] xs:text-[11px] sm:text-sm font-bold tracking-wide uppercase border-2 border-[#0A0A0A] bg-[#F4F0E6] shadow-brutal-sm hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white transition-all duration-150 select-none flex items-center justify-center min-h-[48px] sm:min-h-[58px] break-words leading-tight"
            >
              <span className="break-words line-clamp-2 sm:line-clamp-none">{skillName}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
