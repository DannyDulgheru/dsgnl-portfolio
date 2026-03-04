import { getAllProjects } from '$lib/server/projects';
import { db } from '$lib/server/db';
import { contactSubmissions } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const all = await getAllProjects();
	const published = all.filter((p) => p.status === 'published').length;
	const drafts = all.filter((p) => p.status === 'draft').length;
	const featured = all.filter((p) => p.featured).length;

	// Contact submissions count
	const contactCount = await db.select({ count: sql<number>`count(*)` })
		.from(contactSubmissions).get().then(r => r?.count ?? 0);

	// Unread contacts
	const unreadCount = await db.select({ count: sql<number>`count(*)` })
		.from(contactSubmissions).where(sql`read = 0`).get().then(r => r?.count ?? 0);

	// Page views: last 7 days
	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
	const startDate = sevenDaysAgo.toISOString().slice(0, 10);

	const viewRows = await db.all<{ date: string; count: number }>(sql`
		SELECT date, count FROM page_views WHERE date >= ${startDate} ORDER BY date ASC
	`);

	// Fill missing days with 0
	const viewChart: { date: string; count: number }[] = [];
	for (let i = 6; i >= 0; i--) {
		const d = new Date();
		d.setDate(d.getDate() - i);
		const dateStr = d.toISOString().slice(0, 10);
		const found = viewRows.find(r => r.date === dateStr);
		viewChart.push({ date: dateStr, count: found?.count ?? 0 });
	}

	const totalViews = viewRows.reduce((sum, r) => sum + r.count, 0);
	const todayViews = viewChart[viewChart.length - 1].count;

	return {
		stats: { total: all.length, published, drafts, featured },
		recent: all.slice(0, 5),
		contactCount,
		unreadCount,
		viewChart,
		totalViews,
		todayViews
	};
};
