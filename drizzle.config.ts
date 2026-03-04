import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const isRemote = !process.env.DATABASE_URL.startsWith('file:');

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL,
		...(isRemote && { authToken: process.env.DATABASE_AUTH_TOKEN })
	},
	verbose: true,
	strict: true
});
