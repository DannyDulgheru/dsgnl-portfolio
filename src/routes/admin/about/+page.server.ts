import { getAllSettings, DEFAULT_SETTINGS, setSetting } from '$lib/server/settings';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const saved = await getAllSettings();
	return { settings: { ...DEFAULT_SETTINGS, ...saved } };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const keys = ['site_name', 'bio', 'avatar_url', 'instagram', 'vimeo', 'linkedin', 'facebook', 'email', 'phone', 'address', 'showreel_url', 'about_quote', 'about_timeline_json', 'about_clients_json'];
		await Promise.all(keys.map((k) => setSetting(k, (data.get(k) as string) ?? '')));
		return { success: true };
	}
};
