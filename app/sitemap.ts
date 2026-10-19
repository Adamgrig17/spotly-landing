import type { MetadataRoute } from 'next';

const host = 'https://www.parkspotly.gr';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: host, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${host}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${host}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${host}/promo/welcome3`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${host}/promo/spartak`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
