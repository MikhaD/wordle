import { Subscriber, Unsubscriber, writable } from "svelte/store";

/** The word being guessed */
export const word = (() => {
	let value: string;
	const subs = [];
	return {
		set: (val: string) => {
			value = val;
		},
		subscribe: (handler: Subscriber<string>): Unsubscriber => {
			subs.push(handler);
			handler(value);
			return () => {
				const index = subs.indexOf(handler);
				if (index !== -1) {
					subs.splice(index, 1);
				}
			};
		},
		getState: (char: string, index: number): LetterState => {
			if (value.charAt(index) === char) return "correct";
			else if (value.includes(char)) return "present";
			else return "absent";
		}
	};
})();

/** The list of valid words */
export const words = (() => {
	let value: Words;
	const subs = [];
	return {
		set: (val: Words) => {
			value = val;
		},
		subscribe: (handler: Subscriber<Words>): Unsubscriber => {
			subs.push(handler);
			handler(value);
			return () => {
				const index = subs.indexOf(handler);
				if (index !== -1) {
					subs.splice(index, 1);
				}
			};
		},
		contains: (word: string) => {
			return value.words.includes(word) || value.valid.includes(word);
		}
	};
})();

/** The number of guesses the player has made */
export const guesses = (() => {
	const { subscribe, update } = writable(0);
	return {
		subscribe,
		increment: () => update(n => n + 1),
	};
})();

/** The string input by the user */
export const value = (() => {
	const { subscribe, set, update } = writable("");
	return {
		subscribe,
		append: (char: string) => update(n => n.length > 4 ? n : n + char.toLowerCase()),
		backspace: () => update(n => n ? n.slice(0, n.length - 1) : n),
		reset: () => set(""),
		set: (word: string) => /^[a-z]*$/.test(word) && set(word.slice(0, 5)),
	};
})();

export const gameState = writable<GameState>("active");