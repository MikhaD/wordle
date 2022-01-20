import seedrandom from "seedrandom";
import { GameMode } from "./enums";

export function checkHardMode(board: GameBoard, row: number): HardModeData {
	for (let i = 0; i < board.words[row - 1].length; ++i) {
		if (board.state[row - 1][i] === "🟩" && board.words[row - 1][i] !== board.words[row][i]) {
			return { pos: i, char: board.words[row - 1][i], type: "🟩" };
		} else if (board.state[row - 1][i] === "🟨" && !board.words[row].includes(board.words[row - 1][i])) {
			return { pos: i, char: board.words[row - 1][i], type: "🟨" };
		}
	}
	return { pos: -1, char: "", type: "⬛" };
}

export function getState(word: string, index: number, char: string): LetterState {
	if (word.charAt(index) === char) return "🟩";
	if (word.includes(char)) return "🟨";
	return "⬛";
}

export function contractNum(n: number) {
	switch (n % 10) {
		case 1: return `${n}st`;
		case 2: return `${n}nd`;
		case 3: return `${n}rd`;
		default: return `${n}rd`;
	}
}

export const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

export const modeData: ModeData = {
	default: GameMode.daily,
	modes: [
		{
			name: "Daily",
			unit: 86400000,
			start: 1642370400000,	// 17/01/2022
			seed: (() => {
				const today = new Date();
				return new Date(today.getFullYear(), today.getMonth(), today.getDate()).valueOf();
			})(),
			streak: true,
		},
		{
			name: "Hourly",
			unit: 3600000,
			start: 1642528800000,	// 18/01/2022 8:00pm
			seed: (() => {
				const today = new Date();
				return new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours()).valueOf();
			})(),
			icon: "m50,7h100v33c0,40 -35,40 -35,60c0,20 35,20 35,60v33h-100v-33c0,-40 35,-40 35,-60c0,-20 -35,-20 -35,-60z",
			streak: true,
		},
		{
			name: "Infinite",
			unit: 1000,
			start: 1642428600000,	// 17/01/2022 4:10:00pm
			seed: (() => {
				const today = new Date();
				return new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()).valueOf();
			})(),
			icon: "m7,100c0,-50 68,-50 93,0c25,50 93,50 93,0c0,-50 -68,-50 -93,0c-25,50 -93,50 -93,0z",
		}
	]
};

export function getWordNumber(mode: GameMode) {
	return (modeData.modes[mode].seed - modeData.modes[mode].start) / modeData.modes[mode].unit + 1;
}

export function seededRandomInt(min: number, max: number, seed: number) {
	const rng = seedrandom(`${seed}`);
	return Math.floor(min + (max - min) * rng());
}

export const DELAY_INCREMENT = 0.1;

export function createNewGame(mode: GameMode): GameState {
	return {
		active: true,
		guesses: 0,
		time: modeData.modes[mode].seed,
		board: {
			words: ["", "", "", "", "", ""],
			state: [
				["🔳", "🔳", "🔳", "🔳", "🔳"],
				["🔳", "🔳", "🔳", "🔳", "🔳"],
				["🔳", "🔳", "🔳", "🔳", "🔳"],
				["🔳", "🔳", "🔳", "🔳", "🔳"],
				["🔳", "🔳", "🔳", "🔳", "🔳"],
				["🔳", "🔳", "🔳", "🔳", "🔳"],
			]
		},
	};
}

export function createDefaultSettings(): Settings {
	return {
		hard: false,
		dark: true,
		colorblind: false,
		tutorial: 2,
	};
}

export function createDefaultStats(mode: GameMode): Stats {
	const stats = {
		played: 0,
		lastGame: 0,
		guesses: {
			fail: 0,
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
		}
	};
	if (!modeData.modes[mode].streak) return stats;
	return {
		...stats,
		streak: 0,
		maxStreak: 0,
	};
};

export function createLetterStates(): { [key: string]: LetterState; } {
	return {
		a: "🔳",
		b: "🔳",
		c: "🔳",
		d: "🔳",
		e: "🔳",
		f: "🔳",
		g: "🔳",
		h: "🔳",
		i: "🔳",
		j: "🔳",
		k: "🔳",
		l: "🔳",
		m: "🔳",
		n: "🔳",
		o: "🔳",
		p: "🔳",
		q: "🔳",
		r: "🔳",
		s: "🔳",
		t: "🔳",
		u: "🔳",
		v: "🔳",
		w: "🔳",
		x: "🔳",
		y: "🔳",
		z: "🔳",
	};
}