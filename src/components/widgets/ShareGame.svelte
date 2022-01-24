<script lang="ts">
	import { getContext } from "svelte";
	import { GameMode } from "../../enums";
	import { mode } from "../../stores";
	import { modeData } from "../../utils";
	import GameIcon from "../GameIcon.svelte";
	import type Toaster from "./Toaster.svelte";

	export let wordNumber: number;

	const toaster: Toaster = getContext("toaster");

	function share() {
		toaster.pop("Copied");
		navigator.clipboard.writeText(`${window.location.href}/${wordNumber}`);
	}
</script>

<div on:click={share}>
	<GameIcon>
		<path
			d="M4.167 4.167c-1.381 1.381-1.381 3.619 0 5L6.5 11.5a1.18 1.18 0 0 1 0 1.667 1.18 1.18 0 0 1-1.667 0L2.5 10.833C.199 8.532.199 4.801 2.5 2.5s6.032-2.301 8.333 0l3.333 3.333c2.301 2.301 2.301 6.032 0 8.333a1.18 1.18 0 0 1-1.667 0 1.18 1.18 0 0 1 0-1.667c1.381-1.381 1.381-3.619 0-5L9.167 4.167c-1.381-1.381-3.619-1.381-5 0zm5.667 14c-2.301-2.301-2.301-6.032 0-8.333a1.18 1.18 0 0 1 1.667 0 1.18 1.18 0 0 1 0 1.667c-1.381 1.381-1.381 3.619 0 5l3.333 3.333c1.381 1.381 3.619 1.381 5 0s1.381-3.619 0-5L17.5 12.5a1.18 1.18 0 0 1 0-1.667 1.18 1.18 0 0 1 1.667 0l2.333 2.333c2.301 2.301 2.301 6.032 0 8.333s-6.032 2.301-8.333 0l-3.333-3.333z"
		/>
	</GameIcon>
	Copy link to this game ({modeData.modes[$mode].name} #{wordNumber})
</div>

<style>
	div {
		color: var(--fg-secondary);
		font-size: var(--fs-regular);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		cursor: pointer;
	}
</style>
