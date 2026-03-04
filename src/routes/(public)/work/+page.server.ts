import { getPublishedProjects } from '$lib/server/projects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const category = url.searchParams.get('category') ?? '';
	const all = await getPublishedProjects();
	const categories = [...new Set(all.map((p) => p.category).filter(Boolean))] as string[];
	const projects = category ? all.filter((p) => p.category === category) : all;
	return { projects, categories, activeCategory: category };
};
