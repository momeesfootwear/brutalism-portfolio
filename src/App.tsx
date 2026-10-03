/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection, PROJECTS } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { GallerySection, DEFAULT_GALLERY_ITEMS } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { AboutModal } from './components/AboutModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Toast } from './components/Toast';
import { Project, GalleryItem } from './types';
import defaultPortrait from './assets/images/azim_pj_portrait_1790919863456.jpg';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistent Portrait state
  const [portraitUrl, setPortraitUrl] = useState<string>(() => {
    return localStorage.getItem('azim_custom_portrait') || defaultPortrait;
  });

  // Persistent Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('azim_gallery_items');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_GALLERY_ITEMS;
  });

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    const email = 'azimparayangattil@gmail.com';
    navigator.clipboard.writeText(email);
    setToastMessage(`COPIED TO CLIPBOARD: ${email}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Admin handlers
  const handleUpdatePortrait = (newUrl: string) => {
    setPortraitUrl(newUrl);
    localStorage.setItem('azim_custom_portrait', newUrl);
    setToastMessage('ABOUT PHOTO UPDATED SUCCESSFULLY');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetPortrait = () => {
    setPortraitUrl(defaultPortrait);
    localStorage.removeItem('azim_custom_portrait');
    setToastMessage('ORIGINAL PHOTO RESTORED');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddGalleryItem = (newItem: GalleryItem) => {
    const updated = [newItem, ...galleryItems];
    setGalleryItems(updated);
    localStorage.setItem('azim_gallery_items', JSON.stringify(updated));
    setToastMessage(`ADDED TO GALLERY: ${newItem.title}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateGalleryItem = (updatedItem: GalleryItem) => {
    const updated = galleryItems.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setGalleryItems(updated);
    localStorage.setItem('azim_gallery_items', JSON.stringify(updated));
    setToastMessage(`UPDATED PHOTO: ${updatedItem.title}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteGalleryItem = (id: string) => {
    const updated = galleryItems.filter((item) => item.id !== id);
    setGalleryItems(updated);
    localStorage.setItem('azim_gallery_items', JSON.stringify(updated));
    setToastMessage('PHOTO REMOVED FROM GALLERY');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetGallery = () => {
    setGalleryItems(DEFAULT_GALLERY_ITEMS);
    localStorage.removeItem('azim_gallery_items');
    setToastMessage('GALLERY RESTORED TO DEFAULT');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#0A0A0A] font-mono selection:bg-[#EFFF00] selection:text-[#0A0A0A] relative w-full max-w-full overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#304FFE] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenConnect={() => setIsContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="w-full max-w-full overflow-x-hidden">
        {/* Section 01: Hero */}
        <HeroSection
          onViewWork={() => scrollToSection('projects')}
          onAboutMe={() => scrollToSection('about')}
        />

        {/* Section 02: Projects */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          onSeeAllProjects={() => setSelectedProject(PROJECTS[0])}
        />

        {/* Section 03: About Me (Dynamic portrait manageable via Admin) */}
        <AboutSection
          portraitUrl={portraitUrl}
          onMoreAboutMe={() => setIsAboutModalOpen(true)}
        />

        {/* Section 04: Skills */}
        <SkillsSection />

        {/* Section 05: Dedicated Photo Gallery */}
        <GallerySection items={galleryItems} />

        {/* Section 06: Contact / Let's Talk */}
        <ContactSection
          onOpenMessageModal={() => setIsContactOpen(true)}
          onCopyEmail={handleCopyEmail}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </main>

      {/* Modals & Dialogs */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onCopyEmail={handleCopyEmail}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onConnect={() => setIsContactOpen(true)}
      />

      {/* Admin Panel Modal (Protected with Passcode 3808) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentPortraitUrl={portraitUrl}
        onUpdatePortrait={handleUpdatePortrait}
        onResetPortrait={handleResetPortrait}
        galleryItems={galleryItems}
        onAddGalleryItem={handleAddGalleryItem}
        onUpdateGalleryItem={handleUpdateGalleryItem}
        onDeleteGalleryItem={handleDeleteGalleryItem}
        onResetGallery={handleResetGallery}
      />

      {/* Neobrutalist Feedback Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
