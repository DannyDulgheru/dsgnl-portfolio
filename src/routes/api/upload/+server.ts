import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

// POST /api/upload
// Accepts multipart/form-data with a "file" field
// Uploads to Cloudinary if CLOUDINARY_URL is configured, otherwise saves locally
export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const formData = await request.formData();
	const file = formData.get('file');

	if (!file || !(file instanceof File)) {
		error(400, 'No file provided');
	}

	if (file.size > 20 * 1024 * 1024) {
		error(400, 'File too large (max 20MB)');
	}

	const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
	if (!allowedTypes.includes(file.type)) {
		error(400, 'Invalid file type. Allowed: jpeg, png, webp, gif, avif');
	}

	// Cloudinary upload if configured
	if (env.CLOUDINARY_URL) {
		const url = await uploadToCloudinary(file, env.CLOUDINARY_URL);
		return json({ url });
	}

	// Local dev: no persistent storage on Vercel
	// Return instructions to use an external URL instead
	error(501, 'File upload requires CLOUDINARY_URL to be configured. Use an external image URL in the URL field instead.');
};

async function uploadToCloudinary(file: File, cloudinaryUrl: string): Promise<string> {
	// Parse cloudinary://api_key:api_secret@cloud_name
	const match = cloudinaryUrl.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
	if (!match) throw new Error('Invalid CLOUDINARY_URL format');

	const [, apiKey, apiSecret, cloudName] = match;

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	// Build signed upload form
	const timestamp = Math.floor(Date.now() / 1000);
	const folder = 'portfolio';
	const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

	// SHA-1 HMAC signature
	const signature = await sha1Hex(paramsToSign + apiSecret);

	const form = new FormData();
	form.append('file', new Blob([buffer], { type: file.type }), file.name);
	form.append('api_key', apiKey);
	form.append('timestamp', String(timestamp));
	form.append('signature', signature);
	form.append('folder', folder);

	const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
		method: 'POST',
		body: form
	});

	if (!res.ok) {
		const err = await res.text();
		throw new Error(`Cloudinary upload failed: ${err}`);
	}

	const data = await res.json();
	return data.secure_url;
}

async function sha1Hex(input: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	const hashBuffer = await crypto.subtle.digest('SHA-1', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
