import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

interface ContactSectionProps {
  onOpenMessageModal: () => void;
  onCopyEmail: () => void;
  onOpenAdmin: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenMessageModal,
  onCopyEmail,
  onOpenAdmin,
}) => {
  const socials = [
    { name: 'INSTAGRAM', url: 'https://www.instagram.com/pj_azim/' },
    {
      name: 'LINKEDIN',
      url: 'https://www.linkedin.com/in/ahmed-azim-parayangattil-931477359',
    },
    { name: 'YOUTUBE', url: 'https://youtube.com' },
  ];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#F4F0E6] py-10 sm:py-20 lg:py-28"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Number 06 & Massive Heading (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row">
            {/* Desktop Vertical 06 Indicator */}
            <div className="hidden sm:flex flex-col items-center mr-6 sm:mr-8 select-none shrink-0">
              <span className="font-mono text-sm sm:text-base font-bold mb-2 text-[#0A0A0A]">
                06
              </span>
              <div className="w-[2px] h-20 sm:h-28 bg-[#0A0A0A]" />
            </div>

            {/* Mobile Horizontal 06 Indicator */}
            <div className="sm:hidden flex items-center gap-2 mb-3 font-mono font-bold text-xs">
              <span className="px-2 py-0.5 bg-[#0A0A0A] text-white">06</span>
              <span className="w-8 h-[2px] bg-[#0A0A0A]" />
              <span className="text-[#0A0A0A] tracking-wider uppercase">GET IN TOUCH</span>
            </div>

            {/* Giant Title */}
            <div className="space-y-1">
              <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.5rem] leading-[0.88] tracking-tighter text-[#0A0A0A] uppercase select-none">
                <div>LET'S</div>
                <div className="flex items-baseline">
                  <span>TALK</span>
                  <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ml-1 bg-[#304FFE] rounded-full inline-block" />
                </div>
              </h2>
            </div>
          </div>

          {/* Middle Column: Description & CTAs (col-span-5) */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <p className="font-mono text-xs sm:text-base text-[#0A0A0A] leading-relaxed max-w-md font-medium">
              Have a project, idea or just want to talk?
              <br />
              I'm always open to interesting conversations.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={onOpenMessageModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#304FFE] text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <span>SEND A MESSAGE</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onCopyEmail}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F4F0E6] text-[#0A0A0A] font-mono font-bold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <span>EMAIL ME</span>
                <Mail className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Social Links with Left Divider Line on Desktop, Clean Brutalist Grid on Mobile (col-span-3) */}
          <div className="lg:col-span-3 lg:border-l-2 lg:border-[#0A0A0A] lg:pl-8 pt-2 lg:pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2.5 font-mono text-xs sm:text-sm lg:text-base font-bold">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 lg:p-0 lg:py-1 border-2 border-[#0A0A0A] lg:border-none bg-white lg:bg-transparent shadow-brutal-sm lg:shadow-none text-[#0A0A0A] hover:text-[#304FFE] hover:bg-[#EFFF00] lg:hover:bg-transparent transition-all active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span className="tracking-wider">{social.name}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Quiet Footer Note */}
        <div className="mt-12 sm:mt-24 pt-6 sm:pt-8 border-t-2 border-[#0A0A0A] flex flex-col sm:flex-row items-center justify-between text-xs font-mono font-semibold text-[#0A0A0A] gap-3 sm:gap-4 text-center sm:text-left">
          <div>© {new Date().getFullYear()} AZIM PJ. ALL RIGHTS RESERVED.</div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <span>STRATEGY · BRANDING · PRODUCTS</span>
            <button
              onClick={onOpenAdmin}
              className="text-[11px] font-mono font-bold tracking-wider text-gray-500 hover:text-[#0A0A0A] transition-colors cursor-pointer px-2 py-0.5 border border-transparent hover:border-[#0A0A0A]"
            >
              [ ADMIN CONSOLE ]
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
