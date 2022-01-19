<script lang="ts">
	import {
		modeData,
		seededRandomInt,
		createDefaultStats,
		createNewGame,
		createDefaultSettings,
		createLetterStates,
	} from "./utils";
	import { setContext } from "svelte";
	import Game from "./components/Game.svelte";
	import { letterStates, settings, word } from "./stores";
	import type { GameMode } from "./enums";

	export let words: WordData;
	setContext<Words>("words", {
		...words,
		contains: (word: string) => {
			return words.words.includes(word) || words.valid.includes(word);
		},
	});

	settings.set(
		(JSON.parse(localStorage.getItem("settings")) as Settings) || createDefaultSettings()
	);

	let mode = (parseInt(localStorage.getItem("mode")) as GameMode) || modeData.default;
	$: localStorage.setItem("mode", mode);

	$: stats =
		(JSON.parse(localStorage.getItem(`stats-${mode}`)) as Stats) || createDefaultStats(mode);
	$: word.set(words.words[seededRandomInt(0, words.words.length, modeData.modes[mode].seed)]);
	$: localStorage.setItem("settings", JSON.stringify($settings));

	$: state = loadState(mode);
	function loadState(mode: GameMode): GameState {
		let state: GameState = JSON.parse(localStorage.getItem(`state-${mode}`));
		if (!state || modeData.modes[mode].seed - state.time >= modeData.modes[mode].unit) {
			state = createNewGame(mode);
		}
		// Set the letter states when data for a new game mode is loaded so the keyboard is correct
		const letters = createLetterStates();
		for (let row = 0; row < state.board.words.length; ++row) {
			for (let col = 0; col < state.board.words[row].length; ++col) {
				letters[state.board.words[row][col]] = state.board.state[row][col];
			}
		}
		letterStates.set(letters);
		return state;
	}

	$: saveState(state);
	function saveState(state: GameState) {
		localStorage.setItem(`state-${mode}`, JSON.stringify(state));
	}
</script>

<Game bind:mode {stats} bind:game={state} />
