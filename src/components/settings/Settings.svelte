<script lang="ts">
	import { getContext, onMount } from "svelte";

	import { mode, settings } from "../../stores";
	import { getWordNumber, modeData } from "../../utils";
	import type { Toaster } from "../widgets";
	import Setting from "./Setting.svelte";

	export let validHard: boolean;

	const toaster = getContext<Toaster>("toaster");

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
		<div
			on:click={() => {
				if (!validHard) {
					toaster.pop("Game has already violated hard mode");
				}
			}}
		>
			<Setting type="switch" bind:value={$settings.hard[$mode]} disabled={!validHard}>
				<span slot="title">Hard Mode</span>
				<span slot="desc">Any revealed hints must be used in subsequent guesses</span>
			</Setting>
		</div>
		<Setting type="switch" bind:value={$settings.dark}>
			<span slot="title">Dark Theme</span>
		</Setting>
		<Setting type="switch" bind:value={$settings.colorblind}>
			<span slot="title">Color Blind Mode</span>
			<span slot="desc">High contrast colors</span>
		</Setting>
		<Setting type="dropdown" bind:value={$mode} options={modeData.modes.map((e) => e.name)}>
			<span slot="title">Game Mode</span>
			<span slot="desc">The game mode determines how often the word refreshes</span>
		</Setting>
		<div class="links">
			<a href="https://github.com/MikhaD/wordle" target="_blank">Leave a ⭐</a>
			<a href="https://github.com/MikhaD/wordle/issues" target="_blank">Report a Bug</a>
		</div>
	</div>
	<div class="footer">
		<a href="https://www.powerlanguage.co.uk/wordle/" target="_blank">Original Wordle</a>
		<div class="word">
			{modeData.modes[$mode].name} word #{getWordNumber($mode)}
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
	.links {
		font-size: 18px;
		padding: 16px 0;
		border-bottom: 1px solid var(--color-tone-4);
		color: var(--color-tone-2);
		display: flex;
		justify-content: space-between;
	}
	.footer {
		color: var(--color-tone-2);
		display: flex;
		justify-content: space-between;
	}
</style>
