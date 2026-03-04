<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head><title>Admin Login</title></svelte:head>

<div class="min-h-screen bg-black flex items-center justify-center px-6">
	<div class="w-full max-w-sm">
		<div class="mb-8 text-center">
			<div class="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] mb-4">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="1.5">
					<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
				</svg>
			</div>
			<h1 class="text-lg font-medium text-[#ededed]">Admin Access</h1>
			<p class="text-xs text-[#555] mt-1">Sign in to manage your portfolio</p>
		</div>

		<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6">
			<form
				method="POST"
				action="?/login"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						update();
					};
				}}
				class="space-y-4"
			>
				{#if form?.error}
					<div class="rounded-md border border-red-900/50 bg-red-950/30 px-3 py-2">
						<p class="text-xs text-red-400">{form.error}</p>
					</div>
				{/if}

				<div>
					<label for="email" class="block text-xs text-[#555] mb-1.5">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="w-full bg-black border border-[#1a1a1a] rounded-lg px-3 py-2.5 text-sm text-[#ededed] focus:outline-none focus:border-[#333] transition-colors"
					/>
				</div>

				<div>
					<label for="password" class="block text-xs text-[#555] mb-1.5">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="w-full bg-black border border-[#1a1a1a] rounded-lg px-3 py-2.5 text-sm text-[#ededed] focus:outline-none focus:border-[#333] transition-colors"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					class="w-full bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-[#ededed] transition-colors disabled:opacity-50 mt-2"
				>
					{loading ? 'Signing in...' : 'Sign in'}
				</button>
			</form>
		</div>
	</div>
</div>
