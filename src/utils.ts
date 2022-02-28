import seedrandom from "seedrandom";
import { GameMode } from "./enums";
import wordLists from "./words_5_6";

export const SIXLETTERDAY = 110;

export const ROWS = 6;

export const COLS = ((getWordNumber() < SIXLETTERDAY) ? 5 : 6);

export const words = {
	words: wordLists.words,
    valid: ((getWordNumber() < SIXLETTERDAY) ? wordLists.validFive : wordLists.validSix),
	contains: (word: string) => {
		return words.words.includes(word) || words.valid.includes(word);
	},
};

export function checkHardMode(boardState: string[], evaluations: LetterState[][], row: number): HardModeData {
	for (let i = 0; i < COLS; ++i) {
		if (evaluations[row - 1][i] === "correct" && boardState[row - 1][i] !== boardState[row][i]) {
			return { pos: i, char: boardState[row - 1][i], type: "correct" };
		}
	}
	for (let i = 0; i < COLS; ++i) {
		if (evaluations[row - 1][i] === "present" && !boardState[row].includes(boardState[row - 1][i])) {
			return { pos: i, char: boardState[row - 1][i], type: "present" };
		}
	}
	return { pos: -1, char: "", type: "absent" };
}

export function getRowData(n: number, boardState: string[], evaluations: LetterState[][]) {
	const wordData = {
		// letters not contained
		not: [],
		// for letters contained in the word that are not the same as any that are in the correct place
		contained: new Set<string>(),
		letters: Array.from({ length: COLS }, () => ({ val: null, not: new Set<string>() })),
	};
	for (let row = 0; row < n; ++row) {
		for (let col = 0; col < COLS; ++col)
			if (evaluations[row][col] === "present") {
				wordData.contained.add(boardState[row][col]);
				wordData.letters[col].not.add(boardState[row][col]);
			} else if (evaluations[row][col] === "correct") {
				wordData.contained.delete(boardState[row][col]);
				wordData.letters[col].val = boardState[row][col];
			} else {
				wordData.not.push(boardState[row][col]);
			}
	}
	let exp = "";
	for (let i = 0; i < COLS; ++i) {
		exp += wordData.letters[i].val
			? wordData.letters[i].val
			: `[^${[...wordData.not, ...wordData.letters[i].not].join(" ")}]`;
	}
	return (word: string) => {
		if (new RegExp(exp).test(word)) {
			for (const char of wordData.contained) {
				if (!word.includes(char)) return false;
			}
			return true;
		}
		return false;
	};
}

export function getState(word: string, guess: string): LetterState[] {
	const charArr = word.split("");
	const result = Array<LetterState>(COLS).fill("absent");
	for (let i = 0; i < word.length; ++i) {
		if (charArr[i] === guess.charAt(i)) {
			result[i] = "correct";
			charArr[i] = "$";
		}
	}
    // Now look for letters in wrong position.
    // Replace letter with $ in the charArr whenever we find one
    // to avoid multiple counting
	for (let i = 0; i < word.length; ++i) {
		if (charArr.includes(guess.charAt(i)) && result[i] !== "correct") {
			result[i] = "present";
			charArr[charArr.indexOf(guess.charAt(i))] = "$";
		}
	}
    
	return result; //result.map((e, i) => charArr.includes(guess[i]) && e !== "correct" ? "present" : e);
}

export function contractNum(n: number) {
	switch (n % 10) {
		case 1: return `${n}st`;
		case 2: return `${n}nd`;
		case 3: return `${n}rd`;
		default: return `${n}th`;
	}
}

export const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];


export function newSeed() {
	const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate()).valueOf();
}

export const modeData: ModeData = {
	default: GameMode.daily,
	modes: [
		{
			name: "Daily",
			unit: 86400000,
			start: 1642370400000,	// 17/01/2022
			seed: newSeed(),
			historical: false,
			streak: true,
		},
		{
			name: "Historical",
			unit: 86400000,
			start: 1642370400000,	// 17/01/2022
			seed: newSeed(),
			historical: true,
			streak: false,
		},	
    ]
};

export function getWordNumber() {
    const numbleOneDate = new Date(2022,0,12,0,0,0,0).setHours(0,0,0,0)
    const now = new Date().setHours(0,0,0,0)
    const msInDay = 86400000
    return Math.floor((now - numbleOneDate) / msInDay)
}

export const DELAY_INCREMENT = 150;

export const PRAISE = [
    [
        "Gloria in excelsis deo!",
        "Hallelujah!",
        "I was glaaaaaaad",
        "Let all the world in ev'ry corner sing!"
    ],
    [
        "Magnificat!",
        "Jubilate!",
        "My spirit sang all day",
        "Jauchzet, frohlocket!"
    ],
    [
        "And all the people rejoiced!",
        "O Lord make haste to help us",
        "A great and mighty wonder",
        "O clap your hands"
    ],
    [
        "Here endeth the lesson",
        "One guess for each voice part, eh?",
        "We'll treat that as the warm-up",
        "Dies irae"
    ],
    [
        "Were you nodding off during the sermon?",
        "A Byrdle 5-part mess",
        "Bit more breath control next time",
        "Helps to watch the conductor",
        "Tripped over your cassock"
    ],[
        "This took you almost as long as Psalm 119!",
        "Tristis est anima mea",
        "You're flat!",
        "Requiem aeternam"
    ]   
];

export function createNewGame(mode: GameMode): GameState {
	return {
        gameStatus: "IN_PROGRESS",
		guesses: 0,
		time: modeData.modes[mode].seed,
		wordNumber: (modeData.modes[mode].historical ? getWordNumber() - 1 : getWordNumber()),
		validHard: true,
        boardState: Array(ROWS).fill(""),
        evaluations: Array.from({ length: ROWS }, () => (Array(COLS).fill("nil"))),
	};
}


export function createDefaultStats(mode: GameMode): Stats {

    const urlStats = new URLSearchParams(window.location.search);
	const stats = {
		gamesPlayed: parseInt(urlStats.get("p")) || 0,
		lastGame: parseInt(urlStats.get("l")) || 0,
		guesses: {
			fail: parseInt(urlStats.get("fail")) || 0,
			1: parseInt(urlStats.get("g1")) || 0,
			2: parseInt(urlStats.get("g2")) || 0,
			3: parseInt(urlStats.get("g3")) || 0,
			4: parseInt(urlStats.get("g4")) || 0,
			5: parseInt(urlStats.get("g5")) || 0,
			6: parseInt(urlStats.get("g6")) || 0,
		},
		currentStreak: parseInt(urlStats.get("cs")) || 0,
		maxStreak: parseInt(urlStats.get("ms")) || 0,
        imported: false,
	};
	if (stats.gamesPlayed === 0) return stats;
    // Data was imported from URL
    stats.imported = true;
	return stats;
};

export function createLetterStates(): { [key: string]: LetterState; } {
	return {
		a: "nil",
		b: "nil",
		c: "nil",
		d: "nil",
		e: "nil",
		f: "nil",
		g: "nil",
		h: "nil",
		i: "nil",
		j: "nil",
		k: "nil",
		l: "nil",
		m: "nil",
		n: "nil",
		o: "nil",
		p: "nil",
		q: "nil",
		r: "nil",
		s: "nil",
		t: "nil",
		u: "nil",
		v: "nil",
		w: "nil",
		x: "nil",
		y: "nil",
		z: "nil",
	};
}

export const definitions = new Map<string, Promise<DictionaryEntry>>();