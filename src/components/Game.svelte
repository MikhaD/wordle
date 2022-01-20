<script lang="ts">
	import Header from "./Header.svelte";
	import { Board } from "./board";
	import Keyboard from "./keyboard";
	import Modal from "./Modal.svelte";
	import { getContext, onMount } from "svelte";
	import Settings from "./settings";
	import {
		Share,
		Seperator,
		Definition,
		Tutorial,
		Statistics,
		Distribution,
		Timer,
	} from "./widgets";
	import { contractNum, DELAY_INCREMENT, getState, modeData, checkHardMode } from "../utils";
	import { letterStates, settings, mode } from "../stores";
	import type { GameMode } from "../enums";

	const words = getContext<Words>("words");

	export let word: string;
	export let stats: Stats;
	export let game: GameState;

	// implement transition delay on keys
	const delay = DELAY_INCREMENT * 100 * game.board.words.length + 1000;

	let showTutorial = $settings.tutorial === 2;
	let showSettings = false;
	let showStats = false;
	let showRefresh = false;

	function submitWord() {
		if (game.board.words[game.guesses].length !== words.length) {
			console.log("Not enough letters");
		} else if (words.contains(game.board.words[game.guesses])) {
			if ($settings.hard && game.guesses > 0) {
				const hm = checkHardMode(game.board, game.guesses);
				if (hm.type === "🟩") {
					console.log(
						`${contractNum(hm.pos + 1)} letter must be ${hm.char.toUpperCase()}`
					);
					return;
				} else if (hm.type === "🟨") {
					console.log(`Guess must contain ${hm.char.toUpperCase()}`);
					return;
				}
			}
			console.log("Valid word!");
			for (let i = 0; i < word.length; ++i) {
				const char = game.board.words[game.guesses][i];
				const state = getState(word, i, char);
				game.board.state[game.guesses][i] = state;
				$letterStates[char] = state;
			}
			++game.guesses;
			if (game.board.words[game.guesses - 1] === word) return win();
			if (game.guesses === game.board.words.length) lose();
		} else {
			console.log("Not in word list");
		}
	}

	function win() {
		console.log(`You win! ${game.guesses}/${game.board.words.length}`);
		game.active = false;
		setTimeout(() => (showStats = true), delay);
		++stats.guesses[game.guesses];
		++stats.played;
		if ("streak" in stats) {
			stats.streak =
				modeData.modes[$mode].seed - stats.lastGame >= modeData.modes[$mode].unit
					? 1
					: stats.streak + 1;
			if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
		}
		stats.lastGame = modeData.modes[$mode].seed;
		localStorage.setItem(`stats-${$mode}`, JSON.stringify(stats));
	}

	function lose() {
		console.log(`You lose! The word was ${word}`);
		game.active = false;
		setTimeout(() => (showStats = true), delay);
		++stats.guesses.fail;
		++stats.played;
		if ("streak" in stats) stats.streak = 0;
		stats.lastGame = modeData.modes[$mode].seed;
		localStorage.setItem(`stats-${$mode}`, JSON.stringify(stats));
	}

	onMount(() => {
		if (!game.active) setTimeout(() => (showStats = true), delay);
	});
	$: console.log(word);
</script>

<main class:guesses={game.guesses !== 0}>
	<Header
		bind:showRefresh
		tutorial={$settings.tutorial === 1}
		on:closeTutPopUp|once={() => ($settings.tutorial = 0)}
		played={stats.played}
		on:stats={() => (showStats = true)}
		on:tutorial={() => (showTutorial = true)}
		on:settings={() => (showSettings = true)}
	/>
	<Board bind:value={game.board.words} state={game.board.state} guesses={game.guesses} />
	<Keyboard
		on:keystroke|once={() => ($settings.tutorial = 0)}
		bind:value={game.board.words[game.guesses]}
		on:submitWord={submitWord}
		on:esc={() => {
			showTutorial = false;
			showStats = false;
			showSettings = false;
		}}
		disabled={!game.active || $settings.tutorial === 2}
	/>
	{#if modeData.modes[$mode].icon}
		<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
			<path d={modeData.modes[$mode].icon} stroke="#000" stroke-width="14" />
		</svg>
	{/if}
</main>

<Modal
	bind:visible={showTutorial}
	on:close|once={() => $settings.tutorial === 2 && --$settings.tutorial}
>
	<Tutorial visible={showTutorial} />
</Modal>

<Modal bind:visible={showStats}>
	<Statistics data={stats} />
	<Distribution distribution={stats.guesses} guesses={game.guesses} />
	<Seperator>
		<Timer slot="1" on:timeup={() => (showRefresh = true)} />
		<Share slot="2" data={game} />
	</Seperator>
	<Definition {word} visible={!game.active} />
</Modal>

<Modal fullscreen={true} bind:visible={showSettings}>
	<Settings />
</Modal>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		min-height: 100vh;
		max-width: var(--game-width);
		margin: auto;
		position: relative;
	}
	.icon {
		position: absolute;
		z-index: -1;
		top: 76px;
		width: 90%;
	}
	.icon path {
		stroke: var(--color-tone-6);
	}
</style>
