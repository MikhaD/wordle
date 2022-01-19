<script lang="ts">
	import { onDestroy } from "svelte";

	import { word } from "../../stores";

	import { DELAY_INCREMENT } from "../../utils";

	export let value = "";
	export let state: LetterState;
	export let size = "62";
	export let position = 0;
	let s: string;

	// ensure all animations play
	const unsub = word.subscribe(() => {
		s = "🔳";
		setTimeout(() => (s = ""), 10);
	});
	onDestroy(unsub);
</script>

<div
	class="tile {state} {s}"
	style="width:{size}px; height:{size}px; transition-delay: {position * DELAY_INCREMENT}s"
>
	<div class="front">{value}</div>
	<div class="back">{value}</div>
</div>

<style>
	.tile {
		font-size: 2rem;
		font-weight: bold;
		text-transform: uppercase;
		position: relative;
		transform-style: preserve-3d;
	}
	.back,
	.front {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		display: grid;
		place-items: center;
	}
	.front {
		border: 2px solid var(--color-tone-4);
		transform: rotateX(0deg);
	}
	.back {
		background: var(--color-absent);
		transform: rotateX(180deg);
	}
	.🟩 .back {
		background: var(--color-correct);
	}
	.🟨 .back {
		background: var(--color-present);
	}
	:global(.complete) .tile:not(.🔳) .front {
		transition: transform 0.8s ease-in-out;
		transition-delay: inherit !important;
		transform: rotateX(180deg);
	}
	:global(.complete) .tile:not(.🔳) .back {
		transition: transform 0.8s ease-in-out;
		transition-delay: inherit !important;
		transform: rotateX(0deg);
	}
</style>
