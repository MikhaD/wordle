<script lang="ts">
	import { getContext } from "svelte";

	import { get } from "svelte/store";
	import { gameBoard } from "../../stores";
	import { getRowData } from "../../utils";

	import ContextMenu from "../widgets/ContextMenu.svelte";
	import Tile from "./Tile.svelte";
	export let guesses: number;
	export let num: number;
	export let value = "";
	export let state: LetterState[];
	export function shake() {
		animation = "shake";
	}
	export function bounce() {
		tiles.forEach((e) => e.bounce());
	}
	const words = getContext<Words>("words");
	let animation = "";
	let tiles: Tile[] = [];

	function context(e: MouseEvent) {
		if (guesses >= num) {
			x = e.clientX;
			y = e.clientY;
			showCtx = true;

			const match = getRowData(num, get(gameBoard));
			pAns = words.words.filter((w) => match(w)).length;
			pSols = pAns + words.valid.filter((w) => match(w)).length;
		}
	}
	let showCtx = false;
	let pAns = 0;
	let pSols = 0;
	let x = 0;
	let y = 0;
</script>

{#if showCtx}
	<ContextMenu
		{pAns}
		{pSols}
		{x}
		{y}
		bind:visible={showCtx}
		word={guesses > num && num < 5 ? value : ""}
	/>
{/if}

<div
	class="board-row"
	on:contextmenu|preventDefault={context}
	on:animationend={() => (animation = "")}
	data-animation={animation}
	class:complete={guesses > num}
>
	{#each Array(5) as _, i}
		<Tile bind:this={tiles[i]} state={state[i]} value={value.charAt(i)} position={i} />
	{/each}
</div>

<style lang="scss">
	.board-row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 5px;
		&[data-animation="shake"] {
			animation: shake 0.6s;
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
