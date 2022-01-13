<script lang="ts">
	import { createEventDispatcher, getContext } from "svelte/internal";
	import { keys } from "../utils";
	import Key from "./Key.svelte";

	const word = getContext("word") as Word;

	export let value = "";
	export let disabled = false;
	export function markLetters(letters: string) {
		for (let i = 0; i < letters.length; ++i) {
			keysArr[letters[i]].$set({ state: word.getState(letters[i], i) });
		}
	}

	const keysArr: { [letter: string]: Key } = {};

	const dispatch = createEventDispatcher();

	function appendValue(char: string) {
		if (!disabled) {
			value += char;
		}
	}
	function backspaceValue() {
		if (!disabled) {
			value = value.slice(0, value.length - 1);
		}
	}
	function handleKeystroke(e: KeyboardEvent) {
		if (!disabled && !e.ctrlKey && !e.altKey) {
			if (e.key && /^[a-z]$/.test(e.key.toLowerCase())) {
				appendValue(e.key.toLowerCase());
			} else if (e.key === "Backspace") {
				backspaceValue();
			} else if (e.key === "Enter") {
				dispatch("submitWord");
			}
		}
	}
</script>

<svelte:body on:keydown={handleKeystroke} />

<div class="keyboard">
	<div class="row">
		{#each keys[0] as letter}
			<Key bind:this={keysArr[letter]} {letter} on:keystroke={(e) => appendValue(e.detail)} />
		{/each}
	</div>
	<div class="row">
		<div class="spacer" />
		{#each keys[1] as letter}
			<Key bind:this={keysArr[letter]} {letter} on:keystroke={(e) => appendValue(e.detail)} />
		{/each}
		<div class="spacer" />
	</div>
	<div class="row">
		<Key letter="ENTER" on:keystroke={() => !disabled && dispatch("submitWord")} />
		{#each keys[2] as letter}
			<Key bind:this={keysArr[letter]} {letter} on:keystroke={(e) => appendValue(e.detail)} />
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
