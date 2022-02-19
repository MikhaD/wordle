<script lang="ts">
	import { getContext } from "svelte";
	import { GameMode } from "../../enums";
	import { mode } from "../../stores";
	import { modeData } from "../../utils";
	import GameIcon from "../GameIcon.svelte";
	import type Toaster from "./Toaster.svelte";

	const toaster: Toaster = getContext("toaster");

</script>

<div>
	<a href="https://twitter.com/rbrignall/status/1483940627335233545" target="_blank">Past BYRDLEs explained here</a>
</div>

<div>
	<a href="https://www.buymeacoffee.com/rbrignall" target="_blank">Buy me a coffee!</a>
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
</style>
