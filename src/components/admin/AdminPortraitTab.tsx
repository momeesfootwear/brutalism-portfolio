import React, { useState, useRef } from 'react';
import { Upload, RefreshCw, Check } from 'lucide-react';

interface AdminPortraitTabProps {
  currentPortraitUrl: string;
  onUpdatePortrait: (newUrl: string) => void;
  onResetPortrait: () => void;
}

export const AdminPortraitTab: React.FC<AdminPortraitTabProps> = ({
  currentPortraitUrl,
  onUpdatePortrait,
  onResetPortrait,
}) => {
  const [customPortraitInput, setCustomPortraitInput] = useState('');
  const [portraitPreview, setPortraitPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePortraitFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file too large. Please select an image under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPortraitPreview(result);
        setCustomPortraitInput(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyPortrait = () => {
    const urlToApply = portraitPreview || customPortraitInput;
    if (urlToApply.trim()) {
      onUpdatePortrait(urlToApply.trim());
      setPortraitPreview(null);
      setCustomPortraitInput('');
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs animate-in fade-in duration-200">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Current Portrait View */}
        <div className="md:col-span-5 p-4 border-2 border-[#0A0A0A] bg-white space-y-3">
          <div className="font-bold text-[#0A0A0A] uppercase tracking-wider">
            Active Portrait:
          </div>
          <div className="aspect-square bg-[#304FFE] border-2 border-[#0A0A0A] overflow-hidden relative shadow-brutal-sm">
            <img
              src={portraitPreview || currentPortraitUrl}
              alt="Portrait preview"
              className="w-full h-full object-cover"
            />
            {portraitPreview && (
              <div className="absolute top-2 left-2 bg-[#EFFF00] text-[#0A0A0A] font-bold px-2 py-0.5 border border-[#0A0A0A] text-[10px]">
                UNSAVED PREVIEW
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onResetPortrait}
            className="w-full py-2 bg-[#F4F0E6] text-[#0A0A0A] border-2 border-[#0A0A0A] font-bold uppercase hover:bg-red-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESTORE ORIGINAL PHOTO</span>
          </button>
        </div>

        {/* Upload Controls */}
        <div className="md:col-span-7 p-6 border-2 border-[#0A0A0A] bg-white space-y-5">
          <div>
            <h4 className="font-heading font-black text-lg text-[#0A0A0A] uppercase">
              UPDATE ABOUT PHOTO
            </h4>
            <p className="text-gray-600 text-xs mt-1">
              Select a new portrait image from your system or input an online image URL.
            </p>
          </div>

          {/* File Upload Option */}
          <div className="space-y-2">
            <label className="block font-bold text-[#0A0A0A] uppercase">
              Option A: Upload File from Disk
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePortraitFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 bg-[#F4F0E6] border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-[#EFFF00] font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>CHOOSE IMAGE FILE</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#0A0A0A]"></div>
            <span className="flex-shrink mx-4 text-gray-500 font-bold">OR</span>
            <div className="flex-grow border-t border-[#0A0A0A]"></div>
          </div>

          {/* Image URL Option */}
          <div className="space-y-2">
            <label className="block font-bold text-[#0A0A0A] uppercase">
              Option B: Paste Image Web URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={customPortraitInput}
                onChange={(e) => {
                  setCustomPortraitInput(e.target.value);
                  setPortraitPreview(e.target.value);
                }}
                placeholder="https://images.example.com/my-photo.jpg"
                className="flex-1 px-3 py-2 bg-white border-2 border-[#0A0A0A] focus:outline-hidden text-xs font-mono"
              />
            </div>
          </div>

          {/* Apply Button */}
          <button
            type="button"
            onClick={handleApplyPortrait}
            disabled={!portraitPreview && !customPortraitInput}
            className="w-full py-3 bg-[#304FFE] text-white font-bold uppercase border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>SAVE NEW ABOUT PHOTO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
