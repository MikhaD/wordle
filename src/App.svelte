<script lang="ts">
	import {
		modeData,
		createDefaultStats,
		createNewGame,
		createLetterStates,
		ROWS,
        COLS,
		getWordNumber,
        wordNumToArrayNum,
		words,
	} from "./utils";
	import Game from "./components/Game.svelte";
	import { letterStates, hardMode, mode, 
            darkTheme, colorBlindTheme, fancyFont,
            showHistMode, seenPopUp, noticeNum, noRed
    } from "./stores";
	import { GameMode } from "./enums";
	import { Toaster } from "./components/widgets";
	import { onMount, setContext } from "svelte";


	let stats: Stats;
	let word: string;
	let state: GameState;


    // Settings separated out:
    darkTheme.set(JSON.parse(localStorage.getItem("darkTheme")) as boolean || false);
    colorBlindTheme.set(JSON.parse(localStorage.getItem("colorBlindTheme")) as boolean || false);
    fancyFont.set(JSON.parse(localStorage.getItem("fancyFont")) as boolean || false);
    hardMode.set(JSON.parse(localStorage.getItem("hardMode")) as boolean || false);
    noRed.set(JSON.parse(localStorage.getItem("noRed")) as boolean || false);

    if (!localStorage.getItem("showHistMode")) 
        showHistMode.set(true)
    else
        showHistMode.set(JSON.parse(localStorage.getItem("showHistMode")) as boolean);

    if (!localStorage.getItem("seenPopUp"))
        seenPopUp.set(2)
    else 
        seenPopUp.set(JSON.parse(localStorage.getItem("seenPopUp")) as number);
    
    if(!localStorage.getItem("noticeNum"))
        noticeNum.set(-1)
    else
        noticeNum.set(JSON.parse(localStorage.getItem("noticeNum")) as number);
    
    darkTheme.subscribe(s => localStorage.setItem("darkTheme",s));
    colorBlindTheme.subscribe(s => localStorage.setItem("colorBlindTheme",s));
    fancyFont.subscribe(s => localStorage.setItem("fancyFont",s));
    hardMode.subscribe(s => localStorage.setItem("hardMode",s));
    noRed.subscribe(s => localStorage.setItem("noRed",s));
    seenPopUp.subscribe(s => localStorage.setItem("seenPopUp",s));
    noticeNum.subscribe(s => localStorage.setItem("noticeNum",s));
    
	const modeVal: GameMode = modeData.default;
	mode.set(JSON.parse(localStorage.getItem("mode")) as GameMode || modeVal);
    

	mode.subscribe((m) => {
		localStorage.setItem("mode", `${m}`);
        
        // Grab statistics. CreateDefaultStats looks for URL data
		stats = (JSON.parse(localStorage.getItem("statistics")) as Stats) || createDefaultStats(m);
        if (stats.guesses[ROWS] === undefined || !stats.guesses[ROWS]) stats.guesses[ROWS] = 0;
		let temp: GameState;
    if (!(modeData.modes[m].historical)) {
        temp = JSON.parse(localStorage.getItem("gameState"));
        if (!temp || temp.wordNumber < getWordNumber()) { //modeData.modes[m].seed - temp.time >= modeData.modes[m].unit) {
            state = createNewGame(m);
        } else {
            // This is for backwards compatibility, can be removed in a day
            if (!temp.wordNumber) {
                temp.wordNumber = getWordNumber();
            }
            // TODO: Add checks for missing items in temp (e.g. evaluation being null)
            state = temp;
		    }
    } else { // Historical mode
        temp = JSON.parse(localStorage.getItem("histState"));
        if (!temp) {
            state = createNewGame(m);
        } else
            state = temp;
    }
    word = words.words[wordNumToArrayNum(state.wordNumber)];
    // reload page
    if (!(word.length === COLS)) location.reload();
    // Check arrays are of right length and fix if not
    if (state.evaluations.length < ROWS)
        state.evaluations.push(...Array.from({ length: ROWS - state.evaluations.length }, () => (Array(COLS).fill("nil"))));
    else if (state.evaluations.length > ROWS)
        state.evaluations.splice(ROWS - state.evaluations.length);
        
    if (state.boardState.length < ROWS) 
        state.boardState.push(...Array(ROWS - state.boardState.length).fill(""));
    else if (state.boardState.length > ROWS)
        state.boardState.splice(ROWS - state.boardState.length);

    

		// Set the letter states when data for a new game mode is loaded so the keyboard is correct
		const letters = createLetterStates();
		for (let row = 0; row < ROWS; ++row) {
            for (let col = 0; col < state.boardState[row].length; ++col) {
                switch(letters[state.boardState[row][col]]) {
                    case "present":
                        if(!(state.evaluations[row][col] === "correct")) break;
                    case "nil":
                    case "absent":
                        letters[state.boardState[row][col]] = state.evaluations[row][col];
                        break;
                }
            }
		}
		letterStates.set(letters);
	});

	$: saveState(state);
	function saveState(state: GameState) {
        if (!(modeData.modes[$mode].historical))
            localStorage.setItem("gameState", JSON.stringify(state));
        else
            localStorage.setItem("histState", JSON.stringify(state));        
	}
	let toaster: Toaster;
</script>

<Toaster bind:this={toaster} />
{#if toaster}
	<Game {stats} {word} {toaster} bind:game={state} />
{/if}