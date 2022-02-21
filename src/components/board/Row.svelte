<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { COLS } from "../../utils";

	import Tile from "./Tile.svelte";
	export let guesses: number;
	export let num: number;
	export let value = "";
	export let evaluation: LetterState[];
    
	export function shake() {
		animation = "shake";
	}
	export function bounce() {
		tiles.forEach((e) => e.bounce());
	}
	const dispatch = createEventDispatcher();
	let animation = "";
	let tiles: Tile[] = [];
</script>

<div
	class="board-row"
	on:animationend={() => (animation = "")}
	data-animation={animation}
	class:complete={guesses > num}
>
	{#each Array(COLS) as _, i}
		<Tile bind:this={tiles[i]} state={evaluation[i]} value={value.charAt(i)} position={i+num} />
	{/each}
</div>

<style lang="scss">
	.board-row {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		grid-gap: 5px;
		font-size: 2.4rem;
        line-height: 2.4rem;
		&[data-animation="shake"] {
			animation: shake 0.6s;
		}
	}
    @media (max-height: 600px) {
        .board-row {
            font-size: 2em;
            line-height: 2em;
        }
    }
    @media (max-height: 450px) {
        .board-row {
            font-size: 1.5em;
            line-height: 1.5em;
        }
    }
    
    
    
    
	@keyframes shake {
		10%,
		90% {
			transform: translateX(-1px);
		}

		20%,
		80% {
			transform: translateX(2px);
		}

		30%,
		50%,
		70% {
			transform: translateX(-4px);
		}

		40%,
		60% {
			transform: translateX(4px);
		}
	}
</style>
