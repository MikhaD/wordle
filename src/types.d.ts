/** A list of words of the same length */
type Words = WordData & {
	contains: (word: string) => boolean;
};

type WordData = {
	/** A list of possible words to guess */
	words: string[];
	/** A list of words that are valid when input by the user but will never get chosen as the word to guess */
	validFive: string[];
	validSix: string[];
    valid: string [];
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

type DictionaryEntry = {
	word: string;
	phonetic: string;
	phonetics: Phonetic[];
	origin: string;
	meanings: Meaning[];
};

type Meaning = {
	partOfSpeech: string;
	definitions: Definition[];
};

type Definition = {
	definition: string;
	synonyms: string[];
	antonyms: any[];
	example?: string;
};

type Phonetic = {
	text: string;
	audio: string;
};

type Stats = {
	gamesPlayed: number;
	currentStreak?: number;
	maxStreak?: number;
	lastGame: number;
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