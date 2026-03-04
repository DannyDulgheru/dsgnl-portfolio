import { getAllSettings, DEFAULT_SETTINGS, setSetting } from '$lib/server/settings';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const saved = await getAllSettings();
	return { settings: { ...DEFAULT_SETTINGS, ...saved } };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const keys = ['site_name', 'seo_description', 'email', 'phone', 'address', 'facebook', 'instagram', 'vimeo', 'linkedin'];
		await Promise.all(keys.map((k) => setSetting(k, (data.get(k) as string) ?? '')));
		return { success: true };
	}
};
