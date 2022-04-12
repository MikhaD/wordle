<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import type { GameMode } from "../../enums";
	import { ms as MS } from "../../enums";
	import { mode } from "../../stores";
	import { modeData, timeRemaining } from "../../utils";

	const dispatch = createEventDispatcher();

	let ms = 1000;

	let countDown: number;

	export function reset(m: GameMode) {
		clearInterval(countDown);
		ms = timeRemaining(modeData.modes[m]);
		if (ms < 0) dispatch("timeup");
		countDown = setInterval(() => {
			ms = timeRemaining(modeData.modes[m]);
			if (ms < 0) {
				clearInterval(countDown);
				dispatch("timeup");
			}
		}, MS.SECOND);
	}
	$: reset($mode);
</script>

<h3>Next wordle</h3>
<div class="container">
	{#if ms > 0}
		<div class="timer">
			{`${Math.floor(ms / MS.HOUR)}`.padStart(2, "0")}:{`${Math.floor(
				(ms % MS.HOUR) / MS.MINUTE
			)}`.padStart(2, "0")}:{`${Math.floor((ms % MS.MINUTE) / MS.SECOND)}`.padStart(2, "0")}
		</div>
	{:else}
		<div class="button" on:click={() => dispatch("reload")}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path
					d="M4.609 12c0-4.082 3.309-7.391 7.391-7.391a7.39 7.39 0 0 1 6.523 3.912l-1.653 1.567H22v-5.13l-1.572 1.659C18.652 3.841 15.542 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10c4.589 0 8.453-3.09 9.631-7.301l-2.512-.703c-.871 3.113-3.73 5.395-7.119 5.395-4.082 0-7.391-3.309-7.391-7.391z"
				/>
			</svg>
		</div>
	{/if}
</div>

<style>
	h3 {
		margin-bottom: 10px;
	}
	.container {
		height: 45px;
		min-width: 70%;
	}
	.timer {
		font-size: clamp(25px, 8vw, var(--fs-large));
		text-align: center;
	}
	.button {
		height: 80%;
		aspect-ratio: 1;
		padding: 4px;
		background: var(--color-correct);
		border-radius: 4px;
		cursor: pointer;
		margin: auto;
	}
	svg {
		fill: white;
		height: 100%;
	}
	.button:hover {
		opacity: 0.9;
	}
</style>
