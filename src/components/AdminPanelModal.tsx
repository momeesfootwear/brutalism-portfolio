import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Layers,
  Globe,
  User,
  Image as ImageIcon,
} from 'lucide-react';
import { Project, GalleryItem } from '../types';
import { AdminAuthView } from './admin/AdminAuthView';
import { AdminBrandingTab } from './admin/AdminBrandingTab';
import { AdminProjectsTab } from './admin/AdminProjectsTab';
import { AdminPortraitTab } from './admin/AdminPortraitTab';
import { AdminGalleryTab } from './admin/AdminGalleryTab';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;

  // Branding props
  currentTabTitle: string;
  currentFaviconUrl: string;
  onUpdateBranding: (newTitle: string, newFaviconUrl: string) => void;
  onResetBranding: () => void;

  // Projects props
  projects: Project[];
  onAddProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onReorderProjects: (projects: Project[]) => void;
  onResetProjects: () => void;

  // Portrait props
  currentPortraitUrl: string;
  onUpdatePortrait: (newUrl: string) => void;
  onResetPortrait: () => void;

  // Gallery props
  galleryItems: GalleryItem[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onUpdateGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onResetGallery: () => void;
}

export type AdminTab = 'branding' | 'projects' | 'portrait' | 'gallery';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  currentTabTitle,
  currentFaviconUrl,
  onUpdateBranding,
  onResetBranding,
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onReorderProjects,
  onResetProjects,
  currentPortraitUrl,
  onUpdatePortrait,
  onResetPortrait,
  galleryItems,
  onAddGalleryItem,
  onUpdateGalleryItem,
  onDeleteGalleryItem,
  onResetGallery,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('branding');

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '3808') {
      setIsAuthenticated(true);
      setAuthError(false);
      setPasscode('');
    } else {
      setAuthError(true);
      setPasscode('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    setAuthError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#F4F0E6] border-3 border-[#0A0A0A] shadow-brutal-xl my-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="w-full h-3 bg-[#EFFF00] border-b-2 border-[#0A0A0A]" />

        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b-2 border-[#0A0A0A] bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-sm font-bold border border-[#0A0A0A] shrink-0">
              {isAuthenticated ? (
                <Unlock className="w-5 h-5 text-[#EFFF00]" />
              ) : (
                <Lock className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-[#0A0A0A] uppercase tracking-tight">
                ADMINISTRATION CONSOLE
              </h3>
              <p className="font-mono text-xs text-gray-600">
                {isAuthenticated
                  ? 'System unlocked · Branding, Projects, & Media Manager'
                  : 'Authorized Personnel Verification Required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-[#F4F0E6] text-[#0A0A0A] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-[#0A0A0A] hover:text-white transition-colors cursor-pointer"
              >
                LOCK CONSOLE
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 border-2 border-[#0A0A0A] bg-[#F4F0E6] shadow-brutal-sm hover:bg-[#0A0A0A] hover:text-white transition-all cursor-pointer"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        {!isAuthenticated ? (
          <AdminAuthView
            passcode={passcode}
            setPasscode={setPasscode}
            authError={authError}
            onLogin={handleLogin}
            onClose={onClose}
          />
        ) : (
          <div className="p-4 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap border-b-2 border-[#0A0A0A] gap-1.5 sm:gap-2 font-mono text-xs font-bold uppercase">
              <button
                type="button"
                onClick={() => setActiveTab('branding')}
                className={`px-3.5 sm:px-5 py-2.5 border-t-2 border-x-2 border-[#0A0A0A] transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'branding'
                    ? 'bg-[#EFFF00] text-[#0A0A0A] -mb-[2px] shadow-sm font-black'
                    : 'bg-white text-gray-600 hover:text-[#0A0A0A]'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>01. TAB & BRANDING</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`px-3.5 sm:px-5 py-2.5 border-t-2 border-x-2 border-[#0A0A0A] transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'projects'
                    ? 'bg-[#EFFF00] text-[#0A0A0A] -mb-[2px] shadow-sm font-black'
                    : 'bg-white text-gray-600 hover:text-[#0A0A0A]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>02. PROJECTS ({projects.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('portrait')}
                className={`px-3.5 sm:px-5 py-2.5 border-t-2 border-x-2 border-[#0A0A0A] transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'portrait'
                    ? 'bg-[#EFFF00] text-[#0A0A0A] -mb-[2px] shadow-sm font-black'
                    : 'bg-white text-gray-600 hover:text-[#0A0A0A]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>03. ABOUT PORTRAIT</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`px-3.5 sm:px-5 py-2.5 border-t-2 border-x-2 border-[#0A0A0A] transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'gallery'
                    ? 'bg-[#EFFF00] text-[#0A0A0A] -mb-[2px] shadow-sm font-black'
                    : 'bg-white text-gray-600 hover:text-[#0A0A0A]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>04. GALLERY ({galleryItems.length})</span>
              </button>
            </div>

            {/* Active Tab View */}
            <div>
              {activeTab === 'branding' && (
                <AdminBrandingTab
                  currentTabTitle={currentTabTitle}
                  currentFaviconUrl={currentFaviconUrl}
                  onUpdateBranding={onUpdateBranding}
                  onResetBranding={onResetBranding}
                />
              )}

              {activeTab === 'projects' && (
                <AdminProjectsTab
                  projects={projects}
                  onAddProject={onAddProject}
                  onUpdateProject={onUpdateProject}
                  onDeleteProject={onDeleteProject}
                  onReorderProjects={onReorderProjects}
                  onResetProjects={onResetProjects}
                />
              )}

              {activeTab === 'portrait' && (
                <AdminPortraitTab
                  currentPortraitUrl={currentPortraitUrl}
                  onUpdatePortrait={onUpdatePortrait}
                  onResetPortrait={onResetPortrait}
                />
              )}

              {activeTab === 'gallery' && (
                <AdminGalleryTab
                  galleryItems={galleryItems}
                  onAddGalleryItem={onAddGalleryItem}
                  onUpdateGalleryItem={onUpdateGalleryItem}
                  onDeleteGalleryItem={onDeleteGalleryItem}
                  onResetGallery={onResetGallery}
                />
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-[#F4F0E6] border-t-2 border-[#0A0A0A] flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full inline-block ${
                isAuthenticated ? 'bg-green-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="font-bold text-gray-700 uppercase text-[11px] sm:text-xs">
              SYSTEM: {isAuthenticated ? 'SESSION SECURED' : 'LOCKED'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border-2 border-[#0A0A0A] shadow-brutal-sm font-bold uppercase hover:bg-[#EFFF00] transition-colors cursor-pointer text-xs"
          >
            EXIT CONSOLE
          </button>
        </div>
      </div>
    </div>
  );
};
