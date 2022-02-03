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
	Don't get it? Read this&nbsp;<a href="https://twitter.com/rbrignall/status/1483940627335233545" target="_blank">Twitter thread</a>.
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
