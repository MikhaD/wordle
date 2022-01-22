<script lang="ts">
	import Header from "./Header.svelte";
	import { Board } from "./board";
	import Keyboard from "./keyboard";
	import Modal from "./Modal.svelte";
	import { getContext, onMount, setContext } from "svelte";
	import Settings from "./settings";
	import {
		Share,
		Seperator,
		Definition,
		Tutorial,
		Statistics,
		Distribution,
		Timer,
		Toaster,
	} from "./widgets";
	import {
		contractNum,
		DELAY_INCREMENT,
		PRAISE,
		getState,
		modeData,
		checkHardMode,
	} from "../utils";
	import { letterStates, settings, mode, gameBoard } from "../stores";

	export let word: string;
	export let stats: Stats;
	export let game: GameState;
	export let toaster: Toaster;

	const words = getContext<Words>("words");
	setContext("toaster", toaster);

	// implement transition delay on keys
	const delay = DELAY_INCREMENT * game.board.words.length + 800;

	let showTutorial = $settings.tutorial === 2;
	let showSettings = false;
	let showStats = false;
	let showRefresh = false;

	let board: Board;
	$: gameBoard.set(game.board);

	function submitWord() {
		if (game.board.words[game.guesses].length !== words.length) {
			toaster.pop("Not enough letters");
			board.shake(game.guesses);
		} else if (words.contains(game.board.words[game.guesses])) {
			if (game.guesses > 0) {
				const hm = checkHardMode(game.board, game.guesses);
				if ($settings.hard[$mode]) {
					if (hm.type === "🟩") {
						toaster.pop(
							`${contractNum(hm.pos + 1)} letter must be ${hm.char.toUpperCase()}`
						);
						board.shake(game.guesses);
						return;
					} else if (hm.type === "🟨") {
						toaster.pop(`Guess must contain ${hm.char.toUpperCase()}`);
						board.shake(game.guesses);
						return;
					}
				} else if (hm.type !== "⬛") {
					game.validHard = false;
				}
			}
			for (let i = 0; i < word.length; ++i) {
				const char = game.board.words[game.guesses][i];
				const state = getState(word, i, char);
				game.board.state[game.guesses][i] = state;
				$letterStates[char] = state;
			}
			++game.guesses;
			if (game.board.words[game.guesses - 1] === word) win();
			else if (game.guesses === game.board.words.length) lose();
		} else {
			toaster.pop("Not in word list");
			board.shake(game.guesses);
		}
	}

	function win() {
		board.bounce(game.guesses - 1);
		game.active = false;
		setTimeout(
			() => toaster.pop(PRAISE[game.guesses - 1]),
			DELAY_INCREMENT * game.board.words.length
		);
		setTimeout(() => (showStats = true), delay * 1.4);
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
		++game.guesses;
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
	// $: toaster.pop(word);
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
	<Board
		bind:this={board}
		bind:value={game.board.words}
		state={game.board.state}
		guesses={game.guesses}
		icon={modeData.modes[$mode].icon}
	/>
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
</main>

<Modal
	bind:visible={showTutorial}
	on:close|once={() => $settings.tutorial === 2 && --$settings.tutorial}
	fullscreen={$settings.tutorial === 0}
>
	<Tutorial visible={showTutorial} />
</Modal>

<Modal bind:visible={showStats}>
	<Statistics data={stats} />
	<Distribution distribution={stats.guesses} guesses={game.guesses} />
	<Seperator visible={!game.active}>
		<Timer slot="1" on:timeup={() => (showRefresh = true)} />
		<Share slot="2" data={game} />
	</Seperator>
	{#if !game.active}
		<Definition {word} alternates={4} />
	{/if}
</Modal>

<Modal fullscreen={true} bind:visible={showSettings}>
	<Settings visible={showSettings} validHard={game.validHard} />
</Modal>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		max-width: var(--game-width);
		margin: auto;
		position: relative;
	}
</style>
