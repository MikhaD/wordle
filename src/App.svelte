<script lang="ts">
	import {
		modeData,
		seededRandomInt,
		createDefaultStats,
		createNewGame,
		createDefaultSettings,
		createLetterStates,
		ROWS,
		getWordNumber,
		words,
	} from "./utils";
	import Game from "./components/Game.svelte";
	import { letterStates, settings, mode } from "./stores";
	import { GameMode } from "./enums";
	import { Toaster } from "./components/widgets";
	import { setContext } from "svelte";

	export let version: string;
	setContext("version", version);
	localStorage.setItem("version", version);

	let stats: Stats;
	let word: string;
	let state: GameState;

	settings.set(
		(JSON.parse(localStorage.getItem("settings")) as Settings) || createDefaultSettings()
	);
	settings.subscribe((s) => localStorage.setItem("settings", JSON.stringify(s)));

	const hash = window.location.hash.slice(1).split("/");
	const modeVal: GameMode = !isNaN(GameMode[hash[0]])
		? GameMode[hash[0]]
		: parseInt(localStorage.getItem("mode")) || modeData.default;
	mode.set(modeVal);
	// If this is a link to a specific word make sure that that is the word
	if (!isNaN(parseInt(hash[1])) && parseInt(hash[1]) < getWordNumber(modeVal)) {
		modeData.modes[modeVal].seed =
			(parseInt(hash[1]) - 1) * modeData.modes[modeVal].unit + modeData.modes[modeVal].start;
		modeData.modes[modeVal].historical = true;
	}
	mode.subscribe((m) => {
		localStorage.setItem("mode", `${m}`);
		window.location.hash = GameMode[m];
		stats = (JSON.parse(localStorage.getItem(`stats-${m}`)) as Stats) || createDefaultStats(m);
		word = words.words[seededRandomInt(0, words.words.length, modeData.modes[m].seed)];
		let temp: GameState;
		if (modeData.modes[m].historical === true) {
			temp = JSON.parse(localStorage.getItem(`state-${m}-h`));
			if (!temp || temp.wordNumber !== getWordNumber(m)) {
				state = createNewGame(m);
			} else {
				state = temp;
			}
		} else {
			temp = JSON.parse(localStorage.getItem(`state-${m}`));
			if (!temp || modeData.modes[m].seed - temp.time >= modeData.modes[m].unit) {
				state = createNewGame(m);
			} else {
				// This is for backwards compatibility, can be removed in a day
				if (!temp.wordNumber) {
					temp.wordNumber = getWordNumber(m);
				}
				state = temp;
			}
		}
		// Set the letter states when data for a new game mode is loaded so the keyboard is correct
		const letters = createLetterStates();
		for (let row = 0; row < ROWS; ++row) {
			for (let col = 0; col < state.board.words[row].length; ++col) {
				if (
					letters[state.board.words[row][col]] === "🔳" ||
					state.board.state[row][col] === "🟩"
				) {
					letters[state.board.words[row][col]] = state.board.state[row][col];
				}
			}
		}
		letterStates.set(letters);
	});

	$: saveState(state);
	function saveState(state: GameState) {
		if (modeData.modes[$mode].historical) {
			localStorage.setItem(`state-${$mode}-h`, JSON.stringify(state));
		} else {
			localStorage.setItem(`state-${$mode}`, JSON.stringify(state));
		}
	}
	let toaster: Toaster;

	document.title = "Wordle+ | An infinite word guessing game";
</script>

<Toaster bind:this={toaster} />
{#if toaster}
	<Game {stats} {word} {toaster} bind:game={state} />
{/if}
