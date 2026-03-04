import { db } from '$lib/server/db';
import { contactSubmissions } from '$lib/server/db/schema';
import { sql, desc } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const messages = await db.select().from(contactSubmissions)
		.orderBy(desc(contactSubmissions.createdAt))
		.all();
	return { messages };
};

export const actions: Actions = {
	markRead: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		await db.run(sql`UPDATE contact_submissions SET read = 1 WHERE id = ${id}`);
		return { success: true };
	},
	markUnread: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		await db.run(sql`UPDATE contact_submissions SET read = 0 WHERE id = ${id}`);
		return { success: true };
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		await db.run(sql`DELETE FROM contact_submissions WHERE id = ${id}`);
		return { success: true };
	}
};
