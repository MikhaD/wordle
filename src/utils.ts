import seedrandom from "seedrandom";

export const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

export function consistantRandInt(min: number, max: number) {
	const today = new Date();
	// const rng = seedrandom(`${today.getUTCDay()}${today.getUTCDate()}${today.getUTCMonth()}${today.getUTCFullYear()}`);
	// Switch for this one for testing, changes every minute
	const rng = seedrandom(`${today.getUTCMinutes()}${today.getUTCDay()}${today.getUTCDate()}${today.getUTCMonth()}${today.getUTCFullYear() + 1}`);
	return Math.floor(min + (max - min) * rng());
}