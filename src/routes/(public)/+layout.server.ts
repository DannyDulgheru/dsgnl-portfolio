import { getAllSettings, DEFAULT_SETTINGS } from '$lib/server/settings';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { sql } from 'drizzle-orm';

export const load: LayoutServerLoad = async () => {
	const saved = await getAllSettings();
	const settings = { ...DEFAULT_SETTINGS, ...saved };

	// Track daily page views
	const today = new Date().toISOString().slice(0, 10);
	try {
		await db.run(sql`
			INSERT INTO page_views (date, count) VALUES (${today}, 1)
			ON CONFLICT(date) DO UPDATE SET count = count + 1
		`);
	} catch { /* ignore tracking errors */ }

	return { settings };
};
