<script lang="ts">
	import Tile from "./Tile.svelte";
</script>

<h3>HOW TO PLAY</h3>
<div>Guess the <strong>WORDLE</strong> in 6 tries.</div>
<div>Each guess must be a valid 5 letter word. Hit the enter button to submit.</div>
<div>
	After each guess, the color of the tiles will change to show how close your guess was to the
	word.
</div>
<div class="examples">
	<div><strong>Examples</strong></div>
	<div class="row">
		<Tile value="w" state="correct" size="40" />
		<Tile value="e" state="tbd" size="40" />
		<Tile value="a" state="tbd" size="40" />
		<Tile value="r" state="tbd" size="40" />
		<Tile value="y" state="tbd" size="40" />
	</div>
	<div>The letter <strong>W</strong> is in the word and in the correct spot.</div>
	<div class="row">
		<Tile value="p" state="tbd" size="40" />
		<Tile value="i" state="present" size="40" />
		<Tile value="l" state="tbd" size="40" />
		<Tile value="l" state="tbd" size="40" />
		<Tile value="s" state="tbd" size="40" />
	</div>
	<div>The letter <strong>I</strong> is in the word but in the wrong spot.</div>
	<div class="row">
		<Tile value="v" state="tbd" size="40" />
		<Tile value="a" state="tbd" size="40" />
		<Tile value="g" state="tbd" size="40" />
		<Tile value="u" state="absent" size="40" />
		<Tile value="e" state="tbd" size="40" />
	</div>
	<div>The letter <strong>U</strong> is not in the word in any spot.</div>
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
