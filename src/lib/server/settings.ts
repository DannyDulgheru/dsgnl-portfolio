import { db } from '$lib/server/db';
import { settings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getSetting(key: string): Promise<string | null> {
	const row = await db.select().from(settings).where(eq(settings.key, key)).get();
	return row?.value ?? null;
}

export async function getAllSettings(): Promise<Record<string, string>> {
	const rows = await db.select().from(settings).all();
	return Object.fromEntries(rows.map((r) => [r.key, r.value ?? '']));
}

export async function setSetting(key: string, value: string) {
	await db
		.insert(settings)
		.values({ key, value })
		.onConflictDoUpdate({ target: settings.key, set: { value } });
}

export const DEFAULT_SETTINGS: Record<string, string> = {
	site_name: 'DSGNL',
	bio: 'DSGNL is a creative and technology studio specializing in 2D animation, web design, and digital applications.',
	avatar_url: '',
	instagram: '',
	vimeo: '',
	linkedin: '',
	facebook: '',
	email: 'contact@dsgnl.site',
	phone: '',
	address: '',
	seo_description: 'DSGNL — Creative & technology studio in Chisinau, Moldova.',
	showreel_url: '',
	hero_line1: 'We Design',
	hero_line2: 'Digital Solutions.',
	hero_sub: 'Animation, web design, AI video, sound design & custom IT solutions — turning ideas into innovative digital experiences.',
	hero_stat1_label: 'Years',
	hero_stat2_label: 'Projects',
	hero_stat3_label: 'Clients',
	marquee_items: '2D Animation,Web Design,AI Video,Sound Design,IT Solutions,3D Animation',
	founder_name: 'Dan Dulgheru',
	founder_role: 'Founder & Creative Director',
};
