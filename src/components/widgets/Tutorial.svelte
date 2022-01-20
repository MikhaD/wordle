<script lang="ts">
	import { Tile } from "../board";
	export let visible: boolean;
</script>

<h3>how to play</h3>
<div>Guess the <strong>WORDLE</strong> in 6 tries.</div>
<div>Each guess must be a valid 5 letter word. Hit the enter button to submit.</div>
<div>
	After each guess, the color of the tiles will change to show how close your guess was to the
	word.
</div>
<div class:complete={visible} class="examples">
	<div><strong>Examples</strong></div>
	<div class="row">
		<Tile value="w" state="🟩" size="40" />
		<Tile value="e" state="🔳" size="40" />
		<Tile value="a" state="🔳" size="40" />
		<Tile value="r" state="🔳" size="40" />
		<Tile value="y" state="🔳" size="40" />
	</div>
	<div>The letter <strong>W</strong> is in the word and in the correct spot.</div>
	<div class="row">
		<Tile value="p" state="🔳" size="40" />
		<Tile value="i" state="🟨" size="40" />
		<Tile value="l" state="🔳" size="40" />
		<Tile value="l" state="🔳" size="40" />
		<Tile value="s" state="🔳" size="40" />
	</div>
	<div>The letter <strong>I</strong> is in the word but in the wrong spot.</div>
	<div class="row">
		<Tile value="v" state="🔳" size="40" />
		<Tile value="a" state="🔳" size="40" />
		<Tile value="g" state="🔳" size="40" />
		<Tile value="u" state="⬛" size="40" />
		<Tile value="e" state="🔳" size="40" />
	</div>
	<div>The letter <strong>U</strong> is not in the word in any spot.</div>
</div>
<div>
	This is a recreation of the original <a
		href="https://www.powerlanguage.co.uk/wordle/"
		target="_blank">Wordle</a
	>
	by Josh Wardle with additional modes and features, written with Svelte in Typescript by
	<a href="https://github.com/MikhaD" target="_blank">MikhaD</a>.
</div>

<style>
	div {
		margin: 14px 0;
	}
	.examples {
		border-top: 1px solid var(--color-tone-4);
		border-bottom: 1px solid var(--color-tone-4);
	}
	.row {
		display: flex;
		gap: 4px;
	}
</style>
