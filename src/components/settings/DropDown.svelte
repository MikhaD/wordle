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
		border: solid 1px var(--border-secondary);
		padding: 8px;
		min-width: 85px;
		border-radius: 4px;
		cursor: pointer;
		background: var(--bg-secondary);
		color: var(--fg-primary);
	}
</style>
