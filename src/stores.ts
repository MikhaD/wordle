import { writable } from "svelte/store";
import type { GameMode } from "./enums";
import { Settings, LetterStates } from "./utils";

export const mode = writable<GameMode>();

export const letterStates = writable(new LetterStates());

export const settings = writable(new Settings());