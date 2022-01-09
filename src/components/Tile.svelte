<script lang="ts">
	export let value = "";
	export let state: "tbd" | "absent" | "present" | "correct" = "tbd";
</script>

<div class={state}>{value}</div>

<style>
	div {
		font-size: 2rem;
		font-weight: bold;
		text-transform: uppercase;
		width: 62px;
		aspect-ratio: 1;
		border: 2px solid var(--color-tone-4);
		display: grid;
		place-items: center;
	}
	.absent {
		background: var(--color-absent);
	}
	.present {
		background: var(--color-present);
	}
	.correct {
		background: var(--color-correct);
	}
</style>
