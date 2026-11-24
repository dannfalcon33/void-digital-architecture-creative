import type { MetadataRoute } from 'next';
import { SELECTED_PROJECTS } from '@/data/studio';

const BASE_URL = 'https://void.studio';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...SELECTED_PROJECTS.map((project) => ({
      url: `${BASE_URL}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ];
}
