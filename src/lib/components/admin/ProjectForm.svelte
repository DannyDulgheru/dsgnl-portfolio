<script lang="ts">
	import type { ProjectWithMedia } from '$lib/server/projects';

	let {
		project = null,
		actionUrl = '',
		submitLabel = 'Save Project'
	}: {
		project?: ProjectWithMedia | null;
		actionUrl?: string;
		submitLabel?: string;
	} = $props();

	let tags = $state<string>(project?.tags ?? '[]');
	let tagInput = $state('');
	let parsedTags = $derived<string[]>(JSON.parse(tags));

	function addTag() {
		const t = tagInput.trim();
		if (t && !parsedTags.includes(t)) {
			tags = JSON.stringify([...parsedTags, t]);
		}
		tagInput = '';
	}

	function removeTag(tag: string) {
		tags = JSON.stringify(parsedTags.filter((t) => t !== tag));
	}

	let videoType = $state<'youtube' | 'vimeo' | 'direct'>(
		(project?.videoType ?? 'youtube') as 'youtube' | 'vimeo' | 'direct'
	);
	let loading = $state(false);

	// Image upload state
	let coverImageUrl = $state(project?.coverImageUrl ?? '');
	let uploading = $state(false);
	let uploadError = $state('');

	async function handleImageUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploading = true;
		uploadError = '';
		try {
			const form = new FormData();
			form.append('file', file);
			const res = await fetch('/api/upload', { method: 'POST', body: form });
			const data = await res.json();
			if (!res.ok) throw new Error(data.message ?? 'Upload failed');
			coverImageUrl = data.url;
		} catch (err) {
			uploadError = err instanceof Error ? err.message : 'Upload failed';
		} finally {
			uploading = false;
			input.value = '';
		}
	}
</script>

<div class="space-y-8">
	<!-- Basic info -->
	<section class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
		<h2 class="text-sm font-medium text-[#ededed]">Basic Info</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
			<div class="md:col-span-2">
				<label class="label">Title</label>
				<input name="title" type="text" required value={project?.title ?? ''} class="input" placeholder="Project title" />
			</div>
			<div>
				<label class="label">Slug <span class="text-[#333]">(auto-filled)</span></label>
				<input name="slug" type="text" value={project?.slug ?? ''} class="input" placeholder="project-slug" />
			</div>
			<div>
				<label class="label">Category</label>
				<input name="category" type="text" value={project?.category ?? ''} class="input" placeholder="Branding, Animation..." />
			</div>
			<div>
				<label class="label">Client</label>
				<input name="client" type="text" value={project?.client ?? ''} class="input" placeholder="Client name" />
			</div>
			<div>
				<label class="label">Year</label>
				<input name="year" type="number" value={project?.year ?? new Date().getFullYear()} class="input" placeholder="2024" />
			</div>
		</div>

		<div>
			<label class="label">Short Description</label>
			<input name="shortDesc" type="text" value={project?.shortDesc ?? ''} class="input" placeholder="One-line summary shown in cards" />
		</div>

		<div>
			<label class="label">Full Description</label>
			<textarea name="description" rows="5" class="input resize-none" placeholder="Detailed project description...">{project?.description ?? ''}</textarea>
		</div>
	</section>

	<!-- Media -->
	<section class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
		<h2 class="text-sm font-medium text-[#ededed]">Media</h2>

		<div>
			<label class="label">Cover Image URL</label>
			<input name="coverImageUrl" type="url" bind:value={coverImageUrl} class="input" placeholder="https://..." />
			<div class="mt-2 flex items-center gap-3">
				<label class="cursor-pointer">
					<span class="text-xs text-[#555] hover:text-[#888] transition-colors underline-offset-2 hover:underline">
						{uploading ? 'Uploading...' : 'Upload image'}
					</span>
					<input type="file" accept="image/*" class="sr-only" disabled={uploading} onchange={handleImageUpload} />
				</label>
				{#if uploadError}
					<span class="text-xs text-red-400">{uploadError}</span>
				{/if}
			</div>
			{#if coverImageUrl}
				<img src={coverImageUrl} alt="Cover preview" class="mt-3 h-24 w-auto rounded-md border border-[#1a1a1a] object-cover" />
			{/if}
		</div>

		<div>
			<label class="label">Video Type</label>
			<div class="flex gap-2">
				{#each (['youtube', 'vimeo', 'direct'] as const) as type}
					<label class="flex items-center gap-2 cursor-pointer">
						<input type="radio" name="videoType" value={type} checked={videoType === type} onchange={() => (videoType = type)} class="sr-only" />
						<span class="px-3 py-1.5 rounded-md text-xs border transition-colors {videoType === type ? 'bg-white text-black border-white' : 'border-[#1a1a1a] text-[#555] hover:border-[#333]'} cursor-pointer">
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</span>
					</label>
				{/each}
			</div>
		</div>

		<div>
			<label class="label">Video URL</label>
			<input name="videoUrl" type="url" value={project?.videoUrl ?? ''} class="input" placeholder={videoType === 'youtube' ? 'https://youtube.com/watch?v=...' : videoType === 'vimeo' ? 'https://vimeo.com/...' : 'https://...'} />
		</div>
	</section>

	<!-- Tags -->
	<section class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-4">
		<h2 class="text-sm font-medium text-[#ededed]">Tags</h2>
		<input type="hidden" name="tags" value={tags} />

		<div class="flex gap-2">
			<input type="text" bind:value={tagInput} class="input flex-1" placeholder="Add a tag..." onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} />
			<button type="button" onclick={addTag} class="px-4 py-2.5 border border-[#1a1a1a] rounded-lg text-sm text-[#555] hover:border-[#333] hover:text-[#ededed] transition-colors">Add</button>
		</div>

		{#if parsedTags.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each parsedTags as tag}
					<span class="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#1a1a1a] text-xs text-[#555] bg-[#111]">
						{tag}
						<button type="button" onclick={() => removeTag(tag)} class="text-[#333] hover:text-red-400 transition-colors">×</button>
					</span>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Options -->
	<section class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-4">
		<h2 class="text-sm font-medium text-[#ededed]">Options</h2>

		<div class="flex items-center gap-6">
			<label class="flex items-center gap-3 cursor-pointer">
				<input type="checkbox" name="featured" value="true" checked={project?.featured ?? false} class="sr-only peer" />
				<div class="w-9 h-5 bg-[#111] border border-[#1a1a1a] rounded-full relative transition-colors peer-checked:bg-[#50e3c2]/20 peer-checked:border-[#50e3c2]/50 cursor-pointer">
					<div class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[#333] transition-transform peer-checked:translate-x-4"></div>
				</div>
				<span class="text-sm text-[#888]">Featured</span>
			</label>

			<div>
				<label class="label inline mr-3">Status</label>
				<select name="status" class="input !py-1.5 !w-auto">
					<option value="draft" selected={!project || project.status === 'draft'}>Draft</option>
					<option value="published" selected={project?.status === 'published'}>Published</option>
				</select>
			</div>
		</div>
	</section>
</div>

<style>
	:global(.label) {
		display: block;
		font-size: 11px;
		color: #555;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 6px;
	}
	:global(.input) {
		width: 100%;
		background: #000;
		border: 1px solid #1a1a1a;
		border-radius: 8px;
		padding: 10px 12px;
		font-size: 14px;
		color: #ededed;
		outline: none;
		transition: border-color 0.15s;
	}
	:global(.input:focus) { border-color: #333; }
	:global(.input::placeholder) { color: #333; }
</style>
