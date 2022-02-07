<script lang="ts">
	import { COLS, ROWS } from "../../utils";

	import { Tile } from "../board";
	export let visible: boolean;
    export let imported: boolean;
    
    let rowWidth = 44*COLS-4;
</script>

{#if imported}
    <h3>welcome to new byrdle!</h3>
    Have you played before? You can fetch your statistics from the old web page:
    
    <div class="importstats" onclick="location.href='https://rbrignall.github.io/byrdle/handover.html';">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z" />
        </svg>
        Fetch my statistics
    </div>
{/if}
<h3>how to play</h3>


<div><strong>Note:</strong> Are you looking for <a href="https://www.powerlanguage.co.uk/wordle/">WORDLE</a> (the guessing game created by <a href="https://twitter.com/powerlanguish">Josh Wardle</a>)? This is not it.</div>

<div>Guess the <strong>BYRDLE</strong> in {ROWS} tries. The word is related to choral music, and answers include proper nouns, plurals and musical terms in other languages.</div>
<div>Each guess must be a valid {COLS} letter word. Press enter to submit a guess. The colour of the tiles will then change as follows.
</div>
<div class:complete={visible} class="examples" style="--tutorial-row-width: {rowWidth}px; --cols: {COLS}">
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





<style lang="scss">
	div {
		margin: 10px 0;
	}
	.examples {
		border-top: 1px solid var(--border-primary);
		border-bottom: 1px solid var(--border-primary);
		:global(.row > *) {
			height: 100%;
		}
		&:not(.complete) :global(.row .back) {
			transition-delay: 0.3s;
		}
	}
	.row {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		height: 40px;
        width: var(--tutorial-row-width);
		gap: 5px;
        font-size: 1.8em;
        line-height: 1.4em;
        vertical-align: middle;
	}
    .importstats {
		text-transform: uppercase;
        color: white;
		font-weight: bold;
		background: var(--color-correct);
		border-radius: 4px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
        margin: 5px 10px;
/*		width: 50%;*/
		cursor: pointer;
        text-decoration: none;
    }
    svg {
		cursor: pointer;
		width: 24px;
		margin: 0 4px;
		:global(path) {
			fill: white;
        }
	}
</style>
