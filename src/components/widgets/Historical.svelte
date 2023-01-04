<script lang="ts">
	import { custom_event } from "svelte/internal";
	import { GameMode } from "../../enums";
	import { mode } from "../../stores";
	import { getWordNumber, modeData } from "../../utils";

	export let wordNumber: number;

	type SubmitEvent = MouseEvent & { currentTarget: EventTarget & HTMLDivElement };

	const modes = modeData.modes.map((e) => e.name.toLowerCase());
	let validLink = false;
	let validNumber = false;
	let linkValue: string;
	let numValue: string;
	let linkMode: string;
	let newWordNum: number;

	function validateNumber(num: number, wordNum: number) {
		newWordNum = num;
		return !(isNaN(num) || num < 1 || num > wordNum);
	}

	function validateLink() {
		const data = linkValue
			.slice(linkValue.indexOf("#") + 1)
			.toLowerCase()
			.split("/");
		if (data.length !== 2) return false;
		if (!modes.includes(data[0])) return false;
		linkMode = data[0];
		if (validateNumber(+data[1], getWordNumber(GameMode[data[0]]))) return true;
		return true;
	}

	function submit(e: SubmitEvent) {
		if (validNumber) window.location.hash += `/${newWordNum}`;
		else if (validLink) window.location.hash = `${linkMode}/${newWordNum}`;
		e.currentTarget.dispatchEvent(custom_event("close", null, true));
		setTimeout(() => {
			linkValue = "";
			numValue = "";
		}, 500);
	}
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
			validNumber = validateNumber(+numValue, wordNumber);
		}}
	/>
	<select bind:value={$mode}>
		{#each modes as mode, i}
			<option value={i}>{mode}</option>
		{/each}
	</select>
</div>
<div>Enter a game number between 1 and {wordNumber - 1}</div>
<div class:disabled={!validLink && !validNumber} class="button" on:click={submit}>play</div>

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
