<script lang="ts">
import { onMount } from 'svelte';
import { gsap } from '$lib/animations';

let { data } = $props();

const icons = ['▶', '◻', '♫', '⬡', '◈', '✦'];

let gridRef: HTMLElement = $state() as any;

onMount(() => {
	const ctx = gsap.context(() => {
		gsap.from('.svc-hero-line', { y: 80, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
		if (gridRef) {
			gsap.from(gridRef.querySelectorAll('.svc-card'), {
				y: 50, duration: 0.6, stagger: 0.1,
				scrollTrigger: { trigger: gridRef, start: 'top 80%', once: true }
			});
		}
	});
	return () => ctx.revert();
});
</script>

<svelte:head>
	<title>Services -- {data.settings.site_name}</title>
	<meta name="description" content="Digital services by DSGNL: 2D animation, web design, AI video, audio production, IT solutions and more." />
</svelte:head>

<!-- HERO -->
<section bind:this={heroRef} class="border-b-2 border-[#0d0d0d] min-h-[55vh] flex flex-col bg-[#f2ede4]">
	<div class="border-b-2 border-[#0d0d0d] px-8 py-3 bg-[#e8e2d8] flex items-center justify-between">
		<span class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">What we do</span>
		<span class="text-[10px] font-mono text-[#8c857c]">6 core services</span>
	</div>
	<div class="flex-1 flex items-end px-8 pb-10 pt-14">
		<div>
			<p class="svc-hero-line text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#0d0d0d]">Digital</p>
			<p class="svc-hero-line text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#e63329]">Solutions</p>
			<p class="svc-hero-line mt-6 text-lg text-[#8c857c] max-w-xl leading-relaxed">
				From motion design to AI video — end-to-end creative and technical services that bring ideas to life.
			</p>
		</div>
	</div>
</section>

<!-- SERVICES GRID -->
<section bind:this={gridRef} class="border-b-2 border-[#0d0d0d]">
	<div class="grid md:grid-cols-2 xl:grid-cols-3 divide-y-2 divide-[#0d0d0d]">
		{#each data.services as svc, i}
			<div class="svc-card bg-[#f2ede4] p-8 flex flex-col gap-6 hover:bg-[#0d0d0d] hover:text-[#f2ede4] transition-colors duration-300 group border-b-0
				{i % 2 === 0 ? 'md:border-r-2 md:border-[#0d0d0d]' : ''}
				{i % 3 === 0 ? 'xl:border-r-2 xl:border-[#0d0d0d]' : ''}
				{i % 3 === 1 ? 'xl:border-r-2 xl:border-[#0d0d0d] xl:border-l-0 md:border-r-0' : ''}
				{i % 3 === 2 ? 'md:border-r-2 md:border-[#0d0d0d] xl:border-r-0' : ''}">
				<div class="flex items-start justify-between">
					<span class="font-mono text-xs text-[#8c857c] group-hover:text-[#8c857c]">{svc.n}</span>
					<span class="text-2xl group-hover:text-[#e63329] transition-colors">{icons[i] ?? '✦'}</span>
				</div>
				<div>
					<h2 class="text-xl font-black uppercase tracking-tight text-[#0d0d0d] group-hover:text-[#f2ede4] transition-colors mb-3">{svc.title}</h2>
					<p class="text-sm text-[#8c857c] leading-relaxed">{svc.description}</p>
				</div>
				<div class="flex flex-wrap gap-1.5 mt-auto">
					{#each (svc.tags || '').split(',').filter(Boolean) as tag}
						<span class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider border-2 border-[#0d0d0d] group-hover:border-[#f2ede4]/40 text-[#0d0d0d] group-hover:text-[#f2ede4]/80 transition-colors">{tag.trim()}</span>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- CTA -->
<div class="bg-[#e63329] px-8 py-20 text-center">
	<p class="text-[clamp(2rem,5vw,4rem)] font-black uppercase tracking-tighter text-[#f2ede4] leading-none mb-3">Have a project in mind?</p>
	<p class="text-[#f2ede4]/70 mb-8 text-sm max-w-md mx-auto">We turn your ideas into impactful digital experiences. Let's talk about what we can build together.</p>
	<div class="flex flex-col sm:flex-row gap-4 justify-center">
		<a href="/contact" class="inline-block px-10 py-4 bg-[#0d0d0d] text-[#f2ede4] text-sm font-bold uppercase tracking-widest hover:bg-[#f2ede4] hover:text-[#0d0d0d] transition-colors">Get in Touch &rarr;</a>
		<a href="/work" class="inline-block px-10 py-4 border-2 border-[#f2ede4] text-[#f2ede4] text-sm font-bold uppercase tracking-widest hover:bg-[#f2ede4] hover:text-[#0d0d0d] transition-colors">View Our Work</a>
	</div>
</div>
