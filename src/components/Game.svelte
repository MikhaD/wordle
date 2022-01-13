<script lang="ts">
	import { fade } from "svelte/transition";
	import Header from "./Header.svelte";
	import Board from "./Board.svelte";
	import Keyboard from "./Keyboard.svelte";
	import Tutorial from "./Tutorial.svelte";
	import Definition from "./definition.svelte";
	import Modal from "./modal.svelte";
	import { value, game } from "../stores";
	import { onMount, setContext } from "svelte";
	import Settings from "./Settings.svelte";

	export let words: Words;
	export let word: string;
	words = {
		...words,
		contains: (word: string) => {
			return words.words.includes(word) || words.valid.includes(word);
		},
	};
	setContext("words", words);
	setContext("word", {
		value: word,
		getState: (char: string, index: number): LetterState => {
			if (word.charAt(index) === char) return "correct";
			if (word.includes(char)) return "present";
			return "absent";
		},
	});

	let stats = false;
	let tutorial = false;
	let settings = false;
	let keyboard: Keyboard;

	$: localStorage.setItem("gameState", JSON.stringify($game));

	function submitWord() {
		if ($value.length !== words.length) {
			console.log("Not enough letters");
		} else if (words.contains($value)) {
			console.log("Valid word!");
			$game.guesses += 1;
			keyboard.markLetters($value);
			if ($value === word) {
				win();
			}
			value.reset();
		} else {
			console.log("Not in word list");
		}
	}

	async function win() {
		console.log(`You win! ${$game.guesses}/${$game.board.length}`);
		$game.state = "won";
		stats = true;
	}

	onMount(() => {
		for (let i = 0; i < $game.guesses; ++i) {
			keyboard.markLetters($game.board[i]);
		}
	});
	console.log(word);
</script>

<Modal bind:visible={stats}>
	<Definition {word} />
</Modal>
<Modal bind:visible={tutorial}>
	<Tutorial />
</Modal>
<Modal fullscreen={true} bind:visible={settings}>
	<Settings />
</Modal>
<main transition:fade>
	<Header
		on:stats={() => (stats = true)}
		on:tutorial={() => (tutorial = true)}
		on:settings={() => (settings = true)}
	/>
	<Board bind:value={$game.board} />
	<Keyboard
		disabled={$game.state !== "active"}
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
		max-width: var(--game-width);
		margin: auto;
	}
</style>
