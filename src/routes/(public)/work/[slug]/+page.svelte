<script lang="ts">
import VideoEmbed from "$lib/components/public/VideoEmbed.svelte";
import { onMount } from "svelte";
import { gsap } from "$lib/animations";
let { data } = $props();
const tags = $derived(data.project.tags ? JSON.parse(data.project.tags) : []);
let mediaBlock: HTMLElement = $state() as any;
let contentBlock: HTMLElement = $state() as any;
let gallery: HTMLElement = $state() as any;
onMount(() => {
  const ctx = gsap.context(() => {
    gsap.from(".detail-label", { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" });
    gsap.from(".detail-title", { y: 60, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.1 });
    gsap.from(".meta-cell", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.3 });
  });
  return () => ctx.revert();
});
</script>
<svelte:head>
  <title>{data.project.title} -- {data.settings.site_name}</title>
  <meta name="description" content={data.project.shortDesc ?? data.project.description ?? ""} />
</svelte:head>
<div class="border-b-2 border-[#0d0d0d] px-8 py-3 bg-[#e8e2d8] flex items-center justify-between">
  <a href="/work" class="detail-label text-[10px] font-bold uppercase tracking-widest text-[#8c857c] hover:text-[#e63329] transition-colors">Back to Work</a>
  {#if data.project.category}<span class="detail-label text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">{data.project.category}</span>{/if}
</div>
<div class="border-b-2 border-[#0d0d0d] px-8 py-12 bg-[#f2ede4]">
  {#if data.project.featured}<span class="detail-label inline-block mb-4 px-3 py-1 border-2 border-[#e63329] text-[10px] font-bold uppercase tracking-widest text-[#e63329]">Featured</span>{/if}
  <h1 class="detail-title text-[clamp(2.5rem,7vw,6rem)] font-black uppercase leading-none tracking-tighter text-[#0d0d0d]">{data.project.title}</h1>
  {#if data.project.shortDesc}<p class="mt-4 text-lg text-[#8c857c] max-w-2xl">{data.project.shortDesc}</p>{/if}
</div>
<div class="border-b-2 border-[#0d0d0d] grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-[#0d0d0d] bg-[#f2ede4]">
  {#if data.project.client}<div class="meta-cell px-6 py-5"><p class="text-[9px] font-bold uppercase tracking-widest text-[#8c857c] mb-1">Client</p><p class="text-sm font-black uppercase text-[#0d0d0d]">{data.project.client}</p></div>{/if}
  {#if data.project.year}<div class="meta-cell px-6 py-5"><p class="text-[9px] font-bold uppercase tracking-widest text-[#8c857c] mb-1">Year</p><p class="text-sm font-black font-mono text-[#0d0d0d]">{data.project.year}</p></div>{/if}
  {#if data.project.category}<div class="meta-cell px-6 py-5"><p class="text-[9px] font-bold uppercase tracking-widest text-[#8c857c] mb-1">Category</p><p class="text-sm font-black uppercase text-[#0d0d0d]">{data.project.category}</p></div>{/if}
  {#if data.project.videoUrl}<div class="meta-cell px-6 py-5"><p class="text-[9px] font-bold uppercase tracking-widest text-[#8c857c] mb-1">Format</p><p class="text-sm font-black uppercase text-[#e63329]">Video</p></div>{/if}
</div>
{#if data.project.coverImageUrl && !data.embedUrl}
  <div bind:this={mediaBlock} class="border-b-2 border-[#0d0d0d]"><img src={data.project.coverImageUrl} alt={data.project.title} class="w-full object-cover" /></div>
{/if}
{#if data.embedUrl}
  <div bind:this={mediaBlock} class="border-b-2 border-[#0d0d0d]"><VideoEmbed url={data.embedUrl} title={data.project.title} /></div>
{/if}
{#if data.project.description}
  <div bind:this={contentBlock} class="border-b-2 border-[#0d0d0d]">
    <div class="px-8 py-3 bg-[#e8e2d8] border-b-2 border-[#0d0d0d]"><span class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">Project Overview</span></div>
    <div class="px-8 py-10 max-w-3xl text-[#3a3530] leading-relaxed space-y-4 text-sm">
      {#each data.project.description.split('\n\n') as para}<p>{para}</p>{/each}
    </div>
  </div>
{/if}
{#if data.project.media && data.project.media.length > 0}
  <section bind:this={gallery}>
    <div class="border-b-2 border-[#0d0d0d] px-8 py-3 bg-[#e8e2d8]"><span class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">Gallery</span></div>
    <div class="grid grid-cols-1 md:grid-cols-2">
      {#each data.project.media as item}
        <div class="gallery-item border-b-2 border-[#0d0d0d] overflow-hidden group">
          {#if item.type === 'image'}
            <img src={item.url} alt={item.caption ?? ''} class="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            {#if item.caption}<p class="px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#8c857c] border-t-2 border-[#0d0d0d]">{item.caption}</p>{/if}
          {:else}
            <VideoEmbed url={item.url} title={item.caption ?? 'Video'} />
          {/if}
        </div>
      {/each}
    </div>
  </section>
{/if}
<div class="border-t-2 border-[#0d0d0d] bg-[#0d0d0d]">
  <a href="/work" class="flex items-center justify-between px-8 py-8 hover:bg-[#1a1a1a] transition-colors group">
    <span class="text-xs font-bold uppercase tracking-widest text-[#f2ede4]">Back to Work</span>
    <span class="text-[#e63329] font-black text-2xl transition-transform group-hover:translate-x-2">&#8594;</span>
  </a>
</div>
