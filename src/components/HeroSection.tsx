import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroSectionProps {
  onViewWork: () => void;
  onAboutMe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewWork,
  onAboutMe,
}) => {
  const { scrollY } = useScroll();

  // Subtle scroll-driven parallax translations and tilts
  const blueCardY = useTransform(scrollY, [0, 500], [0, 45]);
  const blueCardRotate = useTransform(scrollY, [0, 500], [4, 7]);
  const yellowCardY = useTransform(scrollY, [0, 500], [0, -30]);
  const yellowCardRotate = useTransform(scrollY, [0, 500], [-3, -6]);

  return (
    <section
      id="home"
      className="relative w-full border-b-2 border-[#0A0A0A] bg-[#F4F0E6] overflow-hidden"
    >
      <div className="site-container py-10 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Section Number Line & Left Column */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row">
            {/* Desktop / Tablet Vertical 01 Indicator Line (hidden on small mobile) */}
            <div className="hidden sm:flex flex-col items-center mr-6 sm:mr-10 select-none shrink-0">
              <div className="w-[2px] h-12 bg-[#0A0A0A]" />
              <span className="font-mono text-sm sm:text-base font-bold my-2 text-[#0A0A0A]">
                01
              </span>
              <div className="w-[2px] flex-1 min-h-[140px] bg-[#0A0A0A]" />
            </div>

            {/* Mobile Horizontal 01 Indicator Badge */}
            <div className="sm:hidden flex items-center gap-2 mb-4 font-mono font-bold text-xs">
              <span className="px-2 py-0.5 bg-[#0A0A0A] text-white">01</span>
              <span className="w-8 h-[2px] bg-[#0A0A0A]" />
              <span className="text-[#0A0A0A] tracking-wider uppercase">STRATEGIST & BUILDER</span>
            </div>

            {/* Hero Copy */}
            <div className="space-y-5 sm:space-y-8 flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1 sm:space-y-2 select-none"
              >
                <h1 className="font-heading font-black text-[2.25rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[7.2rem] leading-[0.88] tracking-tighter text-[#0A0A0A] uppercase break-words">
                  <div>IDEAS</div>
                  <div>INTO</div>
                  <div className="text-[#304FFE] flex items-baseline">
                    <span>IMPACT</span>
                    <span className="text-[#0A0A0A]">.</span>
                  </div>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-xs sm:text-base md:text-lg text-[#0A0A0A] max-w-xl leading-relaxed font-medium break-words"
              >
                Exploring business, strategy, branding and technology to turn
                ideas into real-world impact.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2 w-full sm:w-auto"
              >
                <button
                  onClick={onViewWork}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#304FFE] text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  <span>VIEW MY WORK</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={onAboutMe}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F4F0E6] text-[#0A0A0A] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                >
                  <span>ABOUT ME</span>
                  <ArrowDown className="w-4 h-4 stroke-[2.5]" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Overlapping Dynamic Neobrutalist Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[280px] xs:min-h-[320px] sm:min-h-[440px] lg:min-h-[500px] mt-4 lg:mt-0 w-full max-w-full overflow-hidden sm:overflow-visible py-4 sm:py-0">
            {/* Background Blue Card */}
            <motion.div
              style={{
                y: blueCardY,
                rotate: blueCardRotate,
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="absolute w-[180px] xs:w-[220px] sm:w-[320px] md:w-[340px] h-[230px] xs:h-[280px] sm:h-[400px] md:h-[420px] bg-[#304FFE] border-2 border-[#0A0A0A] shadow-brutal sm:shadow-brutal-lg p-3.5 xs:p-4 sm:p-6 flex flex-col justify-between select-none z-10"
            >
              <div className="flex justify-end">
                <span className="font-mono font-bold text-white text-[11px] xs:text-xs sm:text-base tracking-widest">
                  [ 01 ]
                </span>
              </div>
              <div className="text-right space-y-0.5 xs:space-y-1 font-mono font-bold text-[10px] xs:text-xs sm:text-sm tracking-widest text-[#0A0A0A]">
                <div>A STUDENT</div>
                <div>STRATEGIST</div>
                <div>BUILDER.</div>
                <div className="text-sm sm:text-lg">—</div>
              </div>
            </motion.div>

            {/* Foreground Acid Yellow Card (Angled & Overlapping) */}
            <motion.div
              style={{
                y: yellowCardY,
                rotate: yellowCardRotate,
              }}
              whileHover={{ scale: 1.04, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              className="relative w-[150px] xs:w-[180px] sm:w-[250px] md:w-[270px] bg-[#EFFF00] border-2 border-[#0A0A0A] shadow-brutal sm:shadow-brutal-lg p-3.5 xs:p-4 sm:p-7 select-none z-20 -mr-2 xs:-mr-4 sm:-mr-24 -mt-6 xs:-mt-8 sm:-mt-20 cursor-grab active:cursor-grabbing"
            >
              <div className="font-mono font-bold text-[10px] xs:text-xs sm:text-sm tracking-wider text-[#0A0A0A] space-y-1 xs:space-y-1.5 sm:space-y-2 uppercase leading-snug">
                <div>BUSINESS</div>
                <div>BRANDING</div>
                <div>STRATEGY</div>
                <div>EXECUTION.</div>
              </div>
              <div className="mt-3 xs:mt-4 sm:mt-8 pt-2 sm:pt-4 border-t-2 border-[#0A0A0A] flex items-center justify-between text-[8px] xs:text-[9px] sm:text-xs font-mono font-bold text-[#0A0A0A]">
                <span>MINDSET</span>
                <span>2026</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
