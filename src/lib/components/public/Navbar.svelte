<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { gsap } from '$lib/animations';

	let { siteName = 'Motion Studio' }: { siteName?: string } = $props();

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/services', label: 'Services' },
		{ href: '/work', label: 'Projects' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];

	let menuOpen = $state(false);
	let nav: HTMLElement = $state() as any;

	onMount(() => {
		if (nav) gsap.from(nav, { y: -80, duration: 0.7, ease: 'power3.out', delay: 0.1 });
	});
</script>

<nav bind:this={nav} class="fixed top-0 left-0 right-0 z-50 bg-[#f2ede4] border-b-2 border-[#0d0d0d]">
	<div class="flex items-stretch h-14">
		<!-- Site name -->
		<a href="/"
			class="px-6 flex items-center border-r-2 border-[#0d0d0d] font-black text-sm uppercase tracking-widest text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f2ede4] transition-colors whitespace-nowrap">
			{siteName}
		</a>

		<!-- Desktop links -->
		<div class="hidden md:flex items-stretch ml-auto">
			{#each links as link}
				<a
					href={link.href}
					class="px-6 flex items-center border-l-2 border-[#0d0d0d] text-xs font-bold uppercase tracking-widest transition-colors
						{page.url.pathname === link.href || (link.href !== '/' && page.url.pathname.startsWith(link.href))
							? 'bg-[#0d0d0d] text-[#f2ede4]'
							: 'text-[#0d0d0d] hover:bg-[#e63329] hover:text-[#f2ede4]'}"
				>
					{link.label}
				</a>
			{/each}
		</div>

		<!-- Mobile hamburger -->
		<button
			class="md:hidden ml-auto px-5 border-l-2 border-[#0d0d0d] text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f2ede4] transition-colors"
			onclick={() => (menuOpen = !menuOpen)}
			aria-label="Toggle menu"
		>
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
				{#if menuOpen}
					<path d="M2 2L16 16M16 2L2 16" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
				{:else}
					<path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" stroke-width="2" stroke-linecap="square"/>
				{/if}
			</svg>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="md:hidden border-t-2 border-[#0d0d0d] bg-[#f2ede4]">
			{#each links as link}
				<a
					href={link.href}
					class="flex items-center px-6 py-4 border-b-2 border-[#0d0d0d] text-xs font-bold uppercase tracking-widest transition-colors
						{page.url.pathname === link.href || (link.href !== '/' && page.url.pathname.startsWith(link.href)) ? 'bg-[#0d0d0d] text-[#f2ede4]' : 'text-[#0d0d0d] hover:bg-[#e63329] hover:text-[#f2ede4]'}"
					onclick={() => (menuOpen = false)}
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>
