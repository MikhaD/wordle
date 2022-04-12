<script lang="ts">
	import Definition from "./Definition.svelte";

	export let x = 0;
	export let y = 0;
	export let word = "";
	export let pAns: number;
	export let pSols: number;
	const width = parseInt(getComputedStyle(document.body).getPropertyValue("--game-width")) / 2;

	$: x = window.innerWidth - x < width ? window.innerWidth - width : x;
</script>

<div class="ctx-menu" style="top: {y}px; left: {x}px;">
	{#if word !== ""}
		<div>
			Considering all hints, this row had:
			<br /><br />
			{pAns} possible answer{pAns > 1 ? "s" : ""}
			<br />
			{pSols} valid guess{pSols > 1 ? "es" : ""}
		</div>
		<Definition {word} alternates={1} />
	{:else}
		<div>
			Considering all hints, there {pAns > 1 ? "are" : "is"}:
			<br /><br />
			{pAns} possible answer{pAns > 1 ? "s" : ""}
			<br />
			{pSols} valid guess{pSols > 1 ? "es" : ""}
		</div>
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
