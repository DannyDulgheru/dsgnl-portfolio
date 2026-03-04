import type { PageServerLoad } from './$types';
import { getAllSettings, DEFAULT_SETTINGS } from '$lib/server/settings';

const DEFAULT_SERVICES = [
	{ n: '01', title: 'Animation & Video', description: 'We transform ideas into captivating 2D animations, seamlessly integrated into video projects. Professional video editing, animated graphics, icons, text effects, and dynamic visual elements for modern impact.', tags: '2D Animation,Motion Graphics,Video Editing,VFX,After Effects' },
	{ n: '02', title: 'Web Design & Prototypes', description: 'Attractive and functional web designs, UI/UX prototypes, and optimized websites for an intuitive experience. Full brandbooks including logos, fonts, and mockups for a cohesive visual identity.', tags: 'UI/UX Design,Figma,WordPress,Laravel,Brandbooks' },
	{ n: '03', title: 'Audio Production', description: 'We compose custom music and create sound effects that perfectly complement your multimedia projects — from advertisements and games to films.', tags: 'Sound Design,Original Music,Electronic,SFX,Mixing' },
	{ n: '04', title: 'IT Solutions', description: 'CRM, ERP, and CMS system configuration and installation. Website optimization, landing page development, and custom digital infrastructure to streamline your business.', tags: 'CRM / ERP,CMS Setup,SEO,Landing Pages,WordPress' },
	{ n: '05', title: 'AI Video & Animation', description: 'Explore the future of visual production through AI. We transform text and abstract concepts into high-fidelity video materials, digital talking avatars, and complex animations.', tags: 'AI Video,Digital Avatars,Automation,Gen AI' },
	{ n: '06', title: 'Custom Solutions', description: 'We adapt to your unique requirements, offering creative and technical solutions for any type of project or challenge — from concept to delivery.', tags: 'Strategy,Consulting,Custom Dev,Tailored' }
];

export const load: PageServerLoad = async ({ parent }) => {
	const { settings } = await parent();
	let services = DEFAULT_SERVICES;
	if (settings.services_json) {
		try { services = JSON.parse(settings.services_json); } catch {}
	}
	return { settings, services };
};

