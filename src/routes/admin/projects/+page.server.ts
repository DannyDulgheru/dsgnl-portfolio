import { getAllProjects } from '$lib/server/projects';
import { db } from '$lib/server/db';
import { projects, projectMedia } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const all = await getAllProjects();
	return { projects: all };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) return fail(400, { error: 'Missing id' });
		await db.delete(projects).where(eq(projects.id, id));
		return { success: true };
	},

	toggleFeatured: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const featured = data.get('featured') === 'true';
		if (!id) return fail(400, { error: 'Missing id' });
		await db.update(projects).set({ featured: !featured }).where(eq(projects.id, id));
		return { success: true };
	},

	toggleStatus: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const status = data.get('status') as string;
		if (!id) return fail(400, { error: 'Missing id' });
		const next = status === 'published' ? 'draft' : 'published';
		await db.update(projects).set({ status: next }).where(eq(projects.id, id));
		return { success: true };
	}
};
