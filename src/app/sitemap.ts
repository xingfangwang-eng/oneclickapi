import { MetadataRoute } from 'next';
import keywords from '@data/keywords.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oneclickapi.vercel.app';
  
  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Generate sitemap entries for all keyword pages
  const keywordPages = keywords.map((keyword) => ({
    url: `${baseUrl}/${keyword.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...mainPages, ...keywordPages];
}
