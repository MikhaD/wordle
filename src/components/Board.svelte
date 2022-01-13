<script lang="ts">
	import Row from "./Row.svelte";
	import { game, value as val } from "../stores";
	import { getContext } from "svelte";

	export let value: string[];
	const words = getContext("words") as Words;

	$: if ($game.guesses < value.length) value[$game.guesses] = $val;
</script>

<div>
	{#each value as _, i}
		<Row length={words.length} guess={i} bind:value={value[i]} />
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
