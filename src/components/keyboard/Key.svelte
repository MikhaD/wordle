<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let letter: string;
	export let state: LetterState = "nil";

	const dispatch = createEventDispatcher();
</script>

<div class={state} class:big={letter.length !== 1} on:click={() => dispatch("keystroke", letter)}>
	{letter}<slot />
</div>

<style>
	div {
		font-size: calc(var(--fs-tiny) + 6px);
		font-weight: bold;
		text-transform: uppercase;
		border-radius: 6px;
		height: 58px;
        margin: 0px 4px 0px 0px;
		background: var(--key-bg);
		cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
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
