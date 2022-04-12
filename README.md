![Wordle+](https://raw.githubusercontent.com/MikhaD/wordle/main/public/img/og_1200x630.png)
<div align="center">
  <a href="https://mikhad.github.io/wordle/" ><img src="https://github.com/MikhaD/wordle/workflows/Publish/badge.svg?branch=main" alt="Publish workflow"/></a>
  <img src="https://img.shields.io/github/package-json/v/MikhaD/wordle" alt="GitHub package.json version" />
</div>

---
A recreation of the popular game [Wordle](https://www.nytimes.com/games/wordle/) by Josh Wardle (now purchased by the New York Times), with additional modes and features.
Hosted on GitHub pages [here](https://mikhad.github.io/wordle/).

## Additional Features
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
- Service worker which allows the game to be easily downloaded as a progressive web app and run offline.
- Give Up button.

## Additional modes
**Hourly mode**: A new word every hour.

**Infinite mode**: A new word every time you refresh, for the true addicts.

# Technical details
This is written with Svelte in Typescript. This is my first Svelte project, and is intended as an exercise to help me learn and become proficient in Svelte.
This is still in development. My goal is to make it as close to the original wordle as possible while also adding additional features. I will continue to make it more similar to the original.

# Forking this project
Anybody is welcome to fork this repository and do what they like with it, provided they follow the accompanying licence (GPL-3.0).
I would also appreciate if you could remove my google analytics script from the head of the page and include a link back to this repository somewhere.

Have fun :)

<details>
<summary>How to create a new mode</summary>

- Add the mode name to the **end** of the GameMode enum in `enums.ts`
- Add a case for that mode in the newSeed function in `utils.ts`
- Add a ModeData object to the modeData modes array in `utils.ts` 
</details>
