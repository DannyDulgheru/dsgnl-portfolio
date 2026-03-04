import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { contactSubmissions } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ parent }) => {
	const { settings } = await parent();
	return { settings };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = (data.get('name') as string)?.trim();
		const email = (data.get('email') as string)?.trim();
		const budget = (data.get('budget') as string)?.trim();
		const message = (data.get('message') as string)?.trim();

		if (!name || !email || !message) {
			return fail(400, { error: 'All fields are required.' });
		}

		await db.insert(contactSubmissions).values({
			id: crypto.randomUUID(),
			name,
			email,
			budget: budget || null,
			message
		});

		return { success: true };
	}
};
