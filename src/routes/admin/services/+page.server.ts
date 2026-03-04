import { getAllSettings, DEFAULT_SETTINGS, setSetting } from '$lib/server/settings';
import type { Actions, PageServerLoad } from './$types';

const DEFAULT_SERVICES = [
	{ n: '01', title: 'Animation & Video', description: '2D animations, professional video editing, and animated graphic elements for a dynamic modern impact.', tags: 'After Effects,Premiere Pro,Motion Graphics' },
	{ n: '02', title: 'Web Design & Prototypes', description: 'Attractive web designs, UI/UX prototypes, optimized websites, and complete brand identity packages.', tags: 'Figma,WordPress,Laravel' },
	{ n: '03', title: 'Audio Production', description: 'Custom music composition and sound effects tailored perfectly for multimedia projects — ads, games, or films.', tags: 'Sound Design,Music,Mixing' },
	{ n: '04', title: 'IT Solutions', description: 'CRM, ERP, and CMS configuration, website optimization, and landing page development for your business.', tags: 'CRM,ERP,CMS,SEO' },
	{ n: '05', title: 'AI Video & Animation', description: 'Next-generation visual production using AI — high-fidelity video, digital avatars, and complex animations at speed.', tags: 'AI Video,Digital Avatars,Automation' },
	{ n: '06', title: 'Custom Solutions', description: 'We adapt to your unique requirements, offering creative and technical solutions for any project or challenge.', tags: 'Consulting,Strategy,Custom Dev' }
];

export const load: PageServerLoad = async () => {
	const saved = await getAllSettings();
	let services = DEFAULT_SERVICES;
	if (saved.services_json) {
		try { services = JSON.parse(saved.services_json); } catch {}
	}
	return { services };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const services = [];
		for (let i = 0; i < 6; i++) {
			services.push({
				n: `0${i + 1}`,
				title: (data.get(`title_${i}`) as string) ?? '',
				description: (data.get(`description_${i}`) as string) ?? '',
				tags: (data.get(`tags_${i}`) as string) ?? ''
			});
		}
		await setSetting('services_json', JSON.stringify(services));
		return { success: true };
	}
};
