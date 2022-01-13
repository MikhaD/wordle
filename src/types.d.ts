/** A list of words of the same length */
type Words = {
	/** The length of the words in this {@link Words} object */
	length: number;
	/** A list of possible words to guess */
	words: string[];
	/** A list of words that are valid when input by the user but will never get chosen as the word to guess */
	valid: string[];
	contains?: (word: string) => boolean;
};

type RowData = {
	length: number;
	guess: number;
};

type LetterState = "tbd" | "absent" | "present" | "correct";

type GameState = {
	state: "won" | "lost" | "active",
	guesses: number,
	board: string[],
	lastGame: string,
};

type Settings = {
	hard: boolean,
	dark: boolean,
	colorblind: boolean,
};

type Word = {
	vale: string,
	getState: (char: string, index: numer) => LetterState,
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