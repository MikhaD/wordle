![Wordle+](https://raw.githubusercontent.com/MikhaD/wordle/main/public/img/og_1200x630.png)
<div align="center">
  <a href="https://mikhad.github.io/wordle/" ><img src="https://github.com/MikhaD/wordle/workflows/Publish/badge.svg?branch=main" alt="Publish workflow"/></a>
  <img src="https://img.shields.io/github/package-json/v/MikhaD/wordle" alt="GitHub package.json version" />
</div>

---

# Craig Veiner's Notes

### Thank You Mikha Davids
- This is a fork of Mikha Davids' Wordle+ repository at https://github.com/MikhaD/wordle

### To run a svelte app...
- Open a terminal in the app's root folder.
- npm install // one time install of svelte dependencies
- npm run dev // gives link to run and debug app in html browser
- In Brave, select menu "More tools > Development tools Ctrl+Shift+I" to open the Development tools panel, which can be floating or docked to the right side. Use the "Console" tab to see "console.log(variable)".

### To run the hidden "Reset your stats" function...
- Click on the Wordle+ Settings icon (the gear icon).
- Hover your mouse over the words "Infinite word #xyz" in the bottom right corner of the window and the following message will pop up: "double click to reset your stats".
- Keeping your mouse in the same place, double click your mouse.
- The following message will briefly pop up: "localStorage cleared".
- All your stats will be erased, and you will be able to play any game number that you have already played from the beginning, with new guesses.

### Craig's Research and Modifications
- Board.svelte\context calls utils.ts\getRowData to filter utils.ts\words.words to pAnsWords list of remaining solutions.
- utils.ts\getRowData has a "duplicate letters bug" that returns false remaining solution(s) for the case where the tiles have revealed duplicate letters. This is the same bug as Mikha Davids' Wordle repository Issue #69 titled "Potential answer / guess count displayed 0 for 'Dolly' ".
- To replicate the "duplicate letters bug", revert the following code in the utils.ts\getRowData function from "if (occurrences < e[1][0]) {" to "if (!occurrences || (e[1][1] && occurrences !== e[1][0])) {". Then, play any of the games below with and without the reverted change, double click the row after the suggested guess and Board.svelt\context will log out pAnsWords (the list of remaining solutions) to the Console tab of the browser's Development tools panel.
- http://localhost:5173/wordle/#infinite/43873602 dolly, try guess "lolly" or "lowly" after guesses "slate" and "broil". Reference Mikha Davids' Wordle repository Issue #69 titled "Potential answer / guess count displayed 0 for 'Dolly' ".
- http://localhost:5173/wordle/#infinite/63769522 beefy, try guess "greed" after guess "slate".
- http://localhost:5173/wordle/#infinite/63781582 gloom, try guess "boozy" after guess "trace".

### Mikha Davids' original ReadMe.md continues below.

# Wordle Overview
A recreation of the popular game [Wordle](https://www.nytimes.com/games/wordle/) by Josh Wardle (now purchased by the New York Times), with additional modes and features.
Hosted on GitHub pages [here](https://mikhad.github.io/wordle/).

# Additional Features
- Words are chosen from the list of words at random instead of in sequence, and the solution is not stored in localStorage, making it harder to cheat. The seed for the random number is created from the date, ensuring that everyone gets the same random number, so people can still compare answers.
- When you complete a game the definition of the word is shown on the end of game modal.
- In addition to the other statistics, your average guesses and your losses are also displayed on the win modal.
- When the timer reaches 0 for a given game mode it changes into a refresh button instead of just staying at 00:00:00.
- When the timer reaches 0 for a given game mode a refresh button appears in the top left corner.
- A tips widget in the settings menu with useful information about the functionality of the game.
- Right clicking a submitted word on the board will tell you its definition.
- Right clicking a submitted word on the board will tell you how many possible words could have been played there, taking all previous information into account.
- Right clicking the row below the last submitted word will tell you how many possibilities there are taking all previous information into account.
- The game mode is reflected in the url, allowing you to share a game mode directly.
- You can share a link to a specific game number, allowing you to play historical games, and share specific rounds of the faster changing modes with your friends.
- You can access previous games from the settings menu by inputting a game number or link.
- Service worker which allows the game to be easily downloaded as a progressive web app and run offline.
- Give Up button.

## Additional modes
The game mode can be changed by clicking WORDLE+ at the top of the screen or swiping the board in either direction.

**Hourly mode**: A new word every hour.

**Infinite mode**: A new word every time you refresh, for the true addicts.

# Technical details
This is written with Svelte in Typescript. This is my first Svelte project, and is intended as an exercise to help me learn and become proficient in Svelte. It also uses some basic scss for styling.

The project was initialized using `npm init vite@latest` and selecting the Svelte template.

# Forking this project
Anybody is welcome to fork this repository and do what they like with it, provided they follow the accompanying license (GPL-3.0).
I would also appreciate if you could link back to this repository and credit me in your project.

Have fun :)

# Analytics
This project contains basic google analytics which log the following information:
- Number of visitors
- Visitor's Country
- Whether they arrived via a direct link or a search engine
- Total number of people on site

This information cannot be linked back to individual users. It is for my own personal use and is not shared with anyone else. This is my first "major" public facing project and being able to see how many people are playing from all over the world is a big factor in my motivation to continue working on it.

<details>
<summary>How to create a new mode</summary>

- Add the mode name to the **end** of the GameMode enum in `enums.ts`
- Add a case for that mode in the newSeed function in `utils.ts`
- Add a ModeData object to the modeData modes array in `utils.ts`
</details>
