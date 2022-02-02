<script lang="ts">
	import {
		modeData,
		createDefaultStats,
		createNewGame,
		createLetterStates,
		ROWS,
		getWordNumber,
		words,
	} from "./utils";
	import Game from "./components/Game.svelte";
	import { letterStates, hardMode, mode, 
            darkTheme, colorBlindTheme, fancyFont
    } from "./stores";
	import { GameMode } from "./enums";
	import { Toaster } from "./components/widgets";
	import { onMount, setContext } from "svelte";


	let stats: Stats;
	let word: string;
	let state: GameState;
    var iFrameStats='';


    // Settings separated out:
    darkTheme.set(JSON.parse(localStorage.getItem("darkTheme")) as boolean || false);
    colorBlindTheme.set(JSON.parse(localStorage.getItem("colorBlindTheme")) as boolean || false);
    fancyFont.set(JSON.parse(localStorage.getItem("fancyFont")) as boolean || false);
    hardMode.set(JSON.parse(localStorage.getItem("hardMode")) as boolean || false);
    
    darkTheme.subscribe(s => localStorage.setItem("darkTheme",s));
    colorBlindTheme.subscribe(s => localStorage.setItem("colorBlindTheme",s));
    fancyFont.subscribe(s => localStorage.setItem("fancyFont",s));
    hardMode.subscribe(s => localStorage.setItem("hardMode",s));
    
	const modeVal: GameMode = modeData.default;
	mode.set(modeVal);
    

	mode.subscribe((m) => {
		localStorage.setItem("mode", `${m}`);
		stats = (JSON.parse(localStorage.getItem("statistics")) as Stats) || 
//		stats = (JSON.parse(iFrameStats) as Stats) || 
                    createDefaultStats(m);
        word = words.words[getWordNumber() % words.words.length];
		let temp: GameState;
        temp = JSON.parse(localStorage.getItem("gameState"));
        if (!temp || modeData.modes[m].seed - temp.time >= modeData.modes[m].unit) {
            state = createNewGame(m);
        } else {
            // This is for backwards compatibility, can be removed in a day
            if (!temp.wordNumber) {
				temp.wordNumber = getWordNumber();
            }
            // TODO: Add checks for missing items in temp (e.g. evaluation being null)
            state = temp;
		}
		// Set the letter states when data for a new game mode is loaded so the keyboard is correct
		const letters = createLetterStates();
		for (let row = 0; row < ROWS; ++row) {
			for (let col = 0; col < state.boardState[row].length; ++col) {
				letters[state.boardState[row][col]] = state.evaluations[row][col];
			}
		}
		letterStates.set(letters);
	});

	$: saveState(state);
	function saveState(state: GameState) {
        localStorage.setItem("gameState", JSON.stringify(state));
	}
	let toaster: Toaster;
    
    let frame;
    // Code to capture stats from iframe
    function addAnEventListener(obj,evt,func){
        if ('addEventListener' in obj){
            obj.addEventListener(evt,func, false);
        } else if ('attachEvent' in obj){//IE
            obj.attachEvent('on'+evt,func);
        }
    }

    function iFrameListener(event){
        iFrameStats = (JSON.parse(event.data) as Stats) || createDefaultStats(0);
        console.log(iFrameStats);
        console.log(stats);
        if (stats.gamesPlayed === 0 && iFrameStats.gamesPlayed > 0)
            stats=iFrameStats;
        console.log(stats);
}

    onMount(() => {
        addAnEventListener(window,'message',iFrameListener);
    })
    
    
</script>

<Toaster bind:this={toaster} />
{#if toaster}
	<Game {stats} {word} {toaster} bind:game={state} />

    <iframe width="0" height="0" src="https://rbrignall.github.io/byrdle/iframe.html" frameborder="0" title="loadstats" />

{/if}
