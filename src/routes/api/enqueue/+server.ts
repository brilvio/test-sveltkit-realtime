import type { RequestHandler } from './$types';

import { supabase } from '$lib/db';

export const POST: RequestHandler = async ({ request }) => {
	const { url } = await request.json();

	const queued = await supabase.from('queue').insert([{ url }]);
	console.log(queued);

	return new Response(JSON.stringify(queued), { status: 201 });
};
