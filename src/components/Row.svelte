<script lang="ts">
	import Tile from "./Tile.svelte";
	export let value = "";
	export let guess: number;
	export let length: number;
</script>

<div>
	{#each Array(length) as _, i}
		<Tile value={value.charAt(i)} />
	{/each}
</div>

<style>
	div {
		display: flex;
		gap: 5px;
	}
</style>
