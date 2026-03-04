<script lang="ts">
import { onMount } from "svelte";
import { gsap } from "$lib/animations";

let { data } = $props();

const DEFAULT_TIMELINE = [
{ year: "2024", role: "AI Video & Digital Avatars", context: "New service — high-fidelity AI production" },
{ year: "2023", role: "Web & IT Expansion", context: "Full-stack solutions: CRM, ERP, CMS integration" },
{ year: "2021", role: "3D Animation & Sound Design", context: "Expanded into 3D and original electronic music" },
{ year: "2019", role: "Multimedia Production", context: "Video editing, motion graphics, brand films" },
{ year: "2016", role: "Studio Founded", context: "DSGNL — Chisinau, Moldova" }
];
const DEFAULT_CLIENTS = [
{ name: "Artstage", sector: "Arts & Culture" },
{ name: "Kreyon", sector: "Technology" },
{ name: "Avantaj Prim", sector: "Business" },
{ name: "La Strada", sector: "Non-profit" },
{ name: "Sugar Mess", sector: "Food & Lifestyle" },
{ name: "Cherwell", sector: "Software" },
];

const tools = ["After Effects", "Premiere Pro", "Figma", "Blender", "WordPress", "Laravel", "Cinema 4D", "AI Tools"];

const timeline: {year:string;role:string;context:string}[] = (() => {
  try { return data.settings.about_timeline_json ? JSON.parse(data.settings.about_timeline_json) : DEFAULT_TIMELINE; } catch { return DEFAULT_TIMELINE; }
})();
const clients: {name:string;sector:string}[] = (() => {
  try { return data.settings.about_clients_json ? JSON.parse(data.settings.about_clients_json) : DEFAULT_CLIENTS; } catch { return DEFAULT_CLIENTS; }
})();

let heroSection: HTMLElement = $state() as any;
let studioSection: HTMLElement = $state() as any;
let timelineSection: HTMLElement = $state() as any;
let clientsSection: HTMLElement = $state() as any;

onMount(() => {
const ctx = gsap.context(() => {
gsap.from(".about-hero-line", { y: 80, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.1 });
if (studioSection) {
gsap.from(studioSection.querySelectorAll(".bio-item"), {
x: 20, duration: 0.7, stagger: 0.1,
scrollTrigger: { trigger: studioSection, start: "top 80%", once: true }
});
}
if (timelineSection) {
gsap.from(".timeline-row", {
x: -30, duration: 0.6, stagger: 0.1,
scrollTrigger: { trigger: timelineSection, start: "top 80%", once: true }
});
}
if (clientsSection) {
gsap.from(".client-cell", {
y: 20, duration: 0.5, stagger: 0.08,
scrollTrigger: { trigger: clientsSection, start: "top 85%", once: true }
});
}
});
return () => ctx.revert();
});
</script>

<svelte:head>
<title>About -- {data.settings.site_name}</title>
<meta name="description" content="DSGNL -- Creative & technology studio based in Chisinau, Moldova. 2D animation, web design, AI video, sound design and IT solutions." />
</svelte:head>

<!-- HERO -->
<section bind:this={heroSection} class="min-h-[60vh] border-b-2 border-[#0d0d0d] flex flex-col bg-[#f2ede4]">
<div class="border-b-2 border-[#0d0d0d] px-8 py-3 bg-[#e8e2d8] flex items-center justify-between">
<span class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">About the Studio</span>
<span class="text-[10px] font-mono text-[#8c857c]">Est. 2016 / Chisinau, Moldova</span>
</div>
<div class="flex-1 flex items-end px-8 pb-10 pt-16 overflow-hidden">
<div>
<p class="about-hero-line text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#0d0d0d]">Hello,</p>
<p class="about-hero-line text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#0d0d0d]">We Are</p>
<p class="about-hero-line text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#e63329]">DSGNL.</p>
<p class="about-hero-line mt-6 text-lg text-[#8c857c] max-w-lg leading-relaxed">
We design intuitive digital solutions -- where creativity meets technology.
</p>
</div>
</div>
</section>

