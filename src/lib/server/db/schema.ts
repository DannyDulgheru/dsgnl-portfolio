import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ── Projects ────────────────────────────────────────────────────────────────
export const projects = sqliteTable('projects', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	shortDesc: text('short_desc'),
	description: text('description'),
	category: text('category'),
	client: text('client'),
	year: integer('year'),
	coverImageUrl: text('cover_image_url'),
	videoUrl: text('video_url'),
	videoType: text('video_type', { enum: ['youtube', 'vimeo', 'direct'] }),
	featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
	status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
	displayOrder: integer('display_order').notNull().default(0),
	tags: text('tags'), // JSON array stored as string
	createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
	updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
});

// ── Project Media ────────────────────────────────────────────────────────────
export const projectMedia = sqliteTable('project_media', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
	type: text('type', { enum: ['image', 'video'] }).notNull().default('image'),
	url: text('url').notNull(),
	caption: text('caption'),
	displayOrder: integer('display_order').notNull().default(0)
});

// ── Settings ─────────────────────────────────────────────────────────────────
export const settings = sqliteTable('settings', {
	key: text('key').primaryKey(),
	value: text('value')
});

// ── Contact Submissions ───────────────────────────────────────────────────────
export const contactSubmissions = sqliteTable('contact_submissions', {
	id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	email: text('email').notNull(),
	budget: text('budget'),
	message: text('message').notNull(),
	read: integer('read', { mode: 'boolean' }).notNull().default(false),
	createdAt: text('created_at').notNull().default(sql`(datetime('now'))`)
});

// ── Page Views ────────────────────────────────────────────────────────────────
export const pageViews = sqliteTable('page_views', {
	date: text('date').primaryKey(), // YYYY-MM-DD
	count: integer('count').notNull().default(0)
});

export * from './auth.schema';
