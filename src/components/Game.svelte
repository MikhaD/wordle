<script lang="ts">
	import { fade } from "svelte/transition";
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
		ShareGame,
		Tips,
	} from "./widgets";
	import {
		contractNum,
		DELAY_INCREMENT,
		PRAISE,
		getState,
		modeData,
		checkHardMode,
		ROWS,
		COLS,
		newSeed,
		createNewGame,
		seededRandomInt,
		createLetterStates,
		words,
	} from "../utils";
	import { letterStates, settings, mode } from "../stores";

	export let word: string;
	export let stats: Stats;
	export let game: GameState;
	export let toaster: Toaster;

	setContext("toaster", toaster);
	const version = getContext<string>("version");

	// implement transition delay on keys
	const delay = DELAY_INCREMENT * ROWS + 800;

	let showTutorial = $settings.tutorial === 3;
	let showSettings = false;
	let showStats = false;
	let showRefresh = false;

	let board: Board;
	let timer: Timer;
	let tips: Tips;

	let tip = 0;
	$: if (showSettings && tips) tip = Math.floor(tips.length * Math.random());

	function submitWord() {
		if (game.board.words[game.guesses].length !== COLS) {
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
			const state = getState(word, game.board.words[game.guesses]);
			game.board.state[game.guesses] = state;
			state.forEach((e, i) => {
				const ls = $letterStates[game.board.words[game.guesses][i]];
				if (ls === "🔳" || e === "🟩") {
					$letterStates[game.board.words[game.guesses][i]] = e;
				}
			});
			++game.guesses;
			if (game.board.words[game.guesses - 1] === word) win();
			else if (game.guesses === ROWS) lose();
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
			DELAY_INCREMENT * COLS + DELAY_INCREMENT
		);
		setTimeout(setShowStatsTrue, delay * 1.4);
		if (!modeData.modes[$mode].historical) {
			++stats.guesses[game.guesses];
			++stats.played;
			if ("streak" in stats) {
				stats.streak =
					modeData.modes[$mode].seed - stats.lastGame > modeData.modes[$mode].unit
						? 1
						: stats.streak + 1;
				if (stats.streak > stats.maxStreak) stats.maxStreak = stats.streak;
			}
			stats.lastGame = modeData.modes[$mode].seed;
			localStorage.setItem(`stats-${$mode}`, JSON.stringify(stats));
		}
	}

	function lose() {
		game.active = false;
		setTimeout(setShowStatsTrue, delay);
		if (!modeData.modes[$mode].historical) {
			++stats.guesses.fail;
			++stats.played;
			if ("streak" in stats) stats.streak = 0;
			stats.lastGame = modeData.modes[$mode].seed;
			localStorage.setItem(`stats-${$mode}`, JSON.stringify(stats));
		}
	}

	function concede() {
		showSettings = false;
		setTimeout(setShowStatsTrue, DELAY_INCREMENT);
		lose();
	}

	function reload() {
		modeData.modes[$mode].historical = false;
		modeData.modes[$mode].seed = newSeed($mode);
		game = createNewGame($mode);
		word = words.words[seededRandomInt(0, words.words.length, modeData.modes[$mode].seed)];
		$letterStates = createLetterStates();
		showStats = false;
		showRefresh = false;
		timer.reset($mode);
	}

	function setShowStatsTrue() {
		if (!game.active) showStats = true;
	}

	onMount(() => {
		if (!game.active) setTimeout(setShowStatsTrue, delay);
	});
	// $: toaster.pop(word);
</script>

<svelte:body on:click={board.hideCtx} on:contextmenu={board.hideCtx} />

<main class:guesses={game.guesses !== 0} style="--rows: {ROWS}; --cols: {COLS}">
	<Header
		bind:showRefresh
		tutorial={$settings.tutorial === 2}
		on:closeTutPopUp|once={() => ($settings.tutorial = 1)}
		showStats={stats.played > 0 || (modeData.modes[$mode].historical && !game.active)}
		on:stats={() => (showStats = true)}
		on:tutorial={() => (showTutorial = true)}
		on:settings={() => (showSettings = true)}
		on:reload={reload}
	/>
	<Board
		bind:this={board}
		bind:value={game.board.words}
		tutorial={$settings.tutorial === 1}
		on:closeTutPopUp|once={() => ($settings.tutorial = 0)}
		board={game.board}
		guesses={game.guesses}
		icon={modeData.modes[$mode].icon}
	/>
	<Keyboard
		on:keystroke={() => {
			if ($settings.tutorial) $settings.tutorial = 0;
			board.hideCtx();
		}}
		bind:value={game.board.words[game.guesses === ROWS ? 0 : game.guesses]}
		on:submitWord={submitWord}
		on:esc={() => {
			showTutorial = false;
			showStats = false;
			showSettings = false;
		}}
		disabled={!game.active || $settings.tutorial === 3}
	/>
</main>

<Modal
	bind:visible={showTutorial}
	on:close|once={() => $settings.tutorial === 3 && --$settings.tutorial}
	fullscreen={$settings.tutorial === 0}
>
	<Tutorial visible={showTutorial} />
</Modal>

<Modal bind:visible={showStats}>
	{#if modeData.modes[$mode].historical}
		<h2 class="historical">Statistics not available for historical games</h2>
	{:else}
		<Statistics data={stats} />
		<Distribution distribution={stats.guesses} {game} />
	{/if}
	<Seperator visible={!game.active}>
		<Timer
			slot="1"
			bind:this={timer}
			on:timeup={() => (showRefresh = true)}
			on:reload={reload}
		/>
		<Share slot="2" state={game} />
	</Seperator>
	<ShareGame wordNumber={game.wordNumber} />
	{#if !game.active}
		<Definition {word} alternates={2} />
	{:else}
		<!-- Fade with delay is to prevent a bright red button from appearing as soon as refresh is pressed -->
		<div in:fade={{ delay: 300 }} class="concede" on:click={concede}>give up</div>
	{/if}
</Modal>

<Modal fullscreen={true} bind:visible={showSettings}>
	<Settings state={game} />
	{#if game.active}
		<div class="concede" on:click={concede}>give up</div>
	{/if}
	<Tips bind:this={tips} index={tip} />

	<div slot="footer">
		<a href="https://www.nytimes.com/games/wordle/" target="_blank">Original Wordle</a>
		<div>
			<div>v{version}</div>
			<div
				title="double click to reset your stats"
				class="word"
				on:dblclick={() => {
					localStorage.clear();
					toaster.pop("localStorage cleared");
				}}
			>
				{modeData.modes[$mode].name} word #{game.wordNumber}
			</div>
		</div>
	</div>
</Modal>

<style lang="scss">
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
	.historical {
		text-align: center;
		margin-top: 10px;
		padding: 0 20px;
		text-transform: uppercase;
	}
	.concede {
		margin-top: 15px;
		text-transform: uppercase;
		color: #fff;
		cursor: pointer;
		font-size: var(--fs-medium);
		font-weight: bold;
		padding: 15px;
		border-radius: 4px;
		text-align: center;
		background-color: var(--red);
		&:hover {
			opacity: 0.9;
		}
	}
</style>
