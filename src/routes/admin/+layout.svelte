<script lang="ts">
	import { page } from '$app/state';

	let { data, children } = $props();

	const isLoginPage = $derived(page.url.pathname === '/admin/login');

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: 'grid' },
		{ href: '/admin/projects', label: 'Projects', icon: 'film' },
		{ href: '/admin/contacts', label: 'Messages', icon: 'mail' },
		{ href: '/admin/content', label: 'Content', icon: 'edit' },
		{ href: '/admin/services', label: 'Services', icon: 'star' },
		{ href: '/admin/about', label: 'About', icon: 'user' },
		{ href: '/admin/settings', label: 'Settings', icon: 'settings' },
		{ href: '/admin/profile', label: 'Profile', icon: 'lock' }
	];

	function isActive(href: string) {
		if (href === '/admin') return page.url.pathname === '/admin';
		return page.url.pathname.startsWith(href);
	}
</script>

{#if isLoginPage}
	{@render children()}
{:else}
	<div class="flex h-screen bg-black overflow-hidden">
		<!-- Sidebar -->
		<aside class="w-52 shrink-0 flex flex-col border-r border-[#1a1a1a] bg-[#0a0a0a]">
			<div class="h-14 flex items-center px-5 border-b border-[#1a1a1a]">
				<a href="/" class="text-sm font-medium text-[#ededed] truncate">← Portfolio</a>
			</div>

			<nav class="flex-1 px-3 py-4 space-y-0.5">
				{#each navItems as item}
					<a
						href={item.href}
						class="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors {isActive(item.href)
							? 'bg-[#111] text-white'
							: 'text-[#888] hover:text-[#ededed] hover:bg-[#111]'}"
					>
						{#if item.icon === 'grid'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
						{:else if item.icon === 'film'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 7h5M17 17h5"/></svg>
						{:else if item.icon === 'mail'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
						{:else if item.icon === 'star'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
						{:else if item.icon === 'lock'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
						{:else if item.icon === 'edit'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
						{:else if item.icon === 'user'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
						{:else if item.icon === 'settings'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
						{/if}
						{item.label}
					</a>
				{/each}
			</nav>

			<!-- User + logout -->
			{#if data.user}
				<div class="border-t border-[#1a1a1a] p-3">
					<div class="px-3 py-2">
						<p class="text-xs text-[#555] truncate">{data.user.email}</p>
					</div>
					<form action="/admin/login?/logout" method="POST">
						<button type="submit" class="w-full text-left px-3 py-2 rounded-md text-sm text-[#555] hover:text-red-400 hover:bg-[#111] transition-colors">
							Sign out
						</button>
					</form>
				</div>
			{/if}
		</aside>

		<!-- Main content -->
		<div class="flex-1 flex flex-col overflow-hidden">
			<div class="flex-1 overflow-y-auto">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
