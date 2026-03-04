<script lang="ts">
import { enhance } from "$app/forms";
let { data, form } = $props();
let loading = $state(false);
let s = $derived(data.settings);
</script>

<svelte:head><title>Settings — Admin</title></svelte:head>

<div class="p-8 max-w-2xl">
<div class="mb-8">
<h1 class="text-xl font-medium text-[#ededed]">Settings</h1>
<p class="text-sm text-[#555] mt-1">Site-wide configuration, contact info & social links</p>
</div>

{#if form?.success}
<div class="mb-6 rounded-lg border border-[#50e3c2]/20 bg-[#50e3c2]/5 px-4 py-3">
<p class="text-sm text-[#50e3c2]">Settings saved successfully.</p>
</div>
{/if}

<form method="POST" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }} class="space-y-5">

<!-- General -->
<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
<h2 class="text-sm font-medium text-[#ededed]">General</h2>
<div>
<label class="label">Site Name</label>
<input name="site_name" type="text" value={s.site_name} class="input" />
</div>
<div>
<label class="label">SEO Meta Description</label>
<textarea name="seo_description" rows="3" class="input resize-none">{s.seo_description}</textarea>
</div>
</div>

<!-- Contact Info -->
<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
<h2 class="text-sm font-medium text-[#ededed]">Contact Information</h2>
<div>
<label class="label">Email</label>
<input name="email" type="email" value={s.email} class="input" placeholder="contact@studio.com" />
</div>
<div>
<label class="label">Phone</label>
<input name="phone" type="text" value={s.phone} class="input" placeholder="+373 68 787 316" />
</div>
<div>
<label class="label">Address</label>
<input name="address" type="text" value={s.address} class="input" placeholder="Bd. Traian 5, Chisinau, Moldova" />
</div>
</div>

<!-- Social Links -->
<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6 space-y-5">
<h2 class="text-sm font-medium text-[#ededed]">Social Links</h2>
<div>
<label class="label">Facebook URL</label>
<input name="facebook" type="url" value={s.facebook} class="input" placeholder="https://facebook.com/yourpage" />
</div>
<div>
<label class="label">Instagram</label>
<input name="instagram" type="text" value={s.instagram} class="input" placeholder="username (no @)" />
</div>
<div>
<label class="label">Vimeo</label>
<input name="vimeo" type="text" value={s.vimeo} class="input" placeholder="username or channel" />
</div>
<div>
<label class="label">LinkedIn</label>
<input name="linkedin" type="text" value={s.linkedin} class="input" placeholder="profile-slug" />
</div>
</div>

<button type="submit" disabled={loading} class="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#ededed] transition-colors disabled:opacity-50">
{loading ? "Saving..." : "Save Settings"}
</button>
</form>
</div>
