import { getProjectBySlug, getVideoEmbedUrl } from '$lib/server/projects';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const project = await getProjectBySlug(params.slug);
	if (!project) error(404, 'Project not found');

	const embedUrl =
		project.videoUrl && project.videoType
			? getVideoEmbedUrl(project.videoUrl, project.videoType)
			: null;

	return { project, embedUrl };
};
