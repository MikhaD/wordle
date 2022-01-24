<script lang="ts">
	import { getContext, onMount } from "svelte";

	import { mode, settings } from "../../stores";
	import { modeData } from "../../utils";
	import { Tips, Toaster } from "../widgets";
	import Setting from "./Setting.svelte";

	export let validHard: boolean;
	export let visible: boolean;
	export let wordNumber: number;
	let tip = 0;

	$: if (visible) tip = Math.floor(10 * Math.random());

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
	<div class="settings-top">
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
		<Tips index={tip} />
	</div>
	<div class="footer">
		<a href="https://www.powerlanguage.co.uk/wordle/" target="_blank">Original Wordle</a>
		<div>
			<div>v1.1.1</div>
			<div
				class="word"
				on:contextmenu|preventDefault={() => {
					localStorage.clear();
					toaster.pop("localStorage cleared");
				}}
			>
				{modeData.modes[$mode].name} word #{wordNumber}
			</div>
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
		font-size: var(--fs-medium);
		border-bottom: 1px solid var(--border-primary);
		color: var(--fg-secondary);
		display: flex;
		justify-content: space-between;
	}
	.footer {
		color: var(--fg-secondary);
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		text-align: end;
	}
	:global(.settings-top > div) {
		padding: 16px 0;
		border-bottom: 1px solid var(--border-primary);
	}
</style>
