import React, { useEffect } from 'react';
import { X, ArrowUpRight, BookOpen, Compass, Target, Terminal } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-[#F4F0E6] border-3 border-[#0A0A0A] shadow-brutal-xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent Strip */}
        <div className="w-full h-3 bg-[#304FFE] border-b-2 border-[#0A0A0A]" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b-2 border-[#0A0A0A] flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#0A0A0A] mb-1">
              <span>[ ARCHIVE // 03 ]</span>
              <span className="px-2 py-0.5 bg-[#EFFF00] border border-[#0A0A0A]">
                EXTENDED PROFILE
              </span>
            </div>
            <h3 className="font-heading font-black text-3xl sm:text-4xl text-[#0A0A0A] uppercase tracking-tight">
              AZIM PJ — THE BUILDER
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 border-2 border-[#0A0A0A] bg-[#F4F0E6] shadow-brutal-sm hover:bg-[#0A0A0A] hover:text-white transition-all cursor-pointer"
            aria-label="Close extended about modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto font-mono text-xs sm:text-sm">
          {/* Philosophy Statement */}
          <div className="p-5 border-2 border-[#0A0A0A] bg-white shadow-brutal-sm space-y-3">
            <div className="flex items-center gap-2 font-bold text-[#0A0A0A] uppercase tracking-wider text-xs">
              <Compass className="w-4 h-4 text-[#304FFE]" />
              <span>Core Philosophy</span>
            </div>
            <p className="text-[#0A0A0A] leading-relaxed">
              "Most business ideas die in infinite whiteboard deliberation. Real traction belongs to those who compress the gap between conceptual clarity and tactile execution."
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border-2 border-[#0A0A0A] bg-white space-y-2">
              <div className="font-heading font-black text-sm uppercase text-[#0A0A0A] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#304FFE]" />
                Strategy as Elimination
              </div>
              <p className="text-gray-700 leading-normal">
                Strategy isn’t about deciding what to do; it’s about rigorously deciding what NOT to do. Identifying high-leverage bottlenecks and ignoring vanity noise.
              </p>
            </div>

            <div className="p-4 border-2 border-[#0A0A0A] bg-white space-y-2">
              <div className="font-heading font-black text-sm uppercase text-[#0A0A0A] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#304FFE]" />
                Software as Leverage
              </div>
              <p className="text-gray-700 leading-normal">
                DineBill was born from observing chaotic café billing lines. Code is modern leverage to automate tedious physical workflows.
              </p>
            </div>
          </div>

          {/* Reading & Influences */}
          <div className="p-5 border-2 border-[#0A0A0A] bg-white space-y-3">
            <div className="flex items-center gap-2 font-bold text-[#0A0A0A] uppercase tracking-wider text-xs">
              <BookOpen className="w-4 h-4 text-[#304FFE]" />
              <span>Essential Reading & Intellectual Influences</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="p-2.5 bg-[#F4F0E6] border border-[#0A0A0A]">
                <div className="font-bold">Good Strategy Bad Strategy</div>
                <div className="text-[10px] text-gray-600">Richard Rumelt</div>
              </div>
              <div className="p-2.5 bg-[#F4F0E6] border border-[#0A0A0A]">
                <div className="font-bold">Zero to One</div>
                <div className="text-[10px] text-gray-600">Peter Thiel</div>
              </div>
              <div className="p-2.5 bg-[#F4F0E6] border border-[#0A0A0A]">
                <div className="font-bold">The Design of Everyday Things</div>
                <div className="text-[10px] text-gray-600">Don Norman</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t-2 border-[#0A0A0A] bg-[#F4F0E6] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onConnect();
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#304FFE] text-white font-mono font-bold text-xs uppercase border-2 border-[#0A0A0A] shadow-brutal-sm hover:shadow-brutal cursor-pointer"
          >
            <span>GET IN TOUCH WITH AZIM</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 font-mono text-xs font-bold uppercase bg-white border-2 border-[#0A0A0A] hover:bg-[#EFFF00] transition-colors cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
