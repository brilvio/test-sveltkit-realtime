import { supabase } from '$lib/db';
import { handleInserts } from '$lib/process';

//onMount(() => {

// this runs on the server only
console.log('Subscribing to queue changes...');
supabase
	.channel('queue')
	.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'queue' }, handleInserts)
	.subscribe();
//});
