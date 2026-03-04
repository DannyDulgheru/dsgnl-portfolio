<script lang="ts">
import ProjectCard from '$lib/components/public/ProjectCard.svelte';
import { onMount } from 'svelte';
import { gsap, countUp } from '$lib/animations';

let { data } = $props();

let featuredSection: HTMLElement = $state() as any;
let servicesSection: HTMLElement = $state() as any;
let recentSection: HTMLElement = $state() as any;
let ctaSection: HTMLElement = $state() as any;
let stat1: HTMLElement = $state() as any;
let stat2: HTMLElement = $state() as any;
let stat3: HTMLElement = $state() as any;

const services = [
  { n: '01', title: 'Animation & Video', desc: '2D animations, professional video editing, and animated graphic elements for a dynamic modern impact.' },
  { n: '02', title: 'Web Design & Prototypes', desc: 'Attractive web designs, UI/UX prototypes, optimized websites, and complete brand identity packages.' },
  { n: '03', title: 'Audio Production', desc: 'Custom music composition and sound effects tailored perfectly for multimedia projects — ads, games, or films.' },
  { n: '04', title: 'IT Solutions', desc: 'CRM, ERP, and CMS configuration, website optimization, and landing page development for your business.' },
  { n: '05', title: 'AI Video & Animation', desc: 'Next-generation visual production using AI — high-fidelity video, digital avatars, and complex animations at speed.' },
  { n: '06', title: 'Custom Solutions', desc: 'We adapt to your unique requirements, offering creative and technical solutions for any project or challenge.' },
];

