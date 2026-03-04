<script lang="ts">
import ProjectCard from '$lib/components/public/ProjectCard.svelte';
import { onMount } from 'svelte';
import { gsap } from '$lib/animations';

let { data } = $props();

onMount(() => {
const ctx = gsap.context(() => {
gsap.from('.work-header-item', { y: 40, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
gsap.from('.filter-btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out', delay: 0.3 });
gsap.from('.card-reveal', { y: 40, duration: 0.7, stagger: 0.06, ease: 'power3.out', delay: 0.4 });
});
return () => ctx.revert();
});
</script>

<svelte:head>
<title>Work — {data.settings.site_name}</title>
<meta name="description" content="Animation, web design, AI video, and IT solutions — projects by DSGNL creative studio, Chisinau." />
</svelte:head>

<!-- Page header -->
<div class="border-b-2 border-[#0d0d0d] bg-[#e8e2d8] px-8 py-3 flex items-center justify-between">
<span class="work-header-item text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">
Portfolio — {data.projects.length} Projects
</span>
</div>

<div class="border-b-2 border-[#0d0d0d] px-8 py-12 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden bg-[#f2ede4]">
<h1 class="work-header-item text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-none tracking-tighter text-[#0d0d0d]">Work</h1>
<p class="work-header-item text-sm text-[#8c857c] max-w-xs leading-relaxed">
Animation, web design, AI video, and IT solutions — crafted for real clients since 2016.
</p>
</div>

<!-- Category filters -->
{#if data.categories.length > 0}
<div class="border-b-2 border-[#0d0d0d] px-8 py-4 flex flex-wrap gap-2 bg-[#f2ede4]">
<a href="/work"
class="filter-btn px-4 py-2 text-[11px] font-bold uppercase tracking-widest border-2 border-[#0d0d0d] transition-colors
{!data.activeCategory ? 'bg-[#0d0d0d] text-[#f2ede4]' : 'text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f2ede4]'}">
All ({data.projects.length})
</a>
{#each data.categories as cat}
<a href="/work?category={encodeURIComponent(cat)}"
class="filter-btn px-4 py-2 text-[11px] font-bold uppercase tracking-widest border-2 border-[#0d0d0d] transition-colors
{data.activeCategory === cat ? 'bg-[#e63329] text-[#f2ede4] border-[#e63329]' : 'text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f2ede4]'}">
{cat}
</a>
{/each}
</div>
{/if}

<!-- Grid -->
{#if data.projects.length > 0}
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
{#each data.projects as project, i}
<div class="card-reveal border-b-2 border-[#0d0d0d] {i % 3 !== 2 ? 'lg:border-r-2 lg:border-[#0d0d0d]' : ''} {i % 2 === 0 ? 'sm:border-r-2 sm:border-[#0d0d0d] lg:border-r-0' : ''}">
<ProjectCard {project} />
</div>
{/each}
</div>
{:else}
<div class="border-b-2 border-[#0d0d0d] py-32 text-center">
<p class="text-[#8c857c] text-sm font-bold uppercase tracking-widest">No projects found.</p>
</div>
{/if}
