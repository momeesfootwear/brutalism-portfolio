import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Upload, ImageIcon } from 'lucide-react';
import { GalleryItem } from '../../types';

interface AdminGalleryTabProps {
  galleryItems: GalleryItem[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onUpdateGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
  onResetGallery: () => void;
}

export const AdminGalleryTab: React.FC<AdminGalleryTabProps> = ({
  galleryItems,
  onAddGalleryItem,
  onUpdateGalleryItem,
  onDeleteGalleryItem,
  onResetGallery,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('ARCHITECTURE');
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());
  const [newLocation, setNewLocation] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const handleGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image too large. Please select an image under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result as string);
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
      year: newYear.trim() || new Date().getFullYear().toString(),
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
    <div className="space-y-8 font-mono text-xs animate-in fade-in duration-200">
      {/* Add Photo Form */}
      <div className="p-6 border-2 border-[#0A0A0A] bg-white space-y-4 shadow-brutal-sm">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-bold text-[#0A0A0A] uppercase mb-1">
                Photo Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. MONOLITH V"
                className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] focus:outline-hidden uppercase font-bold"
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
                placeholder="ARCHITECTURE"
                className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] focus:outline-hidden uppercase"
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
                className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] focus:outline-hidden"
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
                placeholder="e.g. BERLIN"
                className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] focus:outline-hidden uppercase"
              />
            </div>
          </div>

          {/* Image Selector */}
          <div className="space-y-2">
            <label className="block font-bold text-[#0A0A0A] uppercase">
              Image Source (File Upload or Web URL) *
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Paste image web URL..."
                className="flex-1 px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] focus:outline-hidden"
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
                className="px-4 py-2 bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] font-bold hover:bg-[#304FFE] transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-brutal-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>UPLOAD FILE</span>
              </button>
            </div>

            {newImageUrl && (
              <div className="mt-2 flex items-center gap-3 p-2 bg-[#F4F0E6] border-2 border-[#0A0A0A]">
                <img
                  src={newImageUrl}
                  alt="preview"
                  className="w-12 h-12 object-cover border border-[#0A0A0A]"
                />
                <span className="text-xs text-gray-700 font-bold truncate">
                  Image loaded and ready to archive
                </span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!newTitle.trim() || !newImageUrl.trim()}
            className="px-6 py-2.5 bg-[#304FFE] text-white font-bold uppercase border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-[#0A0A0A] hover:text-[#EFFF00] transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
          >
            + ADD PHOTO TO ARCHIVE
          </button>
        </form>
      </div>

      {/* Edit Modal / Inline Form if editing */}
      {editingItem && (
        <div className="p-6 border-2 border-[#0A0A0A] bg-[#EFFF00]/20 space-y-4 shadow-brutal-sm">
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
                <label className="font-bold block mb-1">Title</label>
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
                  className="w-full px-3 py-2 border-2 border-[#0A0A0A] bg-white font-mono uppercase font-bold"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Category</label>
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
                  className="w-full px-3 py-2 border-2 border-[#0A0A0A] bg-white font-mono uppercase"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Year</label>
                <input
                  type="text"
                  value={editingItem.year}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      year: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-[#0A0A0A] bg-white font-mono"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Location</label>
                <input
                  type="text"
                  value={editingItem.location || ''}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      location: e.target.value.toUpperCase(),
                    })
                  }
                  className="w-full px-3 py-2 border-2 border-[#0A0A0A] bg-white font-mono uppercase"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#0A0A0A] text-white font-bold uppercase cursor-pointer hover:bg-[#304FFE]"
              >
                SAVE MODIFICATIONS
              </button>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 bg-white border-2 border-[#0A0A0A] cursor-pointer hover:bg-gray-100"
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

        <div className="divide-y-2 divide-[#0A0A0A] border-2 border-[#0A0A0A] bg-white shadow-brutal-sm">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center justify-between gap-4 hover:bg-[#F4F0E6] transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-14 h-14 object-cover border-2 border-[#0A0A0A] bg-black shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-bold text-[#0A0A0A] text-sm uppercase truncate">
                    {item.title}
                  </div>
                  <div className="text-gray-600 text-xs mt-0.5 truncate">
                    {item.category} · {item.year} · {item.location || 'GLOBAL'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
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

          {galleryItems.length === 0 && (
            <div className="p-8 text-center text-gray-500 font-mono text-xs">
              No photos currently in archive.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
