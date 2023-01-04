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
