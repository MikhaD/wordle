<script lang="ts">
	import Switch from "./Switch.svelte";
	export let checked = false;
</script>

<div class="setting">
	<div>
		<div class="title"><slot name="title" /></div>
		<div class="desc"><slot name="desc" /></div>
	</div>
	<Switch bind:checked />
</div>

<style>
	.setting {
		border-bottom: 1px solid var(--color-tone-4);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 0;
	}
	.title {
		font-size: 18px;
		font-weight: 500;
	}
	.desc {
		font-size: 12px;
		color: var(--color-tone-2);
	}
</style>
