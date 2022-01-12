<script lang="ts">
	import Row from "./Row.svelte";
	import { guesses, value, words } from "../stores";

	export let chances: number;

	let rows: RowData[] = [];
	for (let i = 0; i < chances; ++i) {
		rows.push({ length: $words.length, value: $value, guess: i });
	}

	$: if ($guesses < chances) rows[$guesses].value = $value;
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
