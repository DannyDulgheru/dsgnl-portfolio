<script lang="ts">
	let { url, title = 'Video' }: { url: string; title?: string } = $props();
</script>

<div class="aspect-video w-full rounded-lg overflow-hidden bg-[#0a0a0a] border border-[#1a1a1a]">
	<iframe
		src={url}
		{title}
		allow="autoplay; fullscreen; picture-in-picture"
		allowfullscreen
		class="w-full h-full"
		loading="lazy"
	></iframe>
</div>
