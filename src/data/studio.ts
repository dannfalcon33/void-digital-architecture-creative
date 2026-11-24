import type {
  NavItem,
  ProjectSlug,
  RecognitionItem,
  StudioCapability,
  StudioMetric,
  StudioProject,
} from '@/types/studio';

export const STUDIO_META = {
  name: 'VOID',
  tagline: 'Digital Architecture & Creative Direction',
  location: 'Zurich / New York',
  timezone: 'Europe/Zurich',
  coordinates: '47.3769° N, 8.5417° E',
  email: 'hello@void.studio',
  availability: 'Booking Q1 — 2027',
  copyrightYear: '2026',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'X / Twitter', href: 'https://x.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
  ],
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { index: '01', label: 'Manifesto', href: '/#manifesto' },
  { index: '02', label: 'Selected Work', href: '/#work' },
  { index: '03', label: 'Capabilities', href: '/#capabilities' },
  { index: '04', label: 'Contact', href: '/#contact' },
] as const;

export const HERO_CONTENT = {
  eyebrow: 'INDEPENDENT CREATIVE STUDIO — EST. 2021',
  headlineLines: ['WE ARCHITECT', 'DIGITAL', 'SILENCE & IMPACT'],
  description:
    'VOID partners with category-defining brands to craft brutalist digital flagships, editorial design systems, and kinetic web experiences built with mathematical precision.',
  primaryCta: {
    label: 'Explore Archive',
    href: '#work',
  },
  secondaryCta: {
    label: 'Start a Dialogue',
    href: '#contact',
  },
  featuredReel: {
    code: 'SYS / 001',
    title: 'Spatial Grid Monograph',
    subtitle: '12-Column Swiss Architecture & Kinetic Depth',
    year: '2026',
  },
} as const;

export const MANIFESTO_CONTENT = {
  index: '01',
  kicker: 'STUDIO MANIFESTO',
  statement:
    'Restraint is our loudest instrument. We strip away noise until typography, negative space, and calibrated motion carry the entire narrative.',
  body: 'Every interface begins as an architectural grid. By pairing fluid typographic ratios with layered spatial depth and micro-choreographed tweens, we turn brand identity into a tactile digital monument.',
  metrics: [
    {
      value: '12',
      label: 'Column Precision',
      detail: 'Strict CSS Grid geometry across every editorial canvas.',
    },
    {
      value: '60fps',
      label: 'Kinetic Discipline',
      detail: 'Compositor-only GSAP tweens calibrated to human perception.',
    },
    {
      value: '34+',
      label: 'Global Flagships',
      detail: 'Shipped for luxury fashion, architecture, and frontier tech.',
    },
  ] satisfies readonly StudioMetric[],
} as const;

