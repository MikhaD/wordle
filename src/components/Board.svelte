<script lang="ts">
	import Row from "./Row.svelte";

	export let wordLength: number;
	export let chances: number;
	export let guess = 0;
	export let value = "";

	let rows: RowData[] = [];
	for (let i = 0; i < chances; ++i) {
		rows.push({ length: wordLength, value, guess: i });
	}

	$: {
		if (guess < chances) rows[guess].value = value;
	}
</script>

<div>
	{#each rows as row (row.guess)}
		<Row {...row} />
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
