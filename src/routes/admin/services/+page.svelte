<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	let loading = $state(false);
</script>

<svelte:head><title>Services — Admin</title></svelte:head>

<div class="p-8 max-w-3xl">
	<div class="mb-8">
		<h1 class="text-xl font-medium text-[#ededed]">Services</h1>
		<p class="text-sm text-[#555] mt-1">Edit the 6 services shown on the website. Tags are comma-separated.</p>
	</div>

	{#if form?.success}
		<div class="mb-6 rounded-lg border border-[#50e3c2]/20 bg-[#50e3c2]/5 px-4 py-3">
			<p class="text-sm text-[#50e3c2]">Services saved successfully.</p>
		</div>
	{/if}

	<form method="POST" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }} class="space-y-4">
		{#each data.services as svc, i}
			<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-4">
				<div class="flex items-center gap-3">
					<span class="text-2xl font-black text-[#1a1a1a]">{svc.n}</span>
					<div class="flex-1">
						<label class="label">Title</label>
						<input name="title_{i}" type="text" value={svc.title} class="input" placeholder="Service title" />
					</div>
				</div>
				<div>
					<label class="label">Description</label>
					<textarea name="description_{i}" rows="3" class="input resize-none">{svc.description}</textarea>
				</div>
				<div>
					<label class="label">Tags <span class="text-[#333] normal-case tracking-normal">(comma-separated)</span></label>
					<input name="tags_{i}" type="text" value={svc.tags} class="input" placeholder="Tag 1, Tag 2, Tag 3" />
				</div>
			</div>
		{/each}

		<button type="submit" disabled={loading} class="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#ededed] transition-colors disabled:opacity-50">
			{loading ? 'Saving...' : 'Save Services'}
		</button>
	</form>
</div>
