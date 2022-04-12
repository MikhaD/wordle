<script lang="ts">
	import type Toaster from "./Toaster.svelte";

	import { mode } from "../../stores";
	import { failed, modeData } from "../../utils";
	import { getContext } from "svelte";

	export let state: GameState;
	const toaster = getContext<Toaster>("toaster");

	$: stats = `${modeData.modes[$mode].name} Wordle+ #${state.wordNumber} ${
		failed(state) ? "X" : state.guesses
	}/${state.board.words.length}\n\n    ${state.board.state
		.slice(0, state.guesses)
		.map((r) => r.join(""))
		.join("\n    ")}\nmikhad.github.io/wordle`;
</script>

<div
	on:click={() => {
		navigator.clipboard.writeText(stats);
		toaster.pop("Copied");
	}}
>
	share
	<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
		<path
			fill="white"
			d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
		/>
	</svg>
</div>

<style lang="scss">
	div {
		color: #fff;
		font-size: var(--fs-medium);
		text-transform: uppercase;
		font-weight: bold;
		background: var(--color-correct);
		border-radius: 4px;
		height: 52px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		width: 80%;
		cursor: pointer;
		&:hover {
			opacity: 0.9;
		}
	}
</style>
