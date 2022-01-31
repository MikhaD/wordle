import { writable } from "svelte/store";
import type { GameMode } from "./enums";
import { createLetterStates } from "./utils";

export const mode = writable<GameMode>();

export const letterStates = writable(createLetterStates());

export const darkTheme = writable(false);
export const colorBlindTheme = writable(false);
export const fancyFont = writable(false);
export const hardMode = writable(false);