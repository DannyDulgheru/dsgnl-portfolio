import { getAllSettings, DEFAULT_SETTINGS, setSetting } from '$lib/server/settings';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const saved = await getAllSettings();
	return { settings: { ...DEFAULT_SETTINGS, ...saved } };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const keys = [
			'hero_line1', 'hero_line2', 'hero_sub',
			'hero_stat1_label', 'hero_stat2_label', 'hero_stat3_label',
			'marquee_items',
			'founder_name', 'founder_role',
			'bio', 'showreel_url', 'avatar_url'
		];
		await Promise.all(keys.map((k) => setSetting(k, (data.get(k) as string) ?? '')));
		return { success: true };
	}
};
