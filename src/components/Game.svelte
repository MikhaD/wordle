<script lang="ts">
	import Header from "./Header.svelte";
	import { Board } from "./board";
	import Keyboard from "./keyboard";
	import Modal from "./Modal.svelte";
	import { onMount, setContext } from "svelte";
	import Settings from "./Settings";
	import {
		Share,
		Seperator,
//		Definition,
		Tutorial,
		Statistics,
		Distribution,
		Timer,
		Toaster,
		ShareGame,
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
//		seededRandomInt,
        getWordNumber,
		createLetterStates,
		words,
	} from "../utils";
	import { letterStates, hardMode, mode } from "../stores";

	export let word: string;
	export let stats: Stats;
	export let game: GameState;
	export let toaster: Toaster;

	setContext("toaster", toaster);

	// implement transition delay on keys
	const delay = DELAY_INCREMENT * ROWS + 800;

	let showTutorial = false; // hopefully just kills this...
	let showSettings = false;
	let showStats = false;
	let showRefresh = false;

	let board: Board;
	let timer: Timer;
    
    function sampleArray(myarray: string[]){
        return myarray[Math.floor(Math.random()*myarray.length)];
    }
    
	function submitWord() {
		if (game.boardState[game.guesses].length !== COLS) {
			toaster.pop("Not enough letters");
			board.shake(game.guesses);
		} else if (words.contains(game.boardState[game.guesses])) {
			if (game.guesses > 0) {
				const hm = checkHardMode(game.boardState, game.evaluations, game.guesses);
				if ($hardMode) {
					if (hm.type === "🟢") {
						toaster.pop(
							`${contractNum(hm.pos + 1)} letter must be ${hm.char.toUpperCase()}`
						);
						board.shake(game.guesses);
						return;
					} else if (hm.type === "🟡") {
						toaster.pop(`Guess must contain ${hm.char.toUpperCase()}`);
						board.shake(game.guesses);
						return;
					}
				} else if (hm.type !== "⚪") {
					game.validHard = false;
				}
			}
			const state = getState(word, game.boardState[game.guesses]);
			game.evaluations[game.guesses] = state;
			state.forEach((e, i) => ($letterStates[game.boardState[game.guesses][i]] = e));
			++game.guesses;
			if (game.boardState[game.guesses - 1] === word) win();
			else if (game.guesses === ROWS) lose();
		} else {
			toaster.pop("Not in word list");
			board.shake(game.guesses);
		}
	}

	function win() {
		board.bounce(game.guesses - 1);
        game.gameStatus = "WIN";
		setTimeout(() => toaster.pop(sampleArray(PRAISE[game.guesses - 1])), DELAY_INCREMENT * ROWS);
		setTimeout(() => (showStats = true), delay * 1.4);
		if (!modeData.modes[$mode].historical) {
			++stats.guesses[game.guesses];
			++stats.gamesPlayed;
			if ("currentStreak" in stats) {
				stats.currentStreak =
					modeData.modes[$mode].seed - stats.lastGame >= modeData.modes[$mode].unit
						? 1
						: stats.currentStreak + 1;
				if (stats.currentStreak > stats.maxStreak) stats.maxStreak = stats.currentStreak;
			}
			stats.lastGame = modeData.modes[$mode].seed;
			localStorage.setItem(`statistics`, JSON.stringify(stats));
		}
	}

	function lose() {
//		++game.guesses;
        game.gameStatus = "FAIL";
		setTimeout(() => (showStats = true), delay);
		if (!modeData.modes[$mode].historical) {
			++stats.guesses.fail;
			++stats.gamesPlayed;
			if ("currentStreak" in stats) stats.currentStreak = 0;
			stats.lastGame = modeData.modes[$mode].seed;
			localStorage.setItem(`statistics`, JSON.stringify(stats));
		}
	}

	function reload() {
//		modeData.modes[$mode].historical = false;
		modeData.modes[$mode].seed = newSeed();
		game = createNewGame($mode);
//		word = words.words[seededRandomInt(0, words.words.length, modeData.modes[$mode].seed)];
        word = words.words[getWordNumber % words.words.length]
        $letterStates = createLetterStates();
		showStats = false;
		showRefresh = false;
		timer.reset($mode);
	}

	onMount(() => {
		if (!game.gameStatus === "IN_PROGRESS") setTimeout(() => (showStats = true), delay);
	});
	// $: toaster.pop(word);
</script>

<svelte:body on:click={board.hideCtx} on:contextmenu={board.hideCtx} />

<main class:guesses={game.guesses !== 0} style="--rows: {ROWS}; --cols: {COLS}">
	<Header
		bind:showRefresh
		showStats={stats.gamesPlayed > 0 || (modeData.modes[$mode].historical && !(game.gameStatus === "IN_PROGRESS"))}
		on:stats={() => (showStats = true)}
		on:tutorial={() => (showTutorial = true)}
		on:settings={() => (showSettings = true)}
		on:reload={reload}
	/>
	<Board
		bind:this={board}
		bind:value={game.boardState}
		evaluations={game.evaluations}
		guesses={game.guesses}
		icon={modeData.modes[$mode].icon}
	/>
	<Keyboard
		on:keystroke={() => {
			board.hideCtx();
		}}
		bind:value={game.boardState[game.guesses === ROWS ? 0 : game.guesses]}
		on:submitWord={submitWord}
		on:esc={() => {
			showTutorial = false;
			showStats = false;
			showSettings = false;
		}}
		disabled={!(game.gameStatus === "IN_PROGRESS")}
	/>
</main>

<Modal
	bind:visible={showTutorial}
>
	<Tutorial visible={showTutorial} />
</Modal>

<Modal bind:visible={showStats}>
		<Statistics data={stats} />
		<Distribution distribution={stats.guesses} guesses={game.guesses} active={game.gameStatus==="IN_PROGRESS"} />
	<Seperator visible={!game.gameStatus === "IN_PROGRESS"}>
		<Timer
			slot="1"
			bind:this={timer}
			on:timeup={() => (showRefresh = true)}
			on:reload={reload}
		/>
		<Share slot="2" state={game} />
	</Seperator>
	<ShareGame />
</Modal>

<Modal fullscreen={true} bind:visible={showSettings}>
	<Settings visible={showSettings} wordNumber={game.wordNumber} validHard={game.validHard} />
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
