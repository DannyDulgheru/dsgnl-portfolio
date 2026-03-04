# Motion Designer Portfolio CMS

A full-stack portfolio CMS for motion designers, built with **SvelteKit**, styled like **Vercel** (dark, minimal), with a built-in admin panel.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit 2.x + TypeScript |
| Styling | TailwindCSS 4.x (Vercel dark theme) |
| ORM | Drizzle ORM |
| Database | SQLite (local dev) / Turso (production) |
| Auth | better-auth (email + password) |
| Deploy | Vercel + @sveltejs/adapter-vercel |

## Features

### Public Site
- **Homepage** – Hero, featured projects grid, about teaser, CTA
- **Work** – Filterable project grid with category tabs
- **Project detail** – Video embed (YouTube/Vimeo/direct), media gallery, metadata
- **About** – Bio, showreel, social links
- **Contact** – Simple contact form

### Admin Panel (`/admin`)
- Dashboard with project stats
- Full CRUD for projects (title, slug, category, cover image, video embed, tags, gallery)
- About & showreel editor
- Site settings (name, SEO description, social links)
- Auth guard – all admin routes require login

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Edit `.env`:

```env
# Local dev (SQLite file)
DATABASE_URL="file:local.db"
DATABASE_AUTH_TOKEN=""

ORIGIN="http://localhost:5173"
BETTER_AUTH_SECRET="change-this-to-a-random-32-char-secret"
```

### 3. Push database schema

```bash
npm run db:push
```

### 4. Seed default settings

```bash
npm run db:seed
```

### 5. Create admin user

Start the dev server first (`npm run dev`), then:

```bash
curl -X POST http://localhost:5173/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword","name":"Admin"}'
```

Visit `/admin/login` to sign in.

## Production (Vercel + Turso)

1. Create a [Turso](https://turso.tech) database:
   ```bash
   turso db create portfolio
   turso db show portfolio           # get DATABASE_URL
   turso db tokens create portfolio  # get DATABASE_AUTH_TOKEN
   ```

2. Set in Vercel dashboard: `DATABASE_URL`, `DATABASE_AUTH_TOKEN`, `BETTER_AUTH_SECRET`, `ORIGIN`

3. Push schema: `DATABASE_URL="libsql://..." DATABASE_AUTH_TOKEN="..." npm run db:push`

4. Deploy: `vercel --prod`

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run check        # TypeScript + Svelte type check
npm run db:push      # Push schema to database
npm run db:seed      # Seed default settings
npm run auth:schema  # Regenerate better-auth DB schema
```

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.12.4 create --template minimal --types ts --add tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:vercel" drizzle="database:sqlite+sqlite:turso" better-auth="demo:password" --install npm portfolio-cms
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
