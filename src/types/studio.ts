export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly index: string;
}

export interface StudioMetric {
  readonly value: string;
  readonly label: string;
  readonly detail: string;
}

export type ProjectSlug =
  | 'krono-horology'
  | 'atelier-nord'
  | 'monolith-audio'
  | 'verve-robotics';

export interface ProjectOutcome {
  readonly value: string;
  readonly label: string;
}

export interface StudioProject {
  readonly slug: ProjectSlug;
  readonly index: string;
  readonly title: string;
  readonly client: string;
  readonly year: string;
  readonly discipline: string;
  readonly tags: readonly string[];
  readonly summary: string;
  readonly challenge: string;
  readonly solution: string;
  readonly role: string;
  readonly timeline: string;
  readonly outcomes: readonly ProjectOutcome[];
  readonly accentTone: string;
  readonly aspect: 'landscape' | 'portrait' | 'wide';
}

export interface StudioCapability {
  readonly index: string;
  readonly title: string;
  readonly summary: string;
  readonly deliverables: readonly string[];
}

export interface RecognitionItem {
  readonly year: string;
  readonly organization: string;
  readonly project: string;
  readonly honor: string;
}
