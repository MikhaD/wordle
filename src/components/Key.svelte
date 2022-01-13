<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let letter = "";
	export let state: LetterState = "tbd";

	const dispatch = createEventDispatcher();
</script>

<div class={state} on:click={(e) => dispatch("keystroke", letter)} big-btn={letter.length !== 1}>
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
	[big-btn="true"] {
		font-size: 12px;
		flex-grow: 1.5;
	}
	.absent {
		background: var(--color-absent);
	}
	.present {
		background: var(--color-present);
	}
	.correct {
		background: var(--color-correct);
	}
</style>
