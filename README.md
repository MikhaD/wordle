![Wordle+](https://raw.githubusercontent.com/MikhaD/wordle/main/public/img/og_1200x630.png)
<div align="center">
  <a href="https://mikhad.github.io/wordle/" ><img src="https://github.com/MikhaD/wordle/workflows/Publish/badge.svg?branch=main" alt="Publish workflow"/></a>
  <img src="https://img.shields.io/github/package-json/v/MikhaD/wordle" alt="GitHub package.json version" />
</div>

---
A recreation of the popular game [Wordle](https://www.powerlanguage.co.uk/wordle/) by Josh Wardle, with additional modes and features.
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
- Service worker which allows the game to be easily downloaded as a progressive web app and run offline.

## Additional modes
**Hourly mode**: A new word every hour.

**Infinite mode**: A new word every time you refresh, for the true addicts.

# Technical details
This is written with Svelte in Typescript. This is my first Svelte project, and is intended as an exercise to help me learn and become proficient in Svelte.
This is still in development. My goal is to make it as close to the original wordle as possible while also adding additional features. I will continue to make it more similar to the original.

<details>
<summary>To do</summary>

# To Do
## Before Release

## Less serious
- Consider adding notification when new word is available sometime in the morning.
- Fix nonsense with timings & delay variable
- Distinguish between failing to fetch definition and no definition found. If it failed to fetch the definition, add a retry button
- Tidy up animation code and make animation mechanism consistant (if possible)
- Look into improving the performance

## Done
- Add routes for the different game modes so you can share a game mode
- Improve full screen modals on mobile
- Add manifest.json and make it into a PWA
- add right click menu on rows that allows you to get the dictionary definition for that row
- get rid of magic numbers (for length of word and number of guesses)
- Prevent mode symbol overflowing screen.
- Personalize images
- Close context menu when left or right click occurs anywhere
- if a row is right clicked show the number of possible words that could have been played in that row
- Add option to definition for how many alternate definitions to show
- remove unused css variables
- In shared text say X/6 instead of 7/6 if failed
- fix modal width scaling
- Add gallery type tip widget to settings
- Add winning toasts
- Add link to repo in settings if people find bugs
- Add animations
- disallow players from turning hard mode on if the current game wouldn't be possible in hard mode
- Add toasts
- Add timer which turns into a refresh button
- add a refresh button next to the tutorial button when a new wordle is available for a given mode
- Add google analytics to track number of visitors
- Add game mode to shared data
- Add guess distribution
- Add version to readme
- Add Deploy workflow badge to readme
- Add changes & additions to README
- Pressing escape should close open modals
- Implement hard mode
- Add statistics button if you have completed one or more games
- Add tutorial
- Implement fail state
- Implement word number
- Break streak if the player isn't back the next day (if daySeed - lastGame > 86400000)
- Consolidate all mentions of the different game modes to make it easier to add more modes
- Add option to change game mode in settings (along with description of what mode does?)
- Prevent Definition component from making api request every time mode is changed

# Bugs
- Definition frequently fails to be fetched
- ~~Not reactive enough, goes offscreen on mobile~~
- ~~Number of guesses not being recorded properly~~
- ~~Board does not scale~~
- ~~Mode symbol not in the correct place on different sized screens (Make it part of the board so that it stays behind it)~~
- ~~Game not refreshing on reload where it should be (may require saving last on in game state)~~
</details>
