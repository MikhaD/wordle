<script lang="ts">
	import { COLS, ROWS } from "../../utils";

	import { Tile } from "../board";
	export let visible: boolean;
</script>

<h3>how to play</h3>


<div><strong>Note:</strong> Are you looking for <a href="https://www.powerlanguage.co.uk/wordle/">WORDLE</a> (the guessing game created by <a href="https://twitter.com/powerlanguish">Josh Wardle</a>)? This is not it.</div>

<div>Guess the <strong>BYRDLE</strong> in {ROWS} tries. The word is related to choral music, and answers include proper nouns, plurals and musical term in other languages.</div>
<div>Each guess must be a valid {COLS} letter word. Press enter to submit a guess. The colour of the tiles will then change as follows.
</div>
<div class:complete={visible} class="examples">
	<div><strong>Examples</strong></div>
	<div class="row">
		<Tile value="q" state="🟢" />
		<Tile value="u" state="🔳" />
		<Tile value="i" state="🔳" />
		<Tile value="r" state="🔳" />
		<Tile value="e" state="🔳" />
	</div>
	<div>The letter <strong>Q</strong> is in the word and in the correct spot.</div>
	<div class="row">
		<Tile value="m" state="🔳" />
		<Tile value="e" state="🟡" />
		<Tile value="m" state="🔳" />
		<Tile value="e" state="🔳" />
		<Tile value="s" state="🔳" />
	</div>
	<div>The letter <strong>E</strong> is in the word but in the wrong spot.</div>
	<div class="row">
		<Tile value="p" state="🔳" />
		<Tile value="s" state="🔳" />
		<Tile value="a" state="🔳" />
		<Tile value="l" state="⚪" />
		<Tile value="m" state="🔳" />
	</div>
	<div>The letter <strong>L</strong> is not in the word in any spot.</div>
</div>
<div>A new BYRDLE will be available at midnight each day!</div>
<div><strong>Credits</strong></div>
<div>
	This game is inspired by <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank">Wordle</a
	>, and is an implementation of an idea of <a href="https://twitter.com/QuireMemes">QuireMemes</a>.
</div>
<div>    
    Code is Open Source, written with Svelte, in Typescript by <a href="https://github.com/rbrignall" target="_blank">rbrignall</a> on a base by <a href="https://github.com/MikhaD" target="_blank">MikhaD</a>.
</div>




<style lang="scss">
	div {
		margin: 14px 0;
	}
	.examples {
		border-top: 1px solid var(--border-primary);
		border-bottom: 1px solid var(--border-primary);
		:global(.row > *) {
			height: 100%;
			aspect-ratio: 1;
		}
		&:not(.complete) :global(.row .back) {
			transition-delay: 0.3s;
		}
	}
	.row {
		height: 40px;
		display: flex;
		gap: 4px;
	}
</style>
