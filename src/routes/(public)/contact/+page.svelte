<script lang="ts">
import { enhance } from '$app/forms';
import { onMount } from 'svelte';
import { gsap } from '$lib/animations';

let { data, form } = $props();
let loading = $state(false);

let fields = $state({
name:    { focused: false, filled: false },
email:   { focused: false, filled: false },
budget:  { focused: false, filled: false },
message: { focused: false, filled: false }
});

let submitBtn: HTMLButtonElement = $state() as any;

onMount(() => {
const ctx = gsap.context(() => {
gsap.from('.contact-left-item', { y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.1 });
gsap.from('.form-row', { x: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.2 });
});
return () => ctx.revert();
});

$effect(() => {
if (form?.success) {
gsap.from('.success-check', { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(1.7)', delay: 0.1 });
gsap.from('.success-msg', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.4 });
}
});
</script>

<svelte:head>
<title>Contact — {data.settings.site_name}</title>
<meta name="description" content="Start your project with {data.settings.site_name} — creative & technology studio in Chisinau, Moldova." />
</svelte:head>

<div class="min-h-[calc(100vh-3.5rem)] flex flex-col lg:flex-row">

<!-- LEFT PANEL -->
<div class="lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:w-[45%] border-b-2 lg:border-b-0 lg:border-r-2 border-[#0d0d0d] flex flex-col bg-[#0d0d0d] text-[#f2ede4]">
<!-- Top label -->
<div class="border-b-2 border-[#3a3530] px-8 py-3">
<span class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">Get in Touch — {data.settings.site_name}</span>
</div>

<!-- Heading -->
<div class="flex-1 flex flex-col justify-between px-10 py-12">
<div>
<p class="contact-left-item text-[clamp(3.5rem,7vw,6rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#f2ede4]">Let's</p>
<p class="contact-left-item text-[clamp(3.5rem,7vw,6rem)] font-black uppercase leading-[0.85] tracking-tighter">
<span class="text-[#e63329]">Talk.</span>
</p>

<!-- Availability -->
<div class="contact-left-item mt-8 flex items-center gap-3">
<span class="w-2 h-2 rounded-full bg-[#50c878] animate-pulse"></span>
<span class="text-sm text-[#8c857c]">Available for new projects</span>
</div>

<!-- Contact methods -->
<div class="contact-left-item mt-8 flex flex-col gap-4 border-t-2 border-[#3a3530] pt-8">
{#if data.settings.phone}
<div class="flex items-center gap-4">
<span class="text-xs font-bold uppercase tracking-widest text-[#5a544e] w-20">Phone</span>
<a href="tel:{data.settings.phone}" class="text-sm text-[#8c857c] hover:text-[#e63329] transition-colors">
{data.settings.phone}
</a>
</div>
{/if}
{#if data.settings.email}
<div class="flex items-center gap-4">
<span class="text-xs font-bold uppercase tracking-widest text-[#5a544e] w-20">Email</span>
<a href="mailto:{data.settings.email}" class="text-sm text-[#8c857c] hover:text-[#e63329] transition-colors">
{data.settings.email}
</a>
</div>
{/if}
{#if data.settings.address}
<div class="flex items-start gap-4">
<span class="text-xs font-bold uppercase tracking-widest text-[#5a544e] w-20 mt-0.5">Address</span>
<span class="text-sm text-[#8c857c] leading-relaxed">{data.settings.address}</span>
</div>
{/if}
{#if data.settings.instagram}
<div class="flex items-center gap-4">
<span class="text-xs font-bold uppercase tracking-widest text-[#5a544e] w-20">Instagram</span>
<a href="{data.settings.instagram}" target="_blank" rel="noopener" class="text-sm text-[#8c857c] hover:text-[#e63329] transition-colors">
{data.settings.instagram}
</a>
</div>
{/if}
{#if data.settings.facebook}
<div class="flex items-center gap-4">
<span class="text-xs font-bold uppercase tracking-widest text-[#5a544e] w-20">Facebook</span>
<a href="{data.settings.facebook}" target="_blank" rel="noopener" class="text-sm text-[#8c857c] hover:text-[#e63329] transition-colors">facebook.com/dsgnl</a>
</div>
{/if}
{#if data.settings.vimeo}
<div class="flex items-center gap-4">
<span class="text-xs font-bold uppercase tracking-widest text-[#5a544e] w-20">Vimeo</span>
<a href="{data.settings.vimeo}" target="_blank" rel="noopener" class="text-sm text-[#8c857c] hover:text-[#e63329] transition-colors">
{data.settings.vimeo}
</a>
</div>
{/if}
</div>
</div>

<p class="contact-left-item text-xs text-[#5a544e] border-t-2 border-[#3a3530] pt-6">We usually respond within 24 hours</p>
</div>
</div>

<!-- RIGHT PANEL: Form -->
<div class="lg:w-[55%] bg-[#f2ede4]">
<!-- Top label -->
<div class="border-b-2 border-[#0d0d0d] px-8 py-3 bg-[#e8e2d8]">
<span class="text-[10px] font-bold uppercase tracking-widest text-[#8c857c]">New Project Inquiry</span>
</div>

<div class="px-10 py-12">
{#if form?.success}
<div class="py-20 text-center">
<div class="success-check w-16 h-16 mx-auto mb-8 text-[#e63329]">
<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3">
<circle cx="32" cy="32" r="28" stroke="#0d0d0d"/>
<path d="M20 33l9 9 16-18" stroke="#e63329" stroke-linecap="square" stroke-linejoin="miter"/>
</svg>
</div>
<div class="success-msg">
<h2 class="text-3xl font-black uppercase tracking-tight text-[#0d0d0d] mb-2">Message sent!</h2>
<p class="text-[#8c857c]">We'll reach back within 24 hours.</p>
</div>
</div>

{:else}
<form method="POST" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; update(); }; }} class="flex flex-col gap-0">
{#if form?.error}
<div class="mb-6 px-4 py-3 border-2 border-[#e63329] bg-[#fef2f2]">
<p class="text-xs font-bold text-[#e63329]">{form.error}</p>
</div>
{/if}

<!-- Name -->
<div class="form-row border-b-2 border-[#0d0d0d] relative">
<label for="name" class="absolute left-4 transition-all duration-200 pointer-events-none z-10 font-bold uppercase tracking-widest
{fields.name.focused || fields.name.filled ? 'top-3 text-[9px] text-[#8c857c]' : 'top-1/2 -translate-y-1/2 text-sm text-[#3a3530]'}">
Name *
</label>
<input id="name" name="name" type="text" required
class="w-full bg-transparent px-4 pt-7 pb-3 text-sm text-[#0d0d0d] focus:outline-none focus:bg-[#e8e2d8] transition-colors placeholder-transparent"
onfocus={() => fields.name.focused = true}
onblur={(e) => { fields.name.focused = false; fields.name.filled = !!e.currentTarget.value; }}
/>
</div>

<!-- Email -->
<div class="form-row border-b-2 border-[#0d0d0d] relative">
<label for="email" class="absolute left-4 transition-all duration-200 pointer-events-none z-10 font-bold uppercase tracking-widest
{fields.email.focused || fields.email.filled ? 'top-3 text-[9px] text-[#8c857c]' : 'top-1/2 -translate-y-1/2 text-sm text-[#3a3530]'}">
Email *
</label>
<input id="email" name="email" type="email" required
class="w-full bg-transparent px-4 pt-7 pb-3 text-sm text-[#0d0d0d] focus:outline-none focus:bg-[#e8e2d8] transition-colors placeholder-transparent"
onfocus={() => fields.email.focused = true}
onblur={(e) => { fields.email.focused = false; fields.email.filled = !!e.currentTarget.value; }}
/>
</div>

<!-- Budget -->
<div class="form-row border-b-2 border-[#0d0d0d]">
<label for="budget" class="block px-4 pt-3 text-[9px] font-bold uppercase tracking-widest text-[#8c857c]">Budget</label>
<div class="relative">
<select id="budget" name="budget"
class="w-full bg-transparent px-4 pb-3 text-sm text-[#0d0d0d] focus:outline-none focus:bg-[#e8e2d8] appearance-none transition-colors">
<option value="">Select a range</option>
<option value="under-5k">Under €1,000</option>
<option value="5k-15k">€1,000 – €5,000</option>
<option value="15k-30k">€5,000 – €15,000</option>
<option value="30k-plus">€15,000+</option>
</select>
<div class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8c857c" stroke-width="3">
<path d="M6 9l6 6 6-6"/>
</svg>
</div>
</div>
</div>

<!-- Message -->
<div class="form-row border-b-2 border-[#0d0d0d] relative">
<label for="message" class="absolute left-4 transition-all duration-200 pointer-events-none z-10 font-bold uppercase tracking-widest
{fields.message.focused || fields.message.filled ? 'top-3 text-[9px] text-[#8c857c]' : 'top-6 text-sm text-[#3a3530]'}">
Message *
</label>
<textarea id="message" name="message" rows="6" required
class="w-full bg-transparent px-4 pt-8 pb-3 text-sm text-[#0d0d0d] focus:outline-none focus:bg-[#e8e2d8] transition-colors resize-none placeholder-transparent"
onfocus={() => fields.message.focused = true}
onblur={(e) => { fields.message.focused = false; fields.message.filled = !!e.currentTarget.value; }}
></textarea>
</div>

<!-- Submit -->
<button bind:this={submitBtn} type="submit" disabled={loading}
class="form-row w-full py-6 bg-[#0d0d0d] text-[#f2ede4] text-sm font-black uppercase tracking-widest hover:bg-[#e63329] transition-colors disabled:opacity-50 flex items-center justify-center gap-3">
{loading ? 'Sending...' : 'Send Message →'}
</button>
</form>
{/if}
</div>
</div>
</div>
