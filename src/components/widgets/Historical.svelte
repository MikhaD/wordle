<script lang="ts">
	import { getContext } from "svelte";
	import { custom_event } from "svelte/internal";
	import type { Toaster } from ".";
	import { GameMode } from "../../enums";
	import { mode } from "../../stores";
	import { getWordNumber, modeData, newSeed } from "../../utils";

	export let showSettings: boolean;

	const toaster = getContext<Toaster>("toaster");

	const modes = modeData.modes.map((e) => e.name.toLowerCase());
	let validLink = false;
	let validNumber = false;
	let linkValue: string;
	let numValue: string;
	let linkMode: GameMode;
	let newWordNum: number;

	function reset() {
		linkValue = "";
		numValue = "";
		validLink = false;
		validNumber = false;
	}

	function validateNumber(num: number, wordNum: number) {
		if (!isNaN(num) && num > 0 && num < wordNum) {
			newWordNum = num;
			return true;
		}
		return false;
	}

	function validateLink() {
		const data = linkValue
			.slice(linkValue.indexOf("#") + 1)
			.toLowerCase()
			.split("/");
		if (data.length !== 2) return false;
		if (!(data[0] in GameMode)) return false;
		if (!validateNumber(+data[1], getWordNumber(GameMode[data[0]], true))) {
			return false;
		}
		linkMode = GameMode[data[0]];
		return true;
	}

	function submit(e: A11yClick) {
		console.log("Historical activated");
		const newMode = validNumber ? $mode : linkMode;
		const currentModeData = modeData.modes[newMode];

		currentModeData.historical = true;
		currentModeData.seed = newSeed(
			$mode,
			(newWordNum - 1) * currentModeData.unit + currentModeData.start
		);
		mode.set(newMode, true);

		e.currentTarget.dispatchEvent(custom_event("close", null, { bubbles: true }));
		showSettings = false;
		toaster.pop(`${GameMode[$mode]} wordle #${newWordNum}`, 2);
		reset();
	}
	mode.subscribe(() => {
		if (!showSettings) {
			reset();
		}
	});
</script>

<h3>Play a historical game</h3>
{#key $mode}
	<input
		type="text"
		bind:value={linkValue}
		placeholder="Example: {window.location}/1"
		class:valid={validLink}
		on:input={() => {
			validLink = validateLink();
		}}
	/>
{/key}
<div>Paste in a link</div>
<h3>or</h3>
<div class="number">
	<input
		type="text"
		bind:value={numValue}
		placeholder="Example: 1"
		class:valid={validNumber}
		on:input={(e) => {
			validNumber = validateNumber(+numValue, getWordNumber($mode, true));
		}}
	/>
	<select bind:value={$mode}>
		{#each modes as mode, i}
			<option value={i}>{mode}</option>
		{/each}
	</select>
</div>
<div>Enter a game number between 1 and {getWordNumber($mode, true) - 1}</div>
<div
	class:disabled={!validLink && !validNumber}
	class="button"
	on:click={submit}
	on:keydown={submit}
>
	play
</div>

<style lang="scss">
	div {
		text-align: center;
		margin-top: 0.4rem;
	}
	input {
		text-align: center;
		color: inherit;
		font-size: inherit;
		width: 100%;
		border-radius: 4px;
		background-color: var(--border-secondary);
		border: none;
		padding: 0.5rem;
		outline: solid 1px var(--red);
	}
	input:placeholder-shown {
		outline: none;
	}
	.valid {
		outline-color: var(--color-correct);
	}
	select {
		display: inline;
		background: var(--border-secondary);
	}
	.number {
		display: flex;
		gap: 1rem;
	}
	.button {
		background-color: var(--color-correct);
	}
	.disabled {
		background-color: var(--fg-secondary);
		cursor: default;
		pointer-events: none;
		&:hover {
			opacity: 1;
		}
	}
</style>
