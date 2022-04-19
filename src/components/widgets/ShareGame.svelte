<script lang="ts">
	import { getContext } from "svelte";
	import { GameMode } from "../../enums";
	import { mode } from "../../stores";
	import { modeData } from "../../utils";
	import GameIcon from "../GameIcon.svelte";
	import type Toaster from "./Toaster.svelte";

    export let word: string;

	const toaster: Toaster = getContext("toaster");

</script>

<h3>ANSWERS</h3>
<div class="buttoncontainer">
    <div class="button twitterbutton">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width=16>
        <path 
            fill="white"
            d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/>
        </svg>
	   <a href="https://twitter.com/rbrignall/status/1483940627335233545" target="_blank">Old</a>
    </div>
    <div class="button todaybutton" id="today" 
        on:click={() => {
            document.getElementById('today').innerHTML = word.toUpperCase();
            setTimeout(function() {document.getElementById('today').innerHTML = "Today";},2000);
        }}
    >
        Today
    </div>
</div>
<style>
    .buttoncontainer {
        display: grid; 
        grid-template-columns: 75px 75px;
        grid-gap: 10px;
        justify-content: center;
        width: 100%;
        padding-bottom: 15px;
    }
    .button {
        color: white;
		font-weight: 500;
		border-radius: 13px;
		height: 100%;
		display: flex;
        height: 40px;
		width: 75px;
        justify-content: center;
        align-items: center;
        text-align: center;
        vertical-align: middle;
		gap: 5px;
		cursor: pointer;
	}
    .button a {
        text-decoration: none;
    }
    @media (max-width: 500px) {
        .buttoncontainer {
            grid-template-columns: 70px 70px;
            grid-gap: 5px;
        }
        .button {
            width: 70px;
        }

    }
    .twitterbutton {
        background-color: #55acee;
    }
    .twitterbutton:active,
    .twitterbutton:hover {
        background-color: #2795e9;
    }
    .todaybutton {
		background: var(--color-correct);    
    }
    .todaybutton:hover {
		opacity: 0.9;
	}
</style>
