import { getFeaturedProjects, getPublishedProjects } from '$lib/server/projects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [featured, recent] = await Promise.all([
		getFeaturedProjects(),
		getPublishedProjects()
	]);

	const recentNonFeatured = recent.filter((p) => !p.featured).slice(0, 6);

	return { featured, recent: recentNonFeatured };
};
