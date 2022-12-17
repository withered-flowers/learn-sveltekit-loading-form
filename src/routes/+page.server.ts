import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		// Simulating a slow request
		await new Promise((r) => setTimeout(r, 2000));

		const requestData = await request.formData();

		// This is used to simulate a secret message
		const secret = requestData.get('secret')?.toString() ?? '';
		const base64Secret = Buffer.from(secret).toString('base64');

		// Return value as ActionData
		return {
			success: true,
			secretMessage: `${base64Secret}`
		};
	}
};
