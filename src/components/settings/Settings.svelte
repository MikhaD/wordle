<script lang="ts">
	import { getContext, onMount } from "svelte";

	import { mode, darkTheme, fancyFont, colorBlindTheme, hardMode, showHistMode } from "../../stores";
	import { modeData } from "../../utils";
	import { Toaster } from "../widgets";
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
            localStorage.setItem("showHistMode",$showHistMode)
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
		<Setting type="switch" bind:value={$showHistMode}>
			<span slot="title">Show historical mode</span>
			<span slot="desc">Turn off to hide the clock icon</span>
		</Setting>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
			<div style="font-size: var(--fs-medium); font-weight: 500;">
                Clear all game data
            </div>
			<div style="font-size: var(--fs-tiny); color: var(--fg-secondary);">Resets all data, including game statistics</div>   
            </div>
        <div class="warningbutton"><span 
            on:click={() => {
                if (confirm("This will delete everything and cannot be undone. Are you sure?")) {
                    localStorage.clear();
                    toaster.pop("Data deleted! Reloading...");
                    setTimeout(() => (location.reload()), 3000);
                }
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
            </svg>
            Delete
        </span></div>
    </div>
        <div class="links">
			Feedback
			<a href="https://twitter.com/intent/tweet?screen_name=rbrignall" target="_blank">Twitter</a>
		</div>
        <h3 style="margin-top: 10px;">Credits</h3>
        <div>
            <p>This game is inspired by <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank">Wordle</a>, and is an implementation of an idea of <a href="https://twitter.com/QuireMemes">QuireMemes</a>.</p>
            <p>The <a href="https://github.com/rbrignall/open-byrdle">code</a> is open source, written with Svelte in Typescript by <a href="https://github.com/rbrignall" target="_blank">rbrignall</a> on a base by <a href="https://github.com/MikhaD" target="_blank">MikhaD</a>.</p>
        </div>
        
        <div>
	       Byrdle is free to play and ad-free, but you can <a href="https://www.buymeacoffee.com/rbrignall" target="_blank">buy me a coffee</a>!
        </div>
	</div>
    <div class="footer">
        <div>Version: Byrd 5.4.0</div>
        <div class="word">
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
    .links a:link{
        font-weight: 400;
    }
	.footer {
		color: var(--fg-secondary);
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		text-align: end;
        width: 100%;
        padding: 16px 0px;
	}
    .settings-top {
        padding: 0px 0px 30px 0px;
    }
	:global(.settings-top > div) {
		padding: 16px 0;
		border-bottom: 1px solid var(--border-primary);
	}
    .warningbutton {
        color: var(--fg-primary);
        cursor: pointer; 
        border: 1px solid var(--fg-primary); 
        border-radius: 3px; 
        padding: 3px; 
        font-size: var(--fs-medium);
        font-weight: 400;
    }
    .warningbutton:hover {
        color: var(--bg-primary);
        background-color: var(--fg-primary);
    }
</style>
