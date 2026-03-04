<script lang="ts">
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	let loadingEmail = $state(false);
	let loadingPassword = $state(false);
</script>

<svelte:head><title>Profile — Admin</title></svelte:head>

<div class="p-8 max-w-xl">
	<div class="mb-8">
		<h1 class="text-xl font-medium text-[#ededed]">My Profile</h1>
		<p class="text-sm text-[#555] mt-1">Update your login credentials</p>
	</div>

	<!-- Change Email -->
	<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5 mb-5">
		<h2 class="text-sm font-medium text-[#ededed]">Email Address</h2>
		<p class="text-xs text-[#555]">Current: <span class="text-[#888]">{data.user?.email}</span></p>

		{#if form?.emailSuccess}
			<div class="rounded-lg border border-[#50e3c2]/20 bg-[#50e3c2]/5 px-4 py-3">
				<p class="text-sm text-[#50e3c2]">Email updated. Please log in again with the new email.</p>
			</div>
		{/if}
		{#if form?.emailError}
			<div class="rounded-lg border border-[#e63329]/20 bg-[#e63329]/5 px-4 py-3">
				<p class="text-sm text-[#e63329]">{form.emailError}</p>
			</div>
		{/if}

		<form method="POST" action="?/updateEmail"
			use:enhance={() => { loadingEmail = true; return async ({ update }) => { loadingEmail = false; update(); }; }}
			class="space-y-4"
		>
			<div>
				<label class="label">New Email</label>
				<input name="email" type="email" required class="input" placeholder="new@email.com" />
			</div>
			<button type="submit" disabled={loadingEmail} class="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#ededed] transition-colors disabled:opacity-50">
				{loadingEmail ? 'Saving...' : 'Update Email'}
			</button>
		</form>
	</div>

	<!-- Change Password -->
	<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
		<h2 class="text-sm font-medium text-[#ededed]">Change Password</h2>

		{#if form?.passwordSuccess}
			<div class="rounded-lg border border-[#50e3c2]/20 bg-[#50e3c2]/5 px-4 py-3">
				<p class="text-sm text-[#50e3c2]">Password updated successfully.</p>
			</div>
		{/if}
		{#if form?.passwordError}
			<div class="rounded-lg border border-[#e63329]/20 bg-[#e63329]/5 px-4 py-3">
				<p class="text-sm text-[#e63329]">{form.passwordError}</p>
			</div>
		{/if}

		<form method="POST" action="?/updatePassword"
			use:enhance={() => { loadingPassword = true; return async ({ update }) => { loadingPassword = false; update(); }; }}
			class="space-y-4"
		>
			<div>
				<label class="label">New Password</label>
				<input name="newPassword" type="password" required minlength="8" class="input" placeholder="Min. 8 characters" />
			</div>
			<div>
				<label class="label">Confirm Password</label>
				<input name="confirmPassword" type="password" required class="input" placeholder="Repeat new password" />
			</div>
			<button type="submit" disabled={loadingPassword} class="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#ededed] transition-colors disabled:opacity-50">
				{loadingPassword ? 'Updating...' : 'Change Password'}
			</button>
		</form>
	</div>
</div>
