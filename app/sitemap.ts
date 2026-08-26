import type { MetadataRoute } from 'next';

const host = 'https://www.parkspotly.gr';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: host, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${host}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${host}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
