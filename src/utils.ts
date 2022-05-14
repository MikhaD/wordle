import {GameMode, ms} from "./enums";
import wordList from "./words_5";
import type {GameBoard, GameState, HardModeData, LetterState, Mode, ModeData, Settings, Stats} from "./types";

export const ROWS = 6;
export const COLS = 5;

const completeWordSet = new Set<string>([...wordList.words, ...wordList.valid]);

export const words = {
    ...wordList,
    contains: (word: string) => completeWordSet.has(word),
};

export function checkHardMode(board: GameBoard, row: number): HardModeData {
    for (let i = 0; i < COLS; ++i) {
        if (board.state[row - 1][i] === "🟩" && board.words[row - 1][i] !== board.words[row][i]) {
            return {pos: i, char: board.words[row - 1][i], type: "🟩"};
        }
    }
    for (let i = 0; i < COLS; ++i) {
        if (board.state[row - 1][i] === "🟨" && !board.words[row].includes(board.words[row - 1][i])) {
            return {pos: i, char: board.words[row - 1][i], type: "🟨"};
        }
    }
    return {pos: -1, char: "", type: "⬛"};
}

class Tile {
    public value: string;
    public notSet: Set<string>;

    constructor() {
        this.notSet = new Set<string>();
    }

    not(char: string) {
        this.notSet.add(char);
    }
}

class WordData {
    public letterCounts: Map<string, [number, boolean]>;
    private notSet: Set<string>;
    public word: Tile[];

    constructor() {
        this.notSet = new Set<string>();
        this.letterCounts = new Map<string, [number, boolean]>();
        this.word = [];
        for (let col = 0; col < COLS; ++col) {
            this.word.push(new Tile());
        }
    }

    confirmCount(char: string) {
        let c = this.letterCounts.get(char);
        if (!c) {
            this.not(char);
        } else {
            c[1] = true;
        }
    }

    countConfirmed(char: string) {
        const val = this.letterCounts.get(char);
        return val ? val[1] : false;
    }

    setCount(char: string, count: number) {
        let c = this.letterCounts.get(char);
        if (!c) {
            this.letterCounts.set(char, [count, false]);
        } else {
            c[0] = count;
        }
    }

    incrementCount(char: string) {
        ++this.letterCounts.get(char)[0];
    }

    not(char: string) {
        this.notSet.add(char);
    }

    inGlobalNotList(char: string) {
        return this.notSet.has(char);
    }

    lettersNotAt(pos: number) {
        return new Set([...this.notSet, ...this.word[pos].notSet]);
    }
}

export function getRowData(n: number, board: GameBoard) {
    const wd = new WordData();
    for (let row = 0; row < n; ++row) {
        const occured = new Set<string>();
        for (let col = 0; col < COLS; ++col) {
            const state = board.state[row][col];
            const char = board.words[row][col];
            if (state === "⬛") {
                wd.confirmCount(char);
                // if char isn't in the global not list add it to the not list for that position
                if (!wd.inGlobalNotList(char)) {
                    wd.word[col].not(char);
                }
                continue;
            }
            // If this isn't the first time this letter has occured in this row
            if (occured.has(char)) {
                wd.incrementCount(char);
            } else if (!wd.countConfirmed(char)) {
                occured.add(char);
                wd.setCount(char, 1);
            }
            if (state === "🟩") {
                wd.word[col].value = char;
            } else {	// if (state === "🟨")
                wd.word[col].not(char);
            }
        }
    }

    let exp = "";
    for (let pos = 0; pos < wd.word.length; ++pos) {
        exp += wd.word[pos].value ? wd.word[pos].value : `[^${[...wd.lettersNotAt(pos)].join(" ")}]`;
    }
    return (word: string) => {
        if (new RegExp(exp).test(word)) {
            const chars = word.split("");
            for (const e of wd.letterCounts) {
                const occurences = countOccurences(chars, e[0]);
                if (!occurences || (e[1][1] && occurences !== e[1][0])) return false;
            }
            return true;
        }
        return false;
    };
}

