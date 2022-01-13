<script lang="ts">
	import { dataset_dev } from "svelte/internal";

	export let word: string;

	async function getWordData(word: string): Promise<DictionaryEntry> {
		const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
		if (data.ok) {
			return (await data.json())[0];
		} else {
			throw new Error(`No definition found for ${word}.`);
		}
	}
</script>

{#await getWordData(word)}
	<h4>Fetching definition</h4>
{:then data}
	<div class="def">
		<h2>{word}</h2>
		<em>{data.meanings[0].partOfSpeech}</em>
		<ol>
			{#if word !== data.word}
				<li>variant of {data.word}.</li>
			{/if}
			{#each data.meanings[0].definitions as def}
				<li>{def.definition}</li>
			{/each}
		</ol>
	</div>
{:catch}
	<div>Word not found</div>
{/await}

<style>
	h2 {
		display: inline-block;
		margin-right: 1rem;
		margin-bottom: 1rem;
	}
	ol {
		padding-left: 1.5rem;
	}
	li {
		margin-bottom: 0.5rem;
	}
	li::first-letter {
		text-transform: uppercase;
	}
	li::marker {
		color: var(--color-tone-2);
	}
</style>
