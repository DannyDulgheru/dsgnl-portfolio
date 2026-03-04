<script lang="ts">
	import { enhance } from '$app/forms';
	import ProjectForm from '$lib/components/admin/ProjectForm.svelte';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head><title>New Project — Admin</title></svelte:head>

<div class="p-8 max-w-3xl">
	<div class="flex items-center gap-4 mb-8">
		<a href="/admin/projects" class="text-[#555] hover:text-[#888] transition-colors">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
		</a>
		<h1 class="text-xl font-medium text-[#ededed]">New Project</h1>
	</div>

	{#if form?.error}
		<div class="mb-6 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3">
			<p class="text-sm text-red-400">{form.error}</p>
		</div>
	{/if}

	<form method="POST" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }}>
		<ProjectForm />

		<div class="mt-6 flex items-center gap-3">
			<button type="submit" disabled={loading} class="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#ededed] transition-colors disabled:opacity-50">
				{loading ? 'Creating...' : 'Create Project'}
			</button>
			<a href="/admin/projects" class="text-sm text-[#555] hover:text-[#888] transition-colors">Cancel</a>
		</div>
	</form>
</div>
