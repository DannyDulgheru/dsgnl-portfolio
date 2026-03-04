#!/usr/bin/env node
/**
 * Demo seed: populates the DB with realistic motion designer portfolio data.
 * Run: node --env-file=.env src/lib/server/seed-demo.mjs
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

// ─── Settings ────────────────────────────────────────────────────────────────
const SETTINGS = [
  ['site_name', 'Alex Moreau Studio'],
  ['bio', `I'm Alex Moreau — a motion designer and visual storyteller based in Paris, crafting brand identities, immersive title sequences, and digital experiences that move people. With over 8 years in the industry, I've worked with global brands, film studios, and creative agencies across Europe and North America.

My work sits at the intersection of design, animation, and emotion — where every frame is intentional and every transition tells a story.`],
  ['seo_description', 'Alex Moreau — Motion designer based in Paris. Brand identity, title sequences, digital experiences. Available for freelance and studio collaborations.'],
  ['email', 'hello@alexmoreau.studio'],
  ['instagram', 'https://instagram.com/alexmoreau.studio'],
  ['vimeo', 'https://vimeo.com/alexmoreau'],
  ['linkedin', 'https://linkedin.com/in/alexmoreaumotion'],
  ['avatar_url', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'],
  ['showreel_url', 'https://player.vimeo.com/video/824804225?autoplay=0&title=0&byline=0&portrait=0'],
];

for (const [key, value] of SETTINGS) {
  await client.execute({
    sql: 'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
    args: [key, value]
  });
}
console.log('✓ Settings updated');

// ─── Projects ────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'proj-01',
    title: 'Nike — Air Max Pulse Campaign',
    slug: 'nike-air-max-pulse',
    shortDesc: 'High-energy product campaign blending 3D animation with live action for Nike\'s Air Max Pulse launch.',
    description: `Nike approached us to create a visual identity for the Air Max Pulse — a shoe designed to channel the raw energy of London's music scene into footwear.

The concept: sound becomes motion. We built a visual language where soundwaves morph into the shoe's silhouette, beats trigger particle explosions, and the city itself vibrates with kinetic energy.

**Production highlights:**
- 3D product animation in Cinema 4D + Redshift
- Custom particle system driven by real audio waveforms  
- 14 social cuts (9:16, 1:1, 16:9) delivered in 3 weeks
- Collaborated with director Lena Kim on the hero film

The campaign launched across 28 markets and generated 142M impressions in the first week.`,
    category: 'Brand Campaign',
    client: 'Nike',
    year: 2024,
    coverImageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=800&fit=crop',
    videoUrl: 'https://vimeo.com/824804225',
    videoType: 'vimeo',
    featured: true,
    status: 'published',
    displayOrder: 1,
    tags: JSON.stringify(['3D Animation', 'Brand Campaign', 'Product Visualization', 'Social Media', 'Nike']),
  },
  {
    id: 'proj-02',
    title: 'Morphe — Title Sequence',
    slug: 'morphe-title-sequence',
    shortDesc: 'Cinematic title sequence for Morphe\'s brand documentary series "Beauty Unfiltered".',
    description: `Morphe's "Beauty Unfiltered" documentary series needed an opening sequence that felt raw, artistic, and unmistakably human. We wanted to avoid the typical glossy cosmetics aesthetic and instead create something that felt like a visual poem.

The sequence uses hand-drawn textures, fluid ink simulations, and photographic collage — all animated with a deliberate imperfection that honors the authentic stories told in the series.

**Process:**
Frame-by-frame hand animation was digitized and composited with 3D ink fluid simulations (Houdini). Each episode variant uses a different color palette drawn from the featured artist's work.

**Deliverables:** 6 episode variants, 30s main sequence + 10s bumpers`,
    category: 'Title Sequence',
    client: 'Morphe Cosmetics',
    year: 2024,
    coverImageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&h=800&fit=crop',
    videoUrl: 'https://vimeo.com/824804226',
    videoType: 'vimeo',
    featured: true,
    status: 'published',
    displayOrder: 2,
    tags: JSON.stringify(['Title Sequence', 'Houdini', 'Hand Animation', 'Documentary', 'Typography']),
  },
  {
    id: 'proj-03',
    title: 'Spotify — Wrapped 2023',
    slug: 'spotify-wrapped-2023',
    shortDesc: 'Motion system and social templates for Spotify Wrapped 2023 — 500M+ users, 78 languages.',
    description: `Every year, Spotify Wrapped becomes one of the most shared social events on the internet. For 2023, Spotify partnered with us to design the core motion language that would power the shareable cards across all platforms.

The challenge: create a system that feels personal and alive — one that could adapt to any artist, genre, or listening personality while remaining cohesive at scale.

**Solution:** We designed 12 modular animation loops built in After Effects, exported as Lottie JSON for web/app rendering. Each module responds to user data (color, intensity, rhythm) through parametric controls.

**Scale:**
- 500M+ users generating personal Wrapped cards
- 78 language variants
- 6 platform targets (iOS, Android, Web, Instagram, TikTok, Twitter)
- 34 animation modules in the final system`,
    category: 'Motion System',
    client: 'Spotify',
    year: 2023,
    coverImageUrl: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=1200&h=800&fit=crop',
    videoUrl: 'https://vimeo.com/824804227',
    videoType: 'vimeo',
    featured: true,
    status: 'published',
    displayOrder: 3,
    tags: JSON.stringify(['Motion System', 'Lottie', 'After Effects', 'Design System', 'Spotify', 'Social']),
  },
  {
    id: 'proj-04',
    title: 'Aesop — Brand Film',
    slug: 'aesop-brand-film',
    shortDesc: 'Slow cinema brand film exploring the philosophy behind Aesop\'s ritual of care.',
    description: `Aesop doesn't advertise in the traditional sense. They tell stories about ritual, philosophy, and the considered life. This brand film was conceived as a visual essay — 3 minutes that explore the idea of "the considered ritual" through the lens of the products themselves.

Shot in 16mm and composited with subtle digital enhancements, the film lingers on surfaces, textures, and the play of light across glass. Sound design by Yoshi Nakamura (Tokyo) grounds the visuals in a meditative soundscape.

**Direction:** Alex Moreau
**Cinematography:** Claire Fontaine
**Sound:** Yoshi Nakamura
**Runtime:** 3:12`,
    category: 'Brand Film',
    client: 'Aesop',
    year: 2023,
    coverImageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=1200&h=800&fit=crop',
    videoUrl: 'https://vimeo.com/824804228',
    videoType: 'vimeo',
    featured: false,
    status: 'published',
    displayOrder: 4,
    tags: JSON.stringify(['Brand Film', 'Slow Cinema', '16mm', 'Luxury', 'Direction', 'Aesop']),
  },
  {
    id: 'proj-05',
    title: 'Cannes Lions — Event Identity',
    slug: 'cannes-lions-event-identity',
    shortDesc: 'Complete motion identity for Cannes Lions 2023: stage graphics, broadcast package, digital OOH.',
    description: `Cannes Lions is the world's largest creative festival. The 2023 edition commissioned us to design the complete motion identity — an ambitious project spanning stage visuals, a broadcast package for the livestream, digital out-of-home, and social content.

The theme "Power of Creativity" demanded a visual language that felt powerful and dynamic without being loud. We built a system around the metaphor of light refracting through a prism — one idea becoming infinite expressions.

**Scope:**
- Stage LED wall animations (real-time Notch)
- Broadcast lower thirds, transitions, bumpers
- 400m² digital OOH on the Palais
- 200+ social assets
- Ceremony graphics for 28 award categories`,
    category: 'Event Identity',
    client: 'Cannes Lions',
    year: 2023,
    coverImageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop',
    videoUrl: 'https://vimeo.com/824804229',
    videoType: 'vimeo',
    featured: false,
    status: 'published',
    displayOrder: 5,
    tags: JSON.stringify(['Event Identity', 'Broadcast', 'Notch', 'Real-time', 'Stage Design', 'OOH']),
  },
  {
    id: 'proj-06',
    title: 'Loewe — Craft Animations',
    slug: 'loewe-craft-animations',
    shortDesc: 'Delicate micro-animations celebrating Loewe\'s artisanal leather craft heritage for web and editorial.',
    description: `Loewe's digital presence needed to convey the extraordinary craft that goes into each piece. We created a series of micro-animations for the brand's website and editorial features that highlight the hands, tools, and techniques of their Madrid atelier.

Each animation was inspired by the specific craft it depicts — stitching has a rhythm and pace that mirrors real hand-stitching, leather burnishing uses circular motion that echoes the craftsperson's hand.

**Deliverables:**
- 24 micro-animations (5–12 seconds looping)
- 6 editorial animation sequences
- CSS + Lottie implementation for web
- Print supplement animations for magazine inserts (QR-linked AR)`,
    category: 'Digital / Web',
    client: 'Loewe',
    year: 2024,
    coverImageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&h=800&fit=crop',
    videoUrl: '',
    videoType: 'vimeo',
    featured: false,
    status: 'published',
    displayOrder: 6,
    tags: JSON.stringify(['Micro-animation', 'Lottie', 'Web', 'Luxury', 'Craft', 'Loewe']),
  },
  {
    id: 'proj-07',
    title: 'Bloomberg — Data Visualization',
    slug: 'bloomberg-data-viz',
    shortDesc: 'Animated data visualization system for Bloomberg\'s Climate Impact Report 2023.',
    description: `Bloomberg's Climate Impact Report needed to transform dense, complex climate data into compelling animated visualizations that journalists, policymakers, and the public could understand at a glance.

We designed a visualization language that uses organic, flowing forms to represent data — deliberately avoiding the cold rigidity typically associated with financial data graphics. Climate data deserved a visual treatment that conveyed its urgency and complexity.

**Charts animated:** 47 unique data visualizations
**Format:** SVG + CSS animation, video exports for broadcast
**Team:** 2 motion designers, 1 data journalist, 1 developer`,
    category: 'Data Visualization',
    client: 'Bloomberg',
    year: 2023,
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    videoUrl: 'https://vimeo.com/824804230',
    videoType: 'vimeo',
    featured: false,
    status: 'published',
    displayOrder: 7,
    tags: JSON.stringify(['Data Visualization', 'SVG Animation', 'Journalism', 'Bloomberg', 'Climate']),
  },
  {
    id: 'proj-08',
    title: 'Jacquemus — SS24 Show Opener',
    slug: 'jacquemus-ss24-show-opener',
    shortDesc: 'Dreamlike opening sequence for Jacquemus SS24 runway show in Capri.',
    description: `Simon Jacquemus wanted the SS24 show in Capri to open with something unexpected — a dreamlike sequence that transported guests before a single model stepped out. The brief: "Make Capri feel like a memory of somewhere you've never been."

We created a 4-minute audiovisual experience blending archival 8mm footage, CGI water simulations, and typography that floats and dissolves like sea foam. The piece was projected across three synchronized screens at the Villa di Tiberio.

The show was covered by Vogue, WWD, and Business of Fashion as one of the most memorable runway experiences of the season.

**Shown at:** Villa di Tiberio, Capri
**Runtime:** 4:07`,
    category: 'Fashion / Show',
    client: 'Jacquemus',
    year: 2024,
    coverImageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=800&fit=crop',
    videoUrl: 'https://vimeo.com/824804231',
    videoType: 'vimeo',
    featured: true,
    status: 'published',
    displayOrder: 0,
    tags: JSON.stringify(['Fashion', 'Installation', 'Projection Mapping', 'Jacquemus', 'Show Opener', 'Luxury']),
  },
  {
    id: 'proj-09',
    title: 'Arc\'teryx — Technical Poetry',
    slug: 'arcteryx-technical-poetry',
    shortDesc: 'Product film series showcasing Arc\'teryx gear in extreme environments using motion control.',
    description: `Arc'teryx products are engineered for extreme environments. This film series — "Technical Poetry" — uses ultra-slow-motion, motion control, and macro cinematography to reveal the engineering beauty hidden in their gear.

We shot on location in Chamonix and the Dolomites, using a Phantom Flex 4K for high-speed shots (1000fps) and a custom motion control rig for repeatable precision shots. In post, subtle 3D elements were composited to highlight technical details invisible to the naked eye.

**Films produced:** 6 (one per hero product category)
**Average runtime:** 90 seconds
**Distributed:** Brand site, retailer screens, premium YouTube pre-roll`,
    category: 'Product Film',
    client: "Arc'teryx",
    year: 2023,
    coverImageUrl: 'https://images.unsplash.com/photo-1519583272095-6433daf26b6e?w=1200&h=800&fit=crop',
    videoUrl: 'https://vimeo.com/824804232',
    videoType: 'vimeo',
    featured: false,
    status: 'published',
    displayOrder: 8,
    tags: JSON.stringify(['Product Film', 'High Speed', 'Motion Control', 'Outdoor', "Arc'teryx", 'Macro']),
  },
  {
    id: 'proj-10',
    title: 'Figma Config 2024 — Keynote Motion',
    slug: 'figma-config-2024',
    shortDesc: 'Animated keynote graphics and live motion system for Figma\'s annual Config conference.',
    description: `Figma Config is the premier conference for design professionals. For the 2024 edition, we designed the complete animated graphic system for the keynote — including speaker introduction animations, product reveal sequences, and a live motion backdrop system.

The visual language was built on Figma's own design principles: collaborative, layered, and endlessly adaptable. We used Figma's API to pull live data (attendee count, global viewer map) into real-time graphics displayed during the keynote.

**Technical highlights:**
- Real-time graphics driven by Figma API data
- 200+ individual animation assets
- Live operator system for day-of execution
- Broadcast-safe master for YouTube livestream (peak 85,000 concurrent viewers)`,
    category: 'Event Identity',
    client: 'Figma',
    year: 2024,
    coverImageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop',
    videoUrl: 'https://vimeo.com/824804233',
    videoType: 'vimeo',
    featured: false,
    status: 'published',
    displayOrder: 9,
    tags: JSON.stringify(['Keynote', 'Live Graphics', 'Tech', 'Figma', 'Conference', 'Real-time']),
  },
];

// ─── Project Media ────────────────────────────────────────────────────────────
const MEDIA = {
  'proj-01': [
    { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=800&fit=crop', caption: 'Air Max Pulse — Hero Shot', type: 'image', order: 0 },
    { url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&h=800&fit=crop', caption: 'Waveform Studies — Early concept explorations', type: 'image', order: 1 },
    { url: 'https://images.unsplash.com/photo-1556906781-9a412961a28c?w=1200&h=800&fit=crop', caption: 'Particle system test render', type: 'image', order: 2 },
    { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop', caption: 'Instagram square format', type: 'image', order: 3 },
  ],
  'proj-02': [
    { url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&h=800&fit=crop', caption: 'Title frame — Episode 1', type: 'image', order: 0 },
    { url: 'https://images.unsplash.com/photo-1503455637927-730bce8583c0?w=1200&h=800&fit=crop', caption: 'Ink fluid simulation stills', type: 'image', order: 1 },
    { url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=800&fit=crop', caption: 'Hand lettering source material', type: 'image', order: 2 },
  ],
  'proj-03': [
    { url: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=1200&h=800&fit=crop', caption: 'Wrapped card — Top Artist', type: 'image', order: 0 },
    { url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=1200&h=800&fit=crop', caption: 'Aura animation variant', type: 'image', order: 1 },
    { url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1200&h=800&fit=crop', caption: 'Motion system documentation', type: 'image', order: 2 },
    { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&h=800&fit=crop', caption: 'Genre personality cards', type: 'image', order: 3 },
  ],
  'proj-04': [
    { url: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=1200&h=800&fit=crop', caption: 'Product on surface — 16mm grain treatment', type: 'image', order: 0 },
    { url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&h=800&fit=crop', caption: 'Texture studies', type: 'image', order: 1 },
    { url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&h=800&fit=crop', caption: 'Still life composition', type: 'image', order: 2 },
  ],
  'proj-08': [
    { url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&h=800&fit=crop', caption: 'SS24 Capri — Projection still', type: 'image', order: 0 },
    { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop', caption: 'Water simulation test', type: 'image', order: 1 },
    { url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&h=800&fit=crop', caption: 'Typography dissolve sequence', type: 'image', order: 2 },
    { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop', caption: 'Set design reference', type: 'image', order: 3 },
  ],
};

// Clear existing project data
await client.execute({ sql: 'DELETE FROM project_media', args: [] });
await client.execute({ sql: 'DELETE FROM projects', args: [] });
console.log('✓ Cleared existing project data');

// Insert projects
for (const p of PROJECTS) {
  await client.execute({
    sql: `INSERT INTO projects (id, title, slug, short_desc, description, category, client, year, cover_image_url, video_url, video_type, featured, status, display_order, tags)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      p.id, p.title, p.slug, p.shortDesc, p.description,
      p.category, p.client, p.year, p.coverImageUrl,
      p.videoUrl, p.videoType,
      p.featured ? 1 : 0, p.status, p.displayOrder, p.tags
    ]
  });
}
console.log(`✓ Inserted ${PROJECTS.length} projects`);

// Insert media
let mediaCount = 0;
for (const [projectId, items] of Object.entries(MEDIA)) {
  for (const item of items) {
    const id = crypto.randomUUID();
    await client.execute({
      sql: `INSERT INTO project_media (id, project_id, type, url, caption, display_order) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [id, projectId, item.type, item.url, item.caption, item.order]
    });
    mediaCount++;
  }
}
console.log(`✓ Inserted ${mediaCount} media items`);

console.log('\n✅ Demo data seeded successfully!');
console.log('   Visit http://localhost:5173 to see the portfolio');
console.log('   Admin: http://localhost:5173/admin');
