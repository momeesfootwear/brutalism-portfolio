import React, { useState, useRef } from 'react';
import {
  Globe,
  Upload,
  RefreshCw,
  Check,
  Sparkles,
  Link as LinkIcon,
  Image as ImageIcon,
  ExternalLink,
  X,
} from 'lucide-react';
import {
  DEFAULT_TAB_TITLE,
  DEFAULT_FAVICON_SVG,
  PRESET_FAVICONS,
  PRESET_TAB_TITLES,
  FaviconPreset,
} from '../../utils/branding';

interface AdminBrandingTabProps {
  currentTabTitle: string;
  currentFaviconUrl: string;
  onUpdateBranding: (newTitle: string, newFaviconUrl: string) => void;
  onResetBranding: () => void;
}

export const AdminBrandingTab: React.FC<AdminBrandingTabProps> = ({
  currentTabTitle,
  currentFaviconUrl,
  onUpdateBranding,
  onResetBranding,
}) => {
  const [tabTitleInput, setTabTitleInput] = useState(currentTabTitle);
  const [faviconInput, setFaviconInput] = useState(currentFaviconUrl);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [activeTabMode, setActiveTabMode] = useState<'presets' | 'upload' | 'url'>('presets');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeFavicon = faviconInput || currentFaviconUrl || DEFAULT_FAVICON_SVG;
  const activeTitle = tabTitleInput || currentTabTitle || DEFAULT_TAB_TITLE;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Icon file is too large. Please select an icon under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFaviconInput(reader.result);
          setStatusMessage('Icon file loaded into preview!');
          setTimeout(() => setStatusMessage(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyPreset = (preset: FaviconPreset) => {
    setFaviconInput(preset.dataUrl);
    setStatusMessage(`Applied preset: ${preset.name}`);
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleApplyUrl = () => {
    if (!customUrlInput.trim()) return;
    setFaviconInput(customUrlInput.trim());
    setCustomUrlInput('');
    setStatusMessage('Custom URL applied to preview');
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleSaveAll = () => {
    onUpdateBranding(activeTitle.trim(), activeFavicon);
    setStatusMessage('TAB TITLE & FAVICON UPDATED IN BROWSER!');
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleResetToDefault = () => {
    setTabTitleInput(DEFAULT_TAB_TITLE);
    setFaviconInput(DEFAULT_FAVICON_SVG);
    onResetBranding();
    setStatusMessage('BRANDING RESTORED TO DEFAULT');
    setTimeout(() => setStatusMessage(null), 3500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Tab Preview Box */}
      <div className="border-2 border-[#0A0A0A] bg-white shadow-brutal-sm p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#304FFE]" />
            <h4 className="font-heading font-black text-sm uppercase text-[#0A0A0A] tracking-tight">
              LIVE BROWSER TAB PREVIEW
            </h4>
          </div>
          <span className="font-mono text-[10px] sm:text-xs font-bold px-2 py-0.5 bg-[#EFFF00] border border-[#0A0A0A] uppercase">
            REAL-TIME SIMULATION
          </span>
        </div>

        {/* Mock Browser Window Bar */}
        <div className="bg-[#1C1C1E] p-2 rounded-t-lg border-2 border-[#0A0A0A] space-y-2">
          {/* Browser Window Controls */}
          <div className="flex items-center gap-1.5 px-2 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>

          {/* Browser Tab Component */}
          <div className="flex items-center">
            <div className="flex items-center gap-2.5 bg-[#2C2C2E] text-white px-3.5 py-1.5 rounded-t-md max-w-xs sm:max-w-md border-t border-l border-r border-[#3A3A3C] shadow-xs">
              {/* Favicon in tab */}
              <img
                src={activeFavicon}
                alt="Favicon preview"
                className="w-4 h-4 shrink-0 rounded-xs object-contain bg-[#0A0A0A]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = DEFAULT_FAVICON_SVG;
                }}
              />
              {/* Tab Title */}
              <span className="font-mono text-xs truncate font-medium text-gray-100 max-w-[180px] sm:max-w-[280px]">
                {activeTitle}
              </span>
              <X className="w-3 h-3 text-gray-400 hover:text-white shrink-0 ml-auto cursor-pointer" />
            </div>
          </div>
        </div>

        <p className="font-mono text-xs text-gray-600">
          This preview dynamically updates the browser tab title and the icon seen in bookmark bars, browser tabs, and desktop shortcuts.
        </p>
      </div>

      {/* Tab Title Section */}
      <div className="border-2 border-[#0A0A0A] bg-white shadow-brutal-sm p-4 sm:p-6 space-y-5">
        <div className="border-b-2 border-[#0A0A0A] pb-3">
          <h4 className="font-heading font-black text-sm uppercase text-[#0A0A0A]">
            01. BROWSER TAB TITLE
          </h4>
          <p className="font-mono text-xs text-gray-600 mt-1">
            Customize the title string displayed in search results, browser tabs, and bookmark lists.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
              TAB TITLE STRING
            </label>
            <span className="font-mono text-[11px] text-gray-500">
              {tabTitleInput.length} chars
            </span>
          </div>

          <input
            type="text"
            value={tabTitleInput}
            onChange={(e) => setTabTitleInput(e.target.value)}
            placeholder="Azim PJ — Neobrutalist Portfolio"
            className="w-full px-4 py-3 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-sm font-bold text-[#0A0A0A] focus:outline-hidden focus:bg-[#EFFF00]/20"
          />

          {/* Quick presets */}
          <div>
            <span className="font-mono text-[11px] font-bold uppercase text-gray-500 block mb-2">
              QUICK PRESETS:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_TAB_TITLES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTabTitleInput(preset)}
                  className={`px-2.5 py-1 text-xs font-mono border border-[#0A0A0A] transition-all cursor-pointer ${
                    tabTitleInput === preset
                      ? 'bg-[#0A0A0A] text-[#EFFF00] font-bold shadow-brutal-sm'
                      : 'bg-[#F4F0E6] text-[#0A0A0A] hover:bg-[#EFFF00]'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Favicon Section */}
      <div className="border-2 border-[#0A0A0A] bg-white shadow-brutal-sm p-4 sm:p-6 space-y-6">
        <div className="border-b-2 border-[#0A0A0A] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-heading font-black text-sm uppercase text-[#0A0A0A]">
              02. BROWSER FAVICON
            </h4>
            <p className="font-mono text-xs text-gray-600 mt-1">
              Choose from high-contrast presets, upload an icon file (.svg, .png, .ico), or specify a custom URL.
            </p>
          </div>

          {/* Active icon showcase */}
          <div className="flex items-center gap-3 p-2 bg-[#F4F0E6] border border-[#0A0A0A] self-start sm:self-auto">
            <span className="font-mono text-[10px] font-bold text-gray-500 uppercase">
              Current:
            </span>
            <div className="w-8 h-8 bg-[#0A0A0A] border border-[#0A0A0A] flex items-center justify-center p-1">
              <img
                src={activeFavicon}
                alt="Current favicon"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Mode selector buttons */}
        <div className="flex items-center gap-2 border-b border-[#0A0A0A] pb-3">
          <button
            type="button"
            onClick={() => setActiveTabMode('presets')}
            className={`px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 border-[#0A0A0A] transition-all cursor-pointer ${
              activeTabMode === 'presets'
                ? 'bg-[#0A0A0A] text-white shadow-brutal-sm'
                : 'bg-[#F4F0E6] text-[#0A0A0A] hover:bg-[#EFFF00]'
            }`}
          >
            Curated Presets
          </button>
          <button
            type="button"
            onClick={() => setActiveTabMode('upload')}
            className={`px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 border-[#0A0A0A] transition-all cursor-pointer ${
              activeTabMode === 'upload'
                ? 'bg-[#0A0A0A] text-white shadow-brutal-sm'
                : 'bg-[#F4F0E6] text-[#0A0A0A] hover:bg-[#EFFF00]'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTabMode('url')}
            className={`px-3 py-1.5 font-mono text-xs font-bold uppercase border-2 border-[#0A0A0A] transition-all cursor-pointer ${
              activeTabMode === 'url'
                ? 'bg-[#0A0A0A] text-white shadow-brutal-sm'
                : 'bg-[#F4F0E6] text-[#0A0A0A] hover:bg-[#EFFF00]'
            }`}
          >
            Custom URL
          </button>
        </div>

        {/* Mode 1: Presets */}
        {activeTabMode === 'presets' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRESET_FAVICONS.map((preset) => {
              const isSelected = activeFavicon === preset.dataUrl;
              return (
                <div
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`p-3 border-2 border-[#0A0A0A] flex items-center gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#EFFF00] shadow-brutal-sm -translate-y-0.5'
                      : 'bg-[#F4F0E6] hover:bg-white'
                  }`}
                >
                  <div className="w-10 h-10 bg-[#0A0A0A] border border-[#0A0A0A] flex items-center justify-center p-1.5 shrink-0">
                    <img
                      src={preset.dataUrl}
                      alt={preset.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-heading font-black text-xs text-[#0A0A0A] uppercase truncate flex items-center gap-1.5">
                      <span>{preset.name}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#304FFE] stroke-[3]" />
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-gray-600 truncate">
                      {preset.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mode 2: File Upload */}
        {activeTabMode === 'upload' && (
          <div className="p-6 border-2 border-dashed border-[#0A0A0A] bg-[#F4F0E6] text-center space-y-4">
            <div className="w-12 h-12 bg-white border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center mx-auto text-[#0A0A0A]">
              <Upload className="w-6 h-6 stroke-[2]" />
            </div>

            <div>
              <p className="font-mono text-xs font-bold text-[#0A0A0A] uppercase">
                SELECT AN ICON FILE (.SVG, .PNG, .ICO)
              </p>
              <p className="font-mono text-[11px] text-gray-600 mt-1">
                Optimized square dimensions (32x32, 64x64, or scalable SVG). Max size 2MB.
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".svg,.png,.ico,.jpg,.jpeg,.webp"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] shadow-brutal-sm font-mono text-xs font-bold uppercase hover:bg-[#304FFE] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>CHOOSE ICON FILE</span>
            </button>
          </div>
        )}

        {/* Mode 3: Custom URL */}
        {activeTabMode === 'url' && (
          <div className="space-y-3 p-4 bg-[#F4F0E6] border border-[#0A0A0A]">
            <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A]">
              ICON IMAGE / SVG URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="https://example.com/favicon.svg"
                className="flex-1 px-4 py-2.5 bg-white border-2 border-[#0A0A0A] font-mono text-xs font-medium text-[#0A0A0A] focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2.5 bg-[#0A0A0A] text-[#EFFF00] font-mono text-xs font-bold uppercase border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-[#304FFE] hover:text-white transition-colors cursor-pointer shrink-0"
              >
                APPLY
              </button>
            </div>
            <p className="font-mono text-[11px] text-gray-500">
              Paste any public https:// image link. The favicon will automatically update in real-time.
            </p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-[#0A0A0A]">
        <div className="flex items-center gap-2">
          {statusMessage && (
            <div className="px-3 py-1.5 bg-[#EFFF00] border border-[#0A0A0A] font-mono text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5 text-[#0A0A0A] stroke-[3]" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex-1 sm:flex-none px-4 py-3 bg-transparent border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET TO DEFAULT</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="flex-1 sm:flex-none px-6 py-3 bg-[#304FFE] text-white border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase shadow-brutal-sm hover:bg-[#0A0A0A] hover:text-[#EFFF00] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>APPLY BRANDING</span>
          </button>
        </div>
      </div>
    </div>
  );
};
