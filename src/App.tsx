/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { AboutModal } from './components/AboutModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Toast } from './components/Toast';
import { Project, GalleryItem } from './types';
import { DEFAULT_PROJECTS, DEFAULT_GALLERY_ITEMS } from './constants/defaultData';
import {
  DEFAULT_TAB_TITLE,
  DEFAULT_FAVICON_SVG,
  updateTabTitle,
  updateFavicon,
} from './utils/branding';
import defaultPortrait from './assets/images/azim_pj_portrait_1790919863456.jpg';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistent Tab Title state
  const [tabTitle, setTabTitle] = useState<string>(() => {
    return localStorage.getItem('azim_tab_title') || DEFAULT_TAB_TITLE;
  });

  // Persistent Favicon state
  const [faviconUrl, setFaviconUrl] = useState<string>(() => {
    return localStorage.getItem('azim_favicon_url') || DEFAULT_FAVICON_SVG;
  });

  // Synchronize Tab Title and Favicon with DOM
  useEffect(() => {
    updateTabTitle(tabTitle);
  }, [tabTitle]);

  useEffect(() => {
    updateFavicon(faviconUrl);
  }, [faviconUrl]);

  // Persistent Projects state
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('azim_portfolio_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROJECTS;
  });

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
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = window.innerWidth >= 640 ? 80 : 64;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth',
      });
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

  // Branding handlers
  const handleUpdateBranding = (newTitle: string, newFavicon: string) => {
    setTabTitle(newTitle);
    setFaviconUrl(newFavicon);
    try {
      localStorage.setItem('azim_tab_title', newTitle);
      localStorage.setItem('azim_favicon_url', newFavicon);
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
    updateTabTitle(newTitle);
    updateFavicon(newFavicon);
    setToastMessage('TAB TITLE & FAVICON UPDATED');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetBranding = () => {
    setTabTitle(DEFAULT_TAB_TITLE);
    setFaviconUrl(DEFAULT_FAVICON_SVG);
    localStorage.removeItem('azim_tab_title');
    localStorage.removeItem('azim_favicon_url');
    updateTabTitle(DEFAULT_TAB_TITLE);
    updateFavicon(DEFAULT_FAVICON_SVG);
    setToastMessage('BRANDING RESTORED TO DEFAULT');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Projects handlers
  const handleAddProject = (newProject: Project) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem('azim_portfolio_projects', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
    setToastMessage(`ADDED PROJECT: ${newProject.title}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    const updated = projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    setProjects(updated);
    try {
      localStorage.setItem('azim_portfolio_projects', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
    setToastMessage(`UPDATED PROJECT: ${updatedProject.title}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    try {
      localStorage.setItem('azim_portfolio_projects', JSON.stringify(updated));
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
    setToastMessage('PROJECT REMOVED FROM ARCHIVE');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReorderProjects = (reordered: Project[]) => {
    setProjects(reordered);
    try {
      localStorage.setItem('azim_portfolio_projects', JSON.stringify(reordered));
    } catch (e) {
      console.error('LocalStorage write failed:', e);
    }
  };

  const handleResetProjects = () => {
    setProjects(DEFAULT_PROJECTS);
    localStorage.removeItem('azim_portfolio_projects');
    setToastMessage('PROJECTS RESTORED TO DEFAULT');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Portrait handlers
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

  // Gallery handlers
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
      <main className="w-full max-w-full overflow-x-hidden pt-16 sm:pt-20">
        {/* Section 01: Hero */}
        <HeroSection
          onViewWork={() => scrollToSection('projects')}
          onAboutMe={() => scrollToSection('about')}
        />

        {/* Section 02: Dynamic Projects */}
        <ProjectsSection
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
          onSeeAllProjects={() => setSelectedProject(projects[0] || null)}
        />

        {/* Section 03: About Me */}
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

      {/* Full-Featured Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        currentTabTitle={tabTitle}
        currentFaviconUrl={faviconUrl}
        onUpdateBranding={handleUpdateBranding}
        onResetBranding={handleResetBranding}
        projects={projects}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onReorderProjects={handleReorderProjects}
        onResetProjects={handleResetProjects}
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
