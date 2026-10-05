import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Copy } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyEmail: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onCopyEmail,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Business Strategy');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-[#F4F0E6] border-3 border-[#0A0A0A] shadow-brutal-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Acid Yellow Accent Top Bar */}
        <div className="w-full h-3 bg-[#EFFF00] border-b-2 border-[#0A0A0A]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b-2 border-[#0A0A0A] flex items-center justify-between bg-white gap-2">
          <div>
            <h3 className="font-heading font-black text-xl sm:text-3xl text-[#0A0A0A] uppercase tracking-tight flex items-baseline">
              <span>START A CONVERSATION</span>
              <span className="w-2 h-2 ml-1 bg-[#304FFE] rounded-full inline-block" />
            </h3>
            <p className="font-mono text-[11px] sm:text-xs text-gray-700 mt-0.5">
              Direct dispatch to Azim PJ (azimparayangattil@gmail.com)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 border-2 border-[#0A0A0A] bg-[#F4F0E6] shadow-brutal-sm hover:bg-[#0A0A0A] hover:text-white transition-all cursor-pointer shrink-0"
            aria-label="Close message dialog"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Body Form or Success Screen */}
        <div className="p-4 sm:p-8 max-h-[82vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-4 font-mono">
              <div className="w-14 h-14 bg-[#EFFF00] border-2 border-[#0A0A0A] shadow-brutal mx-auto flex items-center justify-center text-[#0A0A0A]">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h4 className="font-heading font-black text-xl sm:text-2xl text-[#0A0A0A] uppercase">
                MESSAGE DISPATCHED!
              </h4>
              <p className="text-xs sm:text-sm text-[#0A0A0A] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your message regarding{' '}
                <strong>{subject}</strong> has been logged. Azim will reply to{' '}
                <span className="underline">{email}</span> within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 bg-[#304FFE] text-white font-mono font-bold text-xs uppercase border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                >
                  CLOSE DIALOG
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block font-bold text-[#0A0A0A] uppercase mb-1 sm:mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-2.5 bg-white border-2 border-[#0A0A0A] focus:outline-hidden focus:bg-[#EFFF00]/20 font-mono text-sm sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0A0A0A] uppercase mb-1 sm:mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@example.com"
                    className="w-full px-3 py-2.5 bg-white border-2 border-[#0A0A0A] focus:outline-hidden focus:bg-[#EFFF00]/20 font-mono text-sm sm:text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0A0A0A] uppercase mb-1 sm:mb-1.5">
                  Subject / Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border-2 border-[#0A0A0A] focus:outline-hidden font-mono text-sm sm:text-xs uppercase"
                >
                  <option value="Business Strategy">Business Strategy & Advisory</option>
                  <option value="Branding & Direction">Branding & Creative Direction</option>
                  <option value="DineBill POS Collaboration">DineBill POS Partnership</option>
                  <option value="VELSTRADA Luxury Brand">VELSTRADA Concept Inquiry</option>
                  <option value="General Conversation">General Conversation & Mentorship</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0A0A0A] uppercase mb-1 sm:mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details on your vision, timeline, or what you'd like to collaborate on..."
                  className="w-full px-3 py-2.5 bg-white border-2 border-[#0A0A0A] focus:outline-hidden focus:bg-[#EFFF00]/20 font-mono text-sm sm:text-xs resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-[#304FFE] text-white font-mono font-bold text-xs uppercase border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover flex items-center justify-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>TRANSMIT MESSAGE</span>
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="w-full sm:w-auto px-4 py-2.5 bg-white text-[#0A0A0A] font-mono font-bold text-xs uppercase border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-[#EFFF00] transition-colors flex items-center justify-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY DIRECT EMAIL</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
