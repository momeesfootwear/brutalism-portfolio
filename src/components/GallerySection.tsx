import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types';
import { DEFAULT_GALLERY_ITEMS } from '../constants/defaultData';

export { DEFAULT_GALLERY_ITEMS };

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['ALL', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems =
    activeFilter === 'ALL'
      ? items
      : items.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  // Close lightbox on Escape key & arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section
      id="gallery"
      className="relative w-full border-b-2 border-[#0A0A0A] bg-[#F4F0E6] py-10 sm:py-20 lg:py-24"
    >
      <div className="site-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 sm:pb-14 border-b-2 border-[#0A0A0A] gap-4 w-full max-w-full min-w-0">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 font-mono font-bold text-xs sm:text-base text-[#0A0A0A]">
              <span className="w-[2px] h-5 sm:h-6 bg-[#0A0A0A] inline-block mr-1" />
              <span>05</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#0A0A0A] uppercase flex items-baseline">
              <span>GALLERY</span>
              <span className="w-2 sm:w-3 h-2 sm:h-3 ml-1 bg-[#304FFE] rounded-full inline-block" />
            </h2>
          </div>

          {/* Category Filter Pills (Brutalist Style - touch scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap w-full sm:w-auto max-w-full min-w-0 no-scrollbar touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase border-2 border-[#0A0A0A] transition-all whitespace-nowrap shrink-0 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${
                  activeFilter === cat
                    ? 'bg-[#EFFF00] text-[#0A0A0A] shadow-brutal-sm font-black'
                    : 'bg-[#F4F0E6] text-[#0A0A0A] hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-12 w-full max-w-full min-w-0">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group bg-white border-2 border-[#0A0A0A] shadow-brutal-md transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer flex flex-col justify-between overflow-hidden active:translate-x-0 active:translate-y-0"
            >
              {/* Photo Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#0A0A0A] border-b-2 border-[#0A0A0A]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Corner Expand Indicator */}
                <div className="absolute top-3 right-3 p-1.5 bg-[#EFFF00] text-[#0A0A0A] border-2 border-[#0A0A0A] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-brutal-sm">
                  <Maximize2 className="w-4 h-4 stroke-[2.5]" />
                </div>

                {/* Brutalist Year Badge */}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-[#0A0A0A] text-[#EFFF00] border border-[#0A0A0A] font-mono text-[10px] font-bold tracking-widest uppercase">
                  {item.year}
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="p-3.5 sm:p-5 bg-white space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs font-bold text-gray-600">
                  <span className="uppercase">{item.category}</span>
                  <span>{item.location || 'GLOBAL'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-black text-base sm:text-lg text-[#0A0A0A] uppercase tracking-tight group-hover:text-[#304FFE] transition-colors truncate">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] text-[#0A0A0A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 border-2 border-[#0A0A0A] bg-white mt-10 p-8 font-mono">
            <p className="text-sm font-bold text-gray-700 uppercase">
              No photos found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Brutalist Fullscreen Lightbox (Mobile & Desktop Optimized) */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl bg-[#F4F0E6] border-3 border-[#0A0A0A] shadow-brutal-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="p-3 sm:p-4 bg-white border-b-2 border-[#0A0A0A] flex items-center justify-between font-mono gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="px-2 py-0.5 bg-[#EFFF00] border border-[#0A0A0A] text-[10px] sm:text-xs font-bold shrink-0">
                  {filteredItems[lightboxIndex].category}
                </span>
                <span className="font-heading font-black text-sm sm:text-lg text-[#0A0A0A] uppercase truncate">
                  {filteredItems[lightboxIndex].title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] sm:text-xs font-bold text-gray-600 mr-1 sm:mr-2">
                  {lightboxIndex + 1}/{filteredItems.length}
                </span>
                <button
                  onClick={closeLightbox}
                  className="p-1.5 sm:p-2 border-2 border-[#0A0A0A] bg-[#F4F0E6] hover:bg-[#0A0A0A] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Photo Container */}
            <div className="relative bg-[#0A0A0A] flex items-center justify-center max-h-[65vh] sm:max-h-[75vh] overflow-hidden p-2 sm:p-4">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[60vh] sm:max-h-[70vh] w-auto max-w-full object-contain border-2 border-white/20 select-none"
              />

              {/* Prev / Next Controls */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevLightbox();
                    }}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-[#F4F0E6] border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-[#EFFF00] transition-colors cursor-pointer active:scale-95"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextLightbox();
                    }}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-[#F4F0E6] border-2 border-[#0A0A0A] shadow-brutal-sm hover:bg-[#EFFF00] transition-colors cursor-pointer active:scale-95"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Details Bar */}
            <div className="p-3 sm:p-4 bg-[#F4F0E6] border-t-2 border-[#0A0A0A] flex flex-col sm:flex-row sm:items-center justify-between font-mono text-[10px] sm:text-xs font-bold text-[#0A0A0A] gap-1">
              <div>
                LOCATION: {filteredItems[lightboxIndex].location || 'UNSPECIFIED'} · YEAR:{' '}
                {filteredItems[lightboxIndex].year}
              </div>
              <div className="text-gray-600 sm:text-[#0A0A0A]">
                TAP OR USE ARROWS TO NAVIGATE
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
