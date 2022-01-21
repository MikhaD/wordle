<script lang="ts">
	export let value: number;
	export let options: (string | number)[];
	export let disabled = false;
</script>

<select bind:value {disabled}>
	{#each options as val, i}
		<option value={i}>{val}</option>
	{/each}
</select>

<style>
	select {
		border: solid 1px var(--color-tone-5);
		padding: 8px;
		min-width: 85px;
		border-radius: 4px;
		cursor: pointer;
		background-color: var(--color-tone-6);
		color: var(--color-tone-1);
	}
</style>