function countOccurences<T>(arr: T[], val: T) {
    return arr.reduce((count, v) => v === val ? count + 1 : count, 0);
}

export function getState(word: string, guess: string): LetterState[] {
    const charArr = word.split("");
    const result = Array<LetterState>(5).fill("⬛");
    for (let i = 0; i < word.length; ++i) {
        if (charArr[i] === guess.charAt(i)) {
            result[i] = "🟩";
            charArr[i] = "$";
        }
    }
    for (let i = 0; i < word.length; ++i) {
        const pos = charArr.indexOf(guess[i]);
        if (result[i] !== "🟩" && pos >= 0) {
            charArr[pos] = "$";
            result[i] = "🟨";
        }
    }
    return result;
}

export function contractNum(n: number) {
    switch (n % 10) {
        case 1:
            return `${n}st`;
        case 2:
            return `${n}nd`;
        case 3:
            return `${n}rd`;
        default:
            return `${n}th`;
    }
}

export const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

export const numberIsZero = 118;
const zeroDayUTC = Date.UTC(2022, 4, 14);

export function getTodayUTCWhichUsedToBeASeed() {
    return Date.UTC(1970, 0, 1 + Math.floor((Date.now() - (new Date().getTimezoneOffset() * ms.MINUTE)) / ms.DAY));
}

export function getTodaysWordNumber() {
    return getTodayUTCWhichUsedToBeASeed() - zeroDayUTC;
}

export const modeData: ModeData = {
    default: GameMode.daily,
    modes: [
        {
            name: "Daily",
            unit: ms.DAY,
            wordNumber: getTodaysWordNumber(),
            historical: false,
            streak: true,
            useTimeZone: true,
        },
    ]
};

export const DELAY_INCREMENT = 200;

export const PRAISE = [
    "Genius",
    "Magnificent",
    "Impressive",
    "Splendid",
    "Great",
    "Phew",
];

export function createNewGame(mode: GameMode): GameState {
    return {
        active: true,
        guesses: 0,
        time: getTodayUTCWhichUsedToBeASeed(),
        wordNumber: getTodaysWordNumber(),
        validHard: true,
        board: {
            words: Array(ROWS).fill(""),
            state: Array.from({length: ROWS}, () => (Array(COLS).fill("🔳")))
        },
    };
}

export function createDefaultSettings(): Settings {
    return {
        hard: new Array(modeData.modes.length).map(() => false),
        dark: true,
        colorblind: false,
        tutorial: 3,
    };
}

export function createDefaultStats(mode: GameMode): Stats {
    const stats = {
        played: 0,
        lastGame: 0,
        guesses: {
            fail: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
        }
    };
    if (!modeData.modes[mode].streak) return stats;
    return {
        ...stats,
        streak: 0,
        maxStreak: 0,
    };
};

export function createLetterStates(): { [key: string]: LetterState; } {
    return {
        a: "🔳",
        b: "🔳",
        c: "🔳",
        d: "🔳",
        e: "🔳",
        f: "🔳",
        g: "🔳",
        h: "🔳",
        i: "🔳",
        j: "🔳",
        k: "🔳",
        l: "🔳",
        m: "🔳",
        n: "🔳",
        o: "🔳",
        p: "🔳",
        q: "🔳",
        r: "🔳",
        s: "🔳",
        t: "🔳",
        u: "🔳",
        v: "🔳",
        w: "🔳",
        x: "🔳",
        y: "🔳",
        z: "🔳",
    };
}

export function timeRemaining(m: Mode) {
    if (m.useTimeZone) {
        return m.unit - (Date.now() - (getTodayUTCWhichUsedToBeASeed() + new Date().getTimezoneOffset() * ms.MINUTE));
    }
    return m.unit - (Date.now() - getTodayUTCWhichUsedToBeASeed());
}

export function failed(s: GameState) {
    return !(s.active || (s.guesses > 0 && s.board.state[s.guesses - 1].join("") === "🟩".repeat(COLS)));
}