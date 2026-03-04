import { getProjectById, slugify } from '$lib/server/projects';
import { db } from '$lib/server/db';
import { projects, projectMedia } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const project = await getProjectById(params.id);
	if (!project) error(404, 'Project not found');
	return { project };
};

export const actions: Actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();
		const title = (data.get('title') as string)?.trim();
		if (!title) return fail(400, { error: 'Title is required' });

		const slug = (data.get('slug') as string)?.trim() || slugify(title);
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

		await db.update(projects)
			.set({ title, slug, category, client, year, shortDesc, description, coverImageUrl, videoUrl, videoType: videoType as any, featured, status, tags, updatedAt: new Date().toISOString() })
			.where(eq(projects.id, params.id));

		return { success: true };
	},

	addMedia: async ({ request, params }) => {
		const data = await request.formData();
		const url = (data.get('url') as string)?.trim();
		const type = (data.get('type') as 'image' | 'video') ?? 'image';
		const caption = (data.get('caption') as string)?.trim() || null;
		if (!url) return fail(400, { error: 'URL is required' });
		await db.insert(projectMedia).values({ projectId: params.id, url, type, caption });
		return { success: true };
	},

	deleteMedia: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) return fail(400, { error: 'Missing id' });
		await db.delete(projectMedia).where(eq(projectMedia.id, id));
		return { success: true };
	}
};
