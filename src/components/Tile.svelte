<script lang="ts">
	export let value = "";
	export let state: LetterState;
</script>

<div class={state}>
	{value}
</div>

<style>
	div {
		font-size: 2rem;
		font-weight: bold;
		text-transform: uppercase;
		width: 62px;
		aspect-ratio: 1;
		border: 2px solid var(--color-tone-4);
		display: grid;
		place-items: center;
	}
</style>
