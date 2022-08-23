import seedrandom from "seedrandom";
import { GameMode } from "./enums";
import { createWordLists, answerLength } from "./words_5_6";

// TODO: Put COLS in the store and redraw gameboard without reloading
export const COLS = answerLength(wordNumToArrayNum(storedWordNumber()));
export const ROWS = COLS + 1;

export const words = {
    ...createWordLists(COLS),
    contains: (word: string) => {
		return words.words.includes(word) || words.valid.includes(word);
	},
};

export function checkHardMode(boardState: string[], evaluations: LetterState[][], row: number): HardModeData {
	for (let i = 0; i < COLS; ++i) {
		if (evaluations[row - 1][i] === "correct" && boardState[row - 1][i] !== boardState[row][i]) {
			return { pos: i, char: boardState[row - 1][i], type: "correct" };
		}
	}
	for (let i = 0; i < COLS; ++i) {
		if (evaluations[row - 1][i] === "present" && !boardState[row].includes(boardState[row - 1][i])) {
			return { pos: i, char: boardState[row - 1][i], type: "present" };
		}
	}
	return { pos: -1, char: "", type: "absent" };
}

export function getState(word: string, guess: string): LetterState[] {
	const charArr = word.split("");
	const result = Array<LetterState>(COLS).fill("absent");
	for (let i = 0; i < word.length; ++i) {
		if (charArr[i] === guess.charAt(i)) {
			result[i] = "correct";
			charArr[i] = "$";
		}
	}
    // Now look for letters in wrong position.
    // Replace letter with $ in the charArr whenever we find one
    // to avoid multiple counting
	for (let i = 0; i < word.length; ++i) {
		if (charArr.includes(guess.charAt(i)) && result[i] !== "correct") {
			result[i] = "present";
			charArr[charArr.indexOf(guess.charAt(i))] = "$";
		}
	}
    
	return result; //result.map((e, i) => charArr.includes(guess[i]) && e !== "correct" ? "present" : e);
}

export function contractNum(n: number) {
	switch (n % 10) {
		case 1: return `${n}st`;
		case 2: return `${n}nd`;
		case 3: return `${n}rd`;
		default: return `${n}th`;
	}
}

export const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];


export function newSeed() {
	const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate()).valueOf();
}

export const modeData: ModeData = {
	default: GameMode.daily,
	modes: [
		{
			name: "Daily",
			unit: 86400000,
			start: 1642370400000,	// 17/01/2022
			seed: newSeed(),
			historical: false,
			streak: true,
		},
		{
			name: "Historical",
			unit: 86400000,
			start: 1642370400000,	// 17/01/2022
			seed: newSeed(),
			historical: true,
			streak: false,
		},	
    ]
};

export function storedWordNumber() {
    // Utility to capture stored word number before Svelte loads
    // Must default to getWordNumber() if nothing in store
    const currMode = (JSON.parse(localStorage.getItem("mode")) as GameMode || 0)
    let currGameState: GameState 
    
    if (currMode === 0) {
        currGameState = JSON.parse(localStorage.getItem("gameState"))
        if(!currGameState || !currGameState.wordNumber)
            return getWordNumber()
        else
            return currGameState.wordNumber
    }
    else {
        currGameState = JSON.parse(localStorage.getItem("histState"))
        if(!currGameState)
            return getWordNumber() - 1
        else
            return currGameState.wordNumber
    }
}

export function getWordNumber() { // This is 1 less than the game number. No % used.
    const numbleOneDate = new Date(2022,0,12,0,0,0,0).setHours(0,0,0,0)
    const now = new Date().setHours(0,0,0,0)
    const msInDay = 86400000
    return Math.round((now - numbleOneDate) / msInDay) 
}

// Computes x^y mod p
export function power(x, y, p) {
    // Initialize result
    let res = 1; 
   
    // Update x if it is more
    // than or equal to p
    x = x % p; 
   
    while (y > 0) {
           
    // If y is odd, multiply x with result
    if (y % 2 != 0)
        res = (res * x) % p;
   
    // y must be even now
    y = y >> 1; // y = y/2
    x = (x * x) % p;
    }
    return res;
}

export function wordNumToArrayNum(wordNum) {
    // A selection of 70 of the primitive roots modulo words.words.length+1 (=263)
    // This should keep us going for a good wee while!
    const PRIME = 263;
    const ROOTS = [30, 38, 40, 41, 42, 45, 47, 53, 55, 56, 
                   57, 58, 59, 60, 63, 65, 67, 71, 73, 76, 
                   77, 79, 80, 82, 84, 85, 87, 90, 91, 94, 
                   97, 101, 106, 107, 110, 112, 113, 114, 115, 116, 
                   118, 119, 120, 123, 125, 126, 127, 130, 131, 134, 
                   135, 139, 141, 142, 146, 152, 154, 155, 158, 159, 
                   160, 161, 163, 164, 165, 167, 168, 170, 171, 174]; 
    if (wordNum < PRIME-1)
        return wordNum;
    else {
        var rootnum = Math.floor(wordNum/(PRIME-1))-1;
        console.log(PRIME + power( ROOTS[rootnum],wordNum%(PRIME-1),PRIME )-2);
        return PRIME + power( ROOTS[rootnum],wordNum%(PRIME-1),PRIME )-2;
    }
}

