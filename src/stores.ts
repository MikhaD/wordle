import { writable } from "svelte/store";
import type { GameMode } from "./enums";
import { createDefaultSettings, createLetterStates } from "./utils";

export const mode = writable<GameMode>();

export const letterStates = writable(createLetterStates());

export const settings = writable(createDefaultSettings());