<script lang="ts">
	export let value = "";
	export let state: LetterState;
	export let size = "62";
</script>

<div class="tile {state}" style="width:{size}px; height:{size}px">
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
	.tile div {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
		display: grid;
		place-items: center;
		transition: transform 0.8s ease-in-out;
	}
	.front {
		border: 2px solid var(--color-tone-4);
		background-color: var(--color-background);
	}
	.back {
		transform: rotateX(-180deg);
	}
	.tile:not(.tbd) .front {
		transform: rotateX(180deg);
	}
	.tile:not(.tbd) .back {
		transform: rotateX(0deg);
	}
	.tile.absent .back {
		background: var(--color-absent);
	}
	.tile.present .back {
		background: var(--color-present);
	}
	.tile.correct .back {
		background: var(--color-correct);
	}
</style>
