<script lang="ts">
	import { enhance } from '$app/forms';
	let { data } = $props();
	let expanded = $state<string | null>(null);
</script>

<svelte:head><title>Messages — Admin</title></svelte:head>

<div class="p-8 max-w-4xl">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-xl font-medium text-[#ededed]">Contact Messages</h1>
			<p class="text-sm text-[#555] mt-1">{data.messages.length} total · {data.messages.filter(m => !m.read).length} unread</p>
		</div>
	</div>

	{#if data.messages.length === 0}
		<div class="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-16 text-center">
			<p class="text-sm text-[#444]">No messages yet. They'll appear here when someone submits the contact form.</p>
		</div>
	{:else}
		<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] overflow-hidden divide-y divide-[#1a1a1a]">
			{#each data.messages as msg}
				<div class="group {msg.read ? '' : 'bg-[#0d1a0d]'}">
					<!-- Header row -->
					<button
						type="button"
						class="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-[#111] transition-colors"
						onclick={() => { expanded = expanded === msg.id ? null : msg.id; }}
					>
						{#if !msg.read}
							<div class="w-1.5 h-1.5 rounded-full bg-[#50e3c2] shrink-0"></div>
						{:else}
							<div class="w-1.5 h-1.5 rounded-full bg-transparent shrink-0"></div>
						{/if}
						<div class="flex-1 min-w-0">
							<div class="flex items-center gap-3">
								<span class="text-sm font-medium text-[#ededed] truncate">{msg.name}</span>
								<span class="text-xs text-[#555] truncate">{msg.email}</span>
								{#if msg.budget}
									<span class="text-[10px] px-2 py-0.5 bg-[#1a1a1a] text-[#666] rounded-full hidden sm:inline">{msg.budget}</span>
								{/if}
							</div>
							<p class="text-xs text-[#444] mt-0.5 truncate">{msg.message}</p>
						</div>
						<span class="text-[10px] text-[#444] shrink-0">{new Date(msg.createdAt + (msg.createdAt.includes('Z') ? '' : 'Z')).toLocaleDateString()}</span>
						<svg class="w-3.5 h-3.5 text-[#444] shrink-0 transition-transform {expanded === msg.id ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
					</button>

					<!-- Expanded message -->
					{#if expanded === msg.id}
						<div class="px-5 pb-5 border-t border-[#1a1a1a]">
							<div class="mt-4 space-y-3">
								<div class="grid grid-cols-2 gap-3 text-xs">
									<div><span class="text-[#555] uppercase tracking-wider">From</span><p class="text-[#ededed] mt-0.5">{msg.name} &lt;{msg.email}&gt;</p></div>
									<div><span class="text-[#555] uppercase tracking-wider">Budget</span><p class="text-[#ededed] mt-0.5">{msg.budget || '—'}</p></div>
									<div class="col-span-2"><span class="text-[#555] uppercase tracking-wider">Received</span><p class="text-[#ededed] mt-0.5">{msg.createdAt}</p></div>
								</div>
								<div>
									<span class="text-[11px] text-[#555] uppercase tracking-wider">Message</span>
									<p class="mt-2 text-sm text-[#aaa] leading-relaxed whitespace-pre-wrap bg-[#111] rounded-lg p-4">{msg.message}</p>
								</div>
								<div class="flex gap-2 pt-2">
									<a href="mailto:{msg.email}?subject=Re: Your inquiry" class="px-3 py-1.5 text-xs bg-white text-black rounded-md hover:bg-[#ededed] transition-colors font-medium">
										Reply via Email
									</a>
									<form method="POST" use:enhance action="?/{msg.read ? 'markUnread' : 'markRead'}">
										<input type="hidden" name="id" value={msg.id} />
										<button type="submit" class="px-3 py-1.5 text-xs border border-[#1a1a1a] text-[#888] rounded-md hover:border-[#333] hover:text-[#ededed] transition-colors">
											Mark as {msg.read ? 'Unread' : 'Read'}
										</button>
									</form>
									<form method="POST" use:enhance action="?/delete" class="ml-auto">
										<input type="hidden" name="id" value={msg.id} />
										<button type="submit" class="px-3 py-1.5 text-xs border border-[#2a1a1a] text-[#e63329] rounded-md hover:bg-[#e63329]/10 transition-colors">
											Delete
										</button>
									</form>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
