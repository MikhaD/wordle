<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let letter: string;
	export let state: LetterState = "🔳";

	const dispatch = createEventDispatcher();
</script>

<div class={state} class:big={letter.length !== 1} on:click={() => dispatch("keystroke", letter)}>
	{letter}<slot />
</div>

<style>
	div {
		font-size: calc(var(--fs-tiny) + 1px);
		font-weight: bold;
		text-transform: uppercase;
		border-radius: 4px;
		height: 58px;
		background: var(--key-bg);
		cursor: pointer;
		display: grid;
		place-items: center;
		flex: 1;
		transition: background-color 0.3s ease-in-out;
	}
	:global(.guesses) div {
		transition-delay: 1s;
	}
	:global(.guesses .preventChange) div {
		transition-duration: 0.15s;
		transition-delay: 0s;
		background: var(--key-bg) !important;
	}
	.big {
		font-size: var(--fs-tiny);
		flex-grow: 1.5;
	}
	.⬛ {
		background: var(--color-absent);
	}
	.🟨 {
		background: var(--color-present);
	}
	.🟩 {
		background: var(--color-correct);
	}
</style>
