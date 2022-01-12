<script lang="ts">
	import { consistantRandInt } from "./utils";
	import Game from "./components/Game.svelte";

	export let wordData: Promise<Words>;
	export let chances: number;
</script>

{#await wordData then words}
	<Game {words} word={words.words[consistantRandInt(0, words.words.length)]} {chances} />
{/await}
