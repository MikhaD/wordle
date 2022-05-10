/** A list of words of the same length */
type Words = WordData & {
	contains: (word: string) => boolean;
};

type WordData = {
	words: string[],
    valid: string [],
};

type RowData = {
	length: number;
	guess: number;
};

type LetterState = "nil" | "absent" | "present" | "correct";

type GameState = {
    gameStatus: "IN_PROGRESS" | "WIN" | "FAIL",
	guesses: number,
	time: number,
	wordNumber: number,
	validHard: boolean,
    boardState: string[],
    evaluations: LetterState[][],
};




type SettingType = "switch";

type Word = {
	daily: string,
	getState: (char: string, index: number, mode: GameMode) => LetterState,
};

type Stats = {
	gamesPlayed: number;
	currentStreak?: number;
	maxStreak?: number;
	lastGame: number;
    lastGameNumber: number;
	guesses: Guesses;
    imported: boolean;
};

type Guesses = {
	"1": number;
	"2": number;
	"3": number;
	"4": number;
	"5": number;
	"6": number;
    "7": number;
	"fail": number;
};

type ModeData = {
	default: GameMode,
	modes: Mode[],
};

type Mode = {
	name: string,
	unit: number,
	start: number,
	seed: number,
	historical: boolean,
	streak?: boolean,
};

type HardModeData = {
	pos: number,
	char: string,
	type: "correct" | "present" | "absent",
};