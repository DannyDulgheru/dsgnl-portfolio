import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { settings } = await parent();
	return { settings };
};
