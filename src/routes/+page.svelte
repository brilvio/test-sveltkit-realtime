<script lang="ts">
	import { supabase } from '$lib/db';
	import { onMount } from 'svelte';

	async function addToQueue(event: Event) {
		processing = true;
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const url = formData.get('url') as string;
		const response = await fetch('/api/enqueue', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url })
		});
		if (response.ok) {
			form.reset();
		}
	}

	onMount(() => {
		supabase
			.channel('processed')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'processed' },
				handleProcessed
			)
			.subscribe();
	});

	function handleProcessed(payload: any) {
		event_received = JSON.stringify(payload);
	}

	let processing = false;
	let event_received = null;
</script>

<h1>Add url to queue</h1>

<form on:submit|preventDefault={addToQueue} method="POST">
	<input type="text" name="url" placeholder="URL" />
	<button type="submit">Add</button>
	{#if processing}
		<p>Adding...</p>
	{/if}

	{#if event_received}
		<pre>Event received: {event_received}</pre>
	{/if}
</form>
