<script lang="ts">
	import { enhance } from '$app/forms';
	import ProjectForm from '$lib/components/admin/ProjectForm.svelte';

	let { data, form } = $props();
	let loading = $state(false);
	let mediaType = $state('image');
</script>

<svelte:head><title>Edit: {data.project.title} — Admin</title></svelte:head>

<div class="p-8 max-w-3xl">
	<div class="flex items-center gap-4 mb-8">
		<a href="/admin/projects" class="text-[#555] hover:text-[#888] transition-colors">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
		</a>
		<div>
			<h1 class="text-xl font-medium text-[#ededed]">{data.project.title}</h1>
			<div class="flex items-center gap-3 mt-1">
				<span class="text-[10px] px-2 py-0.5 rounded-full {data.project.status === 'published' ? 'text-[#50e3c2] bg-[#50e3c2]/10 border border-[#50e3c2]/20' : 'text-[#555] bg-[#111] border border-[#1a1a1a]'}">
					{data.project.status}
				</span>
				<a href="/work/{data.project.slug}" target="_blank" class="text-[10px] text-[#444] hover:text-[#888] transition-colors">
					View live ↗
				</a>
			</div>
		</div>
	</div>

	{#if form?.success}
		<div class="mb-6 rounded-lg border border-[#50e3c2]/20 bg-[#50e3c2]/5 px-4 py-3">
			<p class="text-sm text-[#50e3c2]">Saved successfully.</p>
		</div>
	{/if}
	{#if form?.error}
		<div class="mb-6 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3">
			<p class="text-sm text-red-400">{form.error}</p>
		</div>
	{/if}

	<!-- Edit form -->
	<form method="POST" action="?/update" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }}>
		<ProjectForm project={data.project} />

		<div class="mt-6 flex items-center gap-3">
			<button type="submit" disabled={loading} class="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#ededed] transition-colors disabled:opacity-50">
				{loading ? 'Saving...' : 'Save Changes'}
			</button>
			<a href="/work/{data.project.slug}" target="_blank" class="text-sm text-[#555] hover:text-[#888] transition-colors">
				Preview ↗
			</a>
		</div>
	</form>

	<!-- Gallery manager -->
	<section class="mt-10 border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6">
		<h2 class="text-sm font-medium text-[#ededed] mb-5">Gallery Media</h2>

		<!-- Add media -->
		<form method="POST" action="?/addMedia" use:enhance class="flex gap-2 mb-6">
			<select bind:value={mediaType} name="type" class="bg-black border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-[#ededed] focus:outline-none focus:border-[#333]">
				<option value="image">Image</option>
				<option value="video">Video</option>
			</select>
			<input name="url" type="url" required placeholder="URL..." class="flex-1 bg-black border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-[#ededed] placeholder-[#333] focus:outline-none focus:border-[#333]" />
			<input name="caption" type="text" placeholder="Caption (optional)" class="flex-1 bg-black border border-[#1a1a1a] rounded-lg px-3 py-2 text-sm text-[#ededed] placeholder-[#333] focus:outline-none focus:border-[#333]" />
			<button type="submit" class="px-4 py-2 border border-[#1a1a1a] rounded-lg text-sm text-[#555] hover:border-[#333] hover:text-[#ededed] transition-colors">Add</button>
		</form>

		<!-- Media list -->
		{#if data.project.media.length === 0}
			<p class="text-sm text-[#444] text-center py-8">No media added yet.</p>
		{:else}
			<div class="space-y-3">
				{#each data.project.media as item}
					<div class="flex items-center gap-3 p-3 border border-[#1a1a1a] rounded-lg bg-[#111]">
						{#if item.type === 'image'}
							<img src={item.url} alt={item.caption ?? ''} class="w-14 h-10 object-cover rounded border border-[#1a1a1a]" />
						{:else}
							<div class="w-14 h-10 bg-[#0a0a0a] rounded border border-[#1a1a1a] flex items-center justify-center">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
							</div>
						{/if}
						<div class="flex-1 min-w-0">
							<p class="text-xs text-[#ededed] truncate">{item.url}</p>
							{#if item.caption}<p class="text-[10px] text-[#444]">{item.caption}</p>{/if}
						</div>
						<form method="POST" action="?/deleteMedia" use:enhance>
							<input type="hidden" name="id" value={item.id} />
							<button type="submit" class="text-xs text-[#555] hover:text-red-400 transition-colors">Remove</button>
						</form>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>
