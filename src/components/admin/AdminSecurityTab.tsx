import React, { useState } from 'react';
import { KeyRound, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff, RotateCcw } from 'lucide-react';

interface AdminSecurityTabProps {
  onPasswordChanged?: () => void;
}

const DEFAULT_CODE = atob('MzgwOA==');

export const AdminSecurityTab: React.FC<AdminSecurityTabProps> = ({
  onPasswordChanged,
}) => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const hasCustomPass = Boolean(localStorage.getItem('azim_admin_custom_pass'));

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const activePass = localStorage.getItem('azim_admin_custom_pass') || DEFAULT_CODE;

    if (currentPass.trim() !== activePass) {
      setStatusMessage({
        type: 'error',
        text: 'Current password is incorrect. Verification failed.',
      });
      return;
    }

    if (!newPass.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'New password cannot be empty.',
      });
      return;
    }

    if (newPass.length < 4) {
      setStatusMessage({
        type: 'error',
        text: 'New password must be at least 4 characters.',
      });
      return;
    }

    if (newPass !== confirmPass) {
      setStatusMessage({
        type: 'error',
        text: 'New passwords do not match.',
      });
      return;
    }

    // Save custom password securely in localStorage
    localStorage.setItem('azim_admin_custom_pass', newPass.trim());
    // Clean up any legacy keys
    localStorage.removeItem('azim_admin_auth_hash');

    setStatusMessage({
      type: 'success',
      text: 'Admin password updated successfully! Please remember your new password.',
    });

    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');

    if (onPasswordChanged) onPasswordChanged();
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset admin password back to system default?')) {
      localStorage.removeItem('azim_admin_custom_pass');
      localStorage.removeItem('azim_admin_auth_hash');
      setStatusMessage({
        type: 'success',
        text: 'Password successfully reset to system default.',
      });
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      if (onPasswordChanged) onPasswordChanged();
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      {/* Header Info */}
      <div className="p-4 sm:p-5 border-2 border-[#0A0A0A] bg-white shadow-brutal-sm space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0A0A0A] uppercase">
          <ShieldCheck className="w-4 h-4 text-[#304FFE]" />
          <span>ADMIN CREDENTIALS & ACCESS CONTROL</span>
        </div>
        <p className="font-mono text-xs text-gray-700 leading-relaxed">
          Change the master security passcode used to unlock this administration console. All updates take effect immediately for future logins.
        </p>
        <div className="pt-2 flex items-center gap-2 font-mono text-xs">
          <span className="font-bold text-[#0A0A0A]">CURRENT STATUS:</span>
          <span
            className={`px-2 py-0.5 border border-[#0A0A0A] font-bold uppercase ${
              hasCustomPass ? 'bg-[#EFFF00] text-[#0A0A0A]' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {hasCustomPass ? 'CUSTOM PASSWORD ACTIVE' : 'DEFAULT PASSWORD ACTIVE'}
          </span>
        </div>
      </div>

      {/* Password Change Form */}
      <form onSubmit={handleChangePassword} className="space-y-4 font-mono text-xs">
        <div>
          <label className="block font-bold text-[#0A0A0A] uppercase mb-1.5">
            Current Password *
          </label>
          <input
            type="password"
            required
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
            placeholder="Enter current password"
            className="w-full px-3 py-2.5 bg-white border-2 border-[#0A0A0A] focus:outline-hidden focus:bg-[#EFFF00]/20 font-mono text-sm sm:text-xs"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block font-bold text-[#0A0A0A] uppercase">
              New Password *
            </label>
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="text-[11px] font-bold text-[#304FFE] hover:underline flex items-center gap-1 cursor-pointer"
            >
              {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showNewPass ? 'HIDE' : 'SHOW'}</span>
            </button>
          </div>
          <input
            type={showNewPass ? 'text' : 'password'}
            required
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="Enter new password (min. 4 characters)"
            className="w-full px-3 py-2.5 bg-white border-2 border-[#0A0A0A] focus:outline-hidden focus:bg-[#EFFF00]/20 font-mono text-sm sm:text-xs"
          />
        </div>

        <div>
          <label className="block font-bold text-[#0A0A0A] uppercase mb-1.5">
            Confirm New Password *
          </label>
          <input
            type={showNewPass ? 'text' : 'password'}
            required
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Re-enter new password"
            className="w-full px-3 py-2.5 bg-white border-2 border-[#0A0A0A] focus:outline-hidden focus:bg-[#EFFF00]/20 font-mono text-sm sm:text-xs"
          />
        </div>

        {statusMessage && (
          <div
            className={`p-3 border-2 font-mono text-xs flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-green-100 border-green-800 text-green-900'
                : 'bg-red-100 border-red-700 text-red-900'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-700" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="submit"
            className="px-6 py-3 bg-[#0A0A0A] text-[#EFFF00] font-mono font-bold text-xs uppercase border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover flex items-center justify-center gap-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 hover:bg-[#304FFE] hover:text-white transition-all"
          >
            <KeyRound className="w-4 h-4" />
            <span>SAVE NEW PASSWORD</span>
          </button>

          {hasCustomPass && (
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-4 py-2.5 bg-transparent border-2 border-[#0A0A0A] font-mono font-bold text-xs uppercase hover:bg-red-50 text-gray-700 hover:text-red-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET TO DEFAULT</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
