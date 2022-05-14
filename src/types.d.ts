/** A list of words of the same length */
import {GameMode} from "./enums";

type Words = WordData & {
	contains: (word: string) => boolean;
};

type WordData = {
	/** A list of possible words to guess */
	words: string[];
	/** A list of words that are valid when input by the user but will never get chosen as the word to guess */
	valid: string[];
};

type RowData = {
	length: number;
	guess: number;
};

type LetterState = "🔳" | "⬛" | "🟨" | "🟩";

type GameState = {
	active: boolean,
	guesses: number,
	time: number,
	wordNumber: number,
	validHard: boolean,
	board: GameBoard,
};

type GameBoard = {
	words: string[],
	state: LetterState[][],
};

type Settings = {
	hard: boolean[],
	dark: boolean,
	colorblind: boolean,
	tutorial: 0 | 1 | 2 | 3,
};

type SettingType = "switch" | "dropdown";

type Word = {
	daily: string,
	infinite: string,
	getState: (char: string, index: number, mode: GameMode) => LetterState,
};

type VerseReference = {
	book: string;
	chapter: number;
	verse: number;
};

type Verse = {
	reference: VerseReference;
	text: string;
}

type WordVerseMatches = {
	word: string;
	selectedVerses: Verse[];
	allVerseReferences: VerseReference[];
}

type Stats = {
	played: number;
	streak?: number;
	maxStreak?: number;
	lastGame: number;
	guesses: Guesses;
};

type Guesses = {
	"1": number;
	"2": number;
	"3": number;
	"4": number;
	"5": number;
	"6": number;
	"fail": number;
};

type ModeData = {
	default: GameMode,
	modes: Mode[],
};

type Mode = {
	name: string,
	unit: number,
	wordNumber: number;
	historical: boolean,
	icon?: string,
	streak?: boolean,
	useTimeZone?: boolean,
};

type HardModeData = {
	pos: number,
	char: string,
	type: "🟩" | "🟨" | "⬛",
};