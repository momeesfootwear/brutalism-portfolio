import React from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#EFFF00] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-brutal font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
        <span className="w-5 h-5 bg-[#0A0A0A] text-white flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </span>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:opacity-75 transition-opacity cursor-pointer"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
