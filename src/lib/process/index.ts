import { supabase } from '$lib/db';

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handleInserts = async (payload) => {
	console.log('Change received!', payload);
	// Simulate processing time
	await sleep(5000);
	console.log('Change processed! Saving to database!');

	const processed = await supabase.from('processed').insert([{ queue_id: payload.new.id }]);
	console.log('Saved!', processed);
};
