import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import portraitImg from '../assets/images/azim_pj_portrait_1790919863456.jpg';

interface AboutSectionProps {
  onMoreAboutMe: () => void;
  portraitUrl?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onMoreAboutMe,
  portraitUrl,
}) => {
  const [hoveredFocus, setHoveredFocus] = useState<number | null>(null);

  const displayPortrait = portraitUrl || portraitImg;

  const focusList = [
    { number: '01', title: 'Business Strategy' },
    { number: '02', title: 'Branding' },
    { number: '03', title: 'Marketing' },
    { number: '04', title: 'Product Development' },
    { number: '05', title: 'Research & Analysis' },
    { number: '06', title: 'Design & Execution' },
  ];

  return (
    <section
      id="about"
      className="relative w-full border-b-2 border-[#0A0A0A] bg-[#F4F0E6] py-10 sm:py-20 lg:py-24"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="flex items-center gap-3 sm:gap-4 pb-6 sm:pb-16 border-b-2 border-[#0A0A0A]">
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono font-bold text-xs sm:text-base text-[#0A0A0A]">
            <span className="w-[2px] h-5 sm:h-6 bg-[#0A0A0A] inline-block mr-1" />
            <span>03</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#0A0A0A] uppercase flex items-baseline">
            <span>ABOUT ME</span>
            <span className="w-2 sm:w-3 h-2 sm:h-3 ml-1 bg-[#304FFE] rounded-full inline-block" />
          </h2>
        </div>

        {/* 3-Column Content Layout (reorganized on mobile with orders) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center pt-8 sm:pt-16">
          
          {/* Column 2 on desktop / Order 1 on mobile: Exact Portrait */}
          <div className="order-1 lg:order-2 lg:col-span-4 flex justify-center">
            <div className="relative group max-w-[220px] xs:max-w-[260px] sm:max-w-[320px] w-full">
              {/* Offset Background Accent Frame */}
              <div className="relative bg-[#304FFE] border-2 border-[#0A0A0A] shadow-brutal-md sm:shadow-brutal-lg p-2 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[10px_10px_0px_#0A0A0A]">
                <div className="relative aspect-square overflow-hidden bg-[#304FFE] border-2 border-[#0A0A0A]">
                  <img
                    src={displayPortrait}
                    alt="Azim PJ - Portrait"
                    className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply transition-all duration-300 group-hover:grayscale-0 group-hover:mix-blend-normal"
                    loading="lazy"
                  />
                  {/* Subtle Grain Overlay */}
                  <div className="absolute inset-0 bg-[#304FFE]/10 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Column 1 on desktop / Order 2 on mobile: Bio & CTA */}
          <div className="order-2 lg:order-1 lg:col-span-4 space-y-6 sm:space-y-8 flex flex-col justify-between">
            <p className="font-mono text-xs sm:text-base text-[#0A0A0A] leading-relaxed font-medium">
              A student and aspiring entrepreneur interested in business
              strategy, branding, marketing and consumer psychology. I enjoy
              turning ideas into structured plans and bringing them to life
              through design, research and execution.
            </p>

            <div>
              <button
                onClick={onMoreAboutMe}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F4F0E6] text-[#0A0A0A] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <span>MORE ABOUT ME</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Column 3 on desktop / Order 3 on mobile: Focused On List */}
          <div className="order-3 lg:order-3 lg:col-span-4 space-y-4 sm:space-y-6">
            <div className="font-mono font-bold text-xs sm:text-sm tracking-widest text-[#0A0A0A] uppercase border-b-2 border-[#0A0A0A] pb-2 sm:pb-3">
              FOCUSED ON —
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 font-mono">
              {focusList.map((item, index) => {
                const isHovered = hoveredFocus === index;
                return (
                  <div
                    key={item.number}
                    onMouseEnter={() => setHoveredFocus(index)}
                    onMouseLeave={() => setHoveredFocus(null)}
                    className={`flex items-center justify-between p-2.5 sm:p-3 border-2 border-[#0A0A0A] transition-all duration-150 select-none ${
                      isHovered
                        ? 'bg-[#EFFF00] shadow-brutal-sm -translate-x-1 -translate-y-1'
                        : 'bg-white shadow-xs'
                    }`}
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#0A0A0A]">
                      {item.title}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-500">
                      [{item.number}]
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
