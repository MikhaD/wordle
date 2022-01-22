<script lang="ts">
	import Switch from "./Switch.svelte";
	import DropDown from "./DropDown.svelte";
	export let value: any;
	export let type: SettingType;
	export let options: (string | number)[] = [];
	export let disabled = false;
	const types = {
		switch: Switch,
		dropdown: DropDown,
	};
</script>

<div class="setting">
	<div>
		<div class="title"><slot name="title" /></div>
		<div class="desc"><slot name="desc" /></div>
	</div>
	<svelte:component this={types[type]} bind:value {options} {disabled} />
</div>

<style>
	.setting {
		/* border-bottom: 1px solid var(--border-primary); */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.title {
		font-size: var(--fs-medium);
		font-weight: 500;
	}
	.desc {
		font-size: var(--fs-tiny);
		color: var(--fg-secondary);
	}
</style>
