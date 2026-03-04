import { db } from '$lib/server/db';
import { projects, projectMedia } from '$lib/server/db/schema';
import { eq, desc, and } from 'drizzle-orm';

export type Project = typeof projects.$inferSelect;
export type ProjectMedia = typeof projectMedia.$inferSelect;
export type ProjectWithMedia = Project & { media: ProjectMedia[] };

export async function getPublishedProjects(): Promise<Project[]> {
	return db
		.select()
		.from(projects)
		.where(eq(projects.status, 'published'))
		.orderBy(projects.displayOrder, desc(projects.createdAt))
		.all();
}

export async function getFeaturedProjects(): Promise<Project[]> {
	return db
		.select()
		.from(projects)
		.where(and(eq(projects.status, 'published'), eq(projects.featured, true)))
		.orderBy(projects.displayOrder)
		.all();
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithMedia | null> {
	const project = await db.select().from(projects).where(eq(projects.slug, slug)).get();
	if (!project) return null;

	const media = await db
		.select()
		.from(projectMedia)
		.where(eq(projectMedia.projectId, project.id))
		.orderBy(projectMedia.displayOrder)
		.all();

	return { ...project, media };
}

export async function getAllProjects(): Promise<Project[]> {
	return db.select().from(projects).orderBy(projects.displayOrder, desc(projects.createdAt)).all();
}

export async function getProjectById(id: string): Promise<ProjectWithMedia | null> {
	const project = await db.select().from(projects).where(eq(projects.id, id)).get();
	if (!project) return null;

	const media = await db
		.select()
		.from(projectMedia)
		.where(eq(projectMedia.projectId, id))
		.orderBy(projectMedia.displayOrder)
		.all();

	return { ...project, media };
}

export function slugify(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');
}

export function getVideoEmbedUrl(url: string, type: string): string | null {
	if (type === 'youtube') {
		const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
		return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0` : null;
	}
	if (type === 'vimeo') {
		const match = url.match(/vimeo\.com\/(\d+)/);
		return match ? `https://player.vimeo.com/video/${match[1]}?dnt=1` : null;
	}
	return url;
}
