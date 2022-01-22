<script lang="ts">
	export let index = 0;
	const tips = [
		"You can also change the gamemode by clicking wordle+.",
		"Right clicking wordle+ changes the gamemode in the other direction.",
		"Right click a word on the board to learn its definition.",
		"Hard mode can be enabled during a game if you haven't violated the hard mode rules yet.",
		"After a game you can right click a word to see how many words you could have played there taking all hints into consideration.",
		"Because words are chosen from the list randomly it is possible to get the same word again.",
		"Everyone has the same wordle at the same time. Your word #73 is the same as everyone elses #73.",
		"You can refresh the page to play a new wordle when one is ready.",
		"There are more valid guesses than possible words, ie. not all 5 letter words can be selected as an answer by the game.",
	];
</script>

<div class="outer">
	<div class="number">Tip {index + 1}/{tips.length}</div>
	<div class="tip">{tips[index]}</div>
	<svg
		class="left"
		on:click={() => (index = (index - 1 + tips.length) % tips.length)}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100 100"
	>
		<path d="M75,0L25,50L75,100z" />
	</svg>
	<svg
		on:click={() => (index = (index + 1) % tips.length)}
		class="right"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100 100"
	>
		<path d="M25,0L75,50L25,100z" />
	</svg>
</div>

<style lang="scss">
	.outer {
		margin: 20px auto;
		padding: 10px 20px;
		max-width: calc(0.6 * var(--game-width));
		border: solid 1px var(--border-secondary);
		background: var(--bg-secondary);
		border-radius: 4px;
		position: relative;
	}
	.number {
		text-align: center;
		font-weight: bold;
		font-size: 1.2em;
		margin-bottom: 10px;
	}
	.left,
	.right {
		cursor: pointer;
		position: absolute;
		border-radius: 4px;
		background: var(--fg-primary);
		fill: var(--bg-primary);
		height: 45px;
		padding: 10px 0;
		top: 50%;
	}
	.left {
		left: 0;
		transform: translate(-50%, -50%);
	}
	.right {
		right: 0;
		transform: translate(50%, -50%);
	}
	.tip {
		text-align: center;
		min-height: 70px;
	}
</style>
