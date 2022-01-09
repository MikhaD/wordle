<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let letter = "";

	const dispatch = createEventDispatcher();
</script>

<div
	on:click={(e) => dispatch("keystroke", letter)}
	class:big-btn={letter.length !== 1}
>
	{letter}<slot />
</div>

<style>
	div {
		font-size: 13px;
		font-weight: bold;
		text-transform: uppercase;
		border-radius: 4px;
		height: 58px;
		background-color: var(--key-bg);
		cursor: pointer;
		display: grid;
		place-items: center;
		flex: 1;
	}
	.big-btn {
		font-size: 12px;
		flex-grow: 1.5;
	}
</style>