onMount(() => {
const ctx = gsap.context(() => {
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.from('.hero-label', { y: 20, opacity: 0, duration: 0.5 })
  .from('.headline-line', { y: 80, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.2')
  .from('.hero-sub', { y: 30, opacity: 0, duration: 0.7 }, '-=0.3')
  .from('.hero-cta-item', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
  .from('.stat-box', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.2');

countUp(stat1, 10, { delay: 0.8 });
countUp(stat2, 350, { delay: 0.9 });
countUp(stat3, 40, { delay: 1.0 });

if (featuredSection) {
gsap.from(featuredSection.querySelectorAll('.card-reveal'), {
y: 60, duration: 0.8, stagger: 0.1,
scrollTrigger: { trigger: featuredSection, start: 'top 80%', once: true }
});
}
if (servicesSection) {
gsap.from('.service-item', {
x: -30, duration: 0.6, stagger: 0.08,
scrollTrigger: { trigger: servicesSection, start: 'top 80%', once: true }
});
}
if (recentSection) {
gsap.from(recentSection.querySelectorAll('.card-reveal'), {
y: 50, duration: 0.7, stagger: 0.08,
scrollTrigger: { trigger: recentSection, start: 'top 80%', once: true }
});
}
if (ctaSection) {
gsap.from('.cta-word', {
y: 60, duration: 0.7, stagger: 0.08,
scrollTrigger: { trigger: ctaSection, start: 'top 85%', once: true }
});
}
});
return () => ctx.revert();
});
</script>

<svelte:head>
<title>{data.settings.site_name} — Creative & Technology Studio</title>
<meta name="description" content={data.settings.seo_description} />
<meta property="og:title" content="{data.settings.site_name} — Creative & Technology Studio" />
<meta property="og:description" content={data.settings.seo_description} />
<meta property="og:type" content="website" />
</svelte:head>

<!-- HERO -->
<section class="min-h-[calc(100vh-3.5rem)] border-b-2 border-[#0d0d0d] flex flex-col bg-[#f2ede4]">
<div class="border-b-2 border-[#0d0d0d] px-8 py-3 flex items-center justify-between bg-[#e8e2d8]">
<span class="hero-label text-[11px] font-bold uppercase tracking-widest text-[#8c857c]">Creative &amp; Technology Studio — Chisinau, Moldova</span>
<span class="hero-label text-[11px] font-mono text-[#8c857c]">Est. 2016</span>
</div>

<div class="flex-1 flex flex-col justify-center px-8 py-16 overflow-hidden">
<p class="headline-line text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-[0.9] tracking-tighter text-[#0d0d0d]">{data.settings.hero_line1 || 'We Design'}</p>
<p class="headline-line text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-[0.9] tracking-tighter flex flex-wrap items-baseline gap-4">
{#each (data.settings.hero_line2 || 'Digital Solutions.').split(' ') as word, i}
  <span class={i === ((data.settings.hero_line2 || 'Digital Solutions.').split(' ').length - 1) ? 'text-[#e63329]' : 'text-[#0d0d0d]'}>{word}</span>
{/each}
</p>
<p class="hero-sub mt-10 text-[#8c857c] text-lg max-w-lg leading-relaxed">
{data.settings.hero_sub || 'Animation, web design, AI video, sound design & custom IT solutions — turning ideas into innovative digital experiences.'}
</p>
</div>

<div class="border-t-2 border-[#0d0d0d] grid grid-cols-1 sm:grid-cols-2">
<div class="flex border-b-2 sm:border-b-0 sm:border-r-2 border-[#0d0d0d]">
<a href="/work" class="hero-cta-item flex-1 flex items-center justify-center py-5 px-6 font-black text-sm uppercase tracking-widest bg-[#0d0d0d] text-[#f2ede4] hover:bg-[#e63329] transition-colors text-center">
View Projects →
</a>
<a href="/contact" class="hero-cta-item flex-1 flex items-center justify-center py-5 px-6 font-bold text-sm uppercase tracking-widest border-l-2 border-[#0d0d0d] text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f2ede4] transition-colors text-center">
Get in Touch
</a>
</div>
<div class="flex divide-x-2 divide-[#0d0d0d]">
<div class="stat-box flex-1 text-center py-6">
<div class="text-3xl font-black text-[#0d0d0d]"><span bind:this={stat1}>0</span>+</div>
<div class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c] mt-1">{data.settings.hero_stat1_label || 'Years'}</div>
</div>
<div class="stat-box flex-1 text-center py-6">
<div class="text-3xl font-black text-[#0d0d0d]"><span bind:this={stat2}>0</span>+</div>
<div class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c] mt-1">{data.settings.hero_stat2_label || 'Projects'}</div>
</div>
<div class="stat-box flex-1 text-center py-6">
<div class="text-3xl font-black text-[#0d0d0d]"><span bind:this={stat3}>0</span>+</div>
<div class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c] mt-1">{data.settings.hero_stat3_label || 'Clients'}</div>
</div>
</div>
</div>
</section>

<!-- MARQUEE -->
<div class="overflow-hidden border-b-2 border-[#0d0d0d] py-3 bg-[#e8e2d8]">
<div class="marquee-track flex gap-10 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap text-[#8c857c]">
{#each Array(4) as _}
  {#each (data.settings.marquee_items || '2D Animation,Web Design,AI Video,Sound Design,IT Solutions,3D Animation').split(',') as item}
    <span>{item.trim()}</span><span class="text-[#e63329]">✦</span>
  {/each}
{/each}
</div>
</div>

<!-- FEATURED WORK -->
{#if data.featured.length > 0}
<section bind:this={featuredSection} class="border-b-2 border-[#0d0d0d]">
<div class="flex items-center justify-between px-8 py-5 border-b-2 border-[#0d0d0d] bg-[#e8e2d8]">
<div class="flex items-center gap-5">
<span class="text-5xl font-black text-[#d4cfc7] leading-none select-none">01</span>
<div>
<p class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">Selected</p>
<p class="text-xl font-black uppercase tracking-tight text-[#0d0d0d]">Featured Projects</p>
</div>
</div>
<a href="/work" class="text-xs font-bold uppercase tracking-widest text-[#0d0d0d] hover:text-[#e63329] transition-colors">All Projects →</a>
</div>
<div class="grid grid-cols-1 md:grid-cols-2">
{#each data.featured.slice(0, 1) as project}
<div class="card-reveal md:col-span-2 border-b-2 border-[#0d0d0d]"><ProjectCard {project} /></div>
{/each}
{#each data.featured.slice(1, 3) as project, i}
<div class="card-reveal border-b-2 border-[#0d0d0d] {i === 0 ? 'md:border-r-2 md:border-[#0d0d0d]' : ''}"><ProjectCard {project} /></div>
{/each}
</div>
</section>
{/if}

<!-- SERVICES -->
<section bind:this={servicesSection} class="border-b-2 border-[#0d0d0d]">
<div class="flex items-center gap-5 px-8 py-5 border-b-2 border-[#0d0d0d] bg-[#e8e2d8]">
<span class="text-5xl font-black text-[#d4cfc7] leading-none select-none">02</span>
<div>
<p class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">What We Do</p>
<p class="text-xl font-black uppercase tracking-tight text-[#0d0d0d]">Complete Digital Solutions</p>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y-2 divide-[#0d0d0d]">
{#each services as s, i}
<div class="service-item px-8 py-10
{i % 2 === 0 ? 'md:border-r-2 md:border-[#0d0d0d]' : ''}
{i % 3 === 0 ? 'lg:border-r-2 lg:border-[#0d0d0d]' : ''}
{i % 3 === 1 ? 'lg:border-r-2 lg:border-[#0d0d0d] md:border-r-0' : ''}
{i % 3 === 2 ? 'md:border-r-2 md:border-[#0d0d0d] lg:border-r-0' : ''}
bg-[#f2ede4] hover:bg-[#e8e2d8] transition-colors group border-b-0">
<p class="text-4xl font-black text-[#d4cfc7] leading-none mb-5 group-hover:text-[#e63329] transition-colors">{s.n}</p>
<h3 class="text-sm font-black uppercase tracking-tight text-[#0d0d0d] mb-3">{s.title}</h3>
<p class="text-xs text-[#8c857c] leading-relaxed">{s.desc}</p>
</div>
{/each}
</div>
<div class="px-8 py-6 flex items-center justify-end border-t-2 border-[#0d0d0d] bg-[#e8e2d8]">
<a href="/services" class="text-xs font-bold uppercase tracking-widest text-[#0d0d0d] hover:text-[#e63329] transition-colors">All Services →</a>
</div>
</section>

<!-- RECENT WORK -->
{#if data.recent.length > 0}
<section bind:this={recentSection} class="border-b-2 border-[#0d0d0d]">
<div class="flex items-center gap-5 px-8 py-5 border-b-2 border-[#0d0d0d] bg-[#e8e2d8]">
<span class="text-5xl font-black text-[#d4cfc7] leading-none select-none">03</span>
<div>
<p class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">Portfolio</p>
<p class="text-xl font-black uppercase tracking-tight text-[#0d0d0d]">Recent Projects</p>
</div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
{#each data.recent as project, i}
<div class="card-reveal border-b-2 border-[#0d0d0d] {i % 3 !== 2 ? 'lg:border-r-2 lg:border-[#0d0d0d]' : ''} {i % 2 === 0 ? 'sm:border-r-2 sm:border-[#0d0d0d] lg:border-r-0' : ''}">
<ProjectCard {project} />
</div>
{/each}
</div>
</section>
{/if}

<!-- BOTTOM CTA -->
<section bind:this={ctaSection} class="bg-[#0d0d0d] px-8 py-24 text-center overflow-hidden">
<div class="overflow-hidden">
<p class="cta-word text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-none tracking-tighter text-[#f2ede4]">LET'S BUILD</p>
<p class="cta-word text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-none tracking-tighter text-[#f2ede4]">SOMETHING</p>
<p class="cta-word text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-none tracking-tighter text-[#e63329]">REMARKABLE.</p>
</div>
<a href="/contact" class="mt-12 inline-block px-12 py-5 border-2 border-[#f2ede4] text-[#f2ede4] text-sm font-bold uppercase tracking-widest hover:bg-[#f2ede4] hover:text-[#0d0d0d] transition-colors">
Start a Project →
</a>
</section>

