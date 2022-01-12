<script lang="ts">
	import { word } from "../stores";
</script>

<svg on:click={() => console.log($word)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	<slot />
</svg>

<style>
	svg {
		cursor: pointer;
		width: 24px;
		margin: 1px 4px;
	}
	svg :global(path) {
		fill: var(--color-tone-3);
	}
</style>
