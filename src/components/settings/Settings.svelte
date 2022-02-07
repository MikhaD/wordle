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
				<span slot="desc">Revealed hints must be used in subsequent guesses</span>
			</Setting>
		</div>
		<Setting type="switch" bind:value={$darkTheme}>
			<span slot="title">Dark Theme</span>
		</Setting>
		<Setting type="switch" bind:value={$colorBlindTheme}>
			<span slot="title">Colour Blind Mode</span>
			<span slot="desc">High contrast colours</span>
		</Setting>
		<Setting type="switch" bind:value={$fancyFont}>
			<span slot="title">Fancy font mode</span>
			<span slot="desc">For the full choral experience</span>
		</Setting>
        <div style="text-align: center; color: red; cursor: pointer;"><span 
            on:click={() => {
                if (confirm("This will delete all statistics. Are you sure?")) {
                    localStorage.clear();
                    toaster.pop("Deleted! Refreshing page...");
                    setTimeout(() => (location.reload()), 3000);
                }
            }}
        >
            ** Click here to delete all game data **
        </span></div>
        <div class="links">
			Feedback
			<a href="https://twitter.com/intent/tweet?screen_name=rbrignall" target="_blank">Twitter</a>
		</div>
        <h3 style="margin-top: 10px;">Credits</h3>
        <div>
            <p>This game is inspired by <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank">Wordle</a>, and is an implementation of an idea of <a href="https://twitter.com/QuireMemes">QuireMemes</a>.</p>
            <p>Code is Open Source, written with Svelte, in Typescript by <a href="https://github.com/rbrignall" target="_blank">rbrignall</a> on a base by <a href="https://github.com/MikhaD" target="_blank">MikhaD</a>.</p>
        </div>
	</div>
    <div class="footer">
        <div>Version: Byrd 4</div>
        <div
            class="word"
                on:contextmenu|preventDefault={() => {
                    localStorage.clear();
				    toaster.pop("localStorage cleared");
                }}
        >
            Game #{wordNumber+1}
        </div>
    </div>
</div>

<style>
	.outer {
/*		height: 100%;
		display: flex;
		flex-direction: column;
        justify-content: space-between;*/
        position: relative;
    }
	.links {
		font-size: var(--fs-medium);
		font-weight: 500;
		border-bottom: 1px solid var(--border-primary);
		color: var(--fg-primary);
		display: flex;
		justify-content: space-between;
	}
	.footer {
		color: var(--fg-secondary);
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		text-align: end;
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 16px 0px;
	}
    .settings-top {
        padding: 0px 0px 60px 0px;
    }
	:global(.settings-top > div) {
		padding: 16px 0;
		border-bottom: 1px solid var(--border-primary);
	}
</style>
