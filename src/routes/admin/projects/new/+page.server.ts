import { db } from '$lib/server/db';
import { projects } from '$lib/server/db/schema';
import { slugify } from '$lib/server/projects';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({ });

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const title = (data.get('title') as string)?.trim();
		if (!title) return fail(400, { error: 'Title is required' });

		let slug = (data.get('slug') as string)?.trim() || slugify(title);
		const category = (data.get('category') as string)?.trim() || null;
		const client = (data.get('client') as string)?.trim() || null;
		const year = data.get('year') ? parseInt(data.get('year') as string) : null;
		const shortDesc = (data.get('shortDesc') as string)?.trim() || null;
		const description = (data.get('description') as string)?.trim() || null;
		const coverImageUrl = (data.get('coverImageUrl') as string)?.trim() || null;
		const videoUrl = (data.get('videoUrl') as string)?.trim() || null;
		const videoType = (data.get('videoType') as string) || null;
		const featured = data.get('featured') === 'true';
		const status = (data.get('status') as 'draft' | 'published') ?? 'draft';
		const tags = (data.get('tags') as string) || '[]';

		try {
			const [created] = await db
				.insert(projects)
				.values({ title, slug, category, client, year, shortDesc, description, coverImageUrl, videoUrl, videoType: videoType as any, featured, status, tags })
				.returning({ id: projects.id });

			redirect(302, `/admin/projects/${created.id}`);
		} catch (e: any) {
			if (e?.message?.includes('UNIQUE')) {
				return fail(400, { error: 'A project with this slug already exists.' });
			}
			throw e;
		}
	}
};
