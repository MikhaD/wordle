<script lang="ts">
	import { onMount } from "svelte";
	import type { GameMode } from "../../enums";

	import { settings } from "../../stores";
	import { modeData } from "../../utils";
	import Setting from "./Setting.svelte";

	export let mode: GameMode;

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
<div class="outer">
	<div>
		<h3>settings</h3>
		<Setting type="switch" bind:value={$settings.hard}>
			<span slot="title">Hard Mode</span>
			<span slot="desc">Any revealed hints must be used in subsequent guesses</span>
		</Setting>
		<Setting type="switch" bind:value={$settings.dark}>
			<span slot="title">Dark Theme</span>
		</Setting>
		<Setting type="switch" bind:value={$settings.colorblind}>
			<span slot="title">Color Blind Mode</span>
			<span slot="desc">High contrast colors</span>
		</Setting>
		<Setting type="dropdown" bind:value={mode} options={modeData.modes.map((e) => e.name)}>
			<span slot="title">Game Mode</span>
			<span slot="desc">The game mode determines how often the word refreshes</span>
		</Setting>
	</div>
	<div class="footer">
		<a href="https://www.powerlanguage.co.uk/wordle/" target="_blank">Original Wordle</a>
		<div class="word">
			{modeData.modes[mode].name} word #{(modeData.modes[mode].seed -
				modeData.modes[mode].start) /
				modeData.modes[mode].unit +
				1}
		</div>
	</div>
</div>

<style>
	.outer {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.footer {
		color: var(--color-tone-2);
		display: flex;
		justify-content: space-between;
	}
	.word::first-letter {
		text-transform: uppercase;
	}
</style>
