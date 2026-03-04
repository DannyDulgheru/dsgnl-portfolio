<script lang="ts">
	import Navbar from '$lib/components/public/Navbar.svelte';
	import Footer from '$lib/components/public/Footer.svelte';

	let { data, children } = $props();
</script>

<Navbar siteName={data.settings.site_name} />
<main class="pt-14 min-h-screen">
	{@render children()}
</main>
<Footer
	siteName={data.settings.site_name}
	email={data.settings.email}
	instagram={data.settings.instagram}
	vimeo={data.settings.vimeo}
	linkedin={data.settings.linkedin}
	phone={data.settings.phone ?? ''}
	address={data.settings.address ?? ''}
	facebook={data.settings.facebook ?? ''}
/>
