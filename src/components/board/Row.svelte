<script lang="ts">
	import Tile from "./Tile.svelte";
	export let guesses: number;
	export let num: number;
	export let value = "";
	export let state: LetterState[];
</script>

<div class:complete={guesses > num}>
	{#each Array(5) as _, i}
		<Tile state={state[i]} value={value.charAt(i)} position={i} />
	{/each}
</div>

<style>
	div {
		display: flex;
		gap: 5px;
	}
</style>
