<script lang="ts">
let { data } = $props();
const { stats, recent, contactCount, unreadCount, viewChart, totalViews, todayViews } = data;

const maxViews = Math.max(...viewChart.map(d => d.count), 1);
function dayLabel(dateStr: string) {
const d = new Date(dateStr + 'T00:00:00');
return d.toLocaleDateString('en', { weekday: 'short' });
}
</script>

<svelte:head><title>Dashboard — Admin</title></svelte:head>

<div class="p-8 max-w-5xl space-y-8">
<div>
<h1 class="text-xl font-medium text-[#ededed]">Dashboard</h1>
<p class="text-sm text-[#555] mt-1">Welcome back, {data.user?.email}</p>
</div>

<!-- Stats row -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
{#each [
{ label: 'Total Projects', value: stats.total, sub: `${stats.published} published` },
{ label: 'Drafts', value: stats.drafts, sub: `${stats.featured} featured` },
{ label: 'Messages', value: contactCount, sub: unreadCount > 0 ? `${unreadCount} unread` : 'all read', accent: unreadCount > 0 },
{ label: 'Views Today', value: todayViews, sub: `${totalViews} this week` }
] as stat}
<div class="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-4">
<p class="text-2xl font-light text-[#ededed]">{stat.value}</p>
<p class="text-xs text-[#555] mt-1">{stat.label}</p>
{#if stat.sub}
<p class="text-[10px] mt-1 {stat.accent ? 'text-amber-400' : 'text-[#444]'}">{stat.sub}</p>
{/if}
</div>
{/each}
</div>

<!-- Page views chart -->
<div class="border border-[#1a1a1a] rounded-xl bg-[#0a0a0a] p-6">
<div class="flex items-center justify-between mb-5">
<div>
<h2 class="text-sm font-medium text-[#ededed]">Page Views — Last 7 Days</h2>
<p class="text-xs text-[#555] mt-0.5">{totalViews} total views this week</p>
</div>
<a href="/admin/contacts" class="text-xs text-[#555] hover:text-[#888] transition-colors">
{unreadCount > 0 ? `${unreadCount} unread msg${unreadCount > 1 ? 's' : ''} →` : 'View messages →'}
</a>
</div>
<!-- Bar chart -->
<div class="flex items-end gap-2 h-28">
{#each viewChart as day}
<div class="flex-1 flex flex-col items-center gap-1.5">
<span class="text-[9px] text-[#444] font-mono">{day.count > 0 ? day.count : ''}</span>
<div class="w-full rounded-sm bg-[#1a1a1a] relative overflow-hidden" style="height: 72px;">
<div
class="absolute bottom-0 left-0 right-0 bg-[#50e3c2] rounded-sm transition-all"
style="height: {Math.round((day.count / maxViews) * 72)}px; opacity: {day.count > 0 ? 1 : 0.2};"
></div>
</div>
<span class="text-[9px] text-[#444]">{dayLabel(day.date)}</span>
</div>
{/each}
</div>
</div>

<!-- Recent projects -->
<div>
<div class="flex items-center justify-between mb-4">
<h2 class="text-sm font-medium text-[#ededed]">Recent Projects</h2>
<a href="/admin/projects/new" class="text-xs bg-white text-black px-3 py-1.5 rounded-md hover:bg-[#ededed] transition-colors font-medium">
+ New Project
</a>
</div>

{#if recent.length === 0}
<div class="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-12 text-center">
<p class="text-sm text-[#444] mb-4">No projects yet.</p>
<a href="/admin/projects/new" class="text-xs text-[#555] hover:text-[#888] transition-colors">Create your first project →</a>
</div>
{:else}
<div class="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] overflow-hidden">
{#each recent as project, i}
<div class="flex items-center gap-4 px-4 py-3 {i !== recent.length - 1 ? 'border-b border-[#1a1a1a]' : ''}">
<div class="w-10 h-8 rounded overflow-hidden bg-[#111] shrink-0">
{#if project.coverImageUrl}
<img src={project.coverImageUrl} alt="" class="w-full h-full object-cover" />
{/if}
</div>
<div class="flex-1 min-w-0">
<p class="text-sm text-[#ededed] truncate">{project.title}</p>
<p class="text-xs text-[#444]">{project.category ?? '—'}</p>
</div>
<span class="text-[10px] px-2 py-0.5 rounded-full {project.status === 'published' ? 'text-[#50e3c2] bg-[#50e3c2]/10 border border-[#50e3c2]/20' : 'text-[#555] bg-[#111] border border-[#1a1a1a]'}">
{project.status}
</span>
<a href="/admin/projects/{project.id}" class="text-xs text-[#555] hover:text-[#888] transition-colors">Edit</a>
</div>
{/each}
</div>
{/if}
</div>

<!-- Quick links -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
{#each [
{ href: '/admin/projects/new', label: 'New Project', icon: '+' },
{ href: '/admin/contacts', label: 'Messages', icon: '✉', badge: unreadCount },
{ href: '/admin/services', label: 'Edit Services', icon: '⚙' },
{ href: '/admin/profile', label: 'My Profile', icon: '👤' }
] as link}
<a href={link.href} class="border border-[#1a1a1a] rounded-lg bg-[#0a0a0a] p-4 hover:border-[#333] hover:bg-[#111] transition-colors flex items-center gap-3 relative">
<span class="text-lg">{link.icon}</span>
<span class="text-sm text-[#888] group-hover:text-[#ededed]">{link.label}</span>
{#if link.badge > 0}
<span class="absolute top-2 right-2 text-[10px] bg-amber-400 text-black px-1.5 py-0.5 rounded-full font-bold">{link.badge}</span>
{/if}
</a>
{/each}
</div>
</div>
