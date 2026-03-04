import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) redirect(302, '/admin');
	return {};
};

export const actions: Actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required.' });
		}

		try {
			await auth.api.signInEmail({ body: { email, password } });
		} catch {
			return fail(401, { error: 'Invalid credentials.' });
		}

		redirect(302, '/admin');
	},

	logout: async ({ request }) => {
		try {
			await auth.api.signOut({ headers: request.headers });
		} catch { /* ignore */ }
		redirect(302, '/admin/login');
	}
};
