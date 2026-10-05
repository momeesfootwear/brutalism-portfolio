import React, { useState } from 'react';
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

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full bg-[#F4F0E6] border-b-2 border-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between">
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

        {/* Desktop Nav Zone */}
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

        {/* Action Zone */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenConnect}
            className="flex items-center gap-1.5 px-5 py-2.5 text-xs lg:text-sm font-bold tracking-wider font-mono text-[#0A0A0A] bg-[#EFFF00] border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover uppercase cursor-pointer"
          >
            <span>LET'S CONNECT</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Hamburger & Quick CTA */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenConnect}
            className="px-2.5 py-1 text-[11px] font-bold font-mono text-[#0A0A0A] bg-[#EFFF00] border-2 border-[#0A0A0A] shadow-brutal-sm cursor-pointer"
          >
            CONNECT ↗
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 border-2 border-[#0A0A0A] bg-white shadow-brutal-sm cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#0A0A0A] bg-[#F4F0E6] px-4 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-2 font-mono text-xs font-bold">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-3 px-3 border-2 text-center transition-all cursor-pointer ${
                  activeSection === link.id
                    ? 'border-[#0A0A0A] bg-[#EFFF00] shadow-brutal-sm'
                    : 'border-[#0A0A0A] bg-white hover:bg-[#EFFF00]/40'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConnect();
            }}
            className="w-full py-3 bg-[#304FFE] text-white font-mono font-bold text-xs uppercase border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>START A CONVERSATION</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </header>
  );
};
