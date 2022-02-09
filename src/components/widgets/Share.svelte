<script lang="ts">
	import type Toaster from "./Toaster.svelte";

	import { mode } from "../../stores";
	import { modeData, ROWS } from "../../utils";
	import { getContext } from "svelte";

	export let state: GameState;
	const toaster = getContext<Toaster>("toaster");


	$: stats = `Byrdle ${state.wordNumber+1} ${
		state.guesses <= ROWS ? state.guesses : "X"
	}/${state.boardState.length}\n\n${state.evaluations
		.slice(0, state.guesses)
		.map((r) => r.map((l) => l === "absent" ? "⚪" : (l === "correct" ? "🟢" : "🟡")).join(""))
		.join("\n")}\n`;
</script>
<h3>share</h3>
<div class="sharecontainer">
<div class="copybutton"
	on:click={() => {
        if (false) { //navigator.share||navigator.canShare) {
            navigator.share({
                text: stats
            })
            .catch(console.error);
        } else {
            navigator.clipboard.writeText(stats.concat("https://www.byrdle.net"));
		    toaster.pop("Copied to clipboard");
        }
	}}
>

	<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16">
		<path
			fill="white"
			d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
		/>
	</svg>
    Copy
</div>
<div>
    <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="{stats}" data-url="https://www.byrdle.net">T</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>
</div>
<style>
    h3 {
		margin-bottom: 10px;
	}
    .sharecontainer {
        display: flex; 
        width: 100%;
        height: 45px;
        justify-content: space-around;
    }
	.copybutton {
/*		font-size: var(--fs-medium);
		text-transform: uppercase;*/
        color: white;
		font-weight: 500;
		background: var(--color-correct);
		border-radius: 13px;
		height: 28px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		width: 81px;
		cursor: pointer;
	}
    @media (max-width: 500px) {
        .sharecontainer {
            height: 60px;
            flex-direction: column;
            place-items: center;
            gap: 4px;
        }

    }
	div:hover {
		opacity: 0.9;
	}
</style>
