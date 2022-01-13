import { writable } from "svelte/store";
import { DEFAULT_SETTINGS, NEW_GAME } from "./utils";

export const value = (() => {
	const { subscribe, set } = writable("");
	return {
		subscribe,
		reset: () => set(""),
		set: (word: string) => /^[a-z]*$/.test(word) && set(word.slice(0, 5)),
	};
})();

export const game = writable(NEW_GAME);

export const settings = writable(DEFAULT_SETTINGS);