<!-- STUDIO IMAGE + BIO -->
<section bind:this={studioSection} class="grid md:grid-cols-2 border-b-2 border-[#0d0d0d]">
<div class="border-b-2 md:border-b-0 md:border-r-2 border-[#0d0d0d] overflow-hidden">
<div class="aspect-square overflow-hidden group">
<img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="DSGNL Studio Team" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
</div>
<div class="border-t-2 border-[#0d0d0d] px-8 py-5 flex items-center justify-between bg-[#e8e2d8]">
<div>
<p class="font-black text-sm uppercase tracking-tight text-[#0d0d0d]">Dan Dulgheru</p>
<p class="text-[10px] text-[#8c857c] uppercase tracking-widest">Founder & Creative Director</p>
</div>
<div class="flex gap-3">
<a href="mailto:{data.settings.email}" class="text-xs font-bold uppercase tracking-widest text-[#0d0d0d] hover:text-[#e63329] transition-colors">Email</a>
{#if data.settings.facebook}
<a href="{data.settings.facebook}" target="_blank" rel="noopener" class="text-xs font-bold uppercase tracking-widest text-[#0d0d0d] hover:text-[#e63329] transition-colors">Facebook</a>
{/if}
</div>
</div>
</div>

<div class="px-10 py-12 flex flex-col gap-8">
<div class="bio-item">
<span class="text-6xl font-black text-[#e63329] leading-none">&ldquo;</span>
<p class="text-[clamp(1.1rem,2.2vw,1.6rem)] font-light italic text-[#0d0d0d] leading-[1.35] -mt-4">
We combine creativity with technology to transform ideas into innovative digital experiences.
</p>
</div>
<div class="bio-item space-y-4">
<p class="text-sm text-[#8c857c] leading-relaxed">DSGNL is a creative and technology studio specializing in 2D animation, web design, and digital applications. We constantly explore 3D animation and multimedia production, complementing our projects with sound design and original electronic music.</p>
<p class="text-sm text-[#8c857c] leading-relaxed">We build modern websites, custom digital solutions, and actively integrate artificial intelligence into IT products and services -- reducing production time without compromising artistic quality.</p>
</div>
<div class="bio-item">
<p class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c] mb-3">Tools & Technologies</p>
<div class="flex flex-wrap gap-2">
{#each tools as tool}
<span class="px-3 py-1.5 border-2 border-[#0d0d0d] text-[11px] font-bold uppercase tracking-wider text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f2ede4] transition-colors cursor-default">{tool}</span>
{/each}
</div>
</div>
</div>
</section>

<!-- STUDIO IMAGES -->
<div class="border-b-2 border-[#0d0d0d] overflow-hidden grid md:grid-cols-2">
<div class="overflow-hidden group"><img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=80" alt="Motion design workspace" class="w-full object-cover h-64 md:h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" /></div>
<div class="overflow-hidden group border-t-2 md:border-t-0 md:border-l-2 border-[#0d0d0d]"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80" alt="Digital design work" class="w-full object-cover h-64 md:h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" /></div>
</div>

<!-- TIMELINE -->
<section bind:this={timelineSection} class="border-b-2 border-[#0d0d0d]">
<div class="border-b-2 border-[#0d0d0d] px-8 py-5 bg-[#e8e2d8] flex items-center gap-5">
<span class="text-5xl font-black text-[#d4cfc7] leading-none">03</span>
<div>
<p class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">Our Journey</p>
<p class="text-xl font-black uppercase tracking-tight text-[#0d0d0d]">Studio Milestones</p>
</div>
</div>
{#each timeline as item, i}
<div class="timeline-row bg-[#f2ede4] flex items-stretch border-b-2 border-[#0d0d0d] {i === timeline.length - 1 ? 'border-b-0' : ''} hover:bg-[#e8e2d8] transition-colors group">
<div class="w-24 shrink-0 border-r-2 border-[#0d0d0d] flex items-center justify-center py-6">
<span class="font-mono text-sm font-bold text-[#8c857c] group-hover:text-[#e63329] transition-colors">{item.year}</span>
</div>
<div class="flex-1 px-8 py-6 flex items-center justify-between gap-4">
<div>
<p class="font-black uppercase tracking-tight text-[#0d0d0d] group-hover:text-[#e63329] transition-colors text-sm">{item.role}</p>
<p class="text-xs text-[#8c857c] mt-0.5">{item.context}</p>
</div>
<span class="text-[#d4cfc7] group-hover:text-[#e63329] transition-colors font-bold text-lg">&#8594;</span>
</div>
</div>
{/each}
</section>

<!-- CLIENTS -->
<section bind:this={clientsSection} class="border-b-2 border-[#0d0d0d]">
<div class="border-b-2 border-[#0d0d0d] px-8 py-5 bg-[#e8e2d8]">
<span class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">Trusted By</span>
</div>
<div class="grid grid-cols-2 md:grid-cols-3">
{#each clients as client, i}
<div class="client-cell bg-[#f2ede4] px-8 py-10 border-b-2 border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f2ede4] transition-colors group {i % 3 !== 2 ? 'md:border-r-2 md:border-[#0d0d0d]' : ''} {i % 2 === 0 ? 'border-r-2 border-[#0d0d0d] md:border-r-0' : ''}">
<p class="font-black uppercase tracking-tight text-sm group-hover:text-[#f2ede4] text-[#0d0d0d] transition-colors">{client.name}</p>
<p class="text-xs font-mono text-[#8c857c] mt-1">{client.sector}</p>
</div>
{/each}
</div>
</section>

<!-- CTA -->
<div class="bg-[#0d0d0d] px-8 py-16 text-center">
<p class="text-[clamp(2rem,5vw,4rem)] font-black uppercase tracking-tighter text-[#f2ede4] leading-none mb-2">Ready to work together?</p>
<p class="text-[#8c857c] mb-8 text-sm">Let's discuss your project -- we respond within 24 hours.</p>
<a href="/contact" class="inline-block px-10 py-4 border-2 border-[#f2ede4] text-[#f2ede4] text-sm font-bold uppercase tracking-widest hover:bg-[#e63329] hover:border-[#e63329] transition-colors">Start a Project &#8594;</a>
</div>
