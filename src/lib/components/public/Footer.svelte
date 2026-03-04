<script lang="ts">
	let { siteName = 'DSGNL', email = '', instagram = '', vimeo = '', linkedin = '', facebook = '', phone = '', address = '' } = $props();
</script>

<footer class="border-t-2 border-[#0d0d0d] mt-0 bg-[#0d0d0d] text-[#f2ede4]">
	<div class="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#3a3530]">
		<!-- Studio name + address -->
		<div class="px-8 py-10">
			<p class="text-xl font-black uppercase tracking-tight mb-2">{siteName}</p>
			<p class="text-xs text-[#8c857c] uppercase tracking-widest mb-4">Creative & Technology Studio</p>
			{#if address}
				<p class="text-xs text-[#5a544e] leading-relaxed">{address}</p>
			{/if}
			{#if phone}
				<a href="tel:{phone}" class="mt-2 inline-block text-xs text-[#5a544e] hover:text-[#e63329] transition-colors">{phone}</a>
			{/if}
		</div>

		<!-- Navigation -->
		<div class="px-8 py-10">
			<p class="text-[10px] text-[#8c857c] uppercase tracking-widest font-bold mb-4">Navigation</p>
			<div class="flex flex-col gap-2">
				{#each [['/', 'Home'], ['/services', 'Services'], ['/work', 'Projects'], ['/about', 'About'], ['/contact', 'Contact']] as [href, label]}
					<a {href} class="text-sm text-[#f2ede4] hover:text-[#e63329] transition-colors uppercase tracking-wide font-medium">{label}</a>
				{/each}
			</div>
		</div>

		<!-- Social + legal -->
		<div class="px-8 py-10 flex flex-col justify-between gap-6">
			<div>
				<p class="text-[10px] text-[#8c857c] uppercase tracking-widest font-bold mb-4">Connect</p>
				<div class="flex flex-col gap-2">
					{#if email}
						<a href="mailto:{email}" class="text-sm text-[#f2ede4] hover:text-[#e63329] transition-colors">↗ {email}</a>
					{/if}
					{#if facebook}
						<a href="{facebook}" target="_blank" rel="noopener" class="text-sm text-[#f2ede4] hover:text-[#e63329] transition-colors">↗ Facebook</a>
					{/if}
					{#if instagram}
						<a href="{instagram}" target="_blank" rel="noopener" class="text-sm text-[#f2ede4] hover:text-[#e63329] transition-colors">↗ Instagram</a>
					{/if}
					{#if vimeo}
						<a href="{vimeo}" target="_blank" rel="noopener" class="text-sm text-[#f2ede4] hover:text-[#e63329] transition-colors">↗ Vimeo</a>
					{/if}
					{#if linkedin}
						<a href="{linkedin}" target="_blank" rel="noopener" class="text-sm text-[#f2ede4] hover:text-[#e63329] transition-colors">↗ LinkedIn</a>
					{/if}
				</div>
			</div>
			<p class="text-xs text-[#8c857c]">© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
		</div>
	</div>
</footer>
