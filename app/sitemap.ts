import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://ameypatil.vercel.app', lastModified: new Date() }]
}
