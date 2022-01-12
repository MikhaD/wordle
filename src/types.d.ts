/** A list of words of the same length */
interface Words {
	/** The length of the words in this {@link Words} object */
	length: number;
	/** A list of possible words to guess */
	words: string[];
	/** A list of words that are valid when input by the user but will never get chosen as the word to guess */
	valid: string[];
}

type RowData = {
	length: number;
	value: string;
	guess: number;
};

type LetterState = "tbd" | "absent" | "present" | "correct";

type GameState = "won" | "lost" | "active";