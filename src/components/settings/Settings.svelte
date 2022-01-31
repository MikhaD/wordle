<script lang="ts">
	import { getContext, onMount } from "svelte";

	import { mode, darkTheme, fancyFont, colorBlindTheme, hardMode } from "../../stores";
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
		root = document.body;//documentElement;
	});
	$: {
		if (root) {
			$darkTheme ? root.classList.remove("light") : root.classList.add("light");
			$colorBlindTheme
				? root.classList.add("colorblind")
				: root.classList.remove("colorblind");
            $fancyFont ? root.classList.add("fancyfont") : root.classList.remove("fancyfont");
            localStorage.setItem("darkTheme",$darkTheme)
            localStorage.setItem("colorBlindTheme",$colorBlindTheme)
            localStorage.setItem("fancyFont",$fancyFont)
            // Old storage (to be removed):
            //localStorage.setItem("settings", JSON.stringify($settings));
		}
	}
</script>

<!-- not currently supported, see https://github.com/sveltejs/svelte/issues/3105 -->
<!-- <svelte:body class:light={!$darkTheme} class:colorblind={$colorBlindTheme} class:fancyfont={$fancyFont} /> -->
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
			<Setting type="switch" bind:value={$hardMode} disabled={!validHard}>
				<span slot="title">Hard Mode</span>
				<span slot="desc">Any revealed hints must be used in subsequent guesses</span>
			</Setting>
		</div>
		<Setting type="switch" bind:value={$darkTheme}>
			<span slot="title">Dark Theme</span>
		</Setting>
		<Setting type="switch" bind:value={$colorBlindTheme}>
			<span slot="title">Color Blind Mode</span>
			<span slot="desc">High contrast colors</span>
		</Setting>
		<Setting type="switch" bind:value={$fancyFont}>
			<span slot="title">Fancy font mode</span>
			<span slot="desc">For the full choral experience</span>
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
