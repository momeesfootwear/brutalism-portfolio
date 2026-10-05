import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ExternalLink,
  Layers,
  X,
  AlertTriangle,
} from 'lucide-react';
import { Project } from '../../types';

interface AdminProjectsTabProps {
  projects: Project[];
  onAddProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onReorderProjects: (projects: Project[]) => void;
  onResetProjects: () => void;
}

export const AdminProjectsTab: React.FC<AdminProjectsTabProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onReorderProjects,
  onResetProjects,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [number, setNumber] = useState('');
  const [accentColor, setAccentColor] = useState<'#EFFF00' | '#304FFE'>('#EFFF00');
  const [liveUrl, setLiveUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  // Full Details State
  const [category, setCategory] = useState('');
  const [role, setRole] = useState('');
  const [timeline, setTimeline] = useState('');
  const [overview, setOverview] = useState('');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');
  const [metricsInput, setMetricsInput] = useState('');

  const openAddForm = () => {
    const nextNum = projects.length + 1;
    const formattedNum = nextNum < 10 ? `[ 0${nextNum} ]` : `[ ${nextNum} ]`;

    setEditingId(null);
    setTitle('');
    setSubtitle('CREATIVE CASE STUDY —');
    setNumber(formattedNum);
    setAccentColor('#EFFF00');
    setLiveUrl('');
    setDescription('');
    setTagsInput('STRATEGY, DESIGN, EXECUTION');

    setCategory('Brand & Product Strategy');
    setRole('Lead Strategist & Designer');
    setTimeline(`${new Date().getFullYear()} – Present`);
    setOverview('');
    setChallenge('');
    setSolution('');
    setHighlightsInput('Comprehensive research and system architecture\nHigh-longevity visual design system\nDirect-to-market execution strategy');
    setMetricsInput('100% Bespoke Solution\nHigh-Performance Architecture');

    setFormError(null);
    setIsEditing(true);
  };

  const openEditForm = (project: Project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setSubtitle(project.subtitle);
    setNumber(project.number);
    setAccentColor(project.accentColor);
    setLiveUrl(project.liveUrl || '');
    setDescription(project.description);
    setTagsInput(project.tags.join(', '));

    setCategory(project.fullDetails.category);
    setRole(project.fullDetails.role);
    setTimeline(project.fullDetails.timeline);
    setOverview(project.fullDetails.overview);
    setChallenge(project.fullDetails.challenge);
    setSolution(project.fullDetails.solution);
    setHighlightsInput(project.fullDetails.highlights.join('\n'));
    setMetricsInput((project.fullDetails.metrics || []).join('\n'));

    setFormError(null);
    setIsEditing(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setFormError('Project title is required.');
      return;
    }
    if (!description.trim()) {
      setFormError('Project description is required.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean);

    const highlights = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const metrics = metricsInput
      .split('\n')
      .map((m) => m.trim())
      .filter(Boolean);

    const projectId =
      editingId ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-') + `-${Date.now().toString().slice(-4)}`;

    const projectData: Project = {
      id: projectId,
      number: number.trim() || `[ 01 ]`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: description.trim(),
      tags: tags.length ? tags : ['CASE STUDY'],
      accentColor,
      accentPosition: 'right',
      liveUrl: liveUrl.trim() || undefined,
      fullDetails: {
        category: category.trim() || 'Strategy & Design',
        role: role.trim() || 'Lead Strategist',
        timeline: timeline.trim() || '2026',
        overview: overview.trim() || description.trim(),
        challenge: challenge.trim() || 'Navigating competitive market saturation with distinct architectural positioning.',
        solution: solution.trim() || 'Engineered a modern high-contrast design and execution roadmap.',
        highlights: highlights.length ? highlights : ['Custom architecture and branding framework'],
        metrics: metrics.length ? metrics : undefined,
      },
    };

    if (editingId) {
      onUpdateProject(projectData);
    } else {
      onAddProject(projectData);
    }

    setIsEditing(false);
    setEditingId(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const reordered = [...projects];
    const temp = reordered[index - 1];
    reordered[index - 1] = reordered[index];
    reordered[index] = temp;
    onReorderProjects(reordered);
  };

  const handleMoveDown = (index: number) => {
    if (index === projects.length - 1) return;
    const reordered = [...projects];
    const temp = reordered[index + 1];
    reordered[index + 1] = reordered[index];
    reordered[index] = temp;
    onReorderProjects(reordered);
  };

  return (
    <div className="space-y-6">
      {!isEditing ? (
        /* List View */
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#0A0A0A] pb-4">
            <div>
              <h4 className="font-heading font-black text-base text-[#0A0A0A] uppercase tracking-tight flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#304FFE]" />
                <span>PROJECT ARCHIVE ({projects.length})</span>
              </h4>
              <p className="font-mono text-xs text-gray-600 mt-0.5">
                Add, edit, rearrange, or delete projects displayed in Section 02.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onResetProjects}
                className="px-3.5 py-2 bg-transparent border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Restore default projects"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RESTORE DEFAULTS</span>
              </button>

              <button
                type="button"
                onClick={openAddForm}
                className="px-4 py-2 bg-[#0A0A0A] text-[#EFFF00] border-2 border-[#0A0A0A] shadow-brutal-sm font-mono text-xs font-bold uppercase hover:bg-[#304FFE] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>ADD PROJECT</span>
              </button>
            </div>
          </div>

          {/* Project List Items */}
          <div className="space-y-3">
            {projects.map((proj, idx) => {
              const isConfirmingDelete = deleteConfirmId === proj.id;
              const isYellow = proj.accentColor === '#EFFF00';

              return (
                <div
                  key={proj.id}
                  className="p-4 sm:p-5 border-2 border-[#0A0A0A] bg-white shadow-brutal-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-[#FDFBF7]"
                >
                  {/* Left Info */}
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    {/* Accent Color Square */}
                    <div
                      className={`w-6 h-12 sm:w-8 sm:h-12 border-2 border-[#0A0A0A] shrink-0 ${
                        isYellow ? 'bg-[#EFFF00]' : 'bg-[#304FFE]'
                      }`}
                      title={`Accent Color: ${proj.accentColor}`}
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0A0A0A]">
                          {proj.number}
                        </span>
                        <h5 className="font-heading font-black text-lg text-[#0A0A0A] uppercase tracking-tight truncate">
                          {proj.title}
                        </h5>
                        <span className="font-mono text-[10px] px-2 py-0.5 border border-[#0A0A0A] bg-[#F4F0E6] text-gray-700 font-bold uppercase">
                          {proj.fullDetails.category}
                        </span>
                        {proj.liveUrl && (
                          <span className="font-mono text-[10px] px-1.5 py-0.5 bg-[#304FFE] text-white font-bold uppercase flex items-center gap-1">
                            <ExternalLink className="w-2.5 h-2.5" />
                            <span>LIVE APP</span>
                          </span>
                        )}
                      </div>

                      <p className="font-mono text-xs text-gray-600 truncate mt-1">
                        {proj.subtitle} · {proj.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[9px] px-1.5 py-0.5 border border-[#0A0A0A] text-[#0A0A0A] bg-white"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    {/* Reorder Buttons */}
                    <div className="flex items-center border border-[#0A0A0A]">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        className="p-1.5 hover:bg-[#EFFF00] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed border-r border-[#0A0A0A]"
                        title="Move project up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === projects.length - 1}
                        className="p-1.5 hover:bg-[#EFFF00] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                        title="Move project down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => openEditForm(proj)}
                      className="px-3 py-1.5 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-[#EFFF00] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>EDIT</span>
                    </button>

                    {/* Delete Button / Confirmation */}
                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-1.5 animate-in fade-in">
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteProject(proj.id);
                            setDeleteConfirmId(null);
                          }}
                          className="px-3 py-1.5 bg-red-600 text-white border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-red-700 transition-colors cursor-pointer"
                        >
                          CONFIRM
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1.5 bg-gray-200 border-2 border-[#0A0A0A] font-mono text-xs font-bold hover:bg-gray-300 transition-colors cursor-pointer"
                        >
                          CANCEL
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(proj.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 border-2 border-transparent hover:border-red-600 transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {projects.length === 0 && (
              <div className="p-8 text-center border-2 border-dashed border-[#0A0A0A] bg-white font-mono text-xs text-gray-500 space-y-2">
                <p>No projects found in the archive.</p>
                <button
                  type="button"
                  onClick={onResetProjects}
                  className="font-bold text-[#304FFE] underline"
                >
                  Restore default projects
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Edit / Add View */
        <form onSubmit={handleSaveForm} className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b-2 border-[#0A0A0A] pb-3">
            <div>
              <h4 className="font-heading font-black text-lg text-[#0A0A0A] uppercase tracking-tight">
                {editingId ? `EDIT: ${title || 'PROJECT'}` : 'ADD NEW PROJECT'}
              </h4>
              <p className="font-mono text-xs text-gray-600">
                Configure both card summary and detailed case study modal contents.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 border-2 border-[#0A0A0A] bg-[#F4F0E6] font-mono text-xs font-bold uppercase hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>CANCEL</span>
            </button>
          </div>

          {formError && (
            <div className="p-3 bg-red-100 border-2 border-red-600 text-red-900 font-mono text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Section A: Card Summary Settings */}
          <div className="p-5 border-2 border-[#0A0A0A] bg-white shadow-brutal-sm space-y-4">
            <h5 className="font-heading font-black text-xs uppercase text-[#0A0A0A] border-b border-[#0A0A0A] pb-2">
              CARD OVERVIEW & ACCENT
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  PROJECT TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VELSTRADA"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-sm font-bold text-[#0A0A0A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  SUBTITLE (CAPS)
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="LUXURY BRAND —"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-sm font-medium text-[#0A0A0A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  DISPLAY NUMBER
                </label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="[ 01 ]"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-sm font-bold text-[#0A0A0A] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  ACCENT COLOR STRIPE
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAccentColor('#EFFF00')}
                    className={`flex-1 p-2 border-2 border-[#0A0A0A] flex items-center justify-center gap-2 font-mono text-xs font-bold transition-all cursor-pointer ${
                      accentColor === '#EFFF00'
                        ? 'bg-[#EFFF00] text-[#0A0A0A] shadow-brutal-sm'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 bg-[#EFFF00] border border-[#0A0A0A]" />
                    <span>ACID YELLOW</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccentColor('#304FFE')}
                    className={`flex-1 p-2 border-2 border-[#0A0A0A] flex items-center justify-center gap-2 font-mono text-xs font-bold transition-all cursor-pointer ${
                      accentColor === '#304FFE'
                        ? 'bg-[#304FFE] text-white shadow-brutal-sm'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 bg-[#304FFE] border border-[#0A0A0A]" />
                    <span>HYPER BLUE</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  LIVE DEPLOYMENT / APP URL (OPTIONAL)
                </label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs text-[#0A0A0A] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                SHORT CARD DESCRIPTION *
              </label>
              <textarea
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A concise 1-2 sentence overview shown directly on the homepage project card."
                className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs leading-relaxed text-[#0A0A0A] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                TAGS (COMMA SEPARATED)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="BRANDING, STRATEGY, UI/UX, SAAS"
                className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs text-[#0A0A0A] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Section B: Full Case Study Modal Content */}
          <div className="p-5 border-2 border-[#0A0A0A] bg-white shadow-brutal-sm space-y-4">
            <h5 className="font-heading font-black text-xs uppercase text-[#0A0A0A] border-b border-[#0A0A0A] pb-2">
              CASE STUDY MODAL DETAILS
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  CATEGORY BADGE
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Brand Strategy & Identity"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs text-[#0A0A0A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  YOUR ROLE
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Brand Strategist & Creative Director"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs text-[#0A0A0A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  TIMELINE
                </label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="2025 – Present"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs text-[#0A0A0A] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                EXECUTIVE SUMMARY / OVERVIEW
              </label>
              <textarea
                rows={3}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="Detailed executive overview of the project scope and mandate."
                className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs leading-relaxed text-[#0A0A0A] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  THE STRATEGIC CHALLENGE
                </label>
                <textarea
                  rows={3}
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="What was the core problem, hurdle, or market saturation being solved?"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs leading-relaxed text-[#0A0A0A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  THE SOLUTION & ARCHITECTURE
                </label>
                <textarea
                  rows={3}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="How was the problem solved through brand strategy or engineering?"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs leading-relaxed text-[#0A0A0A] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  KEY HIGHLIGHTS (ONE PER LINE)
                </label>
                <textarea
                  rows={4}
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  placeholder="Complete visual identity guidelines&#10;Custom tactile packaging die-lines&#10;Zero-discount release schedule"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs text-[#0A0A0A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase text-[#0A0A0A] mb-1">
                  KEY METRICS (OPTIONAL, ONE PER LINE)
                </label>
                <textarea
                  rows={4}
                  value={metricsInput}
                  onChange={(e) => setMetricsInput(e.target.value)}
                  placeholder="100% Bespoke Brand Artifacts&#10;Sub-2s Checkout Time&#10;99.9% Production Uptime"
                  className="w-full px-3 py-2 bg-[#F4F0E6] border-2 border-[#0A0A0A] font-mono text-xs text-[#0A0A0A] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Form Submit & Cancel Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-3 bg-transparent border-2 border-[#0A0A0A] font-mono text-xs font-bold uppercase hover:bg-gray-200 transition-colors cursor-pointer"
            >
              CANCEL
            </button>

            <button
              type="submit"
              className="px-7 py-3 bg-[#0A0A0A] text-[#EFFF00] border-2 border-[#0A0A0A] shadow-brutal-sm font-mono text-xs font-bold uppercase hover:bg-[#304FFE] hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>SAVE PROJECT</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
