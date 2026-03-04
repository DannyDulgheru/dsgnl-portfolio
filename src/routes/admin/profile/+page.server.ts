import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user, account } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return { user: locals.user };
};

export const actions: Actions = {
	updateEmail: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'Not authenticated.' });
		const data = await request.formData();
		const newEmail = (data.get('email') as string)?.trim().toLowerCase();
		if (!newEmail || !newEmail.includes('@')) return fail(400, { emailError: 'Valid email required.' });

		await db.update(user).set({ email: newEmail }).where(eq(user.id, locals.user.id));
		return { emailSuccess: true };
	},

	updatePassword: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'Not authenticated.' });
		const data = await request.formData();
		const newPassword = data.get('newPassword') as string;
		const confirmPassword = data.get('confirmPassword') as string;

		if (!newPassword || newPassword.length < 8) {
			return fail(400, { passwordError: 'Password must be at least 8 characters.' });
		}
		if (newPassword !== confirmPassword) {
			return fail(400, { passwordError: 'Passwords do not match.' });
		}

		// Use better-auth to change password (hashes it internally)
		try {
			await auth.api.changePassword({
				body: { newPassword, revokeOtherSessions: false },
				headers: request.headers
			});
			return { passwordSuccess: true };
		} catch {
			// Fallback: update via drizzle using better-auth's hash
			const { hashPassword } = await import('better-auth').then(m => m.crypto ?? { hashPassword: null }).catch(() => ({ hashPassword: null }));
			return fail(500, { passwordError: 'Password change failed. Try logging out and back in.' });
		}
	}
};
