<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';

	// This is reserved variable for form result, DO NOT CHANGE THE NAME !
	// To fetch the "result" from the +page.server.ts
	export let form: ActionData;
	let loading = false;

	// Documentation about SubmitFunction:
	// https://kit.svelte.dev/docs/form-actions#progressive-enhancement

	// Function to use loading state in the form
	const enchanceSubmitFunction: SubmitFunction = () => {
		loading = true;

		// update is a function which triggers the logic that would be triggered if this callback wasn't set
		// (if the form was submitted natively)
		return async ({ update }) => {
			update();
			loading = false;
		};
	};
</script>

<section class="main text-slate-700 text-center">
	<div class="mb-4">
		<h1 class="text-3xl">Welcome to project loader</h1>
		<h2 class="text-2xl">Simple project to learn how to use form loading</h2>
	</div>

	<!-- We will use:enchance to use the Progressive enhancement of the form -->
	<form
		class="py-4 my-10 bg-zinc-100 rounded flex flex-col items-center gap-4"
		method="POST"
		use:enhance={enchanceSubmitFunction}
	>
		<h1 class="text-base">Form that is used to POST a data</h1>
		<input
			type="password"
			class="p-2 rounded text-slate-700"
			name="secret"
			id="secret"
			placeholder="Secret Text"
		/>
		<button
			class="py-2 px-4 bg-sky-300 hover:bg-sky-600 text-slate-700 hover:text-slate-50 rounded-lg focus:outline-none disabled:opacity-25 disabled:hover:bg-sky-300 disabled:hover:text-slate-700 flex flex-col gap-2"
			disabled={loading}
			type="submit"
		>
			<span>Post Data</span>
		</button>

		{#if loading}
			<!-- Will render if loading is true (simulate simple loading) -->
			<!-- You can change this to use spinner or anything -->
			<p class="animate-pulse text-red-400">Loading...</p>
		{/if}

		<!-- See the return from +page.server.ts has object with success and secretMessage props -->
		<!-- We will use that props value here -->
		{#if form?.success}
			<div>
				<p>This is the secret encoded in base64:</p>
				<p><strong class="font-semibold animate-pulse">{form?.secretMessage}</strong></p>
			</div>
		{/if}
	</form>

	<div>
		<h3 class="text-xl">
			See this <a href="https://github.com" class="underline text-blue-500 hover:text-blue-700"
				>Github</a
			> for more info about the code
		</h3>
		<h3 class="text-xl">File to analyze:</h3>
		<ul class="text-xl">
			<li class="font-mono font-semibold text-sm">+page.server.ts</li>
			<li class="font-mono font-semibold text-sm">+page.svelte</li>
		</ul>
	</div>
</section>
