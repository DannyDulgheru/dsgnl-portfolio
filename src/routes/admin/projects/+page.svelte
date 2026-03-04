<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
</script>

<svelte:head><title>Projects — Admin</title></svelte:head>

<div class="p-8">
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-xl font-medium text-[#ededed]">Projects</h1>
			<p class="text-sm text-[#555] mt-1">{data.projects.length} total</p>
		</div>
		<a href="/admin/projects/new" class="bg-white text-black text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#ededed] transition-colors">
			+ New Project
		</a>
	</div>

	{#if data.projects.length === 0}
		<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-16 text-center">
			<svg class="mx-auto mb-4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1">
				<rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5"/>
			</svg>
			<p class="text-sm text-[#444] mb-3">No projects yet</p>
			<a href="/admin/projects/new" class="text-xs text-[#0070f3] hover:text-blue-400 transition-colors">Create your first project →</a>
		</div>
	{:else}
		<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] overflow-hidden">
			<!-- Table header -->
			<div class="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 px-4 py-3 border-b border-[#1a1a1a] text-[10px] text-[#444] uppercase tracking-widest">
				<span>Project</span>
				<span>Category</span>
				<span>Status</span>
				<span>Actions</span>
			</div>

			{#each data.projects as project, i}
				<div class="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center px-4 py-3 {i !== data.projects.length - 1 ? 'border-b border-[#111]' : ''} hover:bg-[#111] transition-colors group">
					<!-- Title + thumbnail -->
					<div class="flex items-center gap-3 min-w-0">
						<div class="w-10 h-8 rounded overflow-hidden bg-[#111] shrink-0 border border-[#1a1a1a]">
							{#if project.coverImageUrl}
								<img src={project.coverImageUrl} alt="" class="w-full h-full object-cover" />
							{/if}
						</div>
						<div class="min-w-0">
							<p class="text-sm text-[#ededed] truncate">{project.title}</p>
							{#if project.featured}
								<span class="text-[10px] text-[#50e3c2]">★ Featured</span>
							{/if}
						</div>
					</div>

					<!-- Category -->
					<span class="text-xs text-[#555] truncate">{project.category ?? '—'}</span>

					<!-- Status toggle -->
					<form method="POST" action="?/toggleStatus" use:enhance>
						<input type="hidden" name="id" value={project.id} />
						<input type="hidden" name="status" value={project.status} />
						<button type="submit" class="text-[10px] px-2 py-1 rounded-full cursor-pointer transition-colors {project.status === 'published' ? 'text-[#50e3c2] bg-[#50e3c2]/10 border border-[#50e3c2]/20 hover:bg-[#50e3c2]/20' : 'text-[#555] bg-[#111] border border-[#1a1a1a] hover:border-[#333]'}">
							{project.status}
						</button>
					</form>

					<!-- Actions -->
					<div class="flex items-center gap-2">
						<a href="/admin/projects/{project.id}" class="text-xs text-[#555] hover:text-[#ededed] transition-colors px-2 py-1 rounded hover:bg-[#1a1a1a]">
							Edit
						</a>
						<form method="POST" action="?/delete" use:enhance onsubmit={(e) => { if (!confirm('Delete this project?')) e.preventDefault(); }}>
							<input type="hidden" name="id" value={project.id} />
							<button type="submit" class="text-xs text-[#555] hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-[#1a1a1a]">
								Delete
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
