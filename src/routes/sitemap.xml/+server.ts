import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
	const base = url.origin;

	const publishedProjects = await db
		.select({ slug: projects.slug, updatedAt: projects.updatedAt })
		.from(projects)
		.where(eq(projects.status, 'published'))
		.all();

	const staticPages: { url: string; priority: string; freq: string; lastmod?: string }[] = [
		{ url: `${base}/`, priority: '1.0', freq: 'weekly' },
		{ url: `${base}/work`, priority: '0.9', freq: 'weekly' },
		{ url: `${base}/about`, priority: '0.7', freq: 'monthly' },
		{ url: `${base}/contact`, priority: '0.6', freq: 'monthly' }
	];

	const projectPages = publishedProjects.map((p) => ({
		url: `${base}/work/${p.slug}`,
		priority: '0.8',
		freq: 'monthly',
		lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString().split('T')[0] : undefined
	}));

	const allPages = [...staticPages, ...projectPages];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(p) => `  <url>
    <loc>${p.url}</loc>
    ${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
