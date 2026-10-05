import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenConnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenConnect,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full bg-[#F4F0E6] border-b-2 border-[#0A0A0A]">
      <div className="site-container h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Zone */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="group flex items-center text-xl sm:text-2xl lg:text-3xl font-heading font-black tracking-tight text-[#0A0A0A] select-none cursor-pointer"
        >
          <span>AZIM PJ</span>
          <span className="inline-block w-2 sm:w-2.5 h-2 sm:h-2.5 ml-1 bg-[#304FFE] rounded-full transition-transform duration-200 group-hover:scale-125" />
        </a>

        {/* Desktop Nav Zone (100% Unchanged Desktop Web) */}
        <nav className="hidden md:flex items-center space-x-8 text-xs lg:text-sm font-semibold tracking-wider text-[#0A0A0A]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="relative py-2 font-mono uppercase cursor-pointer hover:text-[#304FFE] transition-colors"
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#304FFE]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Zone (100% Unchanged Desktop Web) */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenConnect}
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs lg:text-sm font-bold tracking-wider font-mono text-[#0A0A0A] bg-[#EFFF00] border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover uppercase cursor-pointer"
          >
            <span>LET'S CONNECT</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Hamburger & Quick CTA (Refined Mobile UX) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenConnect}
            className="px-3 py-1.5 text-xs font-bold font-mono text-[#0A0A0A] bg-[#EFFF00] border-2 border-[#0A0A0A] shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
          >
            CONNECT ↗
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center border-2 border-[#0A0A0A] bg-white shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Polished Mobile UX) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#0A0A0A] bg-[#F4F0E6] px-4 py-5 space-y-4 shadow-brutal-lg animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 font-mono text-xs font-bold">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`py-3.5 px-3 border-2 text-center transition-all cursor-pointer min-h-[46px] flex items-center justify-center uppercase active:scale-[0.98] ${
                    isActive
                      ? 'border-[#0A0A0A] bg-[#EFFF00] text-[#0A0A0A] shadow-brutal-sm font-black'
                      : 'border-[#0A0A0A] bg-white text-[#0A0A0A] hover:bg-[#EFFF00]/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConnect();
            }}
            className="w-full py-3.5 bg-[#304FFE] text-white font-mono font-bold text-xs uppercase border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>START A CONVERSATION</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </header>
  );
};
