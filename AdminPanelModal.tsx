import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  Unlock,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Check,
  RefreshCw,
  Image as ImageIcon,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { GalleryItem } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPortraitUrl: string;
  onUpdatePortrait: (newUrl: string) => void;
  onResetPortrait: () => void;
  galleryItems: GalleryItem[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onUpdateGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onResetGallery: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
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
  const [activeTab, setActiveTab] = useState<'portrait' | 'gallery'>('portrait');

  // Portrait edit state
  const [customPortraitInput, setCustomPortraitInput] = useState('');
  const [portraitPreview, setPortraitPreview] = useState<string | null>(null);

  // Gallery add/edit state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('ARCHITECTURE');
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());
  const [newLocation, setNewLocation] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

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
    // Secret verification check (3808)
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

  // Convert uploaded image file to base64
  const handlePortraitFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  // Gallery item file upload
  const handleGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({ ...editingItem, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) return;

    const newItem: GalleryItem = {
      id: `photo-${Date.now()}`,
      title: newTitle.trim().toUpperCase(),
      category: newCategory.trim().toUpperCase(),
      year: newYear.trim(),
      location: newLocation.trim().toUpperCase() || 'STUDIO',
      imageUrl: newImageUrl.trim(),
    };

    onAddGalleryItem(newItem);
    setNewTitle('');
    setNewCategory('ARCHITECTURE');
    setNewYear(new Date().getFullYear().toString());
    setNewLocation('');
    setNewImageUrl('');
  };

  const handleSaveEditItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    onUpdateGalleryItem(editingItem);
    setEditingItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#F4F0E6] border-3 border-[#0A0A0A] shadow-brutal-xl my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="w-full h-3 bg-[#EFFF00] border-b-2 border-[#0A0A0A]" />

        {/* Modal Header */}
        <div className="p-6 border-b-2 border-[#0A0A0A] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0A0A0A] text-white flex items-center justify-center font-mono text-sm font-bold border border-[#0A0A0A]">
              {isAuthenticated ? <Unlock className="w-5 h-5 text-[#EFFF00]" /> : <Lock className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#0A0A0A] uppercase tracking-tight">
                ADMINISTRATION CONSOLE
              </h3>
              <p className="font-mono text-xs text-gray-700">
                {isAuthenticated
                  ? 'System unlocked · Photo & Gallery manager active'
                  : 'Authorized personnel verification required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 bg-[#F4F0E6] text-[#0A0A0A] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-[#0A0A0A] hover:text-white transition-colors cursor-pointer"
              >
                LOCK
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

        {/* Modal Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-[#F4F0E6] border-2 border-[#0A0A0A] shadow-brutal mx-auto flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#0A0A0A]" />
            </div>

            <div className="space-y-1">
              <h4 className="font-heading font-black text-xl uppercase text-[#0A0A0A]">
                AUTHENTICATION REQUIRED
              </h4>
              <p className="font-mono text-xs text-gray-700">
                Enter your administrative authorization code to access media controls.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  placeholder="••••"
                  className="w-full text-center tracking-[0.5em] text-2xl font-mono px-4 py-3 bg-white border-2 border-[#0A0A0A] shadow-brutal-sm focus:outline-none focus:bg-[#EFFF00]/20"
                />
              </div>

              {authError && (
                <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-red-600 bg-red-50 p-2.5 border-2 border-red-600">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>ACCESS DENIED — INVALID AUTHORIZATION CODE</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#304FFE] text-white font-mono font-bold text-xs uppercase border-2 border-[#0A0A0A] shadow-brutal shadow-brutal-hover cursor-pointer"
              >
                UNLOCK CONSOLE
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="p-6 sm:p-8 space-y-6 max-h-[72vh] overflow-y-auto">
            {/* Tabs */}
            <div className="flex border-b-2 border-[#0A0A0A] gap-2 font-mono text-xs font-bold uppercase">
              <button
                onClick={() => setActiveTab('portrait')}
                className={`px-5 py-2.5 border-t-2 border-x-2 border-[#0A0A0A] transition-all cursor-pointer ${
                  activeTab === 'portrait'
                    ? 'bg-[#EFFF00] text-[#0A0A0A] -mb-[2px] shadow-sm'
                    : 'bg-white text-gray-600 hover:text-[#0A0A0A]'
                }`}
              >
                01. ABOUT ME PORTRAIT
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-5 py-2.5 border-t-2 border-x-2 border-[#0A0A0A] transition-all cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#EFFF00] text-[#0A0A0A] -mb-[2px] shadow-sm'
                    : 'bg-white text-gray-600 hover:text-[#0A0A0A]'
                }`}
              >
                02. GALLERY ARCHIVE ({galleryItems.length})
              </button>
            </div>

            {/* TAB 1: About Me Portrait Manager */}
            {activeTab === 'portrait' && (
              <div className="space-y-6 font-mono text-xs">
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
                          className="flex-1 px-3 py-2 bg-white border-2 border-[#0A0A0A] focus:outline-none text-xs"
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
            )}

            {/* TAB 2: Gallery Archive Manager */}
            {activeTab === 'gallery' && (
              <div className="space-y-8 font-mono text-xs">
                {/* Add Photo Form */}
                <div className="p-6 border-2 border-[#0A0A0A] bg-white space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3">
                    <h4 className="font-heading font-black text-lg text-[#0A0A0A] uppercase flex items-center gap-2">
                      <Plus className="w-5 h-5 text-[#304FFE]" />
                      ADD PHOTO TO GALLERY
                    </h4>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#EFFF00] border border-[#0A0A0A]">
                      INSTANT PUBLISH
                    </span>
                  </div>

                  <form onSubmit={handleCreateGalleryItem} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-[#0A0A0A] uppercase mb-1">
                          Photo Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. BRUTALIST PAVILION II"
                          className="w-full px-3 py-2 border-2 border-[#0A0A0A] focus:outline-none uppercase"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A0A0A] uppercase mb-1">
                          Category *
                        </label>
                        <input
                          type="text"
                          required
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="e.g. ARCHITECTURE / STREET"
                          className="w-full px-3 py-2 border-2 border-[#0A0A0A] focus:outline-none uppercase"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A0A0A] uppercase mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={newYear}
                          onChange={(e) => setNewYear(e.target.value)}
                          placeholder="2026"
                          className="w-full px-3 py-2 border-2 border-[#0A0A0A] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A0A0A] uppercase mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          placeholder="e.g. TOKYO / DUBAI"
                          className="w-full px-3 py-2 border-2 border-[#0A0A0A] focus:outline-none uppercase"
                        />
                      </div>
                    </div>

                    {/* Image Selector */}
                    <div className="space-y-2">
                      <label className="block font-bold text-[#0A0A0A] uppercase">
                        Image Source (File or Web URL) *
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="url"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="Paste image URL here..."
                          className="flex-1 px-3 py-2 border-2 border-[#0A0A0A] focus:outline-none"
                        />

                        <input
                          type="file"
                          ref={galleryFileInputRef}
                          accept="image/*"
                          onChange={handleGalleryFileUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => galleryFileInputRef.current?.click()}
                          className="px-4 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-bold hover:bg-[#EFFF00] transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>UPLOAD FILE</span>
                        </button>
                      </div>

                      {newImageUrl && (
                        <div className="mt-2 flex items-center gap-3 p-2 bg-[#F4F0E6] border border-[#0A0A0A]">
                          <img
                            src={newImageUrl}
                            alt="preview"
                            className="w-12 h-12 object-cover border border-[#0A0A0A]"
                          />
                          <span className="text-xs text-gray-700 truncate">
                            Image ready to publish
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!newTitle.trim() || !newImageUrl.trim()}
                      className="px-6 py-2.5 bg-[#304FFE] text-white font-bold uppercase border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-[#0A0A0A] transition-colors cursor-pointer disabled:opacity-40"
                    >
                      + ADD PHOTO TO ARCHIVE
                    </button>
                  </form>
                </div>

                {/* Edit Modal / Inline Form if editing */}
                {editingItem && (
                  <div className="p-6 border-2 border-[#0A0A0A] bg-[#EFFF00]/15 space-y-4">
                    <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-2">
                      <h4 className="font-heading font-black text-base uppercase text-[#0A0A0A]">
                        EDITING PHOTO: {editingItem.title}
                      </h4>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="text-xs font-bold underline cursor-pointer"
                      >
                        CANCEL
                      </button>
                    </div>

                    <form onSubmit={handleSaveEditItem} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-bold">Title</label>
                          <input
                            type="text"
                            required
                            value={editingItem.title}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                title: e.target.value.toUpperCase(),
                              })
                            }
                            className="w-full px-2 py-1.5 border border-[#0A0A0A] bg-white font-mono uppercase"
                          />
                        </div>
                        <div>
                          <label className="font-bold">Category</label>
                          <input
                            type="text"
                            required
                            value={editingItem.category}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                category: e.target.value.toUpperCase(),
                              })
                            }
                            className="w-full px-2 py-1.5 border border-[#0A0A0A] bg-white font-mono uppercase"
                          />
                        </div>
                        <div>
                          <label className="font-bold">Year</label>
                          <input
                            type="text"
                            value={editingItem.year}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                year: e.target.value,
                              })
                            }
                            className="w-full px-2 py-1.5 border border-[#0A0A0A] bg-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="font-bold">Location</label>
                          <input
                            type="text"
                            value={editingItem.location || ''}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                location: e.target.value.toUpperCase(),
                              })
                            }
                            className="w-full px-2 py-1.5 border border-[#0A0A0A] bg-white font-mono uppercase"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#0A0A0A] text-white font-bold uppercase cursor-pointer"
                        >
                          SAVE MODIFICATIONS
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingItem(null)}
                          className="px-4 py-2 bg-white border border-[#0A0A0A] cursor-pointer"
                        >
                          DISMISS
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Existing Gallery Photos List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-[#0A0A0A] uppercase tracking-wider">
                      CURRENT ARCHIVED PHOTOS ({galleryItems.length})
                    </h5>
                    <button
                      type="button"
                      onClick={onResetGallery}
                      className="text-xs font-bold text-gray-700 hover:text-red-600 underline cursor-pointer"
                    >
                      RESTORE DEFAULT PHOTOS
                    </button>
                  </div>

                  <div className="divide-y-2 divide-[#0A0A0A] border-2 border-[#0A0A0A] bg-white">
                    {galleryItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 flex items-center justify-between gap-4 hover:bg-[#F4F0E6] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-14 h-14 object-cover border-2 border-[#0A0A0A] bg-black"
                          />
                          <div>
                            <div className="font-bold text-[#0A0A0A] text-sm uppercase">
                              {item.title}
                            </div>
                            <div className="text-gray-600 text-xs mt-0.5">
                              {item.category} · {item.year} · {item.location || 'GLOBAL'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingItem(item)}
                            className="p-2 border border-[#0A0A0A] bg-white hover:bg-[#EFFF00] transition-colors cursor-pointer"
                            aria-label={`Edit ${item.title}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteGalleryItem(item.id)}
                            className="p-2 border border-[#0A0A0A] bg-white hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                            aria-label={`Delete ${item.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-[#F4F0E6] border-t-2 border-[#0A0A0A] flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-gray-700 uppercase">
            STATUS: {isAuthenticated ? 'SESSION SECURED' : 'LOCKED'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border-2 border-[#0A0A0A] shadow-brutal-sm font-bold uppercase hover:bg-[#EFFF00] transition-colors cursor-pointer"
          >
            EXIT CONSOLE
          </button>
        </div>
      </div>
    </div>
  );
};
