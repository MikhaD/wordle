<script lang="ts">
	export let word: string;
	export let visible: boolean;
	const cache = new Map<string, Promise<DictionaryEntry>>();

	async function getWordData(word: string): Promise<DictionaryEntry> {
		if (!cache.has(word)) {
			const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
			if (data.ok) {
				cache.set(word, (await data.json())[0]);
			} else {
				throw new Error(`No definition found for ${word}.`);
			}
		}
		return cache.get(word);
	}
</script>

{#await getWordData(word)}
	<h4>Fetching definition</h4>
{:then data}
	<div class:visible class="def">
		<h2>{word}</h2>
		<em>{data.meanings[0].partOfSpeech}</em>
		<ol>
			{#if word !== data.word}
				<li>variant of {data.word}.</li>
			{/if}
			{#each data.meanings[0].definitions.slice(0, 4) as def}
				<li>{def.definition}</li>
			{/each}
		</ol>
	</div>
{:catch}
	<div>Word not found</div>
{/await}

<style>
	.def {
		display: none;
	}
	.def.visible {
		display: block;
	}
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
