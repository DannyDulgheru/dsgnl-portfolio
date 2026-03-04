<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<!-- CSS-only page-in overlay -->
<div class="page-preloader" aria-hidden="true"></div>

{@render children()}

