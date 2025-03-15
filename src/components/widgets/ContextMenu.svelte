<script lang="ts">
	import Definition from "./Definition.svelte";

	export let x = 0;
	export let y = 0;
	export let word = "";
	export let pAns: number;
	export let pSols: number;
	export let pAnsWords: string[];
	const width = +getComputedStyle(document.body).getPropertyValue("--game-width") / 2;

	$: x = window.innerWidth - x < width ? window.innerWidth - width : x;
</script>

<div class="ctx-menu" style="top: {y}px; left: {x}px;">
	<div>
		Before guessing "{word}" there were
		<br /><br />
		{pAns} possible answer{pAns > 1 ? "s" : ""}
		<br />
		{#if void console.log(`${pAns} possible answers before guessing "${word}": ${pAnsWords}`)} "" {/if}
		{pSols} valid guess{pSols > 1 ? "es" : ""}
		<br />
	</div>
	{#if word !== ""}
		<Definition {word} alternates={1} />
	{/if}
</div>

<style lang="scss">
	.ctx-menu {
		position: fixed;
		z-index: 2;
		font-size: var(--fs-small);
		background-color: var(--bg-secondary);
		border: solid 1px var(--border-primary);
		border-radius: 4px;
		padding: 10px;
		width: calc(var(--game-width) / 2);

		& > :global(*) {
			border-bottom: 1px solid var(--border-primary);
			padding-bottom: 5px;
		}
		& > :global(*:last-child) {
			border-bottom: none;
			padding-bottom: unset;
			padding-top: 5px;
		}
	}
</style>
