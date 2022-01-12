<script lang="ts">
	import { fade } from "svelte/transition";
	import Header from "./Header.svelte";
	import Board from "./Board.svelte";
	import Keyboard from "./Keyboard.svelte";
	import { words as wordList, word as wordToGuess, value, guesses, gameState } from "../stores";

	export let words: Words;
	export let word: string;
	export let chances: number;
	$wordList = words;
	$wordToGuess = word;
	let keyboard: Keyboard;

	function handleKeystroke(e: KeyboardEvent) {
		if ($gameState === "active") {
			if (e.key && /^[a-z]$/.test(e.key.toLowerCase())) {
				value.append(e.key);
			} else if (e.key === "Backspace") {
				value.backspace();
			} else if (e.key === "Enter") {
				submitWord();
			}
		}
	}

	function submitWord() {
		if ($value.length !== $wordList.length) {
			console.log("Not enough letters");
		} else if (wordList.contains($value)) {
			console.log("Valid word!");
			guesses.increment();
			keyboard.markLetters($value);
			if ($value === $wordToGuess) {
				console.log(`You win! ${$guesses}/${chances}`);
				$gameState = "won";
			}
			value.reset();
		} else {
			console.log("Not in word list");
		}
	}
</script>

<svelte:body on:keydown={handleKeystroke} />

<main transition:fade>
	<Header />
	<Board {chances} />
	<Keyboard
		disabled={$gameState === "active"}
		bind:this={keyboard}
		on:submitWord={submitWord}
		bind:value={$value}
	/>
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
