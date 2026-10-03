import React, { useEffect } from 'react';
import { X, ArrowUpRight, Check, ExternalLink, Globe, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const isVelstrada = project.id === 'velstrada';
  const isDineBill = project.id === 'dinebill';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#F4F0E6] border-3 border-[#0A0A0A] shadow-brutal-xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div
          className={`w-full h-3 border-b-2 border-[#0A0A0A] ${
            project.accentColor === '#EFFF00' ? 'bg-[#EFFF00]' : 'bg-[#304FFE]'
          }`}
        />

        {/* Modal Header */}
        <div className="p-4 sm:p-8 border-b-2 border-[#0A0A0A] flex items-start justify-between bg-white gap-3">
          <div className="space-y-1 sm:space-y-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#0A0A0A]">
                {project.number}
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-semibold px-2 py-0.5 border border-[#0A0A0A] bg-[#F4F0E6]">
                {project.fullDetails.category}
              </span>
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-5xl text-[#0A0A0A] uppercase tracking-tight">
              {project.title}
            </h3>

            <p className="font-mono text-xs sm:text-sm font-bold text-[#0A0A0A] tracking-wider uppercase">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 border-2 border-[#0A0A0A] bg-[#F4F0E6] shadow-brutal-sm hover:bg-[#0A0A0A] hover:text-white transition-all shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 border-2 border-[#0A0A0A] bg-[#F4F0E6] font-mono text-xs">
            <div>
              <div className="text-gray-600 font-semibold uppercase text-[10px] sm:text-xs">Role</div>
              <div className="font-bold text-[#0A0A0A] mt-0.5 sm:mt-1 text-[11px] sm:text-xs">
                {project.fullDetails.role}
              </div>
            </div>
            <div>
              <div className="text-gray-600 font-semibold uppercase text-[10px] sm:text-xs">Timeline</div>
              <div className="font-bold text-[#0A0A0A] mt-0.5 sm:mt-1 text-[11px] sm:text-xs">
                {project.fullDetails.timeline}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-gray-600 font-semibold uppercase text-[10px] sm:text-xs">Focus</div>
              <div className="font-bold text-[#0A0A0A] mt-0.5 sm:mt-1 truncate text-[11px] sm:text-xs">
                {project.tags.join(' · ')}
              </div>
            </div>
          </div>

          {/* DineBill Live App Callout Banner */}
          {isDineBill && (
            <div className="p-4 sm:p-6 bg-[#304FFE] text-white border-2 border-[#0A0A0A] shadow-brutal-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#EFFF00] uppercase">
                  <Globe className="w-4 h-4" />
                  <span>PRODUCTION WEB DEPLOYMENT</span>
                </div>
                <h4 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                  DineBill Live Application
                </h4>
                <p className="font-mono text-xs text-white/90">
                  Deployed on Vercel at https://dinebill.vercel.app/
                </p>
              </div>

              <a
                href="https://dinebill.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#EFFF00] text-[#0A0A0A] font-mono font-bold text-xs uppercase border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-white hover:text-[#0A0A0A] transition-all shrink-0 cursor-pointer w-full sm:w-auto"
              >
                <span>OPEN LIVE APP</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          )}

          {/* Core Case Study Narrative */}
          <div className="space-y-6">
            <div>
              <h4 className="font-mono text-xs font-bold tracking-widest text-[#0A0A0A] uppercase mb-2">
                // EXECUTIVE SUMMARY
              </h4>
              <p className="font-mono text-sm sm:text-base text-[#0A0A0A] leading-relaxed">
                {project.fullDetails.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 border-2 border-[#0A0A0A] bg-white shadow-brutal-sm">
                <h5 className="font-heading font-black text-sm uppercase text-[#0A0A0A] mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#304FFE] inline-block" />
                  The Strategic Problem
                </h5>
                <p className="font-mono text-xs sm:text-sm text-[#0A0A0A] leading-relaxed">
                  {project.fullDetails.challenge}
                </p>
              </div>

              <div className="p-5 border-2 border-[#0A0A0A] bg-white shadow-brutal-sm">
                <h5 className="font-heading font-black text-sm uppercase text-[#0A0A0A] mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#EFFF00] inline-block" />
                  The Architecture & Solution
                </h5>
                <p className="font-mono text-xs sm:text-sm text-[#0A0A0A] leading-relaxed">
                  {project.fullDetails.solution}
                </p>
              </div>
            </div>

            {/* Key Deliverables */}
            <div>
              <h4 className="font-mono text-xs font-bold tracking-widest text-[#0A0A0A] uppercase mb-3">
                // EXECUTION HIGHLIGHTS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.fullDetails.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-white border border-[#0A0A0A]"
                  >
                    <div className="w-5 h-5 bg-[#304FFE] text-white flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-[#0A0A0A]">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* VELSTRADA Interactive Brand System Showcase */}
            {isVelstrada && (
              <div className="p-6 border-2 border-[#0A0A0A] bg-white space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3">
                  <h4 className="font-heading font-black text-lg text-[#0A0A0A] uppercase">
                    VELSTRADA — BRAND ESSENCE SPECIFICATION
                  </h4>
                  <span className="font-mono text-xs font-bold px-2 py-1 bg-[#EFFF00] border border-[#0A0A0A]">
                    IDENTITY SPEC
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs pt-2">
                  <div className="p-3 border border-[#0A0A0A] bg-[#F4F0E6]">
                    <div className="font-bold text-[#0A0A0A]">01. PALETTE RESTRICTION</div>
                    <p className="text-gray-700 mt-1 leading-normal">
                      Monochrome charcoal, bone ivory, and raw textured titanium. Zero noisy seasonal palettes.
                    </p>
                  </div>
                  <div className="p-3 border border-[#0A0A0A] bg-[#F4F0E6]">
                    <div className="font-bold text-[#0A0A0A]">02. HAPTIC PACKAGING</div>
                    <p className="text-gray-700 mt-1 leading-normal">
                      700gsm cotton rag paperboard with debossed foil stamping and reusable canvas dust sleeves.
                    </p>
                  </div>
                  <div className="p-3 border border-[#0A0A0A] bg-[#F4F0E6]">
                    <div className="font-bold text-[#0A0A0A]">03. PRODUCT HIERARCHY</div>
                    <p className="text-gray-700 mt-1 leading-normal">
                      Edition-numbered small batch essentials crafted in limited runs with traceable origins.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* DineBill Features Summary */}
            {isDineBill && (
              <div className="p-6 border-2 border-[#0A0A0A] bg-white space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3">
                  <h4 className="font-heading font-black text-lg text-[#0A0A0A] uppercase">
                    DINEBILL — CORE SYSTEM CAPABILITIES
                  </h4>
                  <span className="font-mono text-xs font-bold px-2 py-1 bg-[#304FFE] text-white">
                    POS ARCHITECTURE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs pt-2">
                  <div className="p-3 border border-[#0A0A0A] bg-[#F4F0E6] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                      <Zap className="w-3.5 h-3.5 text-[#304FFE]" />
                      <span>2-TAP CHECKOUT</span>
                    </div>
                    <p className="text-gray-700 leading-normal">
                      Zero barrier item selection with one-touch payment dispatch for high-throughput morning rushes.
                    </p>
                  </div>

                  <div className="p-3 border border-[#0A0A0A] bg-[#F4F0E6] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#304FFE]" />
                      <span>OFFLINE FIRST</span>
                    </div>
                    <p className="text-gray-700 leading-normal">
                      Orders continue processing seamlessly during WiFi drops with background sync on reconnection.
                    </p>
                  </div>

                  <div className="p-3 border border-[#0A0A0A] bg-[#F4F0E6] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#0A0A0A]">
                      <Smartphone className="w-3.5 h-3.5 text-[#304FFE]" />
                      <span>RESPONSIVE POS</span>
                    </div>
                    <p className="text-gray-700 leading-normal">
                      Runs natively across iPads, Android tablets, and counter touch displays with no lag.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t-2 border-[#0A0A0A] bg-[#F4F0E6] flex items-center justify-between gap-4">
          {isDineBill ? (
            <a
              href="https://dinebill.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#304FFE] text-white font-mono font-bold text-xs uppercase border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-[#0A0A0A] transition-colors cursor-pointer"
            >
              <span>VISIT HTTPS://DINEBILL.VERCEL.APP/</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          ) : (
            <span className="font-mono text-xs font-bold text-gray-600 uppercase">
              AZIM PJ CASE STUDY ARCHIVE
            </span>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2.5 font-mono text-xs font-bold uppercase bg-white border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-[#EFFF00] transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
