<script lang="ts">
	import { guesses, word } from "../stores";

	import Tile from "./Tile.svelte";
	export let guess: number;
	export let value = "";
	export let length: number;
</script>

<div>
	{#each Array(length) as _, i}
		<Tile
			state={$guesses > guess ? word.getState(value.charAt(i), i) : "tbd"}
			value={value.charAt(i)}
		/>
	{/each}
</div>

<style>
	div {
		display: flex;
		gap: 5px;
	}
</style>
