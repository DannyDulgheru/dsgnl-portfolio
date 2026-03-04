<script lang="ts">
import { enhance } from '$app/forms';

let { data, form } = $props();
let s = $derived(data.settings);
let loading = $state(false);

const DEFAULT_TIMELINE = [
{ year: '2024', role: 'AI Video & Digital Avatars', context: 'New service — high-fidelity AI production' },
{ year: '2023', role: 'Web & IT Expansion', context: 'Full-stack solutions: CRM, ERP, CMS integration' },
{ year: '2021', role: '3D Animation & Sound Design', context: 'Expanded into 3D and original electronic music' },
{ year: '2019', role: 'Multimedia Production', context: 'Video editing, motion graphics, brand films' },
{ year: '2016', role: 'Studio Founded', context: 'DSGNL — Chisinau, Moldova' }
];
const DEFAULT_CLIENTS = [
{ name: 'Artstage', sector: 'Arts & Culture' },
{ name: 'Kreyon', sector: 'Technology' },
{ name: 'Avantaj Prim', sector: 'Business' },
{ name: 'La Strada', sector: 'Non-profit' },
{ name: 'Sugar Mess', sector: 'Food & Lifestyle' },
{ name: 'Cherwell', sector: 'Software' }
];

let timeline = $state<{year:string;role:string;context:string}[]>((() => {
try { return s.about_timeline_json ? JSON.parse(s.about_timeline_json) : DEFAULT_TIMELINE; } catch { return DEFAULT_TIMELINE; }
})());
let clients = $state<{name:string;sector:string}[]>((() => {
try { return s.about_clients_json ? JSON.parse(s.about_clients_json) : DEFAULT_CLIENTS; } catch { return DEFAULT_CLIENTS; }
})());

function addTimeline() { timeline = [...timeline, { year: '', role: '', context: '' }]; }
function removeTimeline(i: number) { timeline = timeline.filter((_, idx) => idx !== i); }
function addClient() { clients = [...clients, { name: '', sector: '' }]; }
function removeClient(i: number) { clients = clients.filter((_, idx) => idx !== i); }
</script>

<svelte:head><title>About — Admin</title></svelte:head>

<div class="p-8 max-w-2xl">
<div class="mb-8">
<h1 class="text-xl font-medium text-[#ededed]">About Page</h1>
<p class="text-sm text-[#555] mt-1">Edit studio bio, milestones, clients and contact info</p>
</div>

{#if form?.success}
<div class="mb-6 rounded-lg border border-[#50e3c2]/20 bg-[#50e3c2]/5 px-4 py-3">
<p class="text-sm text-[#50e3c2]">Saved successfully.</p>
</div>
{/if}

<form method="POST"
use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }}
class="space-y-5"
>
<!-- Hidden JSON -->
<input type="hidden" name="about_timeline_json" value={JSON.stringify(timeline)} />
<input type="hidden" name="about_clients_json" value={JSON.stringify(clients)} />

<!-- Identity -->
<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
<h2 class="text-sm font-medium text-[#ededed]">Identity</h2>
<div>
<label class="label">Site / Studio Name</label>
<input name="site_name" type="text" value={s.site_name} class="input" />
</div>
<div>
<label class="label">Avatar / Team Photo URL</label>
<input name="avatar_url" type="url" value={s.avatar_url} class="input" placeholder="https://..." />
</div>
<div>
<label class="label">Hero Quote</label>
<textarea name="about_quote" rows="2" class="input resize-none" placeholder="We combine creativity with technology...">{s.about_quote ?? ''}</textarea>
</div>
<div>
<label class="label">Studio Bio</label>
<textarea name="bio" rows="5" class="input resize-none">{s.bio}</textarea>
<p class="text-[10px] text-[#444] mt-1">Use two blank lines to create paragraphs.</p>
</div>
<div>
<label class="label">Showreel URL</label>
<input name="showreel_url" type="url" value={s.showreel_url} class="input" placeholder="https://player.vimeo.com/video/..." />
</div>
</div>

