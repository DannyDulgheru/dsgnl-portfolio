<script lang="ts">
	import { enhance } from "$app/forms";
	let { data, form } = $props();
	let loading = $state(false);
	let s = $derived(data.settings);
</script>

<svelte:head><title>Content — Admin</title></svelte:head>

<div class="p-8 max-w-2xl">
	<div class="mb-8">
		<h1 class="text-xl font-medium text-[#ededed]">Homepage Content</h1>
		<p class="text-sm text-[#555] mt-1">Edit hero section, marquee, stats and founder info</p>
	</div>

	{#if form?.success}
		<div class="mb-6 rounded-lg border border-[#50e3c2]/20 bg-[#50e3c2]/5 px-4 py-3">
			<p class="text-sm text-[#50e3c2]">Content saved successfully.</p>
		</div>
	{/if}

	<form method="POST" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }} class="space-y-5">

		<!-- Hero Text -->
		<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
			<h2 class="text-sm font-medium text-[#ededed]">Hero Section</h2>
			<div>
				<label class="label">Headline — Line 1</label>
				<input name="hero_line1" type="text" value={s.hero_line1} class="input" placeholder="We Design" />
				<p class="text-xs text-[#444] mt-1">The animated part (e.g. "We Design")</p>
			</div>
			<div>
				<label class="label">Headline — Line 2</label>
				<input name="hero_line2" type="text" value={s.hero_line2} class="input" placeholder="Digital Solutions." />
			</div>
			<div>
				<label class="label">Hero Subtext</label>
				<textarea name="hero_sub" rows="3" class="input resize-none">{s.hero_sub}</textarea>
			</div>
		</div>

		<!-- Stats Labels -->
		<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
			<h2 class="text-sm font-medium text-[#ededed]">Stats Labels</h2>
			<p class="text-xs text-[#444]">Labels shown beneath the animated numbers (10+, 350+, 40+)</p>
			<div class="grid grid-cols-3 gap-4">
				<div>
					<label class="label">Stat 1 Label</label>
					<input name="hero_stat1_label" type="text" value={s.hero_stat1_label} class="input" placeholder="Years" />
				</div>
				<div>
					<label class="label">Stat 2 Label</label>
					<input name="hero_stat2_label" type="text" value={s.hero_stat2_label} class="input" placeholder="Projects" />
				</div>
				<div>
					<label class="label">Stat 3 Label</label>
					<input name="hero_stat3_label" type="text" value={s.hero_stat3_label} class="input" placeholder="Clients" />
				</div>
			</div>
		</div>

		<!-- Marquee -->
		<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
			<h2 class="text-sm font-medium text-[#ededed]">Marquee Ticker</h2>
			<div>
				<label class="label">Items (comma-separated)</label>
				<input name="marquee_items" type="text" value={s.marquee_items} class="input" placeholder="2D Animation,Web Design,AI Video" />
				<p class="text-xs text-[#444] mt-1">Separate items with commas. These scroll across the hero ticker.</p>
			</div>
		</div>

		<!-- Founder / About -->
		<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
			<h2 class="text-sm font-medium text-[#ededed]">Founder & About</h2>
			<div>
				<label class="label">Founder Name</label>
				<input name="founder_name" type="text" value={s.founder_name} class="input" placeholder="Dan Dulgheru" />
			</div>
			<div>
				<label class="label">Founder Role</label>
				<input name="founder_role" type="text" value={s.founder_role} class="input" placeholder="Founder & Creative Director" />
			</div>
			<div>
				<label class="label">Studio Bio</label>
				<textarea name="bio" rows="4" class="input resize-none">{s.bio}</textarea>
			</div>
			<div>
				<label class="label">Showreel URL</label>
				<input name="showreel_url" type="url" value={s.showreel_url} class="input" placeholder="https://vimeo.com/..." />
			</div>
			<div>
				<label class="label">Avatar / Studio Photo URL</label>
				<input name="avatar_url" type="url" value={s.avatar_url} class="input" placeholder="https://..." />
			</div>
		</div>

		<button type="submit" disabled={loading} class="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#ededed] transition-colors disabled:opacity-50">
			{loading ? "Saving..." : "Save Content"}
		</button>
	</form>
</div>