export const DELAY_INCREMENT = 150;

export const PRAISE = [
    [
        "Gloria in excelsis deo!",
        "Hallelujah!",
        "I was glaaaaaaad",
        "Let all the world in ev'ry corner sing!"
    ],
    [
        "Magnificat!",
        "Jubilate!",
        "My spirit sang all day",
        "Jauchzet, frohlocket!",
        "O fortuna!"
    ],
    [
        "And all the people rejoiced!",
        "O Lord make haste to help us",
        "A great and mighty wonder",
        "O clap your hands",
        "Comfort ye, my people"
    ],
    [
        "Here endeth the lesson",
        "One guess for each voice part, eh?",
        "We'll treat that as the warm-up",
        "Dies irae",
        "Once more, from the top!"
    ],
    [
        "Kyrie eleison",
        "A Byrdle 5-part mess",
        "Bit more breath control next time",
        "Expectans expectavi",
        "Tripped over your cassock"
    ],[
        "This took you almost as long as Psalm 119!",
        "Tristis est anima mea",
        "Miserere mei",
        "Requiem aeternam"
    ],[
        "This took you longer than Psalm 119!",
        "As Slow As Possible",
        "Molto lento",
        "De profundis"
    ]      
];

export const NOTICES = [
    {
        message: "<p>Dear players,</p><p>Sorry if the switch to 6 letters was a surprise! Future changes will be announced via these notices.</p><p>Byrdle will now use 6 letter words (and 7 guesses) until at least early August 2022. I'm still deciding what will happen then...</p><p>Thanks for playing, and I hope you enjoy Byrdle 6!</p>", 
        showfrom: new Date(2022,4,4,0,0,0,0),
    },
    {
        message: "<p>Byrdle tip!</p><p>No 6-letter answer is the plural of a 5-letter answer. So, TENORS will not appear (but BASSES could).</p>", 
        showfrom: new Date(2022,4,14,0,0,0,0),
    },
    {
        message: "<h3>(One-off) shameless plug</h3><p>Are you interested in a new daily word game?</p><p>Composer Ben Ponniah and I developed a game that combines logical and linguistic deduction, called <a href=\"https://susie.rbrignall.org.uk/\" target=\"_blank\">SUSIE</a>. I hope you like it!</p>", 
        showfrom: new Date(2022,4,28,0,0,0,0),
    }
];

export function currentNoticeNum() {
    let today = new Date();
    return (NOTICES.length - NOTICES.slice().reverse().findIndex(msg => (msg["showfrom"] <= today)) - 1);
}

export function fillNotice(node) {
    node.innerHTML = NOTICES[currentNoticeNum()]["message"];
}

export function createNewGame(mode: GameMode): GameState {
	return {
        gameStatus: "IN_PROGRESS",
		guesses: 0,
		time: modeData.modes[mode].seed,
		wordNumber: (modeData.modes[mode].historical ? getWordNumber() - 1 : getWordNumber()),
		validHard: true,
        boardState: Array(ROWS).fill(""),
        evaluations: Array.from({ length: ROWS }, () => (Array(COLS).fill("nil"))),
	};
}


export function createDefaultStats(mode: GameMode): Stats {

    const urlStats = new URLSearchParams(window.location.search);
	const stats = {
		gamesPlayed: parseInt(urlStats.get("p")) || 0,
		lastGame: parseInt(urlStats.get("l")) || 0,
        lastGameNumber: 0,
        guesses: {
			fail: parseInt(urlStats.get("fail")) || 0,
			1: parseInt(urlStats.get("g1")) || 0,
			2: parseInt(urlStats.get("g2")) || 0,
			3: parseInt(urlStats.get("g3")) || 0,
			4: parseInt(urlStats.get("g4")) || 0,
			5: parseInt(urlStats.get("g5")) || 0,
			6: parseInt(urlStats.get("g6")) || 0,
            7: 0,
		},
		currentStreak: parseInt(urlStats.get("cs")) || 0,
		maxStreak: parseInt(urlStats.get("ms")) || 0,
        imported: false,
	};
	if (stats.gamesPlayed === 0) return stats;
    // Data was imported from URL
    stats.imported = true;
	return stats;
};

export function createLetterStates(): { [key: string]: LetterState; } {
	return {
		a: "nil",
		b: "nil",
		c: "nil",
		d: "nil",
		e: "nil",
		f: "nil",
		g: "nil",
		h: "nil",
		i: "nil",
		j: "nil",
		k: "nil",
		l: "nil",
		m: "nil",
		n: "nil",
		o: "nil",
		p: "nil",
		q: "nil",
		r: "nil",
		s: "nil",
		t: "nil",
		u: "nil",
		v: "nil",
		w: "nil",
		x: "nil",
		y: "nil",
		z: "nil",
	};
}
