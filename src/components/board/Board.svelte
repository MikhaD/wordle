<script lang="ts">
	import Row from "./Row.svelte";
	import { value as val } from "../../stores";
	import { getContext } from "svelte";

	export let value: string[];
	export let state: LetterState[][];
	export let guesses: number;
</script>

<div>
	{#each value as _, i}
		<Row num={i} {guesses} bind:value={value[i]} state={state[i]} />
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