<!-- Contact & Social -->
<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
<h2 class="text-sm font-medium text-[#ededed]">Contact & Social</h2>
{#each [
{ name: 'email', label: 'Email', placeholder: 'contact@studio.com', type: 'email' },
{ name: 'phone', label: 'Phone', placeholder: '+373 68 787 316', type: 'text' },
{ name: 'address', label: 'Address', placeholder: 'Bd. Traian 5, Chisinau, Moldova', type: 'text' },
{ name: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/yourpage', type: 'url' },
{ name: 'instagram', label: 'Instagram', placeholder: 'username (no @)', type: 'text' },
{ name: 'vimeo', label: 'Vimeo', placeholder: 'username or channel', type: 'text' },
{ name: 'linkedin', label: 'LinkedIn', placeholder: 'profile-slug', type: 'text' }
] as field}
<div>
<label class="label">{field.label}</label>
<input name={field.name} type={field.type} value={s[field.name as keyof typeof s] ?? ''} class="input" placeholder={field.placeholder} />
</div>
{/each}
</div>

<!-- Studio Milestones Timeline -->
<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-4">
<div class="flex items-center justify-between">
<h2 class="text-sm font-medium text-[#ededed]">Studio Milestones</h2>
<button type="button" onclick={addTimeline} class="text-xs px-3 py-1.5 border border-[#1a1a1a] text-[#888] rounded-md hover:border-[#333] hover:text-[#ededed] transition-colors">+ Add Year</button>
</div>
{#each timeline as item, i}
<div class="grid grid-cols-[80px_1fr_1fr_auto] gap-2 items-start">
<div>
<label class="label">Year</label>
<input type="text" value={item.year} oninput={(e) => { timeline[i] = {...timeline[i], year: (e.target as HTMLInputElement).value}; }} class="input" placeholder="2024" />
</div>
<div>
<label class="label">Role / Title</label>
<input type="text" value={item.role} oninput={(e) => { timeline[i] = {...timeline[i], role: (e.target as HTMLInputElement).value}; }} class="input" placeholder="AI Video Production" />
</div>
<div>
<label class="label">Context</label>
<input type="text" value={item.context} oninput={(e) => { timeline[i] = {...timeline[i], context: (e.target as HTMLInputElement).value}; }} class="input" placeholder="New service added" />
</div>
<div class="pt-5">
<button type="button" onclick={() => removeTimeline(i)} class="p-2 text-[#e63329] hover:bg-[#e63329]/10 rounded-md transition-colors">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
</button>
</div>
</div>
{/each}
</div>

<!-- Trusted By — Clients -->
<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-4">
<div class="flex items-center justify-between">
<h2 class="text-sm font-medium text-[#ededed]">Trusted By — Clients</h2>
<button type="button" onclick={addClient} class="text-xs px-3 py-1.5 border border-[#1a1a1a] text-[#888] rounded-md hover:border-[#333] hover:text-[#ededed] transition-colors">+ Add Client</button>
</div>
{#each clients as client, i}
<div class="grid grid-cols-[1fr_1fr_auto] gap-2 items-start">
<div>
<label class="label">Client Name</label>
<input type="text" value={client.name} oninput={(e) => { clients[i] = {...clients[i], name: (e.target as HTMLInputElement).value}; }} class="input" placeholder="Studio Name" />
</div>
<div>
<label class="label">Sector</label>
<input type="text" value={client.sector} oninput={(e) => { clients[i] = {...clients[i], sector: (e.target as HTMLInputElement).value}; }} class="input" placeholder="Technology" />
</div>
<div class="pt-5">
<button type="button" onclick={() => removeClient(i)} class="p-2 text-[#e63329] hover:bg-[#e63329]/10 rounded-md transition-colors">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
</button>
</div>
</div>
{/each}
</div>

<button type="submit" disabled={loading} class="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#ededed] transition-colors disabled:opacity-50">
{loading ? 'Saving...' : 'Save About Page'}
</button>
</form>
</div>
