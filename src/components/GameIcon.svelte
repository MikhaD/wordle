<script lang="ts">
	export let onClick = () => {};
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" on:click={onClick}>
	<slot />
</svg>

<style>
	svg {
		cursor: pointer;
		width: 24px;
	}
	svg :global(path) {
		fill: var(--color-tone-3);
	}
</style>
