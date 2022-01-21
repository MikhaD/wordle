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
	import { letterStates, settings, mode } from "./stores";
	import type { GameMode } from "./enums";
	import { Toaster } from "./components/widgets";

	export let words: WordData;

	setContext<Words>("words", {
		...words,
		contains: (word: string) => {
			return words.words.includes(word) || words.valid.includes(word);
		},
	});

	let stats: Stats;
	let word: string;
	let state: GameState;

	settings.set(
		(JSON.parse(localStorage.getItem("settings")) as Settings) || createDefaultSettings()
	);
	settings.subscribe((s) => localStorage.setItem("settings", JSON.stringify(s)));

	mode.set((parseInt(localStorage.getItem("mode")) as GameMode) || modeData.default);
	mode.subscribe((m) => {
		localStorage.setItem("mode", `${m}`);
		stats = (JSON.parse(localStorage.getItem(`stats-${m}`)) as Stats) || createDefaultStats(m);
		word = words.words[seededRandomInt(0, words.words.length, modeData.modes[m].seed)];
		let temp: GameState = JSON.parse(localStorage.getItem(`state-${m}`));
		if (!temp || modeData.modes[m].seed - temp.time >= modeData.modes[m].unit) {
			state = createNewGame(m);
		} else state = temp;
		// Set the letter states when data for a new game mode is loaded so the keyboard is correct
		const letters = createLetterStates();
		for (let row = 0; row < state.board.words.length; ++row) {
			for (let col = 0; col < state.board.words[row].length; ++col) {
				letters[state.board.words[row][col]] = state.board.state[row][col];
			}
		}
		letterStates.set(letters);
	});

	$: saveState(state);
	function saveState(state: GameState) {
		localStorage.setItem(`state-${$mode}`, JSON.stringify(state));
	}
	let toaster: Toaster;
</script>

<Toaster bind:this={toaster} />
{#if toaster}
	<Game {stats} {word} {toaster} bind:game={state} />
{/if}
