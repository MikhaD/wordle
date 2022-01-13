import seedrandom from "seedrandom";

export const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

const dateString = (() => {
	const today = new Date();
	// return `${today.getUTCHours()}${today.getUTCDay()}${today.getUTCDate()}${today.getUTCMonth()}${today.getUTCFullYear()}`;
	// Switch for this one for testing, changes every minute
	return `${new Date().getUTCMinutes()}${today.getUTCHours()}${today.getUTCDay()}${today.getUTCDate()}${today.getUTCMonth()}${today.getUTCFullYear()}`;
})();

export function consistantRandInt(min: number, max: number) {
	// const rng = seedrandom(dateString);
	// Switch for this one for testing, changes every minute
	const rng = seedrandom(`${new Date().getUTCMinutes()}${dateString}`);
	return Math.floor(min + (max - min) * rng());
}

export const NEW_GAME: GameState = {
	state: "active",
	guesses: 0,
	board: new Array<string>(6),
	lastGame: dateString,
};

export const DEFAULT_SETTINGS: Settings = {
	hard: false,
	dark: true,
	colorblind: false,
};