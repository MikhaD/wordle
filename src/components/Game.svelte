<script lang="ts">
	import { fade } from "svelte/transition";
	import Header from "./Header.svelte";
	import Board from "./Board.svelte";
	import Keyboard from "./Keyboard.svelte";
	import { keys } from "../utils";

	export let words: Words;
	export let word: string;
	export let chances: number;
	const wordLength = words.length;
	let guess = 0;

	let value: string;
	// Make sure word doesn't get longer than max number of characters
	$: if (value) value = value.slice(0, wordLength);
	$: console.info(value);

	const validKeys = keys.join("");

	function handleKeystroke(e: KeyboardEvent) {
		if (e.key && validKeys.includes(e.key.toLowerCase())) {
			value = value + e.key.toLowerCase();
		} else if (e.key === "Backspace") {
			if (value) value = value.slice(0, value.length - 1);
		} else if (e.key === "Enter") {
			submitWord();
		}
	}

	function submitWord() {
		console.log(words.words.includes(value), words.valid.includes(value));
		if (value.length !== words.length) {
			// "Not enough letters"
			console.log("Not enough letters");
		} else if (
			!words.words.includes(value) &&
			!words.valid.includes(value)
		) {
			// "Not in word list"
			console.log("Not in word list");
		} else {
			// word is valid
			console.log("Valid word!");
			guess = guess + 1;
			value = "";
		}
	}
</script>

<svelte:body on:keydown={handleKeystroke} />

<main transition:fade>
	<Header />
	<Board {chances} {guess} {value} {wordLength} />
	<Keyboard on:submitWord={submitWord} bind:value />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		min-height: 100vh;
		max-width: 500px;
		margin: auto;
	}
</style>
