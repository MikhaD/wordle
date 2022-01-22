<script lang="ts">
	import Row from "./Row.svelte";

	export let value: string[];
	export let state: LetterState[][];
	export let guesses: number;
	export let icon: string;
	export function shake(row: number) {
		rows[row].shake();
	}
	export function bounce(row: number) {
		rows[row].bounce();
	}

	let rows: Row[] = [];
</script>

<div>
	{#each value as _, i}
		<Row num={i} {guesses} bind:this={rows[i]} bind:value={value[i]} state={state[i]} />
	{/each}
	{#if icon}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
			<path d={icon} stroke-width="14" />
		</svg>
	{/if}
</div>

<style>
	div {
		display: grid;
		grid-template-rows: repeat(6, 1fr);
		gap: 5.5px;
		max-height: 420px;
		flex-grow: 1;
		aspect-ratio: 5/6;
		padding: 10px;
		position: relative;
	}
	svg {
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 106%;
	}
	path {
		stroke: var(--bg-secondary);
	}
</style>
