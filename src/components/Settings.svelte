<script lang="ts">
	import { onMount } from "svelte";

	import { settings } from "../stores";
	import Setting from "./Setting.svelte";

	let root: HTMLElement;
	onMount(() => {
		root = document.documentElement;
	});
	$: {
		if (root) {
			$settings.dark ? root.classList.remove("light") : root.classList.add("light");
			$settings.colorblind
				? root.classList.add("colorblind")
				: root.classList.remove("colorblind");
			localStorage.setItem("settings", JSON.stringify($settings));
		}
	}
</script>

<!-- not currently supported, see https://github.com/sveltejs/svelte/issues/3105 -->
<!-- <svelte:body class:light={!$settings.dark} class:colorblind={$settings.colorblind} /> -->

<h3>SETTINGS</h3>
<Setting bind:checked={$settings.hard}>
	<span slot="title">Hard Mode</span>
	<span slot="desc">Any revealed hints must be used in subsequent guesses</span>
</Setting>
<Setting bind:checked={$settings.dark}>
	<span slot="title">Dark Theme</span>
</Setting>
<Setting bind:checked={$settings.colorblind}>
	<span slot="title">Color Blind Mode</span>
	<span slot="desc">High contrast colors</span>
</Setting>

<style>
</style>
