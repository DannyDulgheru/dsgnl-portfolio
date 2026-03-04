#!/usr/bin/env node
/**
 * Seed script: creates the initial admin user and default settings.
 * Run once after setting up the database:
 *   node --env-file=.env src/lib/server/seed.js
 */
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL not set');

const isRemote = !DATABASE_URL.startsWith('file:');
const client = createClient({
  url: DATABASE_URL,
  ...(isRemote && process.env.DATABASE_AUTH_TOKEN ? { authToken: process.env.DATABASE_AUTH_TOKEN } : {})
});

const db = drizzle(client);

// better-auth handles user creation via its own API
// Use this script only for settings seeding
const DEFAULT_SETTINGS = [
  ['site_name', 'Motion Studio'],
  ['bio', 'Motion designer specializing in brand identity, visual storytelling, and digital experiences.'],
  ['seo_description', 'Award-winning motion design studio — branding, animation, and digital experiences.'],
  ['email', ''],
  ['instagram', ''],
  ['vimeo', ''],
  ['linkedin', ''],
  ['avatar_url', ''],
  ['showreel_url', '']
];

for (const [key, value] of DEFAULT_SETTINGS) {
  await client.execute({
    sql: 'INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)',
    args: [key, value]
  });
}

console.log('✓ Default settings seeded');
console.log('');
console.log('To create the admin user, visit your app and use the better-auth API:');
console.log('  POST /api/auth/sign-up/email');
console.log('  { "email": "...", "password": "...", "name": "Admin" }');
console.log('');
console.log('Or via curl:');
console.log(`  curl -X POST http://localhost:5173/api/auth/sign-up/email \\`);
console.log(`    -H "Content-Type: application/json" \\`);
console.log(`    -d '{"email":"admin@example.com","password":"yourpassword","name":"Admin"}'`);
