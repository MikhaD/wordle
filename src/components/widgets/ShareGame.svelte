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
	   <a href="./history/" target="_blank">Previous</a>
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
