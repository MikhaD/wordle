<script lang="ts">
	import { getContext } from "svelte";
	import { GameMode } from "../../enums";
	import { mode } from "../../stores";
	import { modeData } from "../../utils";
	import GameIcon from "../GameIcon.svelte";
	import type Toaster from "./Toaster.svelte";

	const toaster: Toaster = getContext("toaster");

</script>

<h3>Support me</h3>
<div>
<a href="https://www.buymeacoffee.com/rbrignall" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" class="coffee" ></a>

</div>
<style>
	div {
		color: var(--fg-secondary);
		font-size: var(--fs-regular);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px 0px;
	}
    .coffee {
        height: 40px !important;
        width: 144px !important; 
        margin: 5px;
    }
</style>
