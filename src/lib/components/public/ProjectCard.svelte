<script lang="ts">
	import type { Project } from '$lib/server/projects';

	let { project }: { project: Project } = $props();
</script>

<a
	href="/work/{project.slug}"
	class="group block overflow-hidden bg-[#f2ede4] hover:bg-[#0d0d0d] transition-colors duration-300"
>
	<!-- Cover image -->
	<div class="aspect-video relative overflow-hidden bg-[#e8e2d8] border-b-2 border-[#0d0d0d]">
		{#if project.coverImageUrl}
			<img
				src={project.coverImageUrl}
				alt={project.title}
				class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:grayscale"
				loading="lazy"
			/>
		{:else}
			<div class="w-full h-full flex items-center justify-center group-hover:bg-[#1a1a1a] transition-colors duration-300">
				<span class="text-4xl font-black text-[#e8e2d8] group-hover:text-[#3a3530] transition-colors">
					{project.title.charAt(0)}
				</span>
			</div>
		{/if}

		<!-- Category corner tag -->
		{#if project.category}
			<div class="absolute top-0 left-0 bg-[#0d0d0d] group-hover:bg-[#e63329] px-3 py-1.5 transition-colors duration-300">
				<span class="text-[10px] text-[#f2ede4] font-bold uppercase tracking-widest">{project.category}</span>
			</div>
		{/if}

		<!-- Video badge -->
		{#if project.videoUrl}
			<div class="absolute bottom-0 right-0 bg-[#e63329] px-3 py-1.5 flex items-center gap-1.5">
				<svg width="8" height="8" viewBox="0 0 24 24" fill="#f2ede4"><polygon points="5 3 19 12 5 21 5 3"/></svg>
				<span class="text-[10px] text-[#f2ede4] font-bold uppercase tracking-wider">Video</span>
			</div>
		{/if}
	</div>

	<!-- Meta -->
	<div class="p-5 border-t-0">
		<div class="flex items-start justify-between gap-3">
			<h3 class="text-base font-black uppercase tracking-tight text-[#0d0d0d] group-hover:text-[#f2ede4] transition-colors duration-300 leading-tight">
				{project.title}
			</h3>
			{#if project.year}
				<span class="text-xs font-mono text-[#8c857c] group-hover:text-[#8c857c] shrink-0 mt-0.5">{project.year}</span>
			{/if}
		</div>
		{#if project.shortDesc}
			<p class="text-xs text-[#8c857c] group-hover:text-[#8c857c] mt-2 leading-relaxed line-clamp-2">{project.shortDesc}</p>
		{/if}

		<!-- Arrow indicator -->
		<div class="mt-4 flex items-center justify-between">
			{#if project.client}
				<span class="text-[10px] text-[#8c857c] group-hover:text-[#8c857c] uppercase tracking-widest">{project.client}</span>
			{:else}
				<span></span>
			{/if}
			<span class="text-[#0d0d0d] group-hover:text-[#e63329] transition-colors duration-300 font-bold text-sm">→</span>
		</div>
	</div>
</a>
