<script lang="ts">
	import { consistantRandInt } from "./utils";
	import Game from "./components/Game.svelte";
	import { game, value, settings } from "./stores";

	export let wordData: Promise<Words>;

	const savedState = JSON.parse(localStorage.getItem("gameState")) as GameState;
	if (savedState) {
		if (savedState.lastGame === $game.lastGame) {
			game.set(savedState);
			value.set(savedState.board[savedState.guesses]);
		}
	}
	const savedSettings = JSON.parse(localStorage.getItem("settings")) as Settings;
	if (savedSettings) {
		settings.set(savedSettings);
	}
</script>

{#await wordData then words}
	<Game {words} word={words.words[consistantRandInt(0, words.words.length)]} />
{/await}
