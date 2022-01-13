<script lang="ts">
	export let checked: boolean;
</script>

<div on:click={() => (checked = !checked)} class="switch" class:checked />

<style>
	div {
		width: 32px;
		height: 20px;
		border-radius: 10px;
		background-color: var(--color-tone-3);
		position: relative;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}
	.checked {
		background-color: var(--color-correct);
	}
	.checked::before {
		left: 12px;
	}
	div::before {
		content: "";
		position: absolute;
		width: 16px;
		aspect-ratio: 1;
		background-color: white;
		border-radius: 50%;
		margin: 2px;
		left: 0;
		transition: left 0.3s ease;
	}
</style>
