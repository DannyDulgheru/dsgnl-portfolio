import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const sitemapUrl = `${url.origin}/sitemap.xml`;

	return new Response(
		`User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${sitemapUrl}
`,
		{
			headers: {
				'Content-Type': 'text/plain',
				'Cache-Control': 'public, max-age=86400'
			}
		}
	);
};
