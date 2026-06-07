import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const coachingIds = ['pro', 'guarantee', 'month', 'short', '120', '60', 'group']

  return [
    {
      url: 'https://dox-point.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://dox-point.vercel.app/coaching',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://dox-point.vercel.app/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...coachingIds.map((id) => ({
      url: `https://dox-point.vercel.app/coaching/${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
