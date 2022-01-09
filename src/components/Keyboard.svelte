<script lang="ts">
	import { createEventDispatcher, each } from "svelte/internal";
	import { keys } from "../utils";
	import Key from "./Key.svelte";

	export let value = "";
	const dispatch = createEventDispatcher();

	function appendValue(e: CustomEvent) {
		value = value + e.detail;
	}
	function submitValue(e: CustomEvent) {
		dispatch("submitWord");
	}
	function backspaceValue(e: CustomEvent) {
		if (value.length) value = value.slice(0, value.length - 1);
	}
</script>

<div class="keyboard">
	<div class="row">
		{#each keys[0] as letter}
			<Key {letter} on:keystroke={appendValue} />
		{/each}
	</div>
	<div class="row">
		<div class="spacer" />
		{#each keys[1] as letter}
			<Key {letter} on:keystroke={appendValue} />
		{/each}
		<div class="spacer" />
	</div>
	<div class="row">
		<Key letter="ENTER" on:keystroke={submitValue} />
		{#each keys[2] as letter}
			<Key {letter} on:keystroke={appendValue} />
		{/each}
		<Key on:keystroke={backspaceValue}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path
					d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
				/>
			</svg>
		</Key>
	</div>
</div>

<style>
	.keyboard {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2px;
	}
	.row {
		width: 100%;
		display: flex;
		margin: 0 auto 8px;
		padding: 0 8px;
		gap: 6px;
	}
	.row:nth-of-type(2) {
		padding: 0 5px;
	}
	.spacer {
		flex: 0.5;
	}
	svg {
		fill: var(--color-tone-1);
		width: 24px;
	}
</style>
