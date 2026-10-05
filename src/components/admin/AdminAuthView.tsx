import React from 'react';
import { Lock, AlertCircle, ArrowUpRight } from 'lucide-react';

interface AdminAuthViewProps {
  passcode: string;
  setPasscode: (val: string) => void;
  authError: boolean;
  onLogin: (e: React.FormEvent) => void;
  onClose: () => void;
}

export const AdminAuthView: React.FC<AdminAuthViewProps> = ({
  passcode,
  setPasscode,
  authError,
  onLogin,
  onClose,
}) => {
  return (
    <div className="p-6 sm:p-10 space-y-6 max-w-md mx-auto my-6 bg-white border-2 border-[#0A0A0A] shadow-brutal-md">
      <div className="flex items-center gap-3 border-b-2 border-[#0A0A0A] pb-4">
        <div className="w-10 h-10 bg-[#0A0A0A] text-[#EFFF00] flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-heading font-black text-xl text-[#0A0A0A] uppercase tracking-tight">
            ADMIN VERIFICATION
          </h3>
          <p className="font-mono text-xs text-gray-600 uppercase">
            AUTHORIZATION REQUIRED
          </p>
        </div>
      </div>

      <p className="font-mono text-xs text-[#0A0A0A] leading-relaxed">
        Enter the system access passcode to configure site branding (favicon, tab title), manage portfolio projects, custom portrait, and gallery archive.
      </p>

      <form onSubmit={onLogin} className="space-y-4">
        <div>
          <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1.5">
            ENTER PASSCODE
          </label>
          <input
            type="password"
            autoFocus
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="••••"
            className="w-full px-4 py-3 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-lg font-bold tracking-widest text-[#0A0A0A] focus:outline-hidden focus:bg-[#EFFF00]/20"
          />
          <div className="flex items-center justify-between mt-1 text-[11px] font-mono text-gray-500">
            <span>Security code: 3808</span>
            <button
              type="button"
              onClick={() => setPasscode('3808')}
              className="text-[#304FFE] hover:underline font-bold cursor-pointer"
            >
              Autofill 3808
            </button>
          </div>
        </div>

        {authError && (
          <div className="p-3 bg-red-100 border-2 border-red-600 text-red-900 font-mono text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>INVALID PASSCODE. ACCESS DENIED.</span>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-[#0A0A0A] text-[#EFFF00] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm hover:bg-[#304FFE] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>AUTHENTICATE</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 bg-transparent border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-gray-200 transition-colors cursor-pointer"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};