export const SELECTED_PROJECTS: readonly StudioProject[] = [
  {
    slug: 'krono-horology',
    index: '01',
    title: 'KRONO HOROLOGY',
    client: 'Krono Geneva',
    year: '2026',
    discipline: 'Digital Flagship',
    tags: ['Art Direction', 'Next.js', 'GSAP Motion'],
    summary:
      'A nocturnal product monograph engineered around mechanical escapement rhythms and Swiss typographic grids.',
    challenge:
      'Translate the microscopic tolerances of a 280-component mechanical calibre into a browser experience without sacrificing mobile speed or typographic clarity.',
    solution:
      'We structured the flagship on an uncompromising 12-column Swiss grid with fluid clamp() typography and layered depth plates that echo watchmaking bridges and sapphire crystal.',
    role: 'Creative Direction, Design System, Creative Frontend',
    timeline: '10 Weeks',
    outcomes: [
      { value: '+64%', label: 'Private Collector Inquiries' },
      { value: '0.8s', label: 'Largest Contentful Paint' },
      { value: '99', label: 'Lighthouse Performance' },
    ],
    accentTone: '#FF4D2E',
    aspect: 'wide',
  },
  {
    slug: 'atelier-nord',
    index: '02',
    title: 'ATELIER NORD',
    client: 'Nord Architecture',
    year: '2026',
    discipline: 'Editorial Archive',
    tags: ['Design System', 'Spatial Grid', 'Creative Dev'],
    summary:
      'Monolithic architectural portfolio structured in strict 12-column plates with layered photographic depth.',
    challenge:
      'Unify fifteen years of concrete, timber, and civic architecture monographs into an archive that feels calm, tactile, and instantaneously filterable.',
    solution:
      'Built an asymmetric plate system where foreground captions float on separate spatial planes from deep structural imagery, bound together by calibrated GSAP micro-transitions.',
    role: 'Art Direction, Architecture System, Next.js Build',
    timeline: '8 Weeks',
    outcomes: [
      { value: '4.2m', label: 'Avg. Session Duration' },
      { value: '120+', label: 'Indexed Monograph Plates' },
      { value: '100', label: 'Accessibility Score' },
    ],
    accentTone: '#F5F4F0',
    aspect: 'portrait',
  },
  {
    slug: 'monolith-audio',
    index: '03',
    title: 'MONOLITH AUDIO',
    client: 'Monolith Labs',
    year: '2025',
    discipline: 'Interactive Launch',
    tags: ['Brand Identity', 'Kinetic UI', 'Motion System'],
    summary:
      'Acoustic hardware launch pairing silent monochrome contrast with reactive frequency micro-transitions.',
    challenge:
      'Communicate reference-grade acoustic neutrality visually—avoiding clichéd neon waveforms in favor of disciplined industrial minimalism.',
    solution:
      'Created a silent obsidian canvas punctuated by precision vermilion harmonic indicators and scroll-scrubbed depth planes that reveal internal transducer geometry.',
    role: 'Brand Architecture, Launch Flagship, Motion Engineering',
    timeline: '12 Weeks',
    outcomes: [
      { value: '3.1x', label: 'Pre-Order Conversion' },
      { value: '60fps', label: 'Sustained Motion Frame Rate' },
      { value: '18K', label: 'Launch Week Waitlist' },
    ],
    accentTone: '#FF4D2E',
    aspect: 'landscape',
  },
  {
    slug: 'verve-robotics',
    index: '04',
    title: 'VERVE ROBOTICS',
    client: 'Verve Autonomous',
    year: '2025',
    discipline: 'Brand & Web System',
    tags: ['System Architecture', 'TypeScript', 'Motion'],
    summary:
      'Industrial precision translated into a modular digital platform for next-generation autonomous systems.',
    challenge:
      'Elevate a deep-tech robotics manufacturer from dense engineering datasheets to a category-defining flagship that resonates with industrial executives.',
    solution:
      'Engineered a token-driven component architecture with telemetry-inspired mono typography, fluid clamp layouts, and restrained GSAP state transitions.',
    role: 'Design System, Frontend Architecture, Brand Refresh',
    timeline: '9 Weeks',
    outcomes: [
      { value: '+112%', label: 'Enterprise Demo Requests' },
      { value: '42', label: 'Reusable UI Primitives' },
      { value: '0', label: 'Cumulative Layout Shift' },
    ],
    accentTone: '#A1A1A6',
    aspect: 'wide',
  },
] as const;

export function getProjectBySlug(slug: string): StudioProject | undefined {
  return SELECTED_PROJECTS.find((project) => project.slug === slug);
}

export function getNextProject(slug: ProjectSlug): StudioProject {
  const index = SELECTED_PROJECTS.findIndex((project) => project.slug === slug);
  return SELECTED_PROJECTS[(index + 1) % SELECTED_PROJECTS.length];
}

export const CAPABILITIES: readonly StudioCapability[] = [
  {
    index: '01',
    title: 'Creative Direction & Systems',
    summary:
      'Visual identities, Swiss editorial grids, and scalable token-driven design systems built for longevity.',
    deliverables: [
      'Digital Brand Architecture',
      'Design Systems & Tokens',
      'Editorial Art Direction',
      'Typographic Systems',
    ],
  },
  {
    index: '02',
    title: 'Creative Frontend Engineering',
    summary:
      'Production-grade Next.js and TypeScript architectures where craft, accessibility, and Core Web Vitals coexist.',
    deliverables: [
      'Next.js App Router Platforms',
      'Fluid Clamp Responsive Grids',
      'GSAP Kinetic Choreography',
      'Performance & A11y Engineering',
    ],
  },
  {
    index: '03',
    title: 'Spatial & Motion Design',
    summary:
      'Layered depth compositions, scroll-linked narratives, and tactile micro-transitions that guide attention without friction.',
    deliverables: [
      'Interactive Prototyping',
      'Scroll Choreography',
      'Micro-Interaction Systems',
      'Launch Flagships',
    ],
  },
] as const;

export const RECOGNITION: readonly RecognitionItem[] = [
  {
    year: '2026',
    organization: 'Awwwards',
    project: 'KRONO HOROLOGY',
    honor: 'Site of the Month — Nominee',
  },
  {
    year: '2026',
    organization: 'FWA',
    project: 'ATELIER NORD',
    honor: 'FWA of the Day',
  },
  {
    year: '2025',
    organization: 'Type Directors Club',
    project: 'MONOLITH AUDIO',
    honor: 'Certificate of Typographic Excellence',
  },
  {
    year: '2025',
    organization: 'SiteInspire',
    project: 'VERVE ROBOTICS',
    honor: 'Featured Studio Flagship',
  },
] as const;
