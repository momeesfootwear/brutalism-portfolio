import { Project, GalleryItem } from '../types';
import archImg from '../assets/images/gallery_brutalist_arch_1790920367202.jpg';
import streetImg from '../assets/images/gallery_street_shadow_1790920383557.jpg';
import textureImg from '../assets/images/gallery_minimal_texture_1790920399005.jpg';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'velstrada',
    number: '[ 01 ]',
    title: 'VELSTRADA',
    subtitle: 'LUXURY BRAND —',
    description:
      'A luxury brand focused on timeless design and elevated everyday essentials.',
    tags: ['BRANDING', 'STRATEGY', 'PRODUCT DIRECTION'],
    accentColor: '#EFFF00',
    accentPosition: 'right',
    liveUrl: '',
    fullDetails: {
      category: 'Brand Strategy & Identity',
      role: 'Brand Strategist & Creative Director',
      timeline: '2025 – Present',
      overview:
        'VELSTRADA is a modern luxury lifestyle house grounded in understated elegance, structural silhouettes, and enduring material craftsmanship. Stripping away noisy ornamentation to spotlight precision tailoring and raw texture.',
      challenge:
        'Contemporary luxury markets are oversaturated with superficial logo-driven drops and short-lived trend cycles. The objective was to architect a high-longevity brand narrative with strict typographic restraint, premium haptic packaging, and an aspirational yet functional product hierarchy.',
      solution:
        'Engineered an architectural brand identity system using stark monochromatic contrasts, bespoke packaging die-lines, and a curated capsule release schedule that commands premium pricing through intentional scarcity.',
      highlights: [
        'Complete brand identity guidelines and visual positioning bible',
        'Custom tactile packaging specifications and sensory unboxing experience',
        'Direct-to-consumer digital commerce strategy with zero-discount philosophy',
        'Lookbook art direction and minimalist material curation',
      ],
      metrics: [
        '100% Bespoke Brand Artifacts',
        'Ultra-Minimalist Visual Architecture',
        'Sustainable High-Grade Materials',
      ],
    },
  },
  {
    id: 'dinebill',
    number: '[ 02 ]',
    title: 'DineBill',
    subtitle: 'CAFÉ BILLING POS SOFTWARE —',
    description:
      'A simple and efficient billing solution for cafés and small restaurants.',
    tags: ['PRODUCT CONCEPT', 'BUSINESS STRATEGY', 'UI/UX', 'OPERATIONS'],
    accentColor: '#304FFE',
    accentPosition: 'right',
    liveUrl: 'https://dinebill.vercel.app/',
    fullDetails: {
      category: 'Product & SaaS POS Platform',
      role: 'Product Lead & System Architect',
      timeline: '2025 – Present',
      overview:
        'DineBill is a streamlined point-of-sale terminal software built explicitly to eliminate counter congestion, simplify split checks, and maintain zero-latency order dispatch in high-volume urban cafés.',
      challenge:
        'Traditional restaurant POS systems are bloated, require lengthy staff onboarding, run sluggishly on tablet hardware, and crash during peak morning rush hours when internet connections flicker.',
      solution:
        'Designed a high-contrast, thumb-optimized 2-tap billing workflow with instant receipt generation, local-first offline resilience, automated sales reconciliation, and clear visual order tickets for kitchen staff.',
      highlights: [
        'Sub-second order dispatch workflow designed for rapid baristas',
        'Offline-first architecture with background reconciliation',
        'Real-time table assignment & itemized split billing',
        'Integrated inventory telemetry and morning prep warnings',
      ],
      metrics: [
        '< 2s Average Order Checkout',
        'Zero-Latency Offline Mode',
        '99.9% Uptime During Rush Hours',
      ],
    },
  },
];

export const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'photo-1',
    title: 'MONOLITHIC CONCRETE V',
    category: 'ARCHITECTURE',
    year: '2025',
    imageUrl: archImg,
    location: 'BERLIN',
  },
  {
    id: 'photo-2',
    title: 'TRANSIT INTERSECTIONS',
    category: 'STREET & SHADOW',
    year: '2025',
    imageUrl: streetImg,
    location: 'TOKYO',
  },
  {
    id: 'photo-3',
    title: 'TITANIUM ARTIFACT',
    category: 'PRODUCT STUDY',
    year: '2026',
    imageUrl: textureImg,
    location: 'MILAN',
  },
];
