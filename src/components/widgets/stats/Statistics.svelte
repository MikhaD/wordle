<script lang="ts">
	import { mode } from "../../../stores";
	import { modeData } from "../../../utils";

	import Stat from "./Stat.svelte";
	export let data: Stats;

	let stats: [string, string | number][];
	$: {
		stats = [
			["Played", data.played],
			["Win %", Math.round(((data.played - data.guesses.fail) / data.played) * 100) || 0],
			[
				"Average Guesses",
				(
					Object.entries(data.guesses).reduce((a, b) => {
						if (!isNaN(parseInt(b[0]))) {
							return a + parseInt(b[0]) * b[1];
						}
						return a;
					}, 0) / data.played || 0
				).toFixed(1),
			],
		];
		if (data.guesses.fail > 0) {
			stats.push(["Lost", data.guesses.fail]);
		}
		if ("streak" in data) {
			stats.push(["Current Streak", data.streak]);
			stats.push(["Max Streak", data.maxStreak]);
		}
	}
</script>

<h3>Statistics ({modeData.modes[$mode].name})</h3>
<div>
	{#each stats as stat}
		<Stat name={stat[0]} stat={stat[1]} />
	{/each}
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		gap: 8px;
	}
</style>